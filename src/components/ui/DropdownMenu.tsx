import {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactElement,
  type ReactNode,
} from 'react'
import { cn } from '@/lib/cn'

export type DropdownItem = {
  id: string
  label: ReactNode
  danger?: boolean
  disabled?: boolean
  onSelect?: () => void
  separator?: boolean
}

type TriggerProps = {
  id?: string
  'aria-haspopup'?: 'menu'
  'aria-expanded'?: boolean
  'aria-controls'?: string
  onClick?: (e: ReactMouseEvent<HTMLElement>) => void
}

export function DropdownMenu({
  trigger,
  items,
  align = 'end',
  className,
}: {
  trigger: ReactNode
  items: DropdownItem[]
  align?: 'start' | 'end'
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const menuId = useId()
  const triggerId = useId()

  useEffect(() => {
    if (!open) return
    function onDoc(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: globalThis.KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false)
        document.getElementById(triggerId)?.focus()
      }
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, triggerId])

  const actionable = items.filter((i) => !i.separator && !i.disabled)

  function onMenuKey(e: KeyboardEvent<HTMLDivElement>) {
    const buttons = Array.from(
      e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not(:disabled)'),
    )
    if (!buttons.length) return
    const i = buttons.indexOf(document.activeElement as HTMLButtonElement)
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      buttons[(i + 1 + buttons.length) % buttons.length]?.focus()
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      buttons[(i - 1 + buttons.length) % buttons.length]?.focus()
    }
    if (e.key === 'Home') {
      e.preventDefault()
      buttons[0]?.focus()
    }
    if (e.key === 'End') {
      e.preventDefault()
      buttons[buttons.length - 1]?.focus()
    }
  }

  function toggle() {
    setOpen((v) => !v)
  }

  const triggerNode = isValidElement(trigger) ? (
    cloneElement(trigger as ReactElement<TriggerProps>, {
      id: triggerId,
      'aria-haspopup': 'menu',
      'aria-expanded': open,
      'aria-controls': open ? menuId : undefined,
      onClick: (e: ReactMouseEvent<HTMLElement>) => {
        ;(trigger as ReactElement<TriggerProps>).props.onClick?.(e)
        toggle()
      },
    })
  ) : (
    <button
      type="button"
      id={triggerId}
      className="dropdown-trigger-wrap"
      aria-haspopup="menu"
      aria-expanded={open}
      aria-controls={open ? menuId : undefined}
      onClick={toggle}
    >
      {trigger}
    </button>
  )

  return (
    <div ref={ref} className={cn('dropdown', className)}>
      {triggerNode}
      {open ? (
        <div
          id={menuId}
          className={cn('dropdown-menu', align === 'start' && 'align-start')}
          role="menu"
          aria-labelledby={triggerId}
          onKeyDown={onMenuKey}
        >
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
                tabIndex={actionable[0]?.id === item.id ? 0 : -1}
                onClick={() => {
                  item.onSelect?.()
                  setOpen(false)
                  document.getElementById(triggerId)?.focus()
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
