import { siteUrl } from '@/lib/site';

export function RequestUpdateBadge({ pathname }: { pathname: string }) {
  const issueUrl = new URL('https://github.com/ArbitrumFoundation/docs/issues/new');
  issueUrl.searchParams.set('title', `Docs update request: ${pathname}`);
  issueUrl.searchParams.set(
    'body',
    `Source: ${siteUrl}${pathname}\n\nRequest: (how can we help?)\n\nPsst, this issue will be closed with a templated response if it isn't a documentation update request.`
  );

  return (
    <div className="header-badges">
      <a className="header-badge" href={issueUrl.toString()}>
        <span className="badge-avatar" aria-hidden>
          ✏️
        </span>
        <span className="badge-label">Request an update</span>
      </a>
    </div>
  );
}
