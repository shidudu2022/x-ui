import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Tooltip } from '@/components/ui/Tooltip'
import { Brand } from './Brand'

export type NavItem = {
  to: string
  label: string
  icon?: ReactNode
  end?: boolean
}

export type NavGroup = {
  label?: string
  items: NavItem[]
}

const SCROLL_STEP = 120

export function Sidebar({
  brand,
  groups,
  footer,
  collapsed = false,
  onToggleCollapse,
  className,
}: {
  brand?: ReactNode
  groups: NavGroup[]
  footer?: ReactNode
  collapsed?: boolean
  onToggleCollapse?: () => void
  className?: string
}) {
  const navRef = useRef<HTMLElement>(null)
  const [canUp, setCanUp] = useState(false)
  const [canDown, setCanDown] = useState(false)

  const updateOverflow = useCallback(() => {
    const el = navRef.current
    if (!el) return
    const max = el.scrollHeight - el.clientHeight
    const top = el.scrollTop
    setCanUp(top > 2)
    setCanDown(max > 2 && top < max - 2)
  }, [])

  useEffect(() => {
    const el = navRef.current
    if (!el) return
    updateOverflow()
    el.addEventListener('scroll', updateOverflow, { passive: true })
    const ro = new ResizeObserver(updateOverflow)
    ro.observe(el)
    window.addEventListener('resize', updateOverflow)
    return () => {
      el.removeEventListener('scroll', updateOverflow)
      ro.disconnect()
      window.removeEventListener('resize', updateOverflow)
    }
  }, [updateOverflow, groups, collapsed])

  function scrollBy(delta: number) {
    navRef.current?.scrollBy({ top: delta, behavior: 'smooth' })
  }

  return (
    <aside className={cn('sidebar', collapsed && 'is-collapsed', className)}>
      <div className="sidebar-head">{brand ?? <Brand showText={!collapsed} />}</div>

      <div className={cn('nav-scroll', canUp && 'has-up', canDown && 'has-down')}>
        {canUp ? (
          <button
            type="button"
            className="nav-scroll-btn nav-scroll-up"
            aria-label="向上滚动菜单"
            onClick={() => scrollBy(-SCROLL_STEP)}
          >
            <ChevronUp size={14} strokeWidth={2} />
          </button>
        ) : null}

        <nav ref={navRef} className="nav" aria-label="主导航">
          {groups.map((group, gi) => (
            <div key={gi} className="demo-nav-group">
              {group.label ? <div className="demo-nav-group-label">{group.label}</div> : null}
              {gi > 0 && !group.label ? <div className="nav-divider" /> : null}
              {group.items.map((item) => {
                const link = (
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) => cn('nav-item', isActive && 'active')}
                  >
                    {item.icon ? <span className="nav-icon">{item.icon}</span> : null}
                    <span className="nav-item-label">{item.label}</span>
                  </NavLink>
                )

                if (!collapsed) {
                  return <div key={item.to}>{link}</div>
                }

                return (
                  <Tooltip key={item.to} content={item.label} side="right" className="nav-tooltip-wrap">
                    {link}
                  </Tooltip>
                )
              })}
            </div>
          ))}
        </nav>

        {canDown ? (
          <button
            type="button"
            className="nav-scroll-btn nav-scroll-down"
            aria-label="向下滚动菜单"
            onClick={() => scrollBy(SCROLL_STEP)}
          >
            <ChevronDown size={14} strokeWidth={2} />
          </button>
        ) : null}
      </div>

      {footer ? <div className="sidebar-foot">{footer}</div> : null}

      {onToggleCollapse ? (
        <Tooltip
          className="sidebar-collapse"
          content={collapsed ? '展开侧栏' : '收起侧栏'}
          side="right"
        >
          <button
            type="button"
            className="sidebar-collapse-btn"
            aria-label={collapsed ? '展开侧栏' : '收起侧栏'}
            aria-pressed={collapsed}
            onClick={onToggleCollapse}
          >
            {collapsed ? (
              <ChevronRight size={12} strokeWidth={2} />
            ) : (
              <ChevronLeft size={12} strokeWidth={2} />
            )}
          </button>
        </Tooltip>
      ) : null}
    </aside>
  )
}
