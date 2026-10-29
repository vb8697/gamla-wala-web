/**
 * Single source of truth for the city GamlaWala currently serves.
 * To expand: add another entry to SERVICE_AREAS and (later) a city switcher.
 */

export interface ServiceArea {
  city: string;
  state: string;
  /** Hours from order to doorstep for this area */
  deliveryHours: number;
  /** Delivery promise shown to customers */
  deliveryLabel: string;
  /** 6-digit PIN codes served. Edit to match your real delivery radius. */
  pincodes: string[];
  codAvailable: boolean;
}

export const SERVICE_AREAS: ServiceArea[] = [
  {
    city: 'Karnal',
    state: 'Haryana',
    deliveryHours: 24,
    deliveryLabel: 'Delivery within 24 hours',
    pincodes: ['132001', '132022', '132114', '132041', '132116', '132039'],
    codAvailable: true,
  },
];

export const PRIMARY_AREA = SERVICE_AREAS[0];

export const SITE = {
  name: 'GamlaWala',
  tagline: 'Har Ghar Hariyali',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://gamlawala.com',
  city: PRIMARY_AREA.city,
  state: PRIMARY_AREA.state,
  defaultPincode: PRIMARY_AREA.pincodes[0],
  // Set these in .env.local — placeholders below are NOT real numbers.
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919999999999', // country code + number, no "+"
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY || '+91 99999 99999',
  address: process.env.NEXT_PUBLIC_STORE_ADDRESS || `Karnal, Haryana`,
  gstin: process.env.NEXT_PUBLIC_GSTIN || '',
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || '',
  hours: '9 AM – 8 PM, all days',
  freeDeliveryAbovePaise: 0,
  deliveryFeePaise: 0,
} as const;

export function whatsappLink(message: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function findServiceArea(pincode: string): ServiceArea | undefined {
  return SERVICE_AREAS.find((a) => a.pincodes.includes(pincode));
}
