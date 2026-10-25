import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Card } from './Card'
import { Muted, Text } from './Text'

export function StatCard({
  label,
  value,
  hint,
  tone,
  action,
  className,
}: {
  label: ReactNode
  value: ReactNode
  hint?: ReactNode
  tone?: 'neutral' | 'success' | 'warn' | 'danger' | 'info'
  action?: ReactNode
  className?: string
}) {
  return (
    <Card padded className={cn('stat-card', tone && `tone-${tone}`, className)}>
      <div className="stat-card-head">
        <Muted as="div" className="stat-card-label">
          {label}
        </Muted>
        {action}
      </div>
      <Text as="div" variant="strong" className="stat-card-value">
        {value}
      </Text>
      {hint ? (
        <Muted as="div" className="stat-card-hint">
          {hint}
        </Muted>
      ) : null}
    </Card>
  )
}
