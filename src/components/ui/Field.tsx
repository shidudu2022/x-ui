import {
  Children,
  cloneElement,
  isValidElement,
  useId,
  type InputHTMLAttributes,
  type ReactElement,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react'
import { cn } from '@/lib/cn'

export type ControlSize = 'sm' | 'md' | 'lg'

type FieldProps = {
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  htmlFor?: string
  required?: boolean
  className?: string
  children: ReactNode
}

export function Field({ label, hint, error, htmlFor, required, className, children }: FieldProps) {
  const uid = useId()
  const hintId = hint || error ? `${uid}-desc` : undefined
  const controlId = htmlFor ?? (typeof label === 'string' ? undefined : undefined)

  const describedBy = hintId
  const enhanced = Children.map(children, (child) => {
    if (!isValidElement(child)) return child
    const el = child as ReactElement<{ id?: string; 'aria-describedby'?: string; 'aria-invalid'?: boolean; 'aria-required'?: boolean }>
    const extraDescribed = [el.props['aria-describedby'], describedBy].filter(Boolean).join(' ') || undefined
    return cloneElement(el, {
      id: el.props.id ?? htmlFor,
      'aria-describedby': extraDescribed,
      'aria-invalid': error ? true : el.props['aria-invalid'],
      'aria-required': required || el.props['aria-required'],
    })
  })

  return (
    <div className={cn('field', className)}>
      {label ? (
        <label htmlFor={htmlFor ?? controlId}>
          {label}
          {required ? (
            <span className="field-required" aria-hidden>
              *
            </span>
          ) : null}
        </label>
      ) : null}
      {enhanced}
      {error ? (
        <p className="field-error" id={hintId} role="alert">
          {error}
        </p>
      ) : hint ? (
        <span className="hint" id={hintId}>
          {hint}
        </span>
      ) : null}
    </div>
  )
}

type ControlProps = {
  invalid?: boolean
  size?: ControlSize
}

export function Input({
  invalid,
  size = 'md',
  className,
  ...rest
}: Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & ControlProps) {
  return (
    <input
      className={cn(
        'ui-input',
        size === 'sm' && 'ui-input-sm',
        size === 'lg' && 'ui-input-lg',
        invalid && 'is-invalid',
        className,
      )}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  )
}

export function Textarea({
  invalid,
  size = 'md',
  className,
  ...rest
}: TextareaHTMLAttributes<HTMLTextAreaElement> & ControlProps) {
  return (
    <textarea
      className={cn(
        'ui-textarea',
        size === 'sm' && 'ui-input-sm',
        size === 'lg' && 'ui-input-lg',
        invalid && 'is-invalid',
        className,
      )}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  )
}

export function NativeSelect({
  invalid,
  size = 'md',
  className,
  children,
  ...rest
}: Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> & ControlProps & { children: ReactNode }) {
  return (
    <select
      className={cn(
        'ui-input',
        size === 'sm' && 'ui-input-sm',
        size === 'lg' && 'ui-input-lg',
        invalid && 'is-invalid',
        className,
      )}
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
  size = 'md',
}: {
  prefix?: ReactNode
  suffix?: ReactNode
  children: ReactNode
  className?: string
  size?: ControlSize
}) {
  return (
    <div className={cn('input-group', size === 'sm' && 'input-group-sm', size === 'lg' && 'input-group-lg', className)}>
      {prefix ? <span className="input-group-affix">{prefix}</span> : null}
      {children}
      {suffix ? <span className="input-group-affix">{suffix}</span> : null}
    </div>
  )
}
