import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
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
  /** Heading rendered above the first group that carries this section name. */
  section?: string
  /** Render the label as an expandable header (requires `label`). */
  collapsible?: boolean
  /** Start expanded. Groups containing the active route always auto-expand. */
  defaultOpen?: boolean
  /** Icon for the group — used for the collapsed (rail) sidebar. */
  icon?: ReactNode
}

function matchesPath(pathname: string, item: NavItem) {
  return item.end
    ? pathname === item.to
    : pathname === item.to || pathname.startsWith(`${item.to}/`)
}

const SCROLL_STEP = 120

export function Sidebar({
  id,
  brand,
  groups,
  footer,
  collapsed = false,
  onToggleCollapse,
  className,
}: {
  id?: string
  brand?: ReactNode
  groups: NavGroup[]
  footer?: ReactNode
  collapsed?: boolean
  onToggleCollapse?: () => void
  className?: string
}) {
  const navRef = useRef<HTMLElement>(null)
  const { pathname } = useLocation()
  /** Manual open/close overrides keyed by group label; cleared for the active group on navigation. */
  const [overrides, setOverrides] = useState<Record<string, boolean>>({})
  const [prevPath, setPrevPath] = useState(pathname)
  if (prevPath !== pathname) {
    // Navigation re-enables auto-expand for the group that now contains the route.
    setPrevPath(pathname)
    const activeLabels = groups
      .filter((g) => g.label && g.items.some((it) => matchesPath(pathname, it)))
      .map((g) => g.label as string)
    if (activeLabels.some((l) => l in overrides)) {
      const next = { ...overrides }
      for (const l of activeLabels) delete next[l]
      setOverrides(next)
    }
  }
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

  useEffect(() => {
    // Keep the active item visible after expanding / navigating.
    const el = navRef.current?.querySelector<HTMLElement>('.nav-item.active')
    el?.scrollIntoView({ block: 'nearest' })
  }, [pathname])

  function scrollBy(delta: number) {
    navRef.current?.scrollBy({ top: delta, behavior: 'smooth' })
  }

  return (
    <aside
      id={id}
      className={cn('sidebar', collapsed && 'is-collapsed', className)}
    >
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
          {groups.map((group, gi) => {
            const hasActive = group.items.some((it) => matchesPath(pathname, it))
            const key = group.label ?? `group-${gi}`
            const collapsible = Boolean(group.collapsible && group.label)
            const open = !collapsible
              ? true
              : (overrides[key] ?? (hasActive || Boolean(group.defaultOpen)))
            const showSection =
              group.section && (gi === 0 || groups[gi - 1].section !== group.section)

            const renderItem = (item: NavItem, nested: boolean) => {
              const link = (
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    cn('nav-item', nested && 'nav-item-nested', isActive && 'active')
                  }
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
            }

            return (
              <div key={key} className={cn('demo-nav-group', collapsible && 'nav-group-collapsible')}>
                {showSection ? (
                  <div className="nav-section-label">{group.section}</div>
                ) : null}

                {collapsible && collapsed ? (
                  // Rail mode: one icon per group, jumps to its first item.
                  <Tooltip content={group.label} side="right" className="nav-tooltip-wrap">
                    <NavLink
                      to={group.items[0].to}
                      className={cn('nav-item', hasActive && 'active')}
                    >
                      <span className="nav-icon">{group.icon ?? group.items[0].icon}</span>
                      <span className="nav-item-label">{group.label}</span>
                    </NavLink>
                  </Tooltip>
                ) : collapsible ? (
                  <>
                    <button
                      type="button"
                      className={cn('nav-group-toggle', hasActive && 'has-active', open && 'is-open')}
                      aria-expanded={open}
                      onClick={() => setOverrides((p) => ({ ...p, [key]: !open }))}
                    >
                      {group.icon ? <span className="nav-icon">{group.icon}</span> : null}
                      <span className="nav-item-label">{group.label}</span>
                      <span className="nav-group-count">{group.items.length}</span>
                      <ChevronRight size={12} strokeWidth={2} className="nav-group-chevron" />
                    </button>
                    {open ? (
                      <div className="nav-group-items">
                        {group.items.map((item) => renderItem(item, true))}
                      </div>
                    ) : null}
                  </>
                ) : (
                  <>
                    {group.label ? <div className="demo-nav-group-label">{group.label}</div> : null}
                    {gi > 0 && !group.label && !showSection ? <div className="nav-divider" /> : null}
                    {group.items.map((item) => renderItem(item, false))}
                  </>
                )}
              </div>
            )
          })}
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
