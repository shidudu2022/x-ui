import type { Locale } from '@/i18n'

/** Bilingual literal used throughout the demo/docs site content. */
export type L10n = { en: string; zh: string }

/** Resolve a bilingual value (or plain string) for the active locale. */
export function pickL10n(locale: Locale, v: L10n | string): string {
  if (typeof v === 'string') return v
  return v[locale] ?? v.en
}
