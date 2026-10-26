export const ACCENTS = [
  'teal',
  'blue',
  'violet',
  'rose',
  'green',
  'amber',
  'slate',
] as const

export type Accent = (typeof ACCENTS)[number]

/** User preference: follow OS, or force light/dark */
export type ColorModePreference = 'system' | 'light' | 'dark'

/** Resolved theme applied to `body[data-mode]` */
export type ColorMode = 'light' | 'dark'

export type Density = 'comfortable' | 'compact'

/** Preview swatches — fixed per accent (not `var(--primary)`, which is always the active one) */
export const ACCENT_COLORS: Record<Accent, string> = {
  teal: '#0f766e',
  blue: '#2563eb',
  violet: '#7c3aed',
  rose: '#e11d48',
  green: '#16a34a',
  amber: '#d97706',
  slate: '#52525b',
}

export const STORAGE_KEYS = {
  mode: 'xui-mode',
  accent: 'xui-accent',
  density: 'xui-density',
  theme: 'xui-theme',
  wallpaper: 'xui-wallpaper',
} as const

export function resolveColorMode(preference: ColorModePreference): ColorMode {
  if (preference === 'light' || preference === 'dark') return preference
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}
