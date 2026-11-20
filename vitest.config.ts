import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // `*.test.ts` files belong to `node --test`; vitest only runs `*.spec.ts`.
    include: ['**/*.spec.ts'],
    exclude: ['node_modules/**', '.next/**', 'notion-docs/**'],
  },
});
