import { randomBytes } from 'node:crypto';

import { NextResponse, type NextRequest } from 'next/server';

import { stateCookie } from '@/lib/cms/config';
import { secureCookie } from '@/lib/cms/session';

export function GET(request: NextRequest) {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json({ error: 'missing GITHUB_OAUTH_CLIENT_ID env var' }, { status: 500 });
  }

  const state = randomBytes(16).toString('hex');
  const redirectUri =
    process.env.GITHUB_OAUTH_REDIRECT_URI ?? `${request.nextUrl.origin}/api/callback`;
  const authorizeUrl = new URL('https://github.com/login/oauth/authorize');
  authorizeUrl.searchParams.set('client_id', clientId);
  authorizeUrl.searchParams.set('scope', 'public_repo');
  authorizeUrl.searchParams.set('redirect_uri', redirectUri);
  authorizeUrl.searchParams.set('state', state);

  const response = NextResponse.redirect(authorizeUrl);
  response.cookies.set(stateCookie, state, {
    httpOnly: true,
    secure: secureCookie,
    sameSite: 'lax',
    path: '/api/callback',
    maxAge: 60 * 10,
  });
  return response;
}
