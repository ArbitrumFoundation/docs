// the [[ picker writes the address as the link text, so swap in the page or term name on save
export function nameBareLinks(markdown: string, titles: ReadonlyMap<string, string>) {
  let inFence = false;
  return markdown
    .split('\n')
    .map((line) => {
      if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
      if (inFence) return line;
      return line.replace(/\[([^\]\n]+)\]\(([^)\s]+)\)/g, (match, text: string, url: string) => {
        const title = text === url ? titles.get(url) : undefined;
        return title ? `[${title.replace(/([[\]])/g, '\\$1')}](${url})` : match;
      });
    })
    .join('\n');
}

// links pasted from the live site become root relative so the save checks can validate them
export function relativizeSiteLinks(markdown: string, siteUrl: string) {
  const origin = siteUrl.replace(/\/$/, '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return markdown.replace(
    new RegExp(`\\]\\(${origin}(/[^)\\s]*)?\\)`, 'g'),
    (_, path: string | undefined) => `](${path || '/'})`
  );
}
