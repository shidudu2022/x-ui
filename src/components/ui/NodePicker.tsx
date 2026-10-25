import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type NodeOption = {
  id: string
  title: ReactNode
  meta?: ReactNode
  selected?: boolean
  disabled?: boolean
}

export function NodePicker({
  options,
  value,
  onChange,
  className,
}: {
  options: NodeOption[]
  value?: string
  onChange?: (id: string) => void
  className?: string
}) {
  return (
    <div className={cn('node-pick', className)} role="listbox">
      {options.map((opt) => {
        const active = value === opt.id || opt.selected
        return (
          <button
            key={opt.id}
            type="button"
            role="option"
            aria-selected={active}
            disabled={opt.disabled}
            className={cn('node-option', active && 'active')}
            onClick={() => onChange?.(opt.id)}
          >
            <strong>{opt.title}</strong>
            {opt.meta ? <span className="node-meta">{opt.meta}</span> : null}
          </button>
        )
      })}
    </div>
  )
}
