import { MetadataRoute } from 'next';
import { SITE } from '@/config/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — ${SITE.tagline}`,
    short_name: SITE.name,
    description: `Buy indoor air-purifying plants and handcrafted gamlas in ${SITE.city}, ${SITE.state}. Doorstep delivery within 24 hours.`,
    start_url: '/',
    display: 'standalone',
    background_color: '#FBF9F4',
    theme_color: '#1b4332',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
