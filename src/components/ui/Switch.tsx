import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label?: ReactNode
}

export function Switch({ label, className, id, ...rest }: SwitchProps) {
  return (
    <label className={cn('ui-switch', className)} htmlFor={id}>
      <input id={id} type="checkbox" role="switch" {...rest} />
      <span className="ui-switch-track">
        <span className="ui-switch-thumb" />
      </span>
      {label ? <span className="ui-switch-label">{label}</span> : null}
    </label>
  )
}
