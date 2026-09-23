import 'server-only';

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { tokenCookie } from './config';
import { GitHubError, createGitHubClient, type GitHubClient } from './github';

export const sessionMaxAge = 60 * 60 * 8;

export const secureCookie = process.env.NODE_ENV === 'production';

export async function getGitHubClient(): Promise<GitHubClient | null> {
  const token = (await cookies()).get(tokenCookie)?.value;
  return token ? createGitHubClient(token) : null;
}

export function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

// wraps a cms route so auth failures and github errors become json responses
export function withGitHub(handler: (github: GitHubClient, request: Request) => Promise<Response>) {
  return async (request: Request) => {
    const github = await getGitHubClient();
    if (!github) return jsonError('not signed in', 401);
    try {
      return await handler(github, request);
    } catch (error) {
      if (error instanceof GitHubError) {
        return jsonError(error.message, error.status === 401 ? 401 : 502);
      }
      throw error;
    }
  };
}
