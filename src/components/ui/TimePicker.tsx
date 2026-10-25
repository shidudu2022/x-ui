import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Clock } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Button } from './Button'

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function parseTime(v?: string): { hour: number; minute: number } {
  if (!v) return { hour: 0, minute: 0 }
  const [h, m] = v.split(':').map(Number)
  return {
    hour: Number.isFinite(h) ? Math.min(23, Math.max(0, h!)) : 0,
    minute: Number.isFinite(m) ? Math.min(59, Math.max(0, m!)) : 0,
  }
}

const WHEEL_ITEM = 32

function Wheel({
  value,
  options,
  onChange,
  label,
}: {
  value: number
  options: number[]
  onChange: (v: number) => void
  label: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const index = Math.max(0, options.indexOf(value))

  useEffect(() => {
    ref.current?.scrollTo({ top: index * WHEEL_ITEM })
  }, [index])

  return (
    <div className="time-wheel-col" role="listbox" aria-label={label} tabIndex={0}>
      <div className="time-wheel-highlight" aria-hidden />
      <div ref={ref} className="time-wheel-scroller" style={{ '--time-wheel-item': `${WHEEL_ITEM}px` } as CSSProperties}>
        <div className="time-wheel-spacer" aria-hidden />
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            role="option"
            aria-selected={opt === value}
            className={cn('time-wheel-item', opt === value && 'is-active')}
            tabIndex={-1}
            onClick={() => onChange(opt)}
          >
            {pad(opt)}
          </button>
        ))}
        <div className="time-wheel-spacer" aria-hidden />
      </div>
    </div>
  )
}

export function TimePicker({
  value,
  onChange,
  minuteStep = 1,
  placeholder = '选择时间',
  disabled,
  invalid,
  className,
}: {
  value?: string
  onChange?: (value: string) => void
  /** Minute increment, e.g. 5 / 15 */
  minuteStep?: number
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const parts = parseTime(value)
  const step = Math.max(1, Math.min(30, minuteStep))
  const minutes = Array.from({ length: Math.floor(60 / step) }, (_, i) => i * step)
  const hour = parts.hour
  const minute = minutes.includes(parts.minute)
    ? parts.minute
    : minutes.reduce((best, m) => (Math.abs(m - parts.minute) < Math.abs(best - parts.minute) ? m : best), 0)
  const display = value ? `${pad(hour)}:${pad(minute)}` : ''

  useEffect(() => {
    if (!open) return
    function onDoc(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  function commit(h: number, m: number) {
    onChange?.(`${pad(h)}:${pad(m)}`)
  }

  return (
    <div
      ref={rootRef}
      className={cn('date-field', open && 'open', invalid && 'is-invalid', disabled && 'is-disabled', className)}
    >
      <button
        type="button"
        className="date-field-trigger"
        disabled={disabled}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((v) => !v)}
      >
        <span className={cn('date-field-value', !display && 'is-placeholder')}>{display || placeholder}</span>
        <span className="date-field-icon" aria-hidden>
          <Clock size={16} strokeWidth={2} />
        </span>
      </button>
      {open ? (
        <div className="date-field-popover has-time" role="dialog" aria-label={placeholder}>
          <div className="date-time-panel" style={{ width: 140, borderLeft: 0 }}>
            <div className="time-wheels-body">
              <Wheel value={hour} options={Array.from({ length: 24 }, (_, i) => i)} onChange={(h) => commit(h, minute)} label="小时" />
              <span className="time-wheel-sep">:</span>
              <Wheel value={minute} options={minutes} onChange={(m) => commit(hour, m)} label="分钟" />
            </div>
            <Button size="sm" variant="primary" block onClick={() => setOpen(false)}>
              确定
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
