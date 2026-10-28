export type Locale = 'en' | 'zh'

/** Flat message dictionary. Arrays are joined only via dedicated helpers. */
export type MessageDict = Record<string, string>

export type LocaleMessages = {
  locale: Locale
  messages: MessageDict
  /** Sunday-first weekday short labels */
  weekdays: [string, string, string, string, string, string, string]
  /** Accent id → display name */
  accents: Record<string, string>
}
