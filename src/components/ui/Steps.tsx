import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useT } from '@/i18n'

export type StepItem = {
  id: string
  label: ReactNode
}

const SCROLL_PAD = 12

export function Steps({
  items,
  current,
  size = 'md',
  className,
}: {
  items: StepItem[]
  current: number
  size?: 'sm' | 'md'
  className?: string
}) {
  const t = useT()
  const trackRef = useRef<HTMLDivElement>(null)
  const [overflow, setOverflow] = useState(false)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const updateOverflow = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    const hasOverflow = max > 2
    setOverflow(hasOverflow)
    setCanPrev(hasOverflow && el.scrollLeft > 2)
    setCanNext(hasOverflow && el.scrollLeft < max - 2)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    const measure = () => {
      requestAnimationFrame(updateOverflow)
    }

    measure()
    el.addEventListener('scroll', updateOverflow, { passive: true })
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    if (el.firstElementChild) ro.observe(el.firstElementChild)
    window.addEventListener('resize', measure)
    return () => {
      el.removeEventListener('scroll', updateOverflow)
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [updateOverflow, items])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const active = track.querySelector<HTMLElement>('.step.active')
    if (!active) return
    const left = active.offsetLeft - SCROLL_PAD
    const right = active.offsetLeft + active.offsetWidth + SCROLL_PAD
    if (left < track.scrollLeft) {
      track.scrollTo({ left: Math.max(0, left), behavior: 'smooth' })
    } else if (right > track.scrollLeft + track.clientWidth) {
      track.scrollTo({ left: right - track.clientWidth, behavior: 'smooth' })
    }
    requestAnimationFrame(updateOverflow)
  }, [current, items, updateOverflow])

  function scrollByDir(dir: -1 | 1) {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir * Math.max(100, el.clientWidth * 0.6), behavior: 'smooth' })
  }

  return (
    <div
      className={cn(
        'steps-wrap',
        size === 'sm' && 'steps-sm',
        overflow && 'is-overflow',
        overflow && !canPrev && 'is-at-start',
        overflow && !canNext && 'is-at-end',
        className,
      )}
    >
      {canPrev ? (
        <button
          type="button"
          className="steps-nav steps-nav-prev"
          aria-label={t('steps.prev')}
          onClick={() => scrollByDir(-1)}
        >
          <ChevronLeft size={16} strokeWidth={2} />
        </button>
      ) : null}

      <div className="steps-track" ref={trackRef}>
        <div className="steps" role="list">
          {items.map((item, index) => {
            const step = index + 1
            return (
              <div
                key={item.id}
                role="listitem"
                className={cn('step', step === current && 'active', step < current && 'done')}
                data-step={step}
                aria-current={step === current ? 'step' : undefined}
              >
                <span className="step-index">{step}.</span>
                <span className="step-label">{item.label}</span>
              </div>
            )
          })}
        </div>
      </div>

      {canNext ? (
        <button
          type="button"
          className="steps-nav steps-nav-next"
          aria-label={t('steps.next')}
          onClick={() => scrollByDir(1)}
        >
          <ChevronRight size={16} strokeWidth={2} />
        </button>
      ) : null}
    </div>
  )
}
