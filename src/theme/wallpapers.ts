import auroraLight from '@/assets/glass-wallpaper.svg'
import auroraDark from '@/assets/glass-wallpaper-dark.svg'
import oceanLight from '@/assets/glass-wallpaper-ocean.svg'
import oceanDark from '@/assets/glass-wallpaper-ocean-dark.svg'
import duskLight from '@/assets/glass-wallpaper-dusk.svg'
import duskDark from '@/assets/glass-wallpaper-dusk-dark.svg'
import type { ColorMode } from './accents'

/** Glass-theme wallpapers — only applied when `data-theme=glass` */
export const WALLPAPERS = [
  {
    id: 'none',
    /** @deprecated Prefer i18n keys wallpaper.none.* via WallpaperPicker */
    label: 'None',
    description: 'Solid color, no background image',
    light: null,
    dark: null,
  },
  {
    id: 'aurora',
    label: 'Aurora',
    description: 'Blue–violet–pink abstract layers',
    light: auroraLight,
    dark: auroraDark,
  },
  {
    id: 'ocean',
    label: 'Ocean',
    description: 'Teal sea surface, clean and sharp',
    light: oceanLight,
    dark: oceanDark,
  },
  {
    id: 'dusk',
    label: 'Dusk',
    description: 'Peach and lavender, softer feel',
    light: duskLight,
    dark: duskDark,
  },
] as const

export type WallpaperId = (typeof WALLPAPERS)[number]['id']

export const WALLPAPER_IDS: readonly WallpaperId[] = WALLPAPERS.map((w) => w.id)

export function getWallpaper(id: WallpaperId) {
  return WALLPAPERS.find((w) => w.id === id) ?? WALLPAPERS[0]
}

/** Returns null when wallpaper is plain (no image). */
export function wallpaperUrl(id: WallpaperId, mode: ColorMode): string | null {
  const w = getWallpaper(id)
  const url = mode === 'dark' ? w.dark : w.light
  return url
}
