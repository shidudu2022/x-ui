import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Heading } from './Heading'

/** Title row with optional badge — matches `.step-heading` in design */
export function StepHeading({
  title,
  aside,
  className,
}: {
  title: ReactNode
  aside?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('step-heading', className)}>
      <Heading level="sub" as="h3">
        {title}
      </Heading>
      {aside}
    </div>
  )
}
