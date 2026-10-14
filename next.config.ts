import { createMDX } from 'fumadocs-mdx/next';
import type { NextConfig } from 'next';

const withMDX = createMDX();

const config: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/gentle-intro-dao-governance',
        permanent: true,
      },
    ];
  },
};

export default withMDX(config);
