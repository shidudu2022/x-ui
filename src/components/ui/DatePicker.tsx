import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/cn'

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function toISO(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

function parseISO(v?: string) {
  if (!v) return null
  const [y, m, d] = v.split('-').map(Number)
  if (!y || !m || !d) return null
  return new Date(y, m - 1, d)
}

const WEEK = ['日', '一', '二', '三', '四', '五', '六']

export function DatePicker({
  value,
  onChange,
  className,
}: {
  value?: string
  onChange?: (value: string) => void
  className?: string
}) {
  const selected = parseISO(value)
  const [cursor, setCursor] = useState(() => selected ?? new Date())

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
      out.push({ date: new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1), inMonth: false })
    }
    return out
  }, [cursor])

  return (
    <div className={cn('date-picker', className)}>
      <div className="date-picker-head">
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          aria-label="上一月"
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
        >
          <ChevronLeft size={16} />
        </button>
        <strong>
          {cursor.getFullYear()} 年 {cursor.getMonth() + 1} 月
        </strong>
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          aria-label="下一月"
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
        >
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="date-picker-week">
        {WEEK.map((w) => (
          <span key={w}>{w}</span>
        ))}
      </div>
      <div className="date-picker-grid">
        {cells.map(({ date, inMonth }) => {
          const iso = toISO(date)
          const active = value === iso
          return (
            <button
              key={iso + String(inMonth)}
              type="button"
              className={cn('date-picker-day', !inMonth && 'is-out', active && 'is-active')}
              onClick={() => onChange?.(iso)}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function DateRangePicker({
  start,
  end,
  onChange,
  className,
}: {
  start?: string
  end?: string
  onChange?: (range: { start: string; end: string }) => void
  className?: string
}) {
  const [draft, setDraft] = useState<string | undefined>(start)

  function pick(iso: string) {
    if (!draft || (start && end)) {
      setDraft(iso)
      onChange?.({ start: iso, end: '' })
      return
    }
    const a = parseISO(draft)!
    const b = parseISO(iso)!
    const [s, e] = a <= b ? [draft, iso] : [iso, draft]
    setDraft(undefined)
    onChange?.({ start: s, end: e })
  }

  return (
    <div className={cn('date-range', className)}>
      <DatePicker
        value={draft ?? end ?? start}
        onChange={pick}
      />
      <p className="muted" style={{ margin: '8px 0 0', fontSize: 12 }}>
        {start && end ? `${start} → ${end}` : start ? `起始 ${start}，再选结束日` : '选择起止日期'}
      </p>
    </div>
  )
}
