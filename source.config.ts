import { remarkMdxMermaid } from 'fumadocs-core/mdx-plugins';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { z } from 'zod';

import { remarkUnnestLinks } from './lib/remark-unnest-links';

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: pageSchema.extend({
      description: z.string().optional(),
      sidebar_label: z.string().optional(),
      dao_author: z.string().optional(),
      dao_sme: z.string().optional(),
      toc_min_heading_level: z.number().int().min(2).max(6).optional(),
    }),
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    // single dollar math is off so token tickers in prose are never parsed as tex
    remarkPlugins: [
      [remarkMath, { singleDollarTextMath: false }],
      remarkMdxMermaid,
      remarkUnnestLinks,
    ],
    rehypePlugins: (plugins) => [rehypeKatex, ...plugins],
    remarkImageOptions: { external: false },
  },
});
