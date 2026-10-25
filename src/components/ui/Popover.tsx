import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/cn'

export type PopoverAlign = 'start' | 'center' | 'end'

export function Popover({
  trigger,
  children,
  className,
  align = 'start',
}: {
  trigger: ReactNode
  children: ReactNode
  className?: string
  align?: PopoverAlign
}) {
  const [open, setOpen] = useState(false)
  const [style, setStyle] = useState<CSSProperties | null>(null)
  const triggerRef = useRef<HTMLSpanElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      const t = e.target as Node
      if (triggerRef.current?.contains(t) || panelRef.current?.contains(t)) return
      setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  useLayoutEffect(() => {
    if (!open || !triggerRef.current || !panelRef.current) {
      setStyle(null)
      return
    }
    const rect = triggerRef.current.getBoundingClientRect()
    const panel = panelRef.current.getBoundingClientRect()
    const gap = 8
    let top = rect.bottom + gap
    if (top + panel.height > window.innerHeight - 8 && rect.top - gap - panel.height > 8) {
      top = rect.top - gap - panel.height
    }
    let left = rect.left
    if (align === 'center') left = rect.left + rect.width / 2 - panel.width / 2
    if (align === 'end') left = rect.right - panel.width
    left = Math.min(Math.max(8, left), window.innerWidth - panel.width - 8)
    top = Math.min(Math.max(8, top), window.innerHeight - panel.height - 8)
    setStyle({ position: 'fixed', top, left, zIndex: 80 })
  }, [open, align, children])

  return (
    <span ref={triggerRef} className={cn('popover-wrap', className)} style={{ display: 'inline-flex' }}>
      <span onClick={() => setOpen((v) => !v)}>{trigger}</span>
      {open
        ? createPortal(
            <div
              ref={panelRef}
              className="popover"
              role="dialog"
              style={style ?? { position: 'fixed', top: -9999, left: -9999, visibility: 'hidden' }}
            >
              {children}
            </div>,
            document.body,
          )
        : null}
    </span>
  )
}
