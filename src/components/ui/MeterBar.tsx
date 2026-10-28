import { cn } from '@/lib/cn'
import { useT } from '@/i18n'

export type MeterBarTone = 'default' | 'success' | 'warn' | 'danger' | 'muted'

/**
 * Compact utilization bar (CPU / memory / quota).
 * Prefer over Progress when no percent label is needed inline.
 */
export function MeterBar({
  value,
  tone = 'default',
  className,
  'aria-label': ariaLabel,
}: {
  /** 0–100; null / non-finite → empty bar */
  value: number | null | undefined
  tone?: MeterBarTone
  className?: string
  'aria-label'?: string
}) {
  const t = useT()
  const resolvedAriaLabel = ariaLabel ?? t('meter.aria')
  const pct =
    value == null || !Number.isFinite(value)
      ? 0
      : Math.min(100, Math.max(0, value))

  return (
    <div
      className={cn('meter-bar', `tone-${tone}`, className)}
      role="progressbar"
      aria-label={resolvedAriaLabel}
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="meter-bar-fill" style={{ width: `${pct}%` }} />
    </div>
  )
}

/** Map utilization % → MeterBar tone (ops convention). */
export function meterToneFromPct(pct: number | null | undefined): MeterBarTone {
  if (pct == null || !Number.isFinite(pct)) return 'muted'
  if (pct >= 90) return 'danger'
  if (pct >= 75) return 'warn'
  return 'success'
}
