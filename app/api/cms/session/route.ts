import { NextResponse } from 'next/server';

import { withGitHub } from '@/lib/cms/session';

export const GET = withGitHub(async (github) => NextResponse.json(await github.getViewer()));
