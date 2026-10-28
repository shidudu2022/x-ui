import type { CSSProperties } from 'react'
import { cn } from '@/lib/cn'
import { ACCENTS, ACCENT_COLORS, type Accent } from '@/theme/accents'
import { useAppearance } from '@/theme/AppearanceProvider'
import { useLocale } from '@/i18n'

export function AccentPicker({
  value,
  onChange,
  className,
}: {
  value?: Accent
  onChange?: (accent: Accent) => void
  className?: string
}) {
  const { accents, t } = useLocale()
  const appearance = useAppearance()
  const current = value ?? appearance.accent
  const setAccent = onChange ?? appearance.setAccent

  return (
    <div className={cn('accent-grid', className)} role="listbox" aria-label={t('accentPicker.aria')}>
      {ACCENTS.map((a) => (
        <button
          key={a}
          type="button"
          role="option"
          aria-selected={current === a}
          className={cn('accent-swatch', current === a && 'active')}
          title={accents[a]}
          onClick={() => setAccent(a)}
        >
          <span
            className="accent-dot"
            style={{ background: ACCENT_COLORS[a], '--sw': ACCENT_COLORS[a] } as CSSProperties}
          />
          <span className="accent-swatch-label">{accents[a]}</span>
        </button>
      ))}
    </div>
  )
}
