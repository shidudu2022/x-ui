import { useId } from 'react'
import { Field } from './Field'
import { ColorInput } from './ColorInput'

/**
 * Labeled color control — Field + ColorInput (swatch / HSV / presets / hex).
 * Prefer this in forms; use ColorInput alone when embedding without a label.
 */
export function ColorField({
  label,
  value,
  onChange,
  hint,
  error,
  required,
  disabled,
  invalid,
  presets,
  className,
  htmlFor,
}: {
  label: string
  value?: string
  onChange?: (hex: string) => void
  hint?: string
  error?: string
  required?: boolean
  disabled?: boolean
  invalid?: boolean
  presets?: string[]
  className?: string
  htmlFor?: string
}) {
  const autoId = useId()
  const id = htmlFor ?? autoId
  return (
    <Field
      label={label}
      htmlFor={id}
      hint={hint}
      error={error}
      required={required}
      className={className}
    >
      <ColorInput
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        invalid={invalid || Boolean(error)}
        presets={presets}
      />
    </Field>
  )
}
