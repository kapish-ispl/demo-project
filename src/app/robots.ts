import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://demojindalprojects.jindalsteel.com';
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    // sitemap: `${baseUrl.replace(/\/$/, '')}/sitemap.xml`,
  };
}
