import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Heading } from './Heading'
import { Text } from './Text'

export function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: ReactNode
  description?: ReactNode
  action?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('empty', className)}>
      <Heading level="card" as="strong">
        {title}
      </Heading>
      {description ? (
        <Text as="p" variant="muted" size="md">
          {description}
        </Text>
      ) : null}
      {action}
    </div>
  )
}
