import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type BadgeTone = 'success' | 'warn' | 'danger' | 'info' | 'neutral'
export type BadgeSize = 'sm' | 'md'

export function Badge({
  tone = 'neutral',
  bordered = true,
  size = 'md',
  className,
  children,
}: {
  tone?: BadgeTone
  /** Soft outline around the fill. Pass `false` for fill-only. Default `true`. */
  bordered?: boolean
  size?: BadgeSize
  className?: string
  children: ReactNode
}) {
  return (
    <span
      className={cn(
        'badge',
        `badge-${tone}`,
        size === 'sm' ? 'badge-sm' : null,
        bordered ? 'badge-bordered' : 'badge-plain',
        className,
      )}
    >
      {children}
    </span>
  )
}
