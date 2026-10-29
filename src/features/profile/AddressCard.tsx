'use client';

import React from 'react';
import { UserAddress } from '@/types/database';
import { Home, Briefcase, Building, MapPin, Phone, Check, Edit2, Trash2, Star } from 'lucide-react';

interface AddressCardProps {
  address: UserAddress;
  onEdit: (address: UserAddress) => void;
  onDelete: (addressId: string) => void;
  onSetDefault: (addressId: string) => void;
}

export function AddressCard({
  address,
  onEdit,
  onDelete,
  onSetDefault,
}: AddressCardProps) {
  const Icon =
    address.address_type === 'work'
      ? Briefcase
      : address.address_type === 'other'
      ? Building
      : Home;

  return (
    <div
      className={`relative bg-white rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between ${
        address.is_default
          ? 'border-forest-900 shadow-md ring-1 ring-forest-900/10'
          : 'border-forest-800/15 shadow-2xs hover:shadow-md hover:border-forest-700'
      }`}
    >
      <div>
        {/* Badges Bar */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-cream-100 text-forest-900 border border-forest-800/10 capitalize">
              <Icon className="w-3.5 h-3.5 text-forest-700" />
              <span>{address.address_type || 'Home'}</span>
            </span>

            {address.is_default && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-sage-200 text-forest-950 uppercase tracking-wider">
                <Check className="w-3 h-3 text-forest-800 stroke-[2.5]" />
                <span>Default</span>
              </span>
            )}
          </div>
        </div>

        {/* Recipient & Contact */}
        <h4 className="text-base font-heading font-medium text-forest-950">
          {address.recipient_name}
        </h4>
        <p className="text-xs text-forest-800/80 flex items-center gap-1.5 mt-1 font-mono">
          <Phone className="w-3.5 h-3.5 text-forest-700/60" />
          <span>{address.phone}</span>
        </p>

        {/* Street Address Details */}
        <div className="text-xs text-forest-900/80 mt-3.5 space-y-0.5 leading-relaxed bg-cream-50/60 p-3.5 rounded-2xl border border-forest-800/5">
          <p className="font-medium text-forest-950">{address.line1}</p>
          {address.line2 && <p className="text-forest-900/70">{address.line2}</p>}
          <p className="text-forest-900/90 font-medium">
            {address.city}, {address.state} — <span className="font-mono">{address.postal_code}</span>
          </p>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="pt-4 mt-4 border-t border-forest-800/10 flex items-center justify-between gap-2">
        <div>
          {!address.is_default && (
            <button
              type="button"
              onClick={() => onSetDefault(address.id)}
              className="text-[11px] font-semibold text-forest-800 hover:text-forest-950 flex items-center gap-1 hover:underline"
            >
              <Star className="w-3.5 h-3.5 text-amber-500" />
              <span>Set as default</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onEdit(address)}
            className="p-2 text-forest-700 hover:text-forest-950 hover:bg-cream-100 rounded-xl transition-colors text-xs font-semibold flex items-center gap-1"
            title="Edit address"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Edit</span>
          </button>
          <button
            type="button"
            onClick={() => onDelete(address.id)}
            className="p-2 text-terracotta-600 hover:text-terracotta-800 hover:bg-terracotta-50 rounded-xl transition-colors text-xs font-semibold flex items-center gap-1"
            title="Delete address"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}

