// every jsx component a page may use, shared by the site renderer, the editor menu and save validation
export const fumadocsComponentNames = [
  'Callout',
  'CalloutContainer',
  'CalloutTitle',
  'CalloutDescription',
  'Card',
  'Cards',
  'CodeBlockTab',
  'CodeBlockTabs',
  'CodeBlockTabsList',
  'CodeBlockTabsTrigger',
  'Accordion',
  'Accordions',
  'Step',
  'Steps',
  'Tab',
  'Tabs',
] as const;

export const siteComponentNames = [
  'AddressExplorerLink',
  'AEL',
  'ConstitutionHash',
  'Mermaid',
  'PendingConstitutionNotice',
  'TrackedLink',
] as const;

export const allowedComponentNames: ReadonlySet<string> = new Set([
  ...fumadocsComponentNames,
  ...siteComponentNames,
]);

export type SiteComponentName = (typeof siteComponentNames)[number];
