import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/cn'
import type { SelectOption } from './Select'
import { useT } from '@/i18n'

export function Combobox({
  options,
  value,
  onChange,
  placeholder,
  disabled,
  invalid,
  className,
  emptyText,
}: {
  options: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  className?: string
  emptyText?: string
}) {
  const t = useT()
  const resolvedPlaceholder = placeholder ?? t('combobox.placeholder')
  const resolvedEmptyText = emptyText ?? t('combobox.empty')
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const rootRef = useRef<HTMLDivElement>(null)
  const listId = useId()

  const selectedLabel = options.find((o) => o.value === value)?.label

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return options
    return options.filter((o) => String(o.label).toLowerCase().includes(q) || o.value.toLowerCase().includes(q))
  }, [options, query])

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  return (
    <div className={cn('combobox', open && 'open', invalid && 'is-invalid', className)} ref={rootRef}>
      <div className="combobox-trigger">
        <input
          value={open ? query : String(selectedLabel ?? '')}
          disabled={disabled}
          placeholder={resolvedPlaceholder}
          aria-expanded={open}
          aria-controls={listId}
          aria-invalid={invalid || undefined}
          aria-autocomplete="list"
          role="combobox"
          onFocus={() => {
            setOpen(true)
            setQuery('')
          }}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
        />
        <button
          type="button"
          className="combobox-caret"
          tabIndex={-1}
          disabled={disabled}
          aria-label={t('common.expand')}
          onClick={() => setOpen((v) => !v)}
        >
          <ChevronsUpDown size={16} />
        </button>
      </div>
      {open ? (
        <div className="combobox-menu" id={listId} role="listbox">
          {filtered.length === 0 ? (
            <div className="combobox-empty muted">{resolvedEmptyText}</div>
          ) : (
            filtered.map((opt) => (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={value === opt.value}
                className={cn('combobox-option', value === opt.value && 'active')}
                disabled={opt.disabled}
                onClick={() => {
                  onChange?.(opt.value)
                  setOpen(false)
                  setQuery('')
                }}
              >
                {opt.label}
              </button>
            ))
          )}
        </div>
      ) : null}
    </div>
  )
}
