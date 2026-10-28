import { cn } from '@/lib/cn'
import { THEMES, type ThemeId } from '@/theme/themes'
import { useAppearance } from '@/theme/AppearanceProvider'
import { useT } from '@/i18n'

export function ThemePicker({
  value,
  onChange,
  className,
}: {
  value?: ThemeId
  onChange?: (theme: ThemeId) => void
  className?: string
}) {
  const tr = useT()
  const appearance = useAppearance()
  const current = value ?? appearance.theme
  const setTheme = onChange ?? appearance.setTheme

  return (
    <div className={cn('theme-picker', className)} role="listbox" aria-label={tr('themePicker.aria')}>
      {THEMES.map((t) => (
        <button
          key={t.id}
          type="button"
          role="option"
          aria-selected={current === t.id}
          className={cn('theme-card', `theme-card-${t.id}`, current === t.id && 'active')}
          onClick={() => setTheme(t.id)}
        >
          <span className="theme-card-preview" aria-hidden />
          <span className="theme-card-copy">
            <strong className="theme-card-label">{tr(`theme.${t.id}.label`)}</strong>
            <span className="theme-card-desc">{tr(`theme.${t.id}.description`)}</span>
          </span>
        </button>
      ))}
    </div>
  )
}
