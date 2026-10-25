import { useEffect, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useFocusTrap } from '@/lib/useFocusTrap'

type DrawerProps = {
  open: boolean
  onClose: () => void
  title?: ReactNode
  children?: ReactNode
  footer?: ReactNode
  side?: 'right' | 'left'
  className?: string
}

export function Drawer({
  open,
  onClose,
  title,
  children,
  footer,
  side = 'right',
  className,
}: DrawerProps) {
  const panelRef = useRef<HTMLElement>(null)
  useFocusTrap(panelRef, open)

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <>
      <div className={cn('overlay', open && 'open')} onClick={onClose} aria-hidden={!open} />
      <aside
        ref={panelRef}
        className={cn('drawer', side === 'left' && 'drawer-left', open && 'open', className)}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <div className="drawer-header">
          <strong>{title}</strong>
          <button type="button" className="btn btn-ghost btn-sm" aria-label="关闭" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        <div className="drawer-body">{children}</div>
        {footer ? <div className="drawer-footer">{footer}</div> : null}
      </aside>
    </>
  )
}
