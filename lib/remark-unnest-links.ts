import type { Parent, Root } from 'mdast';
import { visit } from 'unist-util-visit';

type JsxElement = Parent & { type: 'mdxJsxTextElement' | 'mdxJsxFlowElement'; name: string | null };

// gfm autolinks the url text inside raw <a href="url">url</a>, which nests one anchor in another
export function remarkUnnestLinks() {
  return (tree: Root) => {
    visit(tree, (node) => {
      const element = node as JsxElement;
      if (
        (element.type !== 'mdxJsxTextElement' && element.type !== 'mdxJsxFlowElement') ||
        element.name !== 'a'
      ) {
        return;
      }
      visit(element, 'link', (link, index, parent) => {
        if (!parent || index === undefined) return;
        parent.children.splice(index, 1, ...link.children);
        return index;
      });
    });
  };
}
