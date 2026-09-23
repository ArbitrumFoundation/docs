import type { MetadataRoute } from 'next';

import { siteUrl } from '@/lib/site';
import { source } from '@/lib/source';

export default function sitemap(): MetadataRoute.Sitemap {
  return source.getPages().map((page) => ({
    url: `${siteUrl}${page.url}`,
    changeFrequency: 'weekly',
    priority: 0.5,
  }));
}
