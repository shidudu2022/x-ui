import { useState } from 'react'
import { LayoutDashboard, Rocket, Settings, Table2, TextCursorInput } from 'lucide-react'
import { Brand, NavIcon, Sidebar } from '@/components/layout'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('sidebar')
const props: PropDef[] = [{ name: 'groups', type: 'NavGroup[]', desc: { en: "Nav groups", zh: "导航分组" } }, { name: 'brand', type: 'ReactNode', desc: { en: "Brand", zh: "品牌" } }, { name: 'collapsed', type: 'boolean', default: 'false', desc: { en: "Icon-rail mode", zh: "图标栏模式" } }, { name: 'onToggleCollapse', type: '() => void', desc: { en: "Collapse toggle; omit to hide the collapse handle", zh: "折叠切换；不传则不显示折叠把手" } }, { name: 'footer', type: 'ReactNode', desc: { en: "Bottom", zh: "底部" } }, { name: 'NavGroup.label', type: 'string', desc: { en: "Group title", zh: "分组标题" } }, { name: 'NavGroup.section', type: 'string', desc: { en: "Section heading; rendered once before the first group with the same name", zh: "分区标题；在首个同名分组前渲染一次" } }, { name: 'NavGroup.collapsible', type: 'boolean', default: 'false', desc: { en: "Renders as a collapsible group (requires label); auto-expands when it contains the active route", zh: "渲染为可折叠分组（需要 label）；含当前路由时自动展开" } }, { name: 'NavGroup.defaultOpen', type: 'boolean', default: 'false', desc: { en: "Initially expanded", zh: "初始展开" } }, { name: 'NavGroup.icon', type: 'ReactNode', desc: { en: "Group icon; represents the whole group in icon-rail mode", zh: "分组图标；图标栏模式下代表整个分组" } }, { name: 'NavItem', type: '{ to, label, icon?, end? }', desc: { en: "Nav item; `to` is the route path", zh: "导航项，to 为路由路径" } }]

export function SidebarDoc() {
  const d = useDemoT()
  const [collapsed, setCollapsed] = useState(false)
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic & icon rail", "基础与图标栏")} description={d("Click the left handle to switch between full sidebar and icon rail.", "点击左侧把手在完整模式与图标栏之间切换。")} wide code={`<Sidebar
  brand={<Brand />}
  collapsed={collapsed}
  onToggleCollapse={() => setCollapsed((v) => !v)}
  groups={[
    {
      label: 'Navigation',
      items: [
        { to: '/', label: 'Overview', icon: <NavIcon icon={LayoutDashboard} />, end: true },
        { to: '/settings', label: 'Settings', icon: <NavIcon icon={Settings} /> },
      ],
    },
  ]}
/>`}>
        <div className="sidebar-demo-frame" style={{ width: collapsed ? 72 : 232 }}><Sidebar brand={<Brand text="Demo" showText={!collapsed} />} collapsed={collapsed} onToggleCollapse={() => setCollapsed((v) => !v)} groups={[{ label: d("Navigation", "导航"), items: [{ to: '/components/sidebar', label: d("Overview", "概览"), icon: <NavIcon icon={LayoutDashboard} />, end: true }, { to: '/components', label: d("Settings", "设置"), icon: <NavIcon icon={Settings} /> }] }]} /></div>
      </DocDemo>
      <DocDemo title={d("Section titles & collapsible groups", "分区标题与可折叠分组")} description={d("section renders section headings; collapsible groups start collapsed and expand for the active route or defaultOpen. Use when you have many groups (e.g. component categories).", "section 渲染分区标题；collapsible 的分组默认收起，含当前路由或 defaultOpen 时展开。分组较多（如组件分类）时使用。")} wide code={`<Sidebar
  groups={[
    {
      section: 'Start',
      items: [
        { to: '/', label: 'Overview', icon: <NavIcon icon={LayoutDashboard} />, end: true },
        { to: '/docs/getting-started', label: 'Quick start', icon: <NavIcon icon={Rocket} /> },
      ],
    },
    {
      section: 'Components',
      label: 'Form',
      collapsible: true,
      defaultOpen: true,
      icon: <NavIcon icon={TextCursorInput} />,
      items: [
        { to: '/components/input', label: 'Input' },
        { to: '/components/select', label: 'Select' },
        { to: '/components/checkbox', label: 'Checkbox' },
      ],
    },
    {
      section: 'Components',
      label: 'Data display',
      collapsible: true,
      icon: <NavIcon icon={Table2} />,
      items: [
        { to: '/components/table', label: 'Table' },
        { to: '/components/data-table', label: 'DataTable' },
      ],
    },
  ]}
/>`}>
        <div className="sidebar-demo-frame" style={{ width: 240, height: 420 }}><Sidebar brand={<Brand text="Demo" />} groups={[{ section: d("Start", "开始"), items: [{ to: '/', label: d("Overview", "概览"), icon: <NavIcon icon={LayoutDashboard} />, end: true }, { to: '/docs/getting-started', label: d("Quick start", "快速开始"), icon: <NavIcon icon={Rocket} /> }] }, { section: d("Components", "组件"), label: d("Form", "表单"), collapsible: true, defaultOpen: true, icon: <NavIcon icon={TextCursorInput} />, items: [{ to: '/components/input', label: 'Input' }, { to: '/components/select', label: 'Select' }, { to: '/components/checkbox', label: 'Checkbox' }] }, { section: d("Components", "组件"), label: d("Data display", "数据展示"), collapsible: true, icon: <NavIcon icon={Table2} />, items: [{ to: '/components/table', label: 'Table' }, { to: '/components/data-table', label: 'DataTable' }] }]} /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
