import { Children, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type TagTone = 'neutral' | 'primary' | 'info' | 'success' | 'warn' | 'danger'

function isBlankLabel(children: ReactNode): boolean {
  if (children == null || children === false) return true
  if (typeof children === 'string') return children.trim() === ''
  if (typeof children === 'number' || typeof children === 'bigint') return false
  if (Array.isArray(children)) {
    return children.length === 0 || children.every(isBlankLabel)
  }
  return false
}

export function Tag({
  tone = 'neutral',
  className,
  children,
}: {
  tone?: TagTone
  className?: string
  children: ReactNode
}) {
  if (isBlankLabel(children)) return null
  return <span className={cn('ui-tag', `ui-tag-${tone}`, className)}>{children}</span>
}
Tag.displayName = 'Tag'

export function TagGroup({ children, className }: { children: ReactNode; className?: string }) {
  const items = Children.toArray(children)
  if (items.length === 0) return null
  return <div className={cn('ui-tag-group', className)}>{items}</div>
}
TagGroup.displayName = 'TagGroup'
