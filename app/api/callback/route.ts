import { NextResponse, type NextRequest } from 'next/server';

import { stateCookie, tokenCookie } from '@/lib/cms/config';
import { secureCookie, sessionMaxAge } from '@/lib/cms/session';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  const state = request.nextUrl.searchParams.get('state');
  const expectedState = request.cookies.get(stateCookie)?.value;

  if (!code || !state || state !== expectedState) {
    return NextResponse.json({ error: 'invalid oauth callback' }, { status: 400 });
  }

  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.GITHUB_OAUTH_CLIENT_ID,
      client_secret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
      code,
    }),
    cache: 'no-store',
  });
  const data = (await tokenResponse.json()) as { access_token?: string; error?: string };
  if (!data.access_token) {
    return NextResponse.json({ error: data.error ?? 'token exchange failed' }, { status: 502 });
  }

  const response = NextResponse.redirect(new URL('/admin', request.nextUrl.origin));
  response.cookies.set(tokenCookie, data.access_token, {
    httpOnly: true,
    secure: secureCookie,
    sameSite: 'lax',
    path: '/',
    maxAge: sessionMaxAge,
  });
  response.cookies.delete({ name: stateCookie, path: '/api/callback' });
  return response;
}
