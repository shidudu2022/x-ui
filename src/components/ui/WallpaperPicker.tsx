import { cn } from '@/lib/cn'
import { useAppearance } from '@/theme/AppearanceProvider'
import { WALLPAPERS, type WallpaperId } from '@/theme/wallpapers'
import { useT } from '@/i18n'

export function WallpaperPicker({
  value,
  onChange,
  className,
}: {
  value?: WallpaperId
  onChange?: (wallpaper: WallpaperId) => void
  className?: string
}) {
  const t = useT()
  const appearance = useAppearance()
  const current = value ?? appearance.wallpaper
  const setWallpaper = onChange ?? appearance.setWallpaper
  const previewMode = appearance.mode

  return (
    <div className={cn('wallpaper-picker', className)} role="listbox" aria-label={t('wallpaperPicker.aria')}>
      {WALLPAPERS.map((w) => {
        const preview = previewMode === 'dark' ? w.dark : w.light
        return (
          <button
            key={w.id}
            type="button"
            role="option"
            aria-selected={current === w.id}
            className={cn('wallpaper-card', current === w.id && 'active')}
            onClick={() => setWallpaper(w.id)}
          >
            <span
              className={cn(
                'wallpaper-card-preview',
                !preview && 'wallpaper-card-preview-plain',
                !preview && previewMode === 'dark' && 'wallpaper-card-preview-plain-dark',
              )}
              style={preview ? { backgroundImage: `url("${preview}")` } : undefined}
              aria-hidden
            />
            <span className="wallpaper-card-copy">
              <strong className="wallpaper-card-label">{t(`wallpaper.${w.id}.label`)}</strong>
              <span className="wallpaper-card-desc">{t(`wallpaper.${w.id}.description`)}</span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
