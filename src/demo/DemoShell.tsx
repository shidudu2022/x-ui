import { useEffect, useMemo, useRef, useState } from 'react'
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
import { AppShell, Breadcrumbs, NavIcon, ThemeDrawer, UserMenu, type NavGroup } from '@/components/layout'
import { Button, CommandPalette, Drawer, EmptyState, type CommandItem } from '@/components/ui'
import { CATEGORIES, categoryOfSlug, type CategoryId } from '@/demo/catalog/categories'
import { catalogTitles, entriesOfCategory } from '@/demo/catalog/registry'
import { TEMPLATE_GROUPS, templateTitles } from '@/demo/catalog/templates'
import { useListSearch } from '@/lib/useListSearch'

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

const PAGE_TITLES: Record<string, string> = {
  '/': '概览',
  '/docs/getting-started': '快速开始',
  '/docs/theming': '主题与外观',
  '/docs/conventions': '开发约定',
  '/docs/utilities': '工具与令牌 API',
  '/foundations': '设计令牌',
  '/templates': '页面模板',
  '/patterns': '组合模式',
}

const titles: Record<string, string> = {
  ...PAGE_TITLES,
  ...templateTitles(),
  ...catalogTitles(),
}

const LIST_SEARCH_PATH = '/examples/list'

function ListSearchDrawer({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const { q, setQuery } = useListSearch()
  const [draft, setDraft] = useState(q)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setDraft(q)
      window.setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open, q])

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="搜索 · 集群"
      footer={
        <div className="actions">
          <Button
            variant="ghost"
            onClick={() => {
              setQuery('')
              setDraft('')
              onClose()
            }}
          >
            清除
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setQuery(draft)
              onClose()
            }}
          >
            在列表中查看
          </Button>
        </div>
      }
    >
      <div className="stack search-drawer">
        <div className="field" style={{ margin: 0 }}>
          <input
            ref={inputRef}
            type="search"
            value={draft}
            placeholder="名称 / 标签 / 状态…"
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setQuery(draft)
                onClose()
              }
              if (e.key === 'Escape') onClose()
            }}
          />
          <div className="hint">搜索结果会写入地址栏 ?q=，并过滤下方列表。</div>
        </div>
        {!draft.trim() ? (
          <EmptyState title="开始搜索" description="输入关键字筛选集群列表" />
        ) : null}
      </div>
    </Drawer>
  )
}

export function DemoShell() {
  const location = useLocation()
  const navigate = useNavigate()
  const [cmdOpen, setCmdOpen] = useState(false)
  const [listSearchOpen, setListSearchOpen] = useState(false)
  const [themeOpen, setThemeOpen] = useState(false)
  const { q: listQ } = useListSearch()
  const isListPage = location.pathname === LIST_SEARCH_PATH

  const navGroups = useMemo<NavGroup[]>(
    () => [
      {
        section: '开始',
        items: [
          { to: '/', label: '概览', icon: <NavIcon icon={Sparkles} />, end: true },
          { to: '/docs/getting-started', label: '快速开始', icon: <NavIcon icon={Rocket} /> },
          { to: '/foundations', label: '设计令牌', icon: <NavIcon icon={Ruler} /> },
          { to: '/docs/theming', label: '主题与外观', icon: <NavIcon icon={Palette} /> },
          { to: '/docs/conventions', label: '开发约定', icon: <NavIcon icon={BookOpen} /> },
          { to: '/docs/utilities', label: '工具与令牌 API', icon: <NavIcon icon={Wrench} /> },
        ],
      },
      {
        section: '组件',
        items: [{ to: '/components', label: '全部组件', icon: <NavIcon icon={Boxes} />, end: true }],
      },
      ...CATEGORIES.map((c) => ({
        section: '组件',
        label: c.label,
        collapsible: true,
        icon: <NavIcon icon={CATEGORY_ICONS[c.id]} />,
        items: entriesOfCategory(c).map((e) => ({ to: `/components/${e.slug}`, label: e.name })),
      })),
      {
        section: '页面模板',
        items: [
          { to: '/templates', label: '模板总览', icon: <NavIcon icon={LayoutGrid} />, end: true },
          { to: '/patterns', label: '组合模式', icon: <NavIcon icon={LayoutTemplate} /> },
        ],
      },
      ...TEMPLATE_GROUPS.map((g) => ({
        section: '页面模板',
        label: g.label,
        collapsible: true,
        icon: <NavIcon icon={g.icon} />,
        items: g.items.map((t) => ({
          to: t.to,
          label: t.label,
          icon: <NavIcon icon={t.icon} />,
        })),
      })),
    ],
    [],
  )

  const commands: CommandItem[] = useMemo(
    () =>
      Object.entries(titles).map(([to, label]) => {
        const slug = to.startsWith('/components/') ? to.slice('/components/'.length) : ''
        const category = slug ? categoryOfSlug(slug) : undefined
        return {
          id: to,
          label: category ? `${label} · ${category.label}` : label,
          group: slug
            ? '组件'
            : to.startsWith('/examples') || to === '/templates' || to === '/patterns'
              ? '模板'
              : to.startsWith('/docs') || to === '/foundations' || to === '/'
                ? '文档'
                : '页面',
          type: 'page',
          onSelect: () => navigate(to),
        }
      }),
    [navigate],
  )

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (isListPage) setListSearchOpen(true)
        else setCmdOpen(true)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isListPage])

  const title = titles[location.pathname] ?? 'x-ui'
  const activeNav = navGroups
    .flatMap((g) => g.items)
    .find((item) =>
      item.end
        ? location.pathname === item.to
        : location.pathname === item.to || location.pathname.startsWith(`${item.to}/`),
    )

  const crumb = useMemo(() => {
    const path = location.pathname
    if (path.startsWith('/components/')) {
      const category = categoryOfSlug(path.slice('/components/'.length))
      if (category) {
        return {
          parent: {
            label: `组件 · ${category.label}`,
            to: `/components#cat-${category.id}`,
            icon: <NavIcon icon={CATEGORY_ICONS[category.id]} />,
          },
          icon: undefined,
        }
      }
    }
    if (path.startsWith('/examples/')) {
      return {
        parent: { label: '页面模板', to: '/templates', icon: <NavIcon icon={LayoutGrid} /> },
        icon: undefined,
      }
    }
    return { parent: null, icon: activeNav?.icon }
  }, [location.pathname, activeNav])

  const searchLabel = isListPage ? listQ || '搜索集群…' : '搜索组件 / 文档…'

  return (
    <>
      <AppShell
        navGroups={navGroups}
        topbarTitle={<Breadcrumbs current={title} currentIcon={crumb.icon} parent={crumb.parent} />}
        topbarRight={
          <>
            <button
              type="button"
              className={`search-trigger${isListPage && listQ ? ' has-query' : ''}`}
              onClick={() => (isListPage ? setListSearchOpen(true) : setCmdOpen(true))}
            >
              <span className="search-trigger-icon" aria-hidden>
                <Search size={14} strokeWidth={2} />
              </span>
              <span className="search-trigger-text">{searchLabel}</span>
              <kbd className="search-trigger-kbd">⌘ K</kbd>
            </button>
            <button type="button" className="pill pill-action" onClick={() => setThemeOpen(true)}>
              <span className="pill-dot" /> 外观
            </button>
          </>
        }
        sidebarFooter={
          <UserMenu
            name="Demo"
            role="designer"
            items={[
              { id: 'theme', label: '外观设置', onSelect: () => setThemeOpen(true) },
              { id: 'github', label: '文档', onSelect: () => undefined },
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
        title="快速跳转"
        placeholder="搜索页面…"
      />
      <ListSearchDrawer open={listSearchOpen} onClose={() => setListSearchOpen(false)} />
      <ThemeDrawer open={themeOpen} onClose={() => setThemeOpen(false)} />
    </>
  )
}
