import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';

import { gitConfig, siteName } from './site';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <Image src="/img/logo.svg" alt="Arbitrum DAO" width={28} height={28} />
          <span className="font-semibold">{siteName}</span>
        </>
      ),
      url: '/gentle-intro-dao-governance',
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
