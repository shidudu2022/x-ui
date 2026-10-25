import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Text } from './Text'

export type CalloutVariant = 'mirror' | 'firewall' | 'info'

/** Info callout boxes — `.mirror-box` / `.firewall-box` */
export function Callout({
  title,
  children,
  variant = 'mirror',
  className,
}: {
  title?: ReactNode
  children?: ReactNode
  variant?: CalloutVariant
  className?: string
}) {
  const box =
    variant === 'firewall' ? 'firewall-box' : variant === 'info' ? 'mirror-box' : 'mirror-box'

  return (
    <div className={cn(box, className)}>
      {title ? <Text as="strong" variant="strong">{title}</Text> : null}
      {children}
    </div>
  )
}
