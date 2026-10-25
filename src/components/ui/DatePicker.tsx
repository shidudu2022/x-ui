import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from 'react'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Button } from './Button'

export type DatePickerMode = 'date' | 'datetime'

const WHEEL_ITEM = 32
const WHEEL_VISIBLE = 5
const WHEEL_PAD = Math.floor(WHEEL_VISIBLE / 2)

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function todayISO() {
  const d = new Date()
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

function splitValue(v?: string): { date: string; hour: number; minute: number } {
  if (!v) return { date: '', hour: 0, minute: 0 }
  const [datePart, timePart] = v.split('T')
  const date = datePart || ''
  if (!timePart) return { date, hour: 0, minute: 0 }
  const [h, m] = timePart.split(':').map((x) => Number(x))
  return {
    date,
    hour: Number.isFinite(h) ? Math.min(23, Math.max(0, h!)) : 0,
    minute: Number.isFinite(m) ? Math.min(59, Math.max(0, m!)) : 0,
  }
}

function joinValue(date: string, hour: number, minute: number, mode: DatePickerMode) {
  if (!date) return ''
  if (mode === 'date') return date
  return `${date}T${pad(hour)}:${pad(minute)}`
}

function parseDateOnly(v?: string) {
  const date = splitValue(v).date
  if (!date) return null
  const [y, m, d] = date.split('-').map(Number)
  if (!y || !m || !d) return null
  return new Date(y, m - 1, d)
}

function toDateISO(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

function formatDisplay(v?: string, mode: DatePickerMode = 'date') {
  const { date, hour, minute } = splitValue(v)
  if (!date) return ''
  if (mode === 'date') return date
  return `${date} ${pad(hour)}:${pad(minute)}`
}

const WEEK = ['日', '一', '二', '三', '四', '五', '六']
const HOURS = Array.from({ length: 24 }, (_, i) => i)

function minuteOptions(step = 1) {
  const s = Math.max(1, Math.min(30, step))
  return Array.from({ length: Math.floor(60 / s) }, (_, i) => i * s)
}

function snapMinute(minute: number, step: number) {
  const opts = minuteOptions(step)
  if (opts.includes(minute)) return minute
  return opts.reduce((best, m) => (Math.abs(m - minute) < Math.abs(best - minute) ? m : best), 0)
}

function TimeWheelColumn({
  value,
  options,
  onChange,
  disabled,
  'aria-label': ariaLabel,
}: {
  value: number
  options: number[]
  onChange: (v: number) => void
  disabled?: boolean
  'aria-label'?: string
}) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const settling = useRef(false)
  const index = Math.max(0, options.indexOf(value))

  const scrollToIndex = useCallback((i: number, behavior: ScrollBehavior = 'smooth') => {
    const el = scrollerRef.current
    if (!el) return
    settling.current = true
    el.scrollTo({ top: i * WHEEL_ITEM, behavior })
    window.setTimeout(() => {
      settling.current = false
    }, behavior === 'auto' ? 0 : 180)
  }, [])

  useLayoutEffect(() => {
    scrollToIndex(index, 'auto')
  }, [index, scrollToIndex])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el || disabled) return
    let timer = 0
    function onScroll() {
      if (settling.current) return
      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        const i = Math.round(el!.scrollTop / WHEEL_ITEM)
        const clamped = Math.min(options.length - 1, Math.max(0, i))
        scrollToIndex(clamped, 'smooth')
        const next = options[clamped]!
        if (next !== value) onChange(next)
      }, 60)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      el.removeEventListener('scroll', onScroll)
      window.clearTimeout(timer)
    }
  }, [disabled, onChange, options, scrollToIndex, value])

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (disabled) return
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault()
      const delta = e.key === 'ArrowUp' ? -1 : 1
      const next = Math.min(options.length - 1, Math.max(0, index + delta))
      onChange(options[next]!)
    }
    if (e.key === 'Home') {
      e.preventDefault()
      onChange(options[0]!)
    }
    if (e.key === 'End') {
      e.preventDefault()
      onChange(options[options.length - 1]!)
    }
  }

  return (
    <div
      className={cn('time-wheel-col', disabled && 'is-disabled')}
      role="listbox"
      aria-label={ariaLabel}
      aria-activedescendant={`${ariaLabel}-${value}`}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={onKeyDown}
    >
      <div className="time-wheel-highlight" aria-hidden />
      <div
        ref={scrollerRef}
        className="time-wheel-scroller"
        style={
          {
            '--time-wheel-item': `${WHEEL_ITEM}px`,
            '--time-wheel-visible': WHEEL_VISIBLE,
            '--time-wheel-pad': WHEEL_PAD,
          } as CSSProperties
        }
      >
        <div className="time-wheel-spacer" aria-hidden />
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            id={`${ariaLabel}-${opt}`}
            role="option"
            aria-selected={opt === value}
            className={cn('time-wheel-item', opt === value && 'is-active')}
            disabled={disabled}
            tabIndex={-1}
            onClick={() => {
              if (disabled) return
              onChange(opt)
            }}
          >
            {pad(opt)}
          </button>
        ))}
        <div className="time-wheel-spacer" aria-hidden />
      </div>
    </div>
  )
}

function TimeWheels({
  hour,
  minute,
  onChange,
  disabled,
  label,
  minuteStep = 1,
}: {
  hour: number
  minute: number
  onChange: (hour: number, minute: number) => void
  disabled?: boolean
  label?: string
  minuteStep?: number
}) {
  const minutes = minuteOptions(minuteStep)
  const m = snapMinute(minute, minuteStep)
  return (
    <div className={cn('time-wheels', disabled && 'is-disabled')}>
      {label ? <div className="time-wheels-label muted">{label}</div> : null}
      <div className="time-wheels-body">
        <TimeWheelColumn
          value={hour}
          options={HOURS}
          disabled={disabled}
          aria-label={label ? `${label}小时` : '小时'}
          onChange={(h) => onChange(h, m)}
        />
        <span className="time-wheel-sep" aria-hidden>
          :
        </span>
        <TimeWheelColumn
          value={m}
          options={minutes}
          disabled={disabled}
          aria-label={label ? `${label}分钟` : '分钟'}
          onChange={(next) => onChange(hour, next)}
        />
      </div>
    </div>
  )
}

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

function addMonths(d: Date, n: number) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1)
}

function dayTime(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()
}

function DateCalendar({
  value,
  onChange,
  viewMonth,
  onViewMonthChange,
  rangeStart,
  rangeEnd,
  hoverDate,
  onHoverDate,
  disabledDate,
  showPrev = true,
  showNext = true,
  className,
}: {
  value?: string
  onChange?: (dateISO: string) => void
  /** Controlled visible month (1st of month) */
  viewMonth?: Date
  onViewMonthChange?: (month: Date) => void
  rangeStart?: string
  rangeEnd?: string
  hoverDate?: string
  onHoverDate?: (dateISO: string | undefined) => void
  disabledDate?: (dateISO: string) => boolean
  showPrev?: boolean
  showNext?: boolean
  className?: string
}) {
  const selected = parseDateOnly(value)
  const [internalCursor, setInternalCursor] = useState(() => startOfMonth(selected ?? new Date()))
  const cursor = viewMonth ? startOfMonth(viewMonth) : internalCursor

  function setCursor(next: Date) {
    const m = startOfMonth(next)
    if (onViewMonthChange) onViewMonthChange(m)
    else setInternalCursor(m)
  }

  useEffect(() => {
    if (viewMonth || !selected) return
    setInternalCursor(startOfMonth(selected))
  }, [value, viewMonth, selected])

  const cells = useMemo(() => {
    const y = cursor.getFullYear()
    const m = cursor.getMonth()
    const first = new Date(y, m, 1)
    const start = first.getDay()
    const days = new Date(y, m + 1, 0).getDate()
    const out: Array<{ date: Date; inMonth: boolean }> = []
    for (let i = 0; i < start; i++) {
      out.push({ date: new Date(y, m, -start + i + 1), inMonth: false })
    }
    for (let d = 1; d <= days; d++) out.push({ date: new Date(y, m, d), inMonth: true })
    while (out.length % 7) {
      const last = out[out.length - 1]!.date
      out.push({
        date: new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1),
        inMonth: false,
      })
    }
    return out
  }, [cursor])

  const activeDate = splitValue(value).date
  const startD = parseDateOnly(rangeStart)
  const endD = parseDateOnly(rangeEnd)
  const hoverD = parseDateOnly(hoverDate)
  const previewEnd =
    startD && !endD && hoverD ? hoverD : endD
  const rangeLo =
    startD && previewEnd
      ? dayTime(startD) <= dayTime(previewEnd)
        ? startD
        : previewEnd
      : startD
  const rangeHi =
    startD && previewEnd
      ? dayTime(startD) <= dayTime(previewEnd)
        ? previewEnd
        : startD
      : endD

  return (
    <div className={cn('date-picker-panel', className)}>
      <div className="date-picker-head">
        {showPrev ? (
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            aria-label="上一月"
            onClick={() => setCursor(addMonths(cursor, -1))}
          >
            <ChevronLeft size={16} />
          </button>
        ) : (
          <span className="date-picker-head-spacer" aria-hidden />
        )}
        <strong>
          {cursor.getFullYear()} 年 {cursor.getMonth() + 1} 月
        </strong>
        {showNext ? (
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            aria-label="下一月"
            onClick={() => setCursor(addMonths(cursor, 1))}
          >
            <ChevronRight size={16} />
          </button>
        ) : (
          <span className="date-picker-head-spacer" aria-hidden />
        )}
      </div>
      <div className="date-picker-week">
        {WEEK.map((w) => (
          <span key={w}>{w}</span>
        ))}
      </div>
      <div
        className="date-picker-grid"
        onMouseLeave={() => onHoverDate?.(undefined)}
      >
        {cells.map(({ date, inMonth }) => {
          const iso = toDateISO(date)
          const t = dayTime(date)
          const active = !rangeStart && activeDate === iso
          const isStart = rangeLo ? dayTime(rangeLo) === t : false
          const isEnd = rangeHi ? dayTime(rangeHi) === t : false
          const inRange =
            !!rangeLo && !!rangeHi && t > dayTime(rangeLo) && t < dayTime(rangeHi)
          return (
            <button
              key={iso + String(inMonth)}
              type="button"
              className={cn(
                'date-picker-day',
                !inMonth && 'is-out',
                active && 'is-active',
                isStart && 'is-range-start',
                isEnd && 'is-range-end',
                (isStart || isEnd) && 'is-active',
                inRange && 'is-in-range',
                disabledDate?.(iso) && 'is-disabled',
              )}
              disabled={disabledDate?.(iso)}
              onClick={() => {
                if (disabledDate?.(iso)) return
                onChange?.(iso)
              }}
              onMouseEnter={() => {
                if (disabledDate?.(iso)) return
                onHoverDate?.(iso)
              }}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function DualMonthCalendars({
  rangeStart,
  rangeEnd,
  onPick,
  hoverDate,
  onHoverDate,
  disabledDate,
}: {
  rangeStart?: string
  rangeEnd?: string
  onPick: (dateISO: string) => void
  hoverDate?: string
  onHoverDate?: (dateISO: string | undefined) => void
  disabledDate?: (dateISO: string) => boolean
}) {
  const start = parseDateOnly(rangeStart)
  const end = parseDateOnly(rangeEnd)
  const [leftMonth, setLeftMonth] = useState(() =>
    startOfMonth(start ?? end ?? new Date()),
  )
  const rightMonth = addMonths(leftMonth, 1)

  useEffect(() => {
    if (!start) return
    const s = startOfMonth(start)
    const e = end ? startOfMonth(end) : null
    setLeftMonth((cur) => {
      const right = addMonths(cur, 1)
      if (dayTime(s) >= dayTime(cur) && dayTime(s) < dayTime(addMonths(right, 1))) return cur
      if (e && dayTime(e) >= dayTime(cur) && dayTime(e) < dayTime(addMonths(right, 1))) return cur
      return s
    })
  }, [rangeStart, rangeEnd, start, end])

  return (
    <div className="date-range-calendars">
      <DateCalendar
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        hoverDate={hoverDate}
        onHoverDate={onHoverDate}
        disabledDate={disabledDate}
        viewMonth={leftMonth}
        onViewMonthChange={setLeftMonth}
        showPrev
        showNext={false}
        onChange={onPick}
      />
      <DateCalendar
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        hoverDate={hoverDate}
        onHoverDate={onHoverDate}
        disabledDate={disabledDate}
        viewMonth={rightMonth}
        onViewMonthChange={(m) => setLeftMonth(addMonths(m, -1))}
        showPrev={false}
        showNext
        onChange={onPick}
      />
    </div>
  )
}

function useDismissible(open: boolean, rootRef: React.RefObject<HTMLDivElement | null>, onClose: () => void) {
  useEffect(() => {
    if (!open) return
    function onDoc(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) onClose()
    }
    function onKey(e: globalThis.KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose, rootRef])
}

export function DatePicker({
  value,
  onChange,
  mode = 'date',
  placeholder,
  disabled,
  invalid,
  inline = false,
  minuteStep = 1,
  disabledDate,
  className,
}: {
  value?: string
  onChange?: (value: string) => void
  /** `date` = YYYY-MM-DD；`datetime` = YYYY-MM-DDTHH:mm */
  mode?: DatePickerMode
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  inline?: boolean
  /** Minute wheel step (1–30). Datetime only. */
  minuteStep?: number
  /** Disable calendar days by ISO date `YYYY-MM-DD`. */
  disabledDate?: (dateISO: string) => boolean
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const parts = splitValue(value)
  const ph = placeholder ?? (mode === 'datetime' ? '选择日期时间' : '选择日期')
  const display = formatDisplay(value, mode)

  useDismissible(open, rootRef, () => setOpen(false))

  function commitDate(dateISO: string) {
    const next = joinValue(dateISO, parts.hour, parts.minute, mode)
    onChange?.(next)
    if (mode === 'date') setOpen(false)
  }

  function commitTime(hour: number, minute: number) {
    const date = parts.date || todayISO()
    onChange?.(joinValue(date, hour, snapMinute(minute, minuteStep), mode))
  }

  const panel = (
    <div className={cn('date-field-body', mode === 'datetime' && 'has-time')}>
      <DateCalendar value={value} onChange={commitDate} disabledDate={disabledDate} />
      {mode === 'datetime' ? (
        <div className="date-time-panel">
          <div className="date-time-panel-title muted">时间</div>
          <TimeWheels
            hour={parts.hour}
            minute={parts.minute}
            onChange={commitTime}
            disabled={disabled}
            minuteStep={minuteStep}
          />
          {!inline ? (
            <Button
              size="sm"
              variant="primary"
              block
              disabled={!parts.date && !splitValue(value).date}
              onClick={() => setOpen(false)}
            >
              确定
            </Button>
          ) : null}
        </div>
      ) : null}
    </div>
  )

  if (inline) {
    return <div className={cn('date-field-inline', className)}>{panel}</div>
  }

  return (
    <div
      className={cn(
        'date-field',
        open && 'open',
        invalid && 'is-invalid',
        disabled && 'is-disabled',
        className,
      )}
      ref={rootRef}
    >
      <button
        type="button"
        className="date-field-trigger"
        disabled={disabled}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-invalid={invalid || undefined}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={cn('date-field-value', !display && 'is-placeholder')}>
          {display || ph}
        </span>
        <span className="date-field-icon" aria-hidden>
          <CalendarDays size={16} strokeWidth={2} />
        </span>
      </button>
      {open ? (
        <div
          className={cn('date-field-popover', mode === 'datetime' && 'has-time')}
          role="dialog"
          aria-label={ph}
        >
          {panel}
        </div>
      ) : null}
    </div>
  )
}

export function DateRangePicker({
  start,
  end,
  onChange,
  mode = 'date',
  placeholder,
  disabled,
  invalid,
  minuteStep = 1,
  disabledDate,
  className,
}: {
  start?: string
  end?: string
  onChange?: (range: { start: string; end: string }) => void
  mode?: DatePickerMode
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  minuteStep?: number
  disabledDate?: (dateISO: string) => boolean
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState<string | undefined>(undefined)
  const [hoverDate, setHoverDate] = useState<string | undefined>()
  const rootRef = useRef<HTMLDivElement>(null)
  const ph = placeholder ?? (mode === 'datetime' ? '选择时间范围' : '选择日期范围')

  useEffect(() => {
    if (!open) {
      setDraft(undefined)
      setHoverDate(undefined)
    }
  }, [open])

  useDismissible(open, rootRef, () => setOpen(false))

  const startParts = splitValue(start)
  const endParts = splitValue(end)
  const draftParts = splitValue(draft)
  const rangeStartISO = draft ?? (startParts.date || undefined)
  const rangeEndISO = draft ? undefined : endParts.date || undefined
  const display =
    start && end
      ? `${formatDisplay(start, mode)} → ${formatDisplay(end, mode)}`
      : start
        ? `${formatDisplay(start, mode)} → …`
        : ''

  function pickDate(dateISO: string) {
    if (!draft) {
      const nextStart = joinValue(dateISO, startParts.hour, startParts.minute, mode)
      setDraft(nextStart)
      onChange?.({ start: nextStart, end: '' })
      return
    }
    const a = parseDateOnly(draft)!
    const b = parseDateOnly(dateISO)!
    if (dayTime(a) <= dayTime(b)) {
      const nextEnd = joinValue(
        dateISO,
        endParts.hour || draftParts.hour,
        endParts.minute || draftParts.minute,
        mode,
      )
      setDraft(undefined)
      setHoverDate(undefined)
      onChange?.({ start: draft, end: nextEnd })
      if (mode === 'date') setOpen(false)
    } else {
      const nextStart = joinValue(dateISO, draftParts.hour, draftParts.minute, mode)
      const nextEnd = joinValue(
        draftParts.date,
        endParts.hour || draftParts.hour,
        endParts.minute || draftParts.minute,
        mode,
      )
      setDraft(undefined)
      setHoverDate(undefined)
      onChange?.({ start: nextStart, end: nextEnd })
      if (mode === 'date') setOpen(false)
    }
  }

  function setStartTime(hour: number, minute: number) {
    if (!startParts.date) return
    onChange?.({
      start: joinValue(startParts.date, hour, snapMinute(minute, minuteStep), mode),
      end: end || '',
    })
  }

  function setEndTime(hour: number, minute: number) {
    if (!endParts.date) return
    onChange?.({
      start: start || '',
      end: joinValue(endParts.date, hour, snapMinute(minute, minuteStep), mode),
    })
  }

  return (
    <div
      className={cn(
        'date-field',
        open && 'open',
        invalid && 'is-invalid',
        disabled && 'is-disabled',
        className,
      )}
      ref={rootRef}
    >
      <button
        type="button"
        className="date-field-trigger"
        disabled={disabled}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-invalid={invalid || undefined}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={cn('date-field-value', !display && 'is-placeholder')}>
          {display || ph}
        </span>
        <span className="date-field-icon" aria-hidden>
          <CalendarDays size={16} strokeWidth={2} />
        </span>
      </button>
      {open ? (
        <div
          className={cn(
            'date-field-popover',
            'is-range',
            mode === 'datetime' && 'has-time',
          )}
          role="dialog"
          aria-label={ph}
        >
          <div className={cn('date-field-body', 'is-range', mode === 'datetime' && 'is-range-with-time')}>
            <DualMonthCalendars
              rangeStart={rangeStartISO}
              rangeEnd={rangeEndISO}
              hoverDate={draft ? hoverDate : undefined}
              onHoverDate={setHoverDate}
              disabledDate={disabledDate}
              onPick={pickDate}
            />
            {mode === 'datetime' ? (
              <div className="date-range-times">
                <TimeWheels
                  label="开始"
                  hour={startParts.hour}
                  minute={startParts.minute}
                  onChange={setStartTime}
                  disabled={!startParts.date || disabled}
                  minuteStep={minuteStep}
                />
                <TimeWheels
                  label="结束"
                  hour={endParts.hour}
                  minute={endParts.minute}
                  onChange={setEndTime}
                  disabled={!endParts.date || disabled}
                  minuteStep={minuteStep}
                />
              </div>
            ) : null}
          </div>
          <div className={cn('date-field-hint', mode === 'datetime' && 'has-action')}>
            <p className="muted">
              {start && end && !draft
                ? `${formatDisplay(start, mode)} → ${formatDisplay(end, mode)}`
                : draft || start
                  ? `起始 ${formatDisplay(draft || start, mode)}，再选结束日`
                  : '选择起止日期'}
            </p>
            {mode === 'datetime' ? (
              <Button
                size="sm"
                variant="primary"
                disabled={!startParts.date || !endParts.date}
                onClick={() => setOpen(false)}
              >
                确定
              </Button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}
