import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { en } from './en'
import { zh } from './zh'
import type { Locale, LocaleMessages, MessageDict } from './types'

const LOCALES: Record<Locale, LocaleMessages> = { en, zh }

const STORAGE_KEY = 'x-ui-locale'

type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  messages: MessageDict
  weekdays: LocaleMessages['weekdays']
  accents: LocaleMessages['accents']
  /** Translate a message key. Missing keys fall back to English, then the key. */
  t: (key: string, params?: Record<string, string | number>) => string
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

function format(template: string, params?: Record<string, string | number>) {
  if (!params) return template
  return template.replace(/\{(\w+)\}/g, (_, k: string) =>
    params[k] !== undefined && params[k] !== null ? String(params[k]) : `{${k}}`,
  )
}

function readStoredLocale(fallback: Locale): Locale {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === 'en' || v === 'zh') return v
  } catch {
    /* ignore */
  }
  return fallback
}

export function LocaleProvider({
  locale: localeProp,
  defaultLocale = 'en',
  children,
}: {
  /** Controlled locale. When set, storage is not written. */
  locale?: Locale
  defaultLocale?: Locale
  children: ReactNode
}) {
  const controlled = localeProp !== undefined
  const [inner, setInner] = useState<Locale>(() =>
    controlled ? localeProp : readStoredLocale(defaultLocale),
  )

  useEffect(() => {
    if (controlled) setInner(localeProp)
  }, [controlled, localeProp])

  const locale = controlled ? localeProp : inner

  const setLocale = useCallback(
    (next: Locale) => {
      if (!controlled) {
        setInner(next)
        try {
          localStorage.setItem(STORAGE_KEY, next)
        } catch {
          /* ignore */
        }
      }
    },
    [controlled],
  )

  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
  }, [locale])

  const pack = LOCALES[locale] ?? en

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) => {
      const raw = pack.messages[key] ?? en.messages[key] ?? key
      return format(raw, params)
    },
    [pack],
  )

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      messages: pack.messages,
      weekdays: pack.weekdays,
      accents: pack.accents,
      t,
    }),
    [locale, setLocale, pack, t],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

const fallbackT = (key: string, params?: Record<string, string | number>) =>
  format(en.messages[key] ?? key, params)

/** Safe outside provider — falls back to English. */
export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext)
  if (ctx) return ctx
  return {
    locale: 'en',
    setLocale: () => undefined,
    messages: en.messages,
    weekdays: en.weekdays,
    accents: en.accents,
    t: fallbackT,
  }
}

export function useT() {
  return useLocale().t
}
