import { useCallback } from 'react'
import { useLocale } from '@/i18n'
import { DEMO_MESSAGES, type DemoMessageKey } from './messages'
import { pickL10n } from './types'

/**
 * Inline bilingual string helper for demo/docs page copy:
 * `t('English copy', '中文文案')`.
 */
export function useDemoT() {
  const { locale } = useLocale()
  return useCallback((en: string, zh: string) => (locale === 'zh' ? zh : en), [locale])
}

/** Resolve a reusable demo-chrome message key (see `./messages`). */
export function useDemoMessages() {
  const { locale } = useLocale()
  return useCallback(
    (key: DemoMessageKey, params?: Record<string, string>) => {
      let out = pickL10n(locale, DEMO_MESSAGES[key])
      if (params) {
        for (const [k, v] of Object.entries(params)) out = out.replace(`{${k}}`, v)
      }
      return out
    },
    [locale],
  )
}
