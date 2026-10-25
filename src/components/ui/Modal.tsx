import { useEffect, useId, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useFocusTrap } from '@/lib/useFocusTrap'
import { usePresence } from '@/lib/usePresence'

type ModalProps = {
  open: boolean
  onClose: () => void
  title?: ReactNode
  children?: ReactNode
  footer?: ReactNode
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Modal({ open, onClose, title, children, footer, size = 'md', className }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const titleId = useId()
  const { present, visible } = usePresence(open, 180)
  useFocusTrap(panelRef, visible)

  useEffect(() => {
    if (!visible) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [visible, onClose])

  if (!present) return null

  return (
    <>
      <div
        className={cn('overlay', visible && 'open')}
        onClick={onClose}
        aria-hidden
      />
      <div
        ref={panelRef}
        className={cn(
          'modal',
          size === 'sm' && 'modal-sm',
          size === 'lg' && 'modal-lg',
          visible && 'open',
          className,
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-hidden={!visible}
      >
        <div className="modal-header">
          <strong id={titleId}>{title}</strong>
          <button type="button" className="btn btn-ghost btn-sm" aria-label="关闭" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {footer ? <div className="modal-footer">{footer}</div> : null}
      </div>
    </>
  )
}
