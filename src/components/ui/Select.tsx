import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'

export type SelectOption = {
  value: string
  label: ReactNode
  disabled?: boolean
}

type SelectProps = {
  options: SelectOption[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  size?: 'md' | 'sm'
  block?: boolean
  className?: string
  multiple?: boolean
  values?: string[]
  onValuesChange?: (values: string[]) => void
}

export function Select({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = '请选择',
  disabled,
  invalid,
  size = 'md',
  block,
  className,
  multiple,
  values,
  onValuesChange,
}: SelectProps) {
  const [open, setOpen] = useState(false)
  const [uncontrolled, setUncontrolled] = useState(defaultValue ?? '')
  const [uncontrolledMulti, setUncontrolledMulti] = useState<string[]>(values ?? [])
  const rootRef = useRef<HTMLDivElement>(null)
  const listId = useId()

  const selected = value ?? uncontrolled
  const selectedMulti = values ?? uncontrolledMulti

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  const display = multiple
    ? selectedMulti.length
      ? options
          .filter((o) => selectedMulti.includes(o.value))
          .map((o) => o.label)
          .join(', ')
      : placeholder
    : options.find((o) => o.value === selected)?.label ?? placeholder

  function pick(next: string) {
    if (multiple) {
      const exists = selectedMulti.includes(next)
      const updated = exists ? selectedMulti.filter((v) => v !== next) : [...selectedMulti, next]
      if (values === undefined) setUncontrolledMulti(updated)
      onValuesChange?.(updated)
      return
    }
    if (value === undefined) setUncontrolled(next)
    onChange?.(next)
    setOpen(false)
  }

  return (
    <div
      className={cn(
        'ui-select',
        block && 'ui-select-block',
        size === 'sm' && 'ui-select-sm',
        open && 'open',
        invalid && 'is-invalid',
        className,
      )}
      ref={rootRef}
    >
      <button
        type="button"
        className="ui-select-trigger"
        disabled={disabled}
        aria-expanded={open}
        aria-controls={listId}
        aria-invalid={invalid || undefined}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="ui-select-value">{display}</span>
        <span className="ui-select-caret" aria-hidden>
          <ChevronDown size={16} />
        </span>
      </button>
      {open ? (
        <div className="ui-select-menu" id={listId} role="listbox">
          {options.map((opt) => {
            const active = multiple ? selectedMulti.includes(opt.value) : selected === opt.value
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={active}
                className={cn('ui-select-option', active && 'active')}
                disabled={opt.disabled}
                onClick={() => pick(opt.value)}
              >
                {opt.label}
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
