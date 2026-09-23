'use client';

import { detailFields, type DetailKey, type Details } from './frontmatter';

type PageDetailsProps = {
  details: Details;
  error?: string;
  disabled: boolean;
  onChange: (key: DetailKey, value: string) => void;
};

export function PageDetails({ details, error, disabled, onChange }: PageDetailsProps) {
  if (error) {
    return (
      <p className="rounded-sm border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-700 dark:text-red-400">
        The page details could not be read ({error}). Switch to the MDX view to fix them, or ask a
        maintainer for help.
      </p>
    );
  }

  return (
    <details open className="group rounded-sm border bg-fd-card">
      <summary className="cursor-pointer select-none px-4 py-2.5 text-sm font-medium">
        Page details
      </summary>
      <div className="grid gap-4 border-t p-4 sm:grid-cols-2">
        {detailFields.map((field) => {
          const id = `detail-${field.key}`;
          const wide = field.key === 'description' || field.key === 'title';
          return (
            <label key={field.key} htmlFor={id} className={wide ? 'sm:col-span-2' : undefined}>
              <span className="text-xs font-medium">
                {field.label}
                {field.required ? <span className="text-red-600"> *</span> : null}
              </span>
              {field.key === 'description' ? (
                <textarea
                  id={id}
                  rows={2}
                  disabled={disabled}
                  value={details[field.key]}
                  onChange={(event) => onChange(field.key, event.target.value.replace(/\n/g, ' '))}
                  className="mt-1 w-full rounded-sm border bg-fd-background px-2 py-1.5 text-sm"
                />
              ) : (
                <input
                  id={id}
                  disabled={disabled}
                  value={details[field.key]}
                  onChange={(event) => onChange(field.key, event.target.value)}
                  className="mt-1 w-full rounded-sm border bg-fd-background px-2 py-1.5 text-sm"
                />
              )}
              {field.hint ? (
                <span className="mt-1 block text-xs text-fd-muted-foreground">{field.hint}</span>
              ) : null}
            </label>
          );
        })}
      </div>
    </details>
  );
}
