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
    label: '无壁纸',
    description: '纯色底，不加背景图',
    light: null,
    dark: null,
  },
  {
    id: 'aurora',
    label: '极光',
    description: '蓝紫粉抽象，层次清晰',
    light: auroraLight,
    dark: auroraDark,
  },
  {
    id: 'ocean',
    label: '海洋',
    description: '青蓝海面，干净利落',
    light: oceanLight,
    dark: oceanDark,
  },
  {
    id: 'dusk',
    label: '暮色',
    description: '桃粉薰衣草，偏柔和',
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
