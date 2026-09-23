import { NextResponse } from 'next/server';

import { getGitHubToken } from '@/lib/cms/session';

// large files such as pdf reports exceed the function body limit, so the browser uploads them
// straight to github with the signed in user's own token
export async function GET() {
  const token = await getGitHubToken();
  if (!token) return NextResponse.json({ error: 'not signed in' }, { status: 401 });
  return NextResponse.json({ token }, { headers: { 'Cache-Control': 'no-store' } });
}
