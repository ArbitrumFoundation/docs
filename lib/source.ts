import { docs } from 'collections/server';
import { loader } from 'fumadocs-core/source';

export const source = loader({
  baseUrl: '/',
  source: docs.toFumadocsSource(),
  pageTree: {
    transformers: [
      {
        file(node, file) {
          if (!file) return node;
          const data = this.storage.read(file);
          if (data?.format !== 'page') return node;
          const label = (data.data as { sidebar_label?: string }).sidebar_label;
          return label ? { ...node, name: label } : node;
        },
      },
    ],
  },
});
