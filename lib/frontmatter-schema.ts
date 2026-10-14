import { pageSchema } from 'fumadocs-core/source/schema';
import { z } from 'zod';

export const docsPageSchema = pageSchema.extend({
  description: z.string().optional(),
  sidebar_label: z.string().optional(),
  dao_author: z.string().optional(),
  dao_sme: z.string().optional(),
  toc_min_heading_level: z.number().int().min(2).max(6).optional(),
});
