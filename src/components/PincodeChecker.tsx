'use client';

import React, { useState } from 'react';
import { Truck, CheckCircle2, AlertCircle, MapPin, Loader2 } from 'lucide-react';
import { checkPincodeMatrix } from '@/lib/api/botanical-api';
import { PincodeInfo } from '@/types/database';

export function PincodeChecker({ defaultPincode = '110001' }: { defaultPincode?: string }) {
  const [pincode, setPincode] = useState(defaultPincode);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PincodeInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.length !== 6) {
      setError('Enter valid 6-digit PIN code');
      setResult(null);
      return;
    }

    setLoading(true);
    setError(null);
    const res = await checkPincodeMatrix(pincode);
    setLoading(false);

    if (res.serviceable && res.info) {
      setResult(res.info);
    } else {
      setError(res.message || 'Location currently unserviceable for live botanicals');
      setResult(null);
    }
  };

  return (
    <div className="bg-cream-100 rounded-2xl border border-forest-800/10 p-4 space-y-3">
      <div className="flex items-center justify-between text-xs font-semibold text-forest-950">
        <span className="flex items-center gap-1.5">
          <Truck className="w-4 h-4 text-forest-700" />
          <span>Check Express Plant Delivery</span>
        </span>
        <span className="text-[10px] text-sage-600 bg-sage-100 px-2 py-0.5 rounded-full font-bold">
          Transit Safe 🌱
        </span>
      </div>

      <form onSubmit={handleCheck} className="flex gap-2">
        <div className="relative flex-1">
          <MapPin className="w-3.5 h-3.5 text-forest-700/50 absolute left-3 top-3" />
          <input
            type="text"
            maxLength={6}
            placeholder="Enter 6-digit PIN code"
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
            className="w-full text-xs bg-white border border-forest-800/15 rounded-xl pl-8 pr-3 py-2 text-forest-950 focus:outline-none focus:ring-1 focus:ring-forest-800"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-forest-900 hover:bg-forest-800 text-cream-50 font-bold text-xs px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
        >
          {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Check'}
        </button>
      </form>

      {error && (
        <div className="text-xs text-terracotta-600 flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {result && (
        <div className="bg-white rounded-xl p-3 border border-forest-800/10 space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-forest-950 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-sage-600" />
              <span>Serviceable: {result.city} ({result.pincode})</span>
            </span>
            <span className="text-[11px] font-bold text-sage-600">
              {result.estimated_delivery_hours}h Delivery
            </span>
          </div>
          <p className="text-[11px] text-forest-800/70">
            Fulfillment from <strong>Connaught Place Botanical Hub</strong> in breathable packaging.
            {result.cod_available ? ' COD available.' : ''}
          </p>
        </div>
      )}
    </div>
  );
}
