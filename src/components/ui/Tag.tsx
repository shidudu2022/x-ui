import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type TagTone = 'neutral' | 'primary' | 'info' | 'success' | 'warn' | 'danger'

export function Tag({
  tone = 'neutral',
  className,
  children,
}: {
  tone?: TagTone
  className?: string
  children: ReactNode
}) {
  return <span className={cn('ui-tag', `ui-tag-${tone}`, className)}>{children}</span>
}

export function TagGroup({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('ui-tag-group', className)}>{children}</div>
}
