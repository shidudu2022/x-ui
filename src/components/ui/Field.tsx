import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type FieldProps = {
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  htmlFor?: string
  className?: string
  children: ReactNode
}

export function Field({ label, hint, error, htmlFor, className, children }: FieldProps) {
  return (
    <div className={cn('field', className)}>
      {label ? <label htmlFor={htmlFor}>{label}</label> : null}
      {children}
      {error ? <p className="field-error">{error}</p> : hint ? <span className="hint">{hint}</span> : null}
    </div>
  )
}

type ControlProps = {
  invalid?: boolean
}

export function Input({
  invalid,
  className,
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & ControlProps) {
  return (
    <input
      className={cn('ui-input', invalid && 'is-invalid', className)}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  )
}

export function Textarea({
  invalid,
  className,
  ...rest
}: TextareaHTMLAttributes<HTMLTextAreaElement> & ControlProps) {
  return (
    <textarea
      className={cn('ui-textarea', invalid && 'is-invalid', className)}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  )
}

export function NativeSelect({
  invalid,
  className,
  children,
  ...rest
}: SelectHTMLAttributes<HTMLSelectElement> & ControlProps & { children: ReactNode }) {
  return (
    <select
      className={cn('ui-input', invalid && 'is-invalid', className)}
      aria-invalid={invalid || undefined}
      {...rest}
    >
      {children}
    </select>
  )
}

export function InputGroup({
  prefix,
  suffix,
  children,
  className,
}: {
  prefix?: ReactNode
  suffix?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('input-group', className)}>
      {prefix ? <span className="input-group-affix">{prefix}</span> : null}
      {children}
      {suffix ? <span className="input-group-affix">{suffix}</span> : null}
    </div>
  )
}
