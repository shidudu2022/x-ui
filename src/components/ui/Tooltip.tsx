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

function place(side: TooltipSide, rect: DOMRect): CSSProperties {
  const gap = 10
  switch (side) {
    case 'right':
      return {
        position: 'fixed',
        top: rect.top + rect.height / 2,
        left: rect.right + gap,
        transform: 'translateY(-50%)',
      }
    case 'left':
      return {
        position: 'fixed',
        top: rect.top + rect.height / 2,
        left: rect.left - gap,
        transform: 'translate(-100%, -50%)',
      }
    case 'bottom':
      return {
        position: 'fixed',
        top: rect.bottom + gap,
        left: rect.left + rect.width / 2,
        transform: 'translateX(-50%)',
      }
    case 'top':
    default:
      return {
        position: 'fixed',
        top: rect.top - gap,
        left: rect.left + rect.width / 2,
        transform: 'translate(-50%, -100%)',
      }
  }
}

export function Tooltip({
  content,
  children,
  side = 'top',
  className,
  disabled,
}: {
  content: ReactNode
  children: ReactNode
  side?: TooltipSide
  className?: string
  disabled?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [style, setStyle] = useState<CSSProperties | null>(null)
  const wrapRef = useRef<HTMLSpanElement>(null)
  const id = useId()
  const show = open && !disabled && content != null && content !== false && content !== ''

  function updatePos() {
    const el = wrapRef.current
    if (!el) return
    setStyle(place(side, el.getBoundingClientRect()))
  }

  useLayoutEffect(() => {
    if (!show) {
      setStyle(null)
      return
    }
    updatePos()
  }, [show, side])

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

  return (
    <span
      ref={wrapRef}
      className={cn('tooltip-wrap', className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <span aria-describedby={show ? id : undefined}>{children}</span>
      {show && style
        ? createPortal(
            <span id={id} role="tooltip" className="tooltip tooltip-portal" style={style}>
              {content}
            </span>,
            document.body,
          )
        : null}
    </span>
  )
}
