import {
  useId,
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Spinner } from './Spinner'

type ControlSize = 'sm' | 'md' | 'lg'

export type SearchInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type' | 'prefix'
> & {
  size?: ControlSize
  invalid?: boolean
  /** Show clear (×) when value is non-empty. Default true. */
  allowClear?: boolean
  loading?: boolean
  onClear?: () => void
  /** Extra node after clear/loading (e.g. shortcut kbd) */
  suffix?: ReactNode
}

/**
 * Single-line search field with leading icon and optional clear.
 * Prefer this over composing Input + icon by hand.
 */
export function SearchInput({
  size = 'md',
  invalid,
  allowClear = true,
  loading = false,
  onClear,
  suffix,
  className,
  id,
  value,
  defaultValue,
  onChange,
  disabled,
  placeholder = '搜索…',
  'aria-label': ariaLabel,
  ...rest
}: SearchInputProps) {
  const uid = useId()
  const inputId = id ?? uid
  const raw = value ?? defaultValue ?? ''
  const text = typeof raw === 'string' || typeof raw === 'number' ? String(raw) : ''
  const showClear = allowClear && !disabled && !loading && text.length > 0

  function clear() {
    if (onClear) {
      onClear()
      return
    }
    if (onChange) {
      const event = {
        target: { value: '' },
        currentTarget: { value: '' },
      } as ChangeEvent<HTMLInputElement>
      onChange(event)
    }
  }

  return (
    <div
      className={cn(
        'search-input',
        size === 'sm' && 'search-input-sm',
        size === 'lg' && 'search-input-lg',
        invalid && 'is-invalid',
        disabled && 'is-disabled',
        className,
      )}
    >
      <span className="search-input-icon" aria-hidden>
        <Search size={size === 'sm' ? 14 : size === 'lg' ? 16 : 15} strokeWidth={2} />
      </span>
      <input
        {...rest}
        id={inputId}
        type="search"
        className={cn(
          'ui-input search-input-field',
          size === 'sm' && 'ui-input-sm',
          size === 'lg' && 'ui-input-lg',
          invalid && 'is-invalid',
        )}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        aria-label={ariaLabel ?? (typeof placeholder === 'string' ? placeholder : '搜索')}
        aria-invalid={invalid || undefined}
      />
      {loading ? (
        <span className="search-input-trailing" aria-hidden>
          <Spinner size="sm" />
        </span>
      ) : null}
      {showClear ? (
        <button
          type="button"
          className="search-input-clear"
          aria-label="清除"
          tabIndex={-1}
          onClick={clear}
        >
          <X size={14} strokeWidth={2} />
        </button>
      ) : null}
      {suffix && !loading && !showClear ? (
        <span className="search-input-suffix">{suffix}</span>
      ) : null}
    </div>
  )
}
