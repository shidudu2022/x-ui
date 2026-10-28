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
import { CATEGORIES, type CategoryId } from '@/demo/catalog/categories'
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

export function DemoShell() {
  const location = useLocation()
  const navigate = useNavigate()
  const [cmdOpen, setCmdOpen] = useState(false)
  const { locale } = useLocale()
  const dt = useDemoMessages()
  const isListPage = location.pathname === '/examples/list'

  const titles = useMemo<Record<string, string>>(
    () => ({
      '/': dt('nav.overview'),
      '/foundations': dt('nav.foundations'),
      '/components': dt('nav.components'),
      '/patterns': dt('nav.patterns'),
      '/templates': dt('nav.templates'),
      '/docs/getting-started': dt('nav.gettingStarted'),
      '/docs/theming': dt('nav.theming'),
      '/docs/conventions': dt('nav.conventions'),
      ...Object.fromEntries(
        Object.entries(catalogTitles).map(([slug, label]) => [
          `/components/${slug}`,
          pickL10n(locale, label),
        ]),
      ),
      ...Object.fromEntries(
        Object.entries(templateTitles).map(([path, label]) => [path, pickL10n(locale, label)]),
      ),
    }),
    [locale, dt],
  )

  const navGroups = useMemo<NavGroup[]>(
    () => [
      {
        section: dt('nav.sectionGuide'),
        items: [
          { to: '/', label: dt('nav.overview'), icon: <NavIcon icon={Sparkles} />, end: true },
          { to: '/foundations', label: dt('nav.foundations'), icon: <NavIcon icon={Palette} /> },
          { to: '/docs/getting-started', label: dt('nav.gettingStarted'), icon: <NavIcon icon={Rocket} /> },
          { to: '/docs/theming', label: dt('nav.theming'), icon: <NavIcon icon={Ruler} /> },
          { to: '/docs/conventions', label: dt('nav.conventions'), icon: <NavIcon icon={BookOpen} /> },
        ],
      },
      {
        section: dt('nav.sectionKit'),
        items: [
          { to: '/components', label: dt('nav.components'), icon: <NavIcon icon={Boxes} /> },
          { to: '/patterns', label: dt('nav.patterns'), icon: <NavIcon icon={Wrench} /> },
          { to: '/templates', label: dt('nav.templates'), icon: <NavIcon icon={LayoutTemplate} /> },
        ],
      },
      {
        label: dt('nav.examples'),
        collapsible: true,
        defaultOpen: true,
        icon: <NavIcon icon={LayoutGrid} />,
        items: TEMPLATE_GROUPS.flatMap((g) =>
          g.items.map((item) => ({
            to: item.path,
            label: pickL10n(locale, item.label),
            icon: <NavIcon icon={LayoutGrid} />,
          })),
        ),
      },
      ...CATEGORIES.map((cat) => ({
        label: pickL10n(locale, cat.label),
        collapsible: true as const,
        icon: <NavIcon icon={CATEGORY_ICONS[cat.id]} />,
        items: entriesOfCategory(cat.id).map((e) => ({
          to: `/components/${e.slug}`,
          label: e.name,
          icon: <NavIcon icon={CATEGORY_ICONS[cat.id]} />,
        })),
      })),
    ],
    [locale, dt],
  )

  const commands = useMemo<CommandItem[]>(() => {
    const nav: CommandItem[] = [
      { id: 'home', label: dt('nav.overview'), group: dt('nav.sectionGuide'), onSelect: () => navigate('/') },
      { id: 'components', label: dt('nav.components'), group: dt('nav.sectionKit'), onSelect: () => navigate('/components') },
      { id: 'templates', label: dt('nav.templates'), group: dt('nav.sectionKit'), onSelect: () => navigate('/templates') },
    ]
    const comps: CommandItem[] = Object.entries(catalogTitles).map(([slug, label]) => ({
      id: `c-${slug}`,
      label: pickL10n(locale, label),
      group: dt('nav.components'),
      onSelect: () => navigate(`/components/${slug}`),
    }))
    return [...nav, ...comps]
  }, [locale, dt, navigate])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        if (isListPage) return // ListPage / AppShell owns ⌘K for search drawer
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
          isListPage ? null : (
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
            items={[
              { id: 'github', label: dt('chrome.docs'), onSelect: () => undefined },
            ]}
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
