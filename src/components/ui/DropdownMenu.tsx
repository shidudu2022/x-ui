import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type DropdownItem = {
  id: string
  label: ReactNode
  danger?: boolean
  disabled?: boolean
  onSelect?: () => void
  separator?: boolean
}

export function DropdownMenu({
  trigger,
  items,
  className,
}: {
  trigger: ReactNode
  items: DropdownItem[]
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <div ref={ref} className={cn(className)} style={{ position: 'relative', display: 'inline-flex' }}>
      <span onClick={() => setOpen((v) => !v)}>{trigger}</span>
      {open ? (
        <div className="dropdown-menu" role="menu" style={{ position: 'absolute', top: 'calc(100% + 6px)', right: 0 }}>
          {items.map((item) =>
            item.separator ? (
              <div key={item.id} className="dropdown-sep" role="separator" />
            ) : (
              <button
                key={item.id}
                type="button"
                role="menuitem"
                className={cn('dropdown-item', item.danger && 'danger')}
                disabled={item.disabled}
                onClick={() => {
                  item.onSelect?.()
                  setOpen(false)
                }}
              >
                {item.label}
              </button>
            ),
          )}
        </div>
      ) : null}
    </div>
  )
}
