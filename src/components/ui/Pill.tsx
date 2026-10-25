import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function Pill({
  children,
  action,
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  action?: boolean
}) {
  if (action || rest.onClick) {
    return (
      <button type="button" className={cn('pill', 'pill-action', className)} {...rest}>
        <span className="pill-dot" /> {children}
      </button>
    )
  }
  return (
    <span className={cn('pill', className)}>
      <span className="pill-dot" /> {children}
    </span>
  )
}
