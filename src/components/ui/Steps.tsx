import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type StepItem = {
  id: string
  label: ReactNode
}

export function Steps({
  items,
  current,
  className,
}: {
  items: StepItem[]
  current: number
  className?: string
}) {
  return (
    <div className={cn('steps', className)}>
      {items.map((item, index) => {
        const step = index + 1
        return (
          <div
            key={item.id}
            className={cn('step', step === current && 'active', step < current && 'done')}
            data-step={step}
          >
            {step}. {item.label}
          </div>
        )
      })}
    </div>
  )
}
