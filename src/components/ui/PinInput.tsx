import {
  useEffect,
  useId,
  useRef,
  type ClipboardEvent,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { cn } from '@/lib/cn'
import { useT } from '@/i18n'

export type PinInputProps = {
  length?: number
  value?: string
  onChange?: (value: string) => void
  /** numeric = digits only; alphanumeric = letters + digits */
  inputMode?: 'numeric' | 'text'
  masked?: boolean
  disabled?: boolean
  invalid?: boolean
  autoFocus?: boolean
  id?: string
  'aria-label'?: string
  className?: string
  children?: ReactNode
}

function sanitize(raw: string, mode: 'numeric' | 'text', max: number) {
  const cleaned =
    mode === 'numeric' ? raw.replace(/\D/g, '') : raw.replace(/[^a-zA-Z0-9]/g, '')
  return cleaned.slice(0, max)
}

export function PinInput({
  length = 6,
  value = '',
  onChange,
  inputMode = 'numeric',
  masked = false,
  disabled,
  invalid,
  autoFocus,
  id,
  className,
  'aria-label': ariaLabel,
}: PinInputProps) {
  const t = useT()
  const resolvedAriaLabel = ariaLabel ?? t('pin.aria')
  const uid = useId()
  const rootId = id ?? uid
  const refs = useRef<Array<HTMLInputElement | null>>([])
  const chars = Array.from({ length }, (_, i) => value[i] ?? '')

  useEffect(() => {
    if (autoFocus) refs.current[0]?.focus()
  }, [autoFocus, length])

  function setAt(index: number, nextChar: string) {
    const next = chars.slice()
    next[index] = nextChar
    onChange?.(next.join('').slice(0, length))
  }

  function focusIndex(i: number) {
    const el = refs.current[Math.max(0, Math.min(length - 1, i))]
    el?.focus()
    el?.select()
  }

  function onPaste(e: ClipboardEvent<HTMLInputElement>, index: number) {
    e.preventDefault()
    const pasted = sanitize(e.clipboardData.getData('text'), inputMode, length - index)
    if (!pasted) return
    const next = chars.slice()
    for (let i = 0; i < pasted.length; i++) next[index + i] = pasted[i]!
    onChange?.(next.join('').slice(0, length))
    focusIndex(Math.min(length - 1, index + pasted.length))
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>, index: number) {
    if (e.key === 'Backspace') {
      e.preventDefault()
      if (chars[index]) {
        setAt(index, '')
      } else if (index > 0) {
        setAt(index - 1, '')
        focusIndex(index - 1)
      }
      return
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      focusIndex(index - 1)
      return
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      focusIndex(index + 1)
      return
    }
  }

  function onInput(index: number, raw: string) {
    const cleaned = sanitize(raw, inputMode, 1)
    if (!cleaned) {
      setAt(index, '')
      return
    }
    setAt(index, cleaned)
    if (index < length - 1) focusIndex(index + 1)
  }

  return (
    <div
      className={cn('pin-input', invalid && 'is-invalid', disabled && 'is-disabled', className)}
      role="group"
      aria-label={resolvedAriaLabel}
    >
      {chars.map((ch, i) => (
        <div key={`${rootId}-${i}`} className="pin-input-slot">
          <input
            ref={(el) => {
              refs.current[i] = el
            }}
            id={i === 0 ? rootId : `${rootId}-${i}`}
            className="pin-input-cell"
            type={masked ? 'password' : 'text'}
            inputMode={inputMode === 'numeric' ? 'numeric' : 'text'}
            autoComplete={i === 0 ? 'one-time-code' : 'off'}
            maxLength={1}
            value={ch}
            disabled={disabled}
            aria-invalid={invalid || undefined}
            aria-label={t('pin.digit', { label: resolvedAriaLabel, n: i + 1 })}
            onChange={(e) => onInput(i, e.target.value)}
            onKeyDown={(e) => onKeyDown(e, i)}
            onPaste={(e) => onPaste(e, i)}
            onFocus={(e) => e.target.select()}
          />
        </div>
      ))}
    </div>
  )
}
