import { useEffect, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Sidebar, type NavGroup } from './Sidebar'
import { Topbar } from './Topbar'
import { useT } from '@/i18n'

const COLLAPSE_KEY = 'x-ui.sidebar-collapsed'
const MOBILE_MQ = '(max-width: 960px)'

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
  const t = useT()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window === 'undefined') return Boolean(defaultCollapsed)
    const saved = window.localStorage.getItem(COLLAPSE_KEY)
    if (saved === '1') return true
    if (saved === '0') return false
    return Boolean(defaultCollapsed)
  })
  const [navOpen, setNavOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(MOBILE_MQ).matches : false,
  )

  useEffect(() => {
    window.localStorage.setItem(COLLAPSE_KEY, collapsed ? '1' : '0')
  }, [collapsed])

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ)
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
        <Topbar leading={menuBtn} title={topbarTitle} right={topbarRight} />
        <div className="content">{children}</div>
      </div>
    </div>
  )
}
