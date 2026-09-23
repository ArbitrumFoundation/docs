import { remarkMdxMermaid } from 'fumadocs-core/mdx-plugins';
import { metaSchema } from 'fumadocs-core/source/schema';
import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { docsPageSchema } from './lib/frontmatter-schema';
import { remarkUnnestLinks } from './lib/remark-unnest-links';

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: docsPageSchema,
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
