import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/** Highlighted mirror / sync status card from design misc */
export function MirrorCard({
  title,
  children,
  className,
}: {
  title?: ReactNode
  children?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('mirror-box', className)}>
      {title ? <strong>{title}</strong> : null}
      {children}
    </div>
  )
}
