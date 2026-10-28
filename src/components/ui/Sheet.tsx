import { useEffect, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useT } from '@/i18n'
import { useFocusTrap } from '@/lib/useFocusTrap'

export function Sheet({
  open,
  onClose,
  title,
  children,
  footer,
  side = 'bottom',
  className,
}: {
  open: boolean
  onClose: () => void
  title?: ReactNode
  children?: ReactNode
  footer?: ReactNode
  side?: 'bottom' | 'top'
  className?: string
}) {
  const tr = useT()
  const panelRef = useRef<HTMLDivElement>(null)
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
      <div
        ref={panelRef}
        className={cn('sheet', `sheet-${side}`, open && 'open', className)}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <div className="sheet-handle" aria-hidden />
        <div className="sheet-header">
          <strong>{title}</strong>
          <button type="button" className="btn btn-ghost btn-sm" aria-label={tr('sheet.close')} onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        <div className="sheet-body">{children}</div>
        {footer ? <div className="sheet-footer">{footer}</div> : null}
      </div>
    </>
  )
}
