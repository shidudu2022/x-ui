import { useState } from 'react'
import { LayoutDashboard, Rocket, Settings, Table2, TextCursorInput } from 'lucide-react'
import { Brand, NavIcon, Sidebar } from '@/components/layout'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('sidebar')
const props: PropDef[] = [{ name: 'groups', type: 'NavGroup[]', desc: '导航分组' }, { name: 'brand', type: 'ReactNode', desc: '品牌' }, { name: 'collapsed', type: 'boolean', default: 'false', desc: '图标栏模式' }, { name: 'onToggleCollapse', type: '() => void', desc: '折叠切换；不传则不显示折叠把手' }, { name: 'footer', type: 'ReactNode', desc: '底部' }, { name: 'NavGroup.label', type: 'string', desc: '分组标题' }, { name: 'NavGroup.section', type: 'string', desc: '分区标题；在首个同名分组前渲染一次' }, { name: 'NavGroup.collapsible', type: 'boolean', default: 'false', desc: '渲染为可折叠分组（需要 label）；含当前路由时自动展开' }, { name: 'NavGroup.defaultOpen', type: 'boolean', default: 'false', desc: '初始展开' }, { name: 'NavGroup.icon', type: 'ReactNode', desc: '分组图标；图标栏模式下代表整个分组' }, { name: 'NavItem', type: '{ to, label, icon?, end? }', desc: '导航项，to 为路由路径' }]

export function SidebarDoc() {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础与图标栏" description="点击左侧把手在完整模式与图标栏之间切换。" wide code={`<Sidebar
  brand={<Brand />}
  collapsed={collapsed}
  onToggleCollapse={() => setCollapsed((v) => !v)}
  groups={[
    {
      label: '导航',
      items: [
        { to: '/', label: '概览', icon: <NavIcon icon={LayoutDashboard} />, end: true },
        { to: '/settings', label: '设置', icon: <NavIcon icon={Settings} /> },
      ],
    },
  ]}
/>`}>
        <div className="sidebar-demo-frame" style={{ width: collapsed ? 72 : 232 }}><Sidebar brand={<Brand text="Demo" showText={!collapsed} />} collapsed={collapsed} onToggleCollapse={() => setCollapsed((v) => !v)} groups={[{ label: '导航', items: [{ to: '/components/sidebar', label: '概览', icon: <NavIcon icon={LayoutDashboard} />, end: true }, { to: '/components', label: '设置', icon: <NavIcon icon={Settings} /> }] }]} /></div>
      </DocDemo>
      <DocDemo title="分区标题与可折叠分组" description="section 渲染分区标题；collapsible 的分组默认收起，含当前路由或 defaultOpen 时展开。分组较多（如组件分类）时使用。" wide code={`<Sidebar
  groups={[
    {
      section: '开始',
      items: [
        { to: '/', label: '概览', icon: <NavIcon icon={LayoutDashboard} />, end: true },
        { to: '/docs/getting-started', label: '快速开始', icon: <NavIcon icon={Rocket} /> },
      ],
    },
    {
      section: '组件',
      label: '表单',
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
      section: '组件',
      label: '数据展示',
      collapsible: true,
      icon: <NavIcon icon={Table2} />,
      items: [
        { to: '/components/table', label: 'Table' },
        { to: '/components/data-table', label: 'DataTable' },
      ],
    },
  ]}
/>`}>
        <div className="sidebar-demo-frame" style={{ width: 240, height: 420 }}><Sidebar brand={<Brand text="Demo" />} groups={[{ section: '开始', items: [{ to: '/', label: '概览', icon: <NavIcon icon={LayoutDashboard} />, end: true }, { to: '/docs/getting-started', label: '快速开始', icon: <NavIcon icon={Rocket} /> }] }, { section: '组件', label: '表单', collapsible: true, defaultOpen: true, icon: <NavIcon icon={TextCursorInput} />, items: [{ to: '/components/input', label: 'Input' }, { to: '/components/select', label: 'Select' }, { to: '/components/checkbox', label: 'Checkbox' }] }, { section: '组件', label: '数据展示', collapsible: true, icon: <NavIcon icon={Table2} />, items: [{ to: '/components/table', label: 'Table' }, { to: '/components/data-table', label: 'DataTable' }] }]} /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
