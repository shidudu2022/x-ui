import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Avatar } from '@/components/ui/Avatar'

export type UserMenuItem = {
  id: string
  label: ReactNode
  danger?: boolean
  onSelect?: () => void
}

function panelStyle(trigger: HTMLElement): CSSProperties {
  const r = trigger.getBoundingClientRect()
  const collapsed = Boolean(trigger.closest('.sidebar.is-collapsed'))
  if (collapsed) {
    return {
      position: 'fixed',
      left: r.right + 8,
      bottom: Math.max(8, window.innerHeight - r.bottom),
      minWidth: 168,
      zIndex: 220,
    }
  }
  return {
    position: 'fixed',
    left: r.left,
    width: Math.max(r.width, 168),
    bottom: Math.max(8, window.innerHeight - r.top + 6),
    zIndex: 220,
  }
}

export function UserMenu({
  name,
  role,
  items,
  compact,
  className,
}: {
  name: string
  role?: string
  items: UserMenuItem[]
  /** Icon-only trigger (collapsed sidebar) */
  compact?: boolean
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const [style, setStyle] = useState<CSSProperties | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!open || !triggerRef.current) {
      setStyle(null)
      return
    }
    setStyle(panelStyle(triggerRef.current))
  }, [open])

  useEffect(() => {
    if (!open) return
    function reposition() {
      if (triggerRef.current) setStyle(panelStyle(triggerRef.current))
    }
    function onDoc(e: MouseEvent) {
      const t = e.target as Node
      if (rootRef.current?.contains(t) || panelRef.current?.contains(t)) return
      setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', reposition)
    window.addEventListener('scroll', reposition, true)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', reposition)
      window.removeEventListener('scroll', reposition, true)
    }
  }, [open])

  return (
    <div
      className={cn('user-menu', open && 'open', compact && 'is-compact', className)}
      id="userMenu"
      ref={rootRef}
    >
      <button
        ref={triggerRef}
        type="button"
        className="user-menu-trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={compact ? `${name}${role ? ` · ${role}` : ''}` : undefined}
        title={compact ? `${name}${role ? ` · ${role}` : ''}` : undefined}
        onClick={() => setOpen((v) => !v)}
      >
        <Avatar name={name} />
        <span className="user-meta">
          <strong>{name}</strong>
          {role ? <span>{role}</span> : null}
        </span>
        <span className="user-caret" aria-hidden>
          <ChevronDown size={14} />
        </span>
      </button>
      {open && style
        ? createPortal(
            <div ref={panelRef} className="user-menu-panel user-menu-panel-portal" role="menu" style={style}>
              {items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="menuitem"
                  className={cn(item.danger && 'danger')}
                  onClick={() => {
                    item.onSelect?.()
                    setOpen(false)
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>,
            document.body,
          )
        : null}
    </div>
  )
}
