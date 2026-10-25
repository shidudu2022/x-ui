import { useEffect, useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Sidebar, type NavGroup } from './Sidebar'
import { Topbar } from './Topbar'

const COLLAPSE_KEY = 'x-ui.sidebar-collapsed'

export function AppShell({
  navGroups,
  brand,
  sidebarFooter,
  topbarTitle,
  topbarRight,
  children,
  className,
  defaultCollapsed,
}: {
  navGroups: NavGroup[]
  brand?: ReactNode
  sidebarFooter?: ReactNode
  topbarTitle?: ReactNode
  topbarRight?: ReactNode
  children: ReactNode
  className?: string
  defaultCollapsed?: boolean
}) {
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window === 'undefined') return Boolean(defaultCollapsed)
    const saved = window.localStorage.getItem(COLLAPSE_KEY)
    if (saved === '1') return true
    if (saved === '0') return false
    return Boolean(defaultCollapsed)
  })

  useEffect(() => {
    window.localStorage.setItem(COLLAPSE_KEY, collapsed ? '1' : '0')
  }, [collapsed])

  return (
    <div className={cn('app', collapsed && 'sidebar-collapsed', className)}>
      <Sidebar
        brand={brand}
        groups={navGroups}
        footer={sidebarFooter}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((v) => !v)}
      />
      <div className="main">
        <Topbar title={topbarTitle} right={topbarRight} />
        <div className="content">{children}</div>
      </div>
    </div>
  )
}
