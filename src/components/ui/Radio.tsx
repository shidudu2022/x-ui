import { useId, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label?: ReactNode
}

export function Radio({ label, className, id, disabled, ...rest }: RadioProps) {
  const autoId = useId()
  const inputId = id ?? autoId

  return (
    <label className={cn('ui-radio', disabled && 'disabled', className)} htmlFor={inputId}>
      <input id={inputId} type="radio" className="ui-native-hidden" disabled={disabled} {...rest} />
      <span className="ui-radio-dot" aria-hidden />
      {label ? <span>{label}</span> : null}
    </label>
  )
}

export function RadioGroup({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('ui-radio-group', className)} role="radiogroup">{children}</div>
}
