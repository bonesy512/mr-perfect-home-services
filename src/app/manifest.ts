import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mr Perfect Home Services Austin',
    short_name: 'Mr Perfect',
    description: "Austin's Premier Chimney Sweep, Camera Inspections & Air Duct Sanitization Specialists.",
    start_url: '/',
    display: 'standalone',
    background_color: '#080d19',
    theme_color: '#080d19',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
