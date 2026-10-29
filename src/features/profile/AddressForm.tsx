'use client';

import React, { useState } from 'react';
import { UserAddress } from '@/types/database';
import { checkPincodeMatrix } from '@/lib/api/botanical-api';
import { SITE, PRIMARY_AREA } from '@/config/site';
import { MapPin, Phone, User, Home, Briefcase, Building, Check, AlertCircle, X } from 'lucide-react';

interface AddressFormProps {
  initialData?: UserAddress | null;
  onSave: (data: {
    id?: string;
    recipient_name: string;
    phone: string;
    line1: string;
    line2?: string | null;
    city: string;
    state: string;
    postal_code: string;
    address_type?: 'home' | 'work' | 'other';
    is_default?: boolean;
  }) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function AddressForm({
  initialData,
  onSave,
  onCancel,
  isSubmitting = false,
}: AddressFormProps) {
  const [formData, setFormData] = useState({
    recipient_name: initialData?.recipient_name || '',
    phone: initialData?.phone || '',
    line1: initialData?.line1 || '',
    line2: initialData?.line2 || '',
    city: initialData?.city || SITE.city,
    state: initialData?.state || SITE.state,
    postal_code: initialData?.postal_code || PRIMARY_AREA.pincodes[0] || '132001',
    address_type: (initialData?.address_type || 'home') as 'home' | 'work' | 'other',
    is_default: initialData?.is_default ?? false,
  });

  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [pincodeStatus, setPincodeStatus] = useState<{
    checked: boolean;
    valid: boolean;
    message?: string;
  }>({
    checked: !!initialData?.postal_code,
    valid: true,
  });

  const [error, setError] = useState<string | null>(null);

  const handlePincodeBlur = async () => {
    const code = formData.postal_code.trim();
    if (code.length !== 6) {
      setPincodeStatus({ checked: true, valid: false, message: 'Please enter a 6-digit PIN code' });
      return;
    }
    setPincodeLoading(true);
    try {
      const res = await checkPincodeMatrix(code);
      if (res.serviceable && res.info) {
        setPincodeStatus({
          checked: true,
          valid: true,
          message: `✓ Fast 24h delivery active in ${res.info.city}`,
        });
        setFormData((prev) => ({
          ...prev,
          city: res.info?.city || prev.city,
          state: res.info?.state || prev.state,
        }));
      } else {
        setPincodeStatus({
          checked: true,
          valid: false,
          message: res.message || `Delivery is currently optimized for ${SITE.city}`,
        });
      }
    } catch {
      setPincodeStatus({ checked: true, valid: true });
    } finally {
      setPincodeLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.recipient_name.trim()) {
      setError('Please enter the recipient full name');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!formData.line1.trim()) {
      setError('Please enter flat/house number and street name');
      return;
    }
    if (!formData.postal_code.trim() || formData.postal_code.length !== 6) {
      setError('Please enter a valid 6-digit PIN code');
      return;
    }

    try {
      await onSave({
        id: initialData?.id,
        recipient_name: formData.recipient_name,
        phone: formData.phone,
        line1: formData.line1,
        line2: formData.line2 || null,
        city: formData.city,
        state: formData.state,
        postal_code: formData.postal_code,
        address_type: formData.address_type,
        is_default: formData.is_default,
      });
    } catch (err: any) {
      setError(err?.message || 'Failed to save address');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-forest-800/15 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-forest-800/10">
        <div>
          <h3 className="text-xl font-heading font-medium text-forest-950">
            {initialData ? 'Edit Delivery Address' : 'Add New Delivery Address'}
          </h3>
          <p className="text-xs text-forest-900/60 mt-0.5">
            Plants are packed and delivered fresh within 24 hours in {SITE.city}.
          </p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="text-forest-700/60 hover:text-forest-900 p-2 rounded-full hover:bg-cream-100 transition-colors"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {error && (
        <div className="p-3.5 bg-terracotta-50 border border-terracotta-200 text-terracotta-800 text-xs rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-terracotta-600 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Address Type Selector */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-forest-900 uppercase tracking-wider block">
          Address Type
        </label>
        <div className="flex items-center gap-3">
          {[
            { type: 'home', label: 'Home', icon: Home },
            { type: 'work', label: 'Work / Office', icon: Briefcase },
            { type: 'other', label: 'Other', icon: Building },
          ].map(({ type, label, icon: Icon }) => {
            const active = formData.address_type === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => setFormData((p) => ({ ...p, address_type: type as any }))}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                  active
                    ? 'bg-forest-900 border-forest-900 text-cream-50 shadow-sm'
                    : 'bg-white border-forest-800/15 text-forest-900 hover:border-forest-600'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-sage-300' : 'text-forest-700'}`} />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Personal Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-forest-900 block mb-1.5">
            Recipient Full Name *
          </label>
          <div className="relative">
            <User className="w-4 h-4 absolute left-3.5 top-3.5 text-forest-700/50" />
            <input
              type="text"
              required
              value={formData.recipient_name}
              onChange={(e) => setFormData((p) => ({ ...p, recipient_name: e.target.value }))}
              placeholder="e.g. Vikash Bhatnagar"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-forest-800/20 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800 bg-cream-50/50"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-forest-900 block mb-1.5">
            Mobile Number (10 digits) *
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-forest-700/50" />
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
              placeholder="e.g. 9876543210"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-forest-800/20 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800 bg-cream-50/50"
            />
          </div>
        </div>
      </div>

      {/* Street Address */}
      <div className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-forest-900 block mb-1.5">
            Flat, House No., Building, Apartment *
          </label>
          <input
            type="text"
            required
            value={formData.line1}
            onChange={(e) => setFormData((p) => ({ ...p, line1: e.target.value }))}
            placeholder="e.g. House No. 142, Sector 13 Urban Estate"
            className="w-full px-4 py-2.5 rounded-xl border border-forest-800/20 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800 bg-cream-50/50"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-forest-900 block mb-1.5">
            Landmark, Street or Colony (Optional)
          </label>
          <input
            type="text"
            value={formData.line2}
            onChange={(e) => setFormData((p) => ({ ...p, line2: e.target.value }))}
            placeholder="e.g. Near Community Center / Opposite Park"
            className="w-full px-4 py-2.5 rounded-xl border border-forest-800/20 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800 bg-cream-50/50"
          />
        </div>
      </div>

      {/* PIN Code, City, State */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="text-xs font-semibold text-forest-900 block mb-1.5">
            PIN Code *
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 absolute left-3.5 top-3.5 text-forest-700/50" />
            <input
              type="text"
              required
              maxLength={6}
              value={formData.postal_code}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                setFormData((p) => ({ ...p, postal_code: val }));
              }}
              onBlur={handlePincodeBlur}
              placeholder="e.g. 132001"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-forest-800/20 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800 bg-cream-50/50 font-mono"
            />
          </div>
          {pincodeLoading && (
            <span className="text-[10px] text-forest-800/60 mt-1 block">Checking serviceability...</span>
          )}
          {pincodeStatus.checked && (
            <span
              className={`text-[11px] mt-1 block font-medium ${
                pincodeStatus.valid ? 'text-sage-700' : 'text-terracotta-700'
              }`}
            >
              {pincodeStatus.message}
            </span>
          )}
        </div>

        <div>
          <label className="text-xs font-semibold text-forest-900 block mb-1.5">
            City *
          </label>
          <input
            type="text"
            required
            value={formData.city}
            onChange={(e) => setFormData((p) => ({ ...p, city: e.target.value }))}
            className="w-full px-4 py-2.5 rounded-xl border border-forest-800/20 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800 bg-cream-50/50"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-forest-900 block mb-1.5">
            State *
          </label>
          <input
            type="text"
            required
            value={formData.state}
            onChange={(e) => setFormData((p) => ({ ...p, state: e.target.value }))}
            className="w-full px-4 py-2.5 rounded-xl border border-forest-800/20 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800 bg-cream-50/50"
          />
        </div>
      </div>

      {/* Default Checkbox */}
      <div className="pt-2">
        <label className="inline-flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={formData.is_default}
            onChange={(e) => setFormData((p) => ({ ...p, is_default: e.target.checked }))}
            className="w-4 h-4 rounded text-forest-900 focus:ring-forest-800 border-forest-800/30"
          />
          <span className="text-xs font-medium text-forest-900">
            Set as my default delivery address for future botanical orders
          </span>
        </label>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-forest-800/10">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-5 py-2.5 rounded-full border border-forest-800/20 text-forest-900 hover:bg-cream-100 text-xs font-semibold transition-all disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary py-2.5 px-6 text-xs flex items-center gap-2 shadow-sm"
        >
          {isSubmitting ? (
            <span>Saving...</span>
          ) : (
            <>
              <Check className="w-4 h-4" />
              <span>{initialData ? 'Update Address' : 'Save Address'}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

