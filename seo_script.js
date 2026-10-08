const fs = require('fs');
const path = require('path');

const tools = {
  'base64': { title: 'Base64 Encoder & Decoder Online', desc: 'Free online Base64 encoder and decoder. Safely encode or decode strings locally in your browser.' },
  'color-converter': { title: 'Color Format Converter (HEX, RGB)', desc: 'Instantly convert colors between HEX, RGB, HSL, and CMYK format online for free.' },
  'image-compressor': { title: 'Image Compressor & Converter', desc: 'Compress PNG, JPG, and WEBP images for free. Convert image formats locally without quality loss.' },
  'image-resizer': { title: 'Image Resizer & Cropper Online', desc: 'Free online image resizer and cropper. Resize photos for social media with zero server uploads.' },
  'json-csv': { title: 'JSON to CSV Converter Online', desc: 'Convert JSON arrays to CSV spreadsheets instantly in your browser. 100% private and free.' },
  'json-formatter': { title: 'Free JSON Formatter & Validator', desc: 'Beautify, validate, and minify JSON data online. The fastest local JSON formatter.' },
  'jwt-decoder': { title: 'JWT Decoder Online', desc: 'Decode JSON Web Tokens (JWT) instantly to inspect payloads. 100% private and secure.' },
  'markdown-html': { title: 'Markdown to HTML Converter', desc: 'Instantly convert Markdown syntax into clean, copyable HTML code. Free online tool.' },
  'password-generator': { title: 'Strong Password Generator', desc: 'Generate highly secure, random passwords entirely on your device for free.' },
  'pdf-merger': { title: 'Combine PDF Files Online', desc: 'Merge multiple PDF files into one document instantly. Processed locally for 100% privacy.' },
  'pdf-splitter': { title: 'PDF Splitter Online', desc: 'Extract specific pages or split large PDFs into multiple smaller documents for free.' },
  'pdf-watermark': { title: 'Add Watermark to PDF', desc: 'Add text or image watermarks to your PDF pages to protect your intellectual property securely.' },
  'qr-generator': { title: 'Free QR Code Generator', desc: 'Create downloadable QR codes for URLs, text, and Wi-Fi networks instantly.' },
  'timestamp-converter': { title: 'Unix Timestamp Converter', desc: 'Convert Unix epoch timestamps to human-readable dates and timezones online.' },
  'word-counter': { title: 'Word & Character Counter Online', desc: 'Instantly count words, characters, sentences, and paragraphs. Real-time text metrics.' },
  'yaml-json': { title: 'YAML to JSON Converter', desc: 'Safely parse and convert configuration files between YAML and JSON format online.' },
};

const basePath = path.join(__dirname, 'src/app/tools');

// Inject metadata into each tool page
Object.keys(tools).forEach(id => {
  const pagePath = path.join(basePath, id, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    let content = fs.readFileSync(pagePath, 'utf-8');
    
    if (!content.includes('export const metadata')) {
      const metaBlock = `import { Metadata } from "next";\n\nexport const metadata: Metadata = {\n  title: "${tools[id].title} | WebToolKit",\n  description: "${tools[id].desc}",\n};\n\n`;
      content = content.replace('export default function', metaBlock + 'export default function');
      fs.writeFileSync(pagePath, content);
    }
  }
});

// Generate sitemap.ts
const sitemapCode = `import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://webtoolkit.com'; // Replace with actual domain when deploying
  
  const tools = [
${Object.keys(tools).map(id => `    '${id}',`).join('\n')}
  ];

  const toolRoutes = tools.map((tool) => ({
    url: \`\${baseUrl}/tools/\${tool}\`,
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
`;

fs.writeFileSync(path.join(__dirname, 'src/app/sitemap.ts'), sitemapCode);

// Generate robots.ts
const robotsCode = `import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: 'https://webtoolkit.com/sitemap.xml',
  }
}
`;

fs.writeFileSync(path.join(__dirname, 'src/app/robots.ts'), robotsCode);

console.log('SEO metadata, sitemap, and robots.txt added successfully.');
