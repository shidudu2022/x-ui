import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function FilterBar({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={cn('list-filter-bar', className)}>{children}</div>
}
