import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * Optional helper for nested / custom cell content.
 * DataTable cells already truncate via CSS (`max-width` + `nowrap` + ellipsis).
 */
export function CellEllipsis({
  children,
  title,
  className,
  ...rest
}: HTMLAttributes<HTMLSpanElement> & {
  children?: ReactNode
  title?: string
}) {
  return (
    <span className={cn('cell-ellipsis', className)} title={title} {...rest}>
      {children}
    </span>
  )
}

/** Name + secondary line; each child is ellipsized by `.cell-stack > *` CSS. */
export function CellStack({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { children?: ReactNode }) {
  return (
    <div className={cn('cell-stack', className)} {...rest}>
      {children}
    </div>
  )
}
