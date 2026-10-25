import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type CardProps = HTMLAttributes<HTMLDivElement> & {
  padded?: boolean
  children?: ReactNode
}

export function Card({ padded = false, className, children, ...rest }: CardProps) {
  return (
    <div className={cn('card', padded && 'card-pad', className)} {...rest}>
      {children}
    </div>
  )
}

export function StatusBar({
  left,
  right,
  className,
}: {
  left?: ReactNode
  right?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('status-bar', className)}>
      <div className="left">{left}</div>
      {right ? <div className="actions">{right}</div> : null}
    </div>
  )
}
