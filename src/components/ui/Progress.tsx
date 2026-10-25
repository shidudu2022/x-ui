import { cn } from '@/lib/cn'

export function Progress({
  value,
  indeterminate,
  label,
  className,
}: {
  value?: number
  indeterminate?: boolean
  label?: string
  className?: string
}) {
  const pct = Math.max(0, Math.min(100, value ?? 0))
  return (
    <div className={className}>
      {label || value !== undefined ? (
        <div className="progress-label">
          <span>{label}</span>
          {!indeterminate && value !== undefined ? <span>{pct}%</span> : null}
        </div>
      ) : null}
      <div
        className={cn('progress', indeterminate && 'is-indeterminate')}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="progress-bar" style={indeterminate ? undefined : { width: `${pct}%` }} />
      </div>
    </div>
  )
}
