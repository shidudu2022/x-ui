import { useEffect, useMemo, useRef, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  Bell,
  Boxes,
  Columns2,
  FileText,
  FormInput,
  Gauge,
  Heading,
  LayoutTemplate,
  List,
  ListTodo,
  Loader,
  LogIn,
  MessageSquare,
  Navigation,
  Palette,
  PieChart,
  Search,
  Settings,
  Sparkles,
  Table2,
  Type,
  UserRound,
  Workflow,
  Layers,
  CircleSlash,
  Shield,
} from 'lucide-react'
import { AppShell, Breadcrumbs, NavIcon, ThemeDrawer, UserMenu } from '@/components/layout'
import { Button, CommandPalette, Drawer, EmptyState, type CommandItem } from '@/components/ui'
import { useListSearch } from '@/lib/useListSearch'

const titles: Record<string, string> = {
  '/': '概览',
  '/foundations': '基础',
  '/components/buttons': '按钮',
  '/components/forms': '表单',
  '/components/data': '数据展示',
  '/components/feedback': '反馈',
  '/components/navigation': '导航与布局',
  '/components/charts': '图表',
  '/components/advanced': '进阶组件',
  '/patterns': '组合模式',
  '/examples/page': '页面标题',
  '/examples/list': '列表页',
  '/examples/form': '表单页',
  '/examples/detail': '详情页',
  '/examples/wizard': '向导页',
  '/examples/log': '日志页',
  '/examples/login': '登录页',
  '/examples/typography': '字体字号',
  '/examples/dashboard': '仪表盘',
  '/examples/settings': '设置页',
  '/examples/empty': '空态 / 404',
  '/examples/search': '搜索结果',
  '/examples/compare': '对比 / Diff',
  '/examples/profile': '个人资料',
  '/examples/roles': '角色权限',
  '/examples/notifications': '通知中心',
  '/examples/skeleton': '加载骨架',
  '/examples/errors': '错误与离线',
  '/examples/audit': '审计详情',
  '/examples/onboarding': '开通向导',
  '/examples/i18n': '文案与密度',
  '/examples/permissions': '权限策略',
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

  const navGroups = useMemo(
    () => [
      {
        label: '开始',
        items: [
          { to: '/', label: '概览', icon: <NavIcon icon={Sparkles} />, end: true },
          { to: '/foundations', label: '基础', icon: <NavIcon icon={Palette} /> },
        ],
      },
      {
        label: '组件',
        items: [
          { to: '/components/buttons', label: '按钮', icon: <NavIcon icon={Boxes} /> },
          { to: '/components/forms', label: '表单', icon: <NavIcon icon={FormInput} /> },
          { to: '/components/data', label: '数据', icon: <NavIcon icon={Table2} /> },
          { to: '/components/feedback', label: '反馈', icon: <NavIcon icon={MessageSquare} /> },
          { to: '/components/navigation', label: '导航', icon: <NavIcon icon={Navigation} /> },
          { to: '/components/charts', label: '图表', icon: <NavIcon icon={PieChart} /> },
          { to: '/components/advanced', label: '进阶', icon: <NavIcon icon={Layers} /> },
        ],
      },
      {
        label: '示例',
        items: [
          { to: '/examples/dashboard', label: '仪表盘', icon: <NavIcon icon={Gauge} /> },
          { to: '/examples/settings', label: '设置页', icon: <NavIcon icon={Settings} /> },
          { to: '/examples/empty', label: '空态 / 404', icon: <NavIcon icon={CircleSlash} /> },
          { to: '/examples/search', label: '搜索结果', icon: <NavIcon icon={Search} /> },
          { to: '/examples/compare', label: '对比 / Diff', icon: <NavIcon icon={Columns2} /> },
          { to: '/examples/profile', label: '个人资料', icon: <NavIcon icon={UserRound} /> },
          { to: '/examples/roles', label: '角色权限', icon: <NavIcon icon={Shield} /> },
          { to: '/examples/notifications', label: '通知中心', icon: <NavIcon icon={Bell} /> },
          { to: '/examples/skeleton', label: '加载骨架', icon: <NavIcon icon={Loader} /> },
          { to: '/examples/typography', label: '字体字号', icon: <NavIcon icon={Type} /> },
          { to: '/examples/page', label: '页面标题', icon: <NavIcon icon={Heading} /> },
          { to: '/examples/list', label: '列表页', icon: <NavIcon icon={List} /> },
          { to: '/examples/form', label: '表单页', icon: <NavIcon icon={FileText} /> },
          { to: '/examples/detail', label: '详情页', icon: <NavIcon icon={Boxes} /> },
          { to: '/examples/wizard', label: '向导页', icon: <NavIcon icon={Workflow} /> },
          { to: '/examples/log', label: '日志页', icon: <NavIcon icon={ListTodo} /> },
          { to: '/examples/login', label: '登录页', icon: <NavIcon icon={LogIn} /> },
          { to: '/examples/errors', label: '错误与离线', icon: <NavIcon icon={CircleSlash} /> },
          { to: '/examples/audit', label: '审计详情', icon: <NavIcon icon={ListTodo} /> },
          { to: '/examples/onboarding', label: '开通向导', icon: <NavIcon icon={Workflow} /> },
          { to: '/examples/i18n', label: '文案与密度', icon: <NavIcon icon={Type} /> },
          { to: '/examples/permissions', label: '权限策略', icon: <NavIcon icon={Shield} /> },
          { to: '/patterns', label: '组合模式', icon: <NavIcon icon={LayoutTemplate} /> },
        ],
      },
    ],
    [],
  )

  const commands: CommandItem[] = useMemo(
    () =>
      Object.entries(titles).map(([to, label]) => ({
        id: to,
        label,
        group: to.startsWith('/components')
          ? '组件'
          : to.startsWith('/examples')
            ? '示例'
            : '页面',
        type: 'page',
        onSelect: () => navigate(to),
      })),
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

  const searchLabel = isListPage
    ? listQ || '搜索集群…'
    : '搜索组件…'

  return (
    <>
      <AppShell
        navGroups={navGroups}
        topbarTitle={<Breadcrumbs current={title} currentIcon={activeNav?.icon} />}
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
            <button
              type="button"
              className="pill pill-action"
              onClick={() => setThemeOpen(true)}
            >
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
