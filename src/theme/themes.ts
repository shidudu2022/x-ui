/** Visual theme packs — orthogonal to light/dark mode and accent color */

export const THEMES = [
  {
    id: 'classic',
    label: '经典',
    description: '清晰实色表面，适合日常控制台',
  },
  {
    id: 'glass',
    label: '透明',
    description: '表面透明，可配壁纸',
  },
] as const

export type ThemeId = (typeof THEMES)[number]['id']

export const THEME_IDS: readonly ThemeId[] = THEMES.map((t) => t.id)

export function getTheme(id: ThemeId) {
  return THEMES.find((t) => t.id === id) ?? THEMES[0]
}
