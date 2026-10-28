import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useLocale } from '@/i18n'

export type CalendarEvent = {
  date: string
  label: string
  tone?: 'primary' | 'success' | 'warn' | 'danger'
}

function toIso(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function Calendar({
  events = [],
  className,
}: {
  events?: CalendarEvent[]
  className?: string
}) {
  const { t, weekdays } = useLocale()
  const [cursor, setCursor] = useState(() => new Date())
  const y = cursor.getFullYear()
  const m = cursor.getMonth()

  const byDay = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>()
    for (const ev of events) {
      const list = map.get(ev.date) ?? []
      list.push(ev)
      map.set(ev.date, list)
    }
    return map
  }, [events])

  const now = new Date()
  const todayIso = toIso(now)
  const days = new Date(y, m + 1, 0).getDate()
  const start = new Date(y, m, 1).getDay()
  const viewingToday = y === now.getFullYear() && m === now.getMonth()

  return (
    <div className={cn('calendar', className)}>
      <div className="calendar-head">
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          aria-label={t('calendar.prevMonth')}
          onClick={() => setCursor(new Date(y, m - 1, 1))}
        >
          <ChevronLeft size={16} />
        </button>
        <strong>{t('calendar.yearMonth', { year: y, month: m + 1 })}</strong>
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          aria-label={t('calendar.nextMonth')}
          onClick={() => setCursor(new Date(y, m + 1, 1))}
        >
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="calendar-grid">
        {weekdays.map((w) => (
          <div key={w} className="calendar-weekday" aria-hidden>
            {w}
          </div>
        ))}
        {Array.from({ length: start }).map((_, i) => (
          <div key={`e-${i}`} className="calendar-cell is-empty" />
        ))}
        {Array.from({ length: days }).map((_, i) => {
          const d = i + 1
          const iso = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
          const list = byDay.get(iso) ?? []
          return (
            <div key={iso} className={cn('calendar-cell', iso === todayIso && 'is-today')}>
              <span className="calendar-day">{d}</span>
              <div className="calendar-events">
                {list.slice(0, 2).map((ev) => (
                  <span key={ev.label} className={cn('calendar-chip', ev.tone && `tone-${ev.tone}`)}>
                    {ev.label}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
      <div className="calendar-foot">
        <button
          type="button"
          className="btn btn-ghost btn-sm calendar-today-btn"
          disabled={viewingToday}
          onClick={() => setCursor(new Date(now.getFullYear(), now.getMonth(), 1))}
        >
          {t('calendar.today')}
        </button>
      </div>
    </div>
  )
}
