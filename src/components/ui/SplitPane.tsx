import { useRef, useState, type PointerEvent, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function SplitPane({
  left,
  right,
  initialLeft = 280,
  minLeft = 180,
  maxLeft = 480,
  className,
}: {
  left: ReactNode
  right: ReactNode
  initialLeft?: number
  minLeft?: number
  maxLeft?: number
  className?: string
}) {
  const [leftWidth, setLeftWidth] = useState(initialLeft)
  const dragging = useRef(false)

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    dragging.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (!dragging.current) return
    const root = e.currentTarget.parentElement
    if (!root) return
    const rect = root.getBoundingClientRect()
    const next = Math.min(maxLeft, Math.max(minLeft, e.clientX - rect.left))
    setLeftWidth(next)
  }

  function onPointerUp() {
    dragging.current = false
  }

  return (
    <div
      className={cn('split-pane', className)}
      style={{ ['--split-left' as string]: `${leftWidth}px` }}
    >
      <div className="split-pane-left">{left}</div>
      <div
        className="split-pane-divider"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        role="separator"
        aria-orientation="vertical"
      />
      <div className="split-pane-right">{right}</div>
    </div>
  )
}
