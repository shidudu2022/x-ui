import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { Menu, Search, X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Sidebar, type NavGroup } from './Sidebar'
import { Topbar } from './Topbar'
import { Breadcrumbs } from './Breadcrumbs'
import { ThemeDrawer } from './ThemeDrawer'
import { useT } from '@/i18n'
import {
  AppShellSearchProvider,
  useAppShellSearch,
} from './AppShellSearchContext'
import {
  isNestedUnderNav,
  pathSegmentLabel,
  resolveActiveNav,
} from './resolveActiveNav'

export type { AppShellListSearchConfig } from './AppShellSearchContext'
export {
  useAppShellSearch,
  useAppShellSearchOptional,
} from './AppShellSearchContext'
export {
  resolveActiveNav,
  isNestedUnderNav,
  pathSegmentLabel,
} from './resolveActiveNav'

function AppShellChrome({
  navGroups,
  brand,
  sidebarFooter,
  topbarTitle,
  breadcrumbCurrent,
  topbarRight,
  showAppearance = true,
  children,
  className,
  defaultCollapsed,
}: {
  navGroups: NavGroup[]
  brand?: ReactNode
  sidebarFooter?: ReactNode
  topbarTitle?: ReactNode
  breadcrumbCurrent?: ReactNode
  topbarRight?: ReactNode
  showAppearance?: boolean
  children: ReactNode
  className?: string
  defaultCollapsed?: boolean
}) {
  const t = useT()
  const location = useLocation()
  const search = useAppShellSearch()
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window === 'undefined') return Boolean(defaultCollapsed)
    const saved = window.localStorage.getItem('x-ui.sidebar-collapsed')
    if (saved === '1') return true
    if (saved === '0') return false
    return Boolean(defaultCollapsed)
  })
  const [navOpen, setNavOpen] = useState(false)
  const [themeOpen, setThemeOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 960px)').matches : false,
  )

  useEffect(() => {
    window.localStorage.setItem('x-ui.sidebar-collapsed', collapsed ? '1' : '0')
  }, [collapsed])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 960px)')
    const onChange = () => {
      const mobile = mq.matches
      setIsMobile(mobile)
      if (!mobile) setNavOpen(false)
    }
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    setNavOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!navOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setNavOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navOpen])

  useEffect(() => {
    if (!navOpen || !isMobile) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [navOpen, isMobile])

  useEffect(() => {
    if (!search.active) return
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        search.setOpen(true)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [search.active, search.setOpen])

  const activeNav = useMemo(
    () => resolveActiveNav(location.pathname, navGroups),
    [location.pathname, navGroups],
  )

  const resolvedTitle = useMemo(() => {
    if (topbarTitle !== undefined) return topbarTitle
    if (!activeNav) {
      const current = breadcrumbCurrent ?? pathSegmentLabel(location.pathname)
      return <Breadcrumbs current={current} />
    }
    if (isNestedUnderNav(location.pathname, activeNav)) {
      return (
        <Breadcrumbs
          parent={{
            label: activeNav.label,
            to: activeNav.to,
            icon: activeNav.icon,
          }}
          current={breadcrumbCurrent ?? pathSegmentLabel(location.pathname)}
        />
      )
    }
    return (
      <Breadcrumbs current={activeNav.label} currentIcon={activeNav.icon} />
    )
  }, [topbarTitle, activeNav, breadcrumbCurrent, location.pathname])

  const menuBtn = (
    <button
      type="button"
      className="topbar-menu-btn"
      aria-label={navOpen ? t('sidebar.closeNav') : t('sidebar.openNav')}
      aria-expanded={navOpen}
      aria-controls="app-sidebar"
      onClick={() => setNavOpen((v) => !v)}
    >
      {navOpen ? <X size={18} strokeWidth={2} /> : <Menu size={18} strokeWidth={2} />}
    </button>
  )

  const searchTrigger = search.active ? (
    <button
      type="button"
      className={cn('search-trigger', search.hasQuery && 'has-query')}
      onClick={() => search.setOpen(true)}
    >
      <span className="search-trigger-icon" aria-hidden>
        <Search size={14} strokeWidth={2} />
      </span>
      <span className="search-trigger-text">
        {search.triggerLabel ?? t('listSearch.trigger')}
      </span>
      <kbd className="search-trigger-kbd">⌘ K</kbd>
    </button>
  ) : null

  const appearanceBtn = showAppearance ? (
    <button type="button" className="pill pill-action" onClick={() => setThemeOpen(true)}>
      <span className="pill-dot" /> {t('topbar.appearance')}
    </button>
  ) : null

  return (
    <div
      className={cn(
        'app',
        collapsed && 'sidebar-collapsed',
        navOpen && 'nav-open',
        className,
      )}
    >
      <div
        className="sidebar-backdrop"
        aria-hidden={!navOpen}
        onClick={() => setNavOpen(false)}
      />
      <Sidebar
        id="app-sidebar"
        brand={brand}
        groups={navGroups}
        footer={sidebarFooter}
        collapsed={isMobile ? false : collapsed}
        onToggleCollapse={isMobile ? undefined : () => setCollapsed((v) => !v)}
      />
      <div className="main">
        <Topbar
          leading={menuBtn}
          title={resolvedTitle}
          right={
            topbarRight || searchTrigger || appearanceBtn ? (
              <>
                {topbarRight}
                {searchTrigger}
                {appearanceBtn}
              </>
            ) : undefined
          }
        />
        <div className="content">{children}</div>
      </div>

      {showAppearance ? (
        <ThemeDrawer open={themeOpen} onClose={() => setThemeOpen(false)} />
      ) : null}
    </div>
  )
}

export function AppShell({
  navGroups,
  brand,
  sidebarFooter,
  topbarTitle,
  breadcrumbCurrent,
  topbarRight,
  showAppearance = true,
  children,
  className,
  defaultCollapsed,
}: {
  navGroups: NavGroup[]
  brand?: ReactNode
  sidebarFooter?: ReactNode
  /** Fully override auto title / breadcrumbs */
  topbarTitle?: ReactNode
  /** Current crumb when under a matched nav parent (e.g. “新增账户”) */
  breadcrumbCurrent?: ReactNode
  topbarRight?: ReactNode
  /** Show appearance pill + ThemeDrawer (default true) */
  showAppearance?: boolean
  children: ReactNode
  className?: string
  defaultCollapsed?: boolean
}) {
  return (
    <AppShellSearchProvider>
      <AppShellChrome
        navGroups={navGroups}
        brand={brand}
        sidebarFooter={sidebarFooter}
        topbarTitle={topbarTitle}
        breadcrumbCurrent={breadcrumbCurrent}
        topbarRight={topbarRight}
        showAppearance={showAppearance}
        className={className}
        defaultCollapsed={defaultCollapsed}
      >
        {children}
      </AppShellChrome>
    </AppShellSearchProvider>
  )
}
