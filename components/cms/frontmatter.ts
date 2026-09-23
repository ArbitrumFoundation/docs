import { isMap, isScalar, parseDocument, stringify } from 'yaml';

export const detailFields = [
  { key: 'title', label: 'Title', required: true, hint: 'The heading at the top of the page.' },
  {
    key: 'sidebar_label',
    label: 'Sidebar label',
    required: false,
    hint: 'The short name shown in the site navigation.',
  },
  {
    key: 'description',
    label: 'Description',
    required: false,
    hint: 'One or two sentences shown in search results and link previews.',
  },
  { key: 'dao_author', label: 'Author', required: false, hint: '' },
  { key: 'dao_sme', label: 'Subject matter expert', required: false, hint: '' },
] as const;

export type DetailKey = (typeof detailFields)[number]['key'];
export type Details = Record<DetailKey, string>;

export function readDetails(yaml: string): { details: Details; error?: string } {
  const empty = Object.fromEntries(detailFields.map((field) => [field.key, ''])) as Details;
  const document = parseDocument(yaml);
  if (document.errors.length > 0) return { details: empty, error: document.errors[0].message };
  const data = (document.toJS() ?? {}) as Record<string, unknown>;
  for (const field of detailFields) {
    const value = data[field.key];
    empty[field.key] = typeof value === 'string' ? value : value == null ? '' : String(value);
  }
  return { details: empty };
}

// splices only the changed keys into the original text so untouched lines stay byte identical
export function writeDetails(yaml: string, details: Details, original: Details) {
  const document = parseDocument(yaml);
  const map = isMap(document.contents) ? document.contents : null;
  const edits: { from: number; to: number; text: string }[] = [];
  const appended: string[] = [];

  for (const field of detailFields) {
    const value = details[field.key].trim();
    if (value === original[field.key].trim()) continue;
    const line = `${field.key}: ${stringify(value, { lineWidth: 0 }).trimEnd()}`;
    const pair = map?.items.find((item) => isScalar(item.key) && item.key.value === field.key);
    const keyRange = pair && isScalar(pair.key) ? pair.key.range : undefined;
    const valueRange = pair && isScalar(pair.value) ? pair.value.range : undefined;

    if (keyRange && valueRange) {
      if (value || field.required) edits.push({ from: keyRange[0], to: valueRange[1], text: line });
      else {
        const end = yaml[valueRange[2]] === '\n' ? valueRange[2] + 1 : valueRange[2];
        edits.push({ from: keyRange[0], to: end, text: '' });
      }
    } else if (value) {
      appended.push(line);
    }
  }

  let next = yaml;
  for (const edit of edits.sort((a, b) => b.from - a.from)) {
    next = next.slice(0, edit.from) + edit.text + next.slice(edit.to);
  }
  if (appended.length > 0) next = `${next.replace(/\n*$/, '')}\n${appended.join('\n')}`;
  return `---\n${next.replace(/\n*$/, '')}\n---\n`;
}
