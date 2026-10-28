import { useEffect, useId, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useT } from '@/i18n'
import { useFocusTrap } from '@/lib/useFocusTrap'
import { usePresence } from '@/lib/usePresence'

export type DrawerSize = 'sm' | 'md' | 'lg' | 'xl'

type DrawerProps = {
  open: boolean
  onClose: () => void
  title?: ReactNode
  children?: ReactNode
  footer?: ReactNode
  side?: 'right' | 'left'
  size?: DrawerSize
  className?: string
}

export function Drawer({
  open,
  onClose,
  title,
  children,
  footer,
  side = 'right',
  size = 'lg',
  className,
}: DrawerProps) {
  const t = useT()
  const panelRef = useRef<HTMLElement>(null)
  const titleId = useId()
  const { present, visible } = usePresence(open, 200)
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
      <aside
        ref={panelRef}
        className={cn(
          'drawer',
          `drawer-${size}`,
          side === 'left' && 'drawer-left',
          visible && 'open',
          className,
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-hidden={!visible}
      >
        <div className="drawer-header">
          <strong id={titleId}>{title}</strong>
          <button type="button" className="btn btn-ghost btn-sm" aria-label={t('drawer.close')} onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        <div className="drawer-body">{children}</div>
        {footer ? <div className="drawer-footer">{footer}</div> : null}
      </aside>
    </>
  )
}
