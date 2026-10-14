import { NextResponse } from 'next/server';

import { tokenCookie } from '@/lib/cms/config';

export function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(tokenCookie);
  return response;
}
