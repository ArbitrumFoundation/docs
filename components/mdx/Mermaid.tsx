'use client';

import { useTheme } from 'next-themes';
import { useEffect, useId, useState } from 'react';

export function Mermaid({ chart }: { chart: string }) {
  const id = useId().replace(/:/g, '');
  const { resolvedTheme } = useTheme();
  const [svg, setSvg] = useState('');

  useEffect(() => {
    let cancelled = false;
    void import('mermaid').then(async ({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'strict',
        theme: resolvedTheme === 'dark' ? 'dark' : 'default',
        // wide enough that labels never hit mermaid's wrap check, which breaks under browser zoom
        flowchart: { wrappingWidth: 360 },
      });
      const { svg: rendered } = await mermaid.render(`mermaid-${id}`, chart);
      if (!cancelled) setSvg(rendered);
    });
    return () => {
      cancelled = true;
    };
  }, [chart, id, resolvedTheme]);

  return <div className="mermaid-container not-prose" dangerouslySetInnerHTML={{ __html: svg }} />;
}
