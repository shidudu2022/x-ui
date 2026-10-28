import { useEffect, useMemo, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  BookOpen,
  Boxes,
  ChartColumn,
  Compass,
  LayoutGrid,
  LayoutTemplate,
  MousePointerClick,
  Palette,
  PanelsTopLeft,
  Rocket,
  Ruler,
  Search,
  Sparkles,
  Table2,
  Wrench,
  TextCursorInput,
  AppWindow,
  BellRing,
  Layers,
  type LucideIcon,
} from 'lucide-react'
import { AppShell, NavIcon, UserMenu, type NavGroup } from '@/components/layout'
import { CommandPalette, type CommandItem } from '@/components/ui'
import { useLocale } from '@/i18n'
import { CATEGORIES, categoryOfSlug, type CategoryId } from '@/demo/catalog/categories'
import { catalogTitles, entriesOfCategory } from '@/demo/catalog/registry'
import { TEMPLATE_GROUPS, templateTitles } from '@/demo/catalog/templates'
import { useDemoMessages } from '@/demo/i18n/useDemoT'
import { pickL10n } from '@/demo/i18n/types'

const CATEGORY_ICONS: Record<CategoryId, LucideIcon> = {
  layout: PanelsTopLeft,
  general: MousePointerClick,
  forms: TextCursorInput,
  data: Table2,
  charts: ChartColumn,
  feedback: BellRing,
  overlay: Layers,
  navigation: Compass,
  shell: AppWindow,
}

const LIST_SEARCH_PATH = '/examples/list'

export function DemoShell() {
  const location = useLocation()
  const navigate = useNavigate()
  const [cmdOpen, setCmdOpen] = useState(false)
  const isListPage = location.pathname === LIST_SEARCH_PATH
  const { locale } = useLocale()
  const dt = useDemoMessages()

  const titles = useMemo<Record<string, string>>(
    () => ({
      '/': dt('page.overview'),
      '/docs/getting-started': dt('page.gettingStarted'),
      '/docs/theming': dt('page.theming'),
      '/docs/conventions': dt('page.conventions'),
      '/docs/utilities': dt('page.utilities'),
      '/foundations': dt('page.designTokens'),
      '/templates': dt('page.templates'),
      '/patterns': dt('page.patterns'),
      '/components': dt('page.allComponents'),
      ...templateTitles(locale),
      ...catalogTitles(),
    }),
    [dt, locale],
  )

  const navGroups = useMemo<NavGroup[]>(
    () => [
      {
        section: dt('nav.start'),
        items: [
          { to: '/', label: dt('nav.overview'), icon: <NavIcon icon={Sparkles} />, end: true },
          { to: '/docs/getting-started', label: dt('nav.gettingStarted'), icon: <NavIcon icon={Rocket} /> },
          { to: '/foundations', label: dt('nav.designTokens'), icon: <NavIcon icon={Ruler} /> },
          { to: '/docs/theming', label: dt('nav.theming'), icon: <NavIcon icon={Palette} /> },
          { to: '/docs/conventions', label: dt('nav.conventions'), icon: <NavIcon icon={BookOpen} /> },
          { to: '/docs/utilities', label: dt('nav.utilities'), icon: <NavIcon icon={Wrench} /> },
        ],
      },
      {
        section: dt('nav.components'),
        items: [{ to: '/components', label: dt('nav.allComponents'), icon: <NavIcon icon={Boxes} />, end: true }],
      },
      ...CATEGORIES.map((c) => ({
        section: dt('nav.components'),
        label: pickL10n(locale, c.label),
        collapsible: true,
        icon: <NavIcon icon={CATEGORY_ICONS[c.id]} />,
        items: entriesOfCategory(c).map((e) => ({
          to: `/components/${e.slug}`,
          label: e.name,
          icon: <NavIcon icon={CATEGORY_ICONS[c.id]} />,
        })),
      })),
      {
        section: dt('nav.templates'),
        items: [
          { to: '/templates', label: dt('nav.templatesOverview'), icon: <NavIcon icon={LayoutGrid} />, end: true },
          { to: '/patterns', label: dt('nav.patterns'), icon: <NavIcon icon={LayoutTemplate} /> },
        ],
      },
      ...TEMPLATE_GROUPS.map((g) => ({
        section: dt('nav.templates'),
        label: pickL10n(locale, g.label),
        collapsible: true,
        icon: <NavIcon icon={g.icon} />,
        items: g.items.map((item) => ({
          to: item.to,
          label: pickL10n(locale, item.label),
          icon: <NavIcon icon={item.icon} />,
        })),
      })),
    ],
    [dt, locale],
  )

  const commands: CommandItem[] = useMemo(
    () =>
      Object.entries(titles).map(([to, label]) => {
        const slug = to.startsWith('/components/') ? to.slice('/components/'.length) : ''
        const category = slug ? categoryOfSlug(slug) : undefined
        const categoryLabel = category ? pickL10n(locale, category.label) : undefined
        return {
          id: to,
          label: categoryLabel ? `${label} · ${categoryLabel}` : label,
          group: slug
            ? dt('search.components')
            : to.startsWith('/examples') || to === '/templates' || to === '/patterns'
              ? dt('search.templates')
              : to.startsWith('/docs') || to === '/foundations' || to === '/'
                ? dt('search.docs')
                : dt('search.pages'),
          type: 'page',
          onSelect: () => navigate(to),
        }
      }),
    [navigate, titles, locale, dt],
  )

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        // List pages: AppShell opens ListPage search drawer
        if (isListPage) return
        e.preventDefault()
        setCmdOpen(true)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isListPage])

  const breadcrumbCurrent = titles[location.pathname]

  return (
    <>
      <AppShell
        navGroups={navGroups}
        breadcrumbCurrent={breadcrumbCurrent}
        topbarRight={
          isListPage ? undefined : (
            <button type="button" className="search-trigger" onClick={() => setCmdOpen(true)}>
              <span className="search-trigger-icon" aria-hidden>
                <Search size={14} strokeWidth={2} />
              </span>
              <span className="search-trigger-text">{dt('search.searchComponentsOrDocs')}</span>
              <kbd className="search-trigger-kbd">⌘ K</kbd>
            </button>
          )
        }
        sidebarFooter={
          <UserMenu
            name={dt('chrome.demoUser')}
            role={dt('chrome.designer')}
            items={[{ id: 'github', label: dt('chrome.docs'), onSelect: () => undefined }]}
          />
        }
      >
        <Outlet />
      </AppShell>

      <CommandPalette
        open={cmdOpen}
        onClose={() => setCmdOpen(false)}
        items={commands}
        title={dt('search.quickJump')}
        placeholder={dt('search.searchPages')}
      />
    </>
  )
}
