import {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown, Search } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Input } from './Field'
import { useT } from '@/i18n'

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

const MENU_GAP = 4
const MENU_MAX_H = 240

function optionText(opt: SelectOption) {
  if (opt.searchText) return opt.searchText
  if (typeof opt.label === 'string' || typeof opt.label === 'number') return String(opt.label)
  return opt.value
}

/** Position from trigger only; prefer below, flip above when short on space. */
function placeMenu(trigger: DOMRect, menuHeight: number): CSSProperties {
  const vw = window.innerWidth
  const vh = window.innerHeight
  const height = Math.min(MENU_MAX_H, Math.max(menuHeight, 0) || MENU_MAX_H)
  const spaceBelow = vh - trigger.bottom - 8
  const spaceAbove = trigger.top - 8
  const openUp = spaceBelow < height && spaceAbove > spaceBelow

  let left = trigger.left
  left = Math.min(Math.max(8, left), Math.max(8, vw - trigger.width - 8))

  const top = openUp
    ? Math.max(8, trigger.top - MENU_GAP - height)
    : trigger.bottom + MENU_GAP

  return {
    position: 'fixed',
    top,
    left,
    right: 'auto',
    bottom: 'auto',
    minWidth: trigger.width,
    maxHeight: MENU_MAX_H,
    zIndex: 200,
  }
}

export function Select({
  options,
  value,
  defaultValue,
  onChange,
  placeholder,
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
  const t = useT()
  const resolvedPlaceholder = placeholder ?? t('select.placeholder')
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [uncontrolled, setUncontrolled] = useState(defaultValue ?? '')
  const [uncontrolledMulti, setUncontrolledMulti] = useState<string[]>(values ?? [])
  const [useNative, setUseNative] = useState(false)
  const [menuStyle, setMenuStyle] = useState<CSSProperties | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const listId = useId()

  const selected = value ?? uncontrolled
  const selectedMulti = values ?? uncontrolledMulti
  const enableSearch = searchable ?? options.length >= searchThreshold
  const preferNative = nativeOnMobile ?? options.length > 12

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return options
    return options.filter((o) => optionText(o).toLowerCase().includes(q))
  }, [options, query])

  useEffect(() => {
    if (!preferNative || multiple) return
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const narrow = window.matchMedia('(max-width: 960px)').matches
    setUseNative(coarse || narrow)
  }, [preferNative, multiple])

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      const t = e.target as Node
      if (rootRef.current?.contains(t) || menuRef.current?.contains(t)) return
      setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  useEffect(() => {
    if (!open) setQuery('')
  }, [open])

  function updateMenuPos() {
    const trigger = rootRef.current?.querySelector('.ui-select-trigger')
    const menu = menuRef.current
    if (!trigger || !menu) return
    setMenuStyle(placeMenu(trigger.getBoundingClientRect(), menu.getBoundingClientRect().height))
  }

  useLayoutEffect(() => {
    if (!open) {
      setMenuStyle(null)
      return
    }
    // First pass with estimated height, then refine after paint.
    const trigger = rootRef.current?.querySelector('.ui-select-trigger')
    if (trigger) {
      setMenuStyle(placeMenu(trigger.getBoundingClientRect(), MENU_MAX_H))
    }
    requestAnimationFrame(() => updateMenuPos())
  }, [open, query, filtered.length])

  useEffect(() => {
    if (!open) return
    function onScrollOrResize() {
      updateMenuPos()
    }
    window.addEventListener('scroll', onScrollOrResize, true)
    window.addEventListener('resize', onScrollOrResize)
    return () => {
      window.removeEventListener('scroll', onScrollOrResize, true)
      window.removeEventListener('resize', onScrollOrResize)
    }
  }, [open])

  const display = multiple
    ? selectedMulti.length
      ? options
          .filter((o) => selectedMulti.includes(o.value))
          .map((o) => o.label)
          .join(', ')
      : resolvedPlaceholder
    : options.find((o) => o.value === selected)?.label ?? resolvedPlaceholder

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
        {!selected ? <option value="">{resolvedPlaceholder}</option> : null}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {optionText(opt)}
          </option>
        ))}
      </select>
    )
  }

  const menu = open ? (
    <div
      ref={menuRef}
      className={cn('ui-select-menu', 'ui-select-menu-portal', size === 'sm' && 'ui-select-sm')}
      id={listId}
      role="listbox"
      style={menuStyle ?? { position: 'fixed', top: 0, left: 0, visibility: 'hidden' }}
    >
      {enableSearch ? (
        <div className="ui-select-search" onMouseDown={(e) => e.preventDefault()}>
          <Search size={14} aria-hidden />
          <Input
            size="sm"
            value={query}
            placeholder={t('select.filter')}
            aria-label={t('select.filterAria')}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      ) : null}
      {filtered.length === 0 ? (
        <div className="ui-select-empty muted">{t('select.empty')}</div>
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
  ) : null

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
      {menu ? createPortal(menu, document.body) : null}
    </div>
  )
}
