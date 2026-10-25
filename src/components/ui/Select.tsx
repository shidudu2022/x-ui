import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Input } from './Field'

export type SelectOption = {
  value: string
  label: ReactNode
  disabled?: boolean
  /** Plain text used for filter / native option */
  searchText?: string
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
  /** Show filter input when option count exceeds threshold (default 8) */
  searchable?: boolean
  searchThreshold?: number
  /**
   * On coarse pointers / narrow viewports with many options, fall back to native `<select>`.
   * Default true when options.length > 12.
   */
  nativeOnMobile?: boolean
}

function optionText(opt: SelectOption) {
  if (opt.searchText) return opt.searchText
  if (typeof opt.label === 'string' || typeof opt.label === 'number') return String(opt.label)
  return opt.value
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
  searchable,
  searchThreshold = 8,
  nativeOnMobile,
}: SelectProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [uncontrolled, setUncontrolled] = useState(defaultValue ?? '')
  const [uncontrolledMulti, setUncontrolledMulti] = useState<string[]>(values ?? [])
  const [useNative, setUseNative] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const listId = useId()

  const selected = value ?? uncontrolled
  const selectedMulti = values ?? uncontrolledMulti
  const enableSearch = searchable ?? options.length >= searchThreshold
  const preferNative = nativeOnMobile ?? options.length > 12

  useEffect(() => {
    if (!preferNative || multiple) return
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const narrow = window.matchMedia('(max-width: 960px)').matches
    setUseNative(coarse || narrow)
  }, [preferNative, multiple])

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  useEffect(() => {
    if (!open) setQuery('')
  }, [open])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return options
    return options.filter((o) => optionText(o).toLowerCase().includes(q))
  }, [options, query])

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

  if (useNative && !multiple) {
    return (
      <select
        className={cn(
          'ui-select-native',
          size === 'sm' && 'ui-select-native-sm',
          block && 'ui-select-block',
          invalid && 'is-invalid',
          className,
        )}
        value={selected}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        onChange={(e) => {
          if (value === undefined) setUncontrolled(e.target.value)
          onChange?.(e.target.value)
        }}
      >
        {!selected ? <option value="">{placeholder}</option> : null}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {optionText(opt)}
          </option>
        ))}
      </select>
    )
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
        <div className="ui-select-menu placement-bottom" id={listId} role="listbox">
          {enableSearch ? (
            <div className="ui-select-search" onMouseDown={(e) => e.preventDefault()}>
              <Search size={14} aria-hidden />
              <Input
                size="sm"
                value={query}
                placeholder="筛选…"
                aria-label="筛选选项"
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          ) : null}
          {filtered.length === 0 ? (
            <div className="ui-select-empty muted">无匹配项</div>
          ) : (
            filtered.map((opt) => {
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
            })
          )}
        </div>
      ) : null}
    </div>
  )
}
