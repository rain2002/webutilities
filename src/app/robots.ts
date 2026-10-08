import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: 'https://webutilities-pzyjkhuon-rain-1933.vercel.app/sitemap.xml',
  }
}
