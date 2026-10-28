/** Visual theme packs — orthogonal to light/dark mode and accent color */

export const THEMES = [
  {
    id: 'classic',
    /** @deprecated Prefer i18n keys theme.classic.* via ThemePicker */
    label: 'Classic',
    description: 'Solid surfaces for everyday consoles',
  },
  {
    id: 'glass',
    label: 'Glass',
    description: 'Transparent surfaces; pairs with wallpapers',
  },
] as const

export type ThemeId = (typeof THEMES)[number]['id']

export const THEME_IDS: readonly ThemeId[] = THEMES.map((t) => t.id)

export function getTheme(id: ThemeId) {
  return THEMES.find((t) => t.id === id) ?? THEMES[0]
}
