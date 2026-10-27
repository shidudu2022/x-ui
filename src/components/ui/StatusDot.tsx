import { cn } from '@/lib/cn'

export type StatusDotTone = 'ok' | 'bad' | 'warn' | 'neutral' | 'info'

/**
 * Compact health / status indicator (ops dashboards, service rows).
 * Prefer `tone`; `ok` boolean maps to ok/bad for simple pass/fail.
 */
export function StatusDot({
  tone,
  ok,
  label,
  className,
}: {
  tone?: StatusDotTone
  /** Convenience: true → ok, false → bad (ignored when `tone` set) */
  ok?: boolean
  /** Accessible name; defaults from tone */
  label?: string
  className?: string
}) {
  const resolved: StatusDotTone =
    tone ?? (ok === undefined ? 'neutral' : ok ? 'ok' : 'bad')
  const aria =
    label ??
    ({
      ok: '正常',
      bad: '异常',
      warn: '警告',
      neutral: '未知',
      info: '信息',
    }[resolved] as string)

  return (
    <span
      className={cn('status-dot', `tone-${resolved}`, className)}
      role="img"
      aria-label={aria}
      title={aria}
    />
  )
}
