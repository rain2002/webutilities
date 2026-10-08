import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://webutilities-pzyjkhuon-rain-1933.vercel.app';
  
  const tools = [
    'base64',
    'color-converter',
    'image-compressor',
    'image-resizer',
    'json-csv',
    'json-formatter',
    'jwt-decoder',
    'markdown-html',
    'password-generator',
    'pdf-merger',
    'pdf-splitter',
    'pdf-watermark',
    'qr-generator',
    'timestamp-converter',
    'word-counter',
    'yaml-json',
  ];

  const toolRoutes = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...toolRoutes,
  ];
}
