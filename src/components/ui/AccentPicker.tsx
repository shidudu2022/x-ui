import type { CSSProperties } from 'react'
import { cn } from '@/lib/cn'
import { ACCENTS, ACCENT_COLORS, type Accent } from '@/theme/accents'
import { useAppearance } from '@/theme/AppearanceProvider'

const LABELS: Record<Accent, string> = {
  teal: '青绿',
  blue: '蓝色',
  violet: '紫色',
  rose: '玫红',
  green: '绿色',
  amber: '琥珀',
  slate: '石板',
}

export function AccentPicker({
  value,
  onChange,
  className,
}: {
  value?: Accent
  onChange?: (accent: Accent) => void
  className?: string
}) {
  const appearance = useAppearance()
  const current = value ?? appearance.accent
  const setAccent = onChange ?? appearance.setAccent

  return (
    <div className={cn('accent-grid', className)} role="listbox" aria-label="强调色">
      {ACCENTS.map((a) => (
        <button
          key={a}
          type="button"
          role="option"
          aria-selected={current === a}
          className={cn('accent-swatch', current === a && 'active')}
          title={LABELS[a]}
          onClick={() => setAccent(a)}
        >
          <span
            className="accent-dot"
            style={{ background: ACCENT_COLORS[a], '--sw': ACCENT_COLORS[a] } as CSSProperties}
          />
          <span className="accent-swatch-label">{LABELS[a]}</span>
        </button>
      ))}
    </div>
  )
}
