import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/cn'

export type TooltipSide = 'top' | 'right' | 'bottom' | 'left'

const GAP = 10

function place(side: TooltipSide, rect: DOMRect, tip: DOMRect): { style: CSSProperties; side: TooltipSide } {
  const vw = window.innerWidth
  const vh = window.innerHeight
  let next = side

  const fits = {
    top: rect.top - tip.height - GAP > 8,
    bottom: rect.bottom + tip.height + GAP < vh - 8,
    left: rect.left - tip.width - GAP > 8,
    right: rect.right + tip.width + GAP < vw - 8,
  }

  if (!fits[next]) {
    const order: TooltipSide[] =
      side === 'top' || side === 'bottom'
        ? ['top', 'bottom', 'right', 'left']
        : ['right', 'left', 'top', 'bottom']
    next = order.find((s) => fits[s]) ?? side
  }

  let top = 0
  let left = 0
  let transform = ''

  switch (next) {
    case 'right':
      top = rect.top + rect.height / 2
      left = rect.right + GAP
      transform = 'translateY(-50%)'
      break
    case 'left':
      top = rect.top + rect.height / 2
      left = rect.left - GAP
      transform = 'translate(-100%, -50%)'
      break
    case 'bottom':
      top = rect.bottom + GAP
      left = rect.left + rect.width / 2
      transform = 'translateX(-50%)'
      break
    case 'top':
    default:
      top = rect.top - GAP
      left = rect.left + rect.width / 2
      transform = 'translate(-50%, -100%)'
      break
  }

  left = Math.min(Math.max(8, left), vw - tip.width - 8)
  top = Math.min(Math.max(8, top), vh - tip.height - 8)

  return {
    side: next,
    style: { position: 'fixed', top, left, transform },
  }
}

export function Tooltip({
  content,
  children,
  side = 'top',
  className,
  disabled,
  /** Touch: long-press to show */
  longPressMs = 500,
}: {
  content: ReactNode
  children: ReactNode
  side?: TooltipSide
  className?: string
  disabled?: boolean
  longPressMs?: number
}) {
  const [open, setOpen] = useState(false)
  const [style, setStyle] = useState<CSSProperties | null>(null)
  const wrapRef = useRef<HTMLSpanElement>(null)
  const tipRef = useRef<HTMLSpanElement>(null)
  const pressTimer = useRef<number | null>(null)
  const id = useId()
  const show = open && !disabled && content != null && content !== false && content !== ''

  function updatePos() {
    const el = wrapRef.current
    const tip = tipRef.current
    if (!el || !tip) return
    const placed = place(side, el.getBoundingClientRect(), tip.getBoundingClientRect())
    setStyle(placed.style)
  }

  useLayoutEffect(() => {
    if (!show) {
      setStyle(null)
      return
    }
    updatePos()
  }, [show, side, content])

  useEffect(() => {
    if (!show) return
    function onScrollOrResize() {
      updatePos()
    }
    window.addEventListener('scroll', onScrollOrResize, true)
    window.addEventListener('resize', onScrollOrResize)
    return () => {
      window.removeEventListener('scroll', onScrollOrResize, true)
      window.removeEventListener('resize', onScrollOrResize)
    }
  }, [show, side])

  function clearPress() {
    if (pressTimer.current != null) {
      window.clearTimeout(pressTimer.current)
      pressTimer.current = null
    }
  }

  return (
    <span
      ref={wrapRef}
      className={cn('tooltip-wrap', className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onTouchStart={() => {
        clearPress()
        pressTimer.current = window.setTimeout(() => setOpen(true), longPressMs)
      }}
      onTouchEnd={() => {
        clearPress()
        setOpen(false)
      }}
      onTouchCancel={clearPress}
    >
      <span aria-describedby={show ? id : undefined}>{children}</span>
      {show
        ? createPortal(
            <span
              ref={tipRef}
              id={id}
              role="tooltip"
              className="tooltip tooltip-portal"
              style={style ?? { position: 'fixed', top: -9999, left: -9999, visibility: 'hidden' }}
            >
              {content}
            </span>,
            document.body,
          )
        : null}
    </span>
  )
}
