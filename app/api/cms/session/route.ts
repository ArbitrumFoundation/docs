import { NextResponse } from 'next/server';

import { cmsConfig } from '@/lib/cms/config';
import { withGitHub } from '@/lib/cms/session';

export const GET = withGitHub(async (github) =>
  NextResponse.json({
    ...(await github.getViewer()),
    repository: {
      owner: cmsConfig.owner,
      repo: cmsConfig.repo,
      baseBranch: cmsConfig.baseBranch,
    },
  })
);
