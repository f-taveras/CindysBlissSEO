import { MetadataRoute } from 'next';
import { getAllProductPaths } from '../lib/data'; 

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cindys-bliss-seo.vercel.app'; 

  const paths = getAllProductPaths();

  const productUrls = paths.map((path) => ({
    url: `${baseUrl}/shop/${path.ingredient}/${path.benefit}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...productUrls,
  ];
}