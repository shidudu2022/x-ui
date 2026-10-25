import { useId, type InputHTMLAttributes, type ReactNode } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/cn'

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label?: ReactNode
}

export function Checkbox({ label, className, id, disabled, ...rest }: CheckboxProps) {
  const autoId = useId()
  const inputId = id ?? autoId

  return (
    <label className={cn('ui-check', disabled && 'disabled', className)} htmlFor={inputId}>
      <input id={inputId} type="checkbox" className="ui-native-hidden" disabled={disabled} {...rest} />
      <span className="ui-check-box" aria-hidden>
        <Check size={12} strokeWidth={3} />
      </span>
      {label ? <span>{label}</span> : null}
    </label>
  )
}
