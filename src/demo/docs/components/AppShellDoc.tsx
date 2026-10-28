import { AppShell, Brand } from '@/components/layout'
import { Text } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('app-shell')
const props: PropDef[] = [{ name: 'navGroups', type: 'NavGroup[]', desc: { en: "Sidebar nav groups; supports section headings and collapsible groups, see Sidebar", zh: "侧栏分组；支持 section 分区标题与 collapsible 可折叠分组，见 Sidebar" } }, { name: 'brand', type: 'ReactNode', desc: { en: "Brand area", zh: "品牌区" } }, { name: 'topbarTitle', type: 'ReactNode', desc: { en: "Topbar title", zh: "顶栏标题" } }, { name: 'topbarRight', type: 'ReactNode', desc: { en: "Topbar right side", zh: "顶栏右侧" } }, { name: 'children', type: 'ReactNode', desc: { en: "Main content", zh: "主内容" } }]

export function AppShellDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Mini preview", "迷你预览")} description={d("Full shell; height reduced here for the docs gallery.", "完整壳层；此处缩小高度便于馆页展示。")} wide code={`<AppShell
  brand={<Brand />}
  topbarTitle="Overview"
  navGroups={[{ items: [{ to: '/', label: 'Home', end: true }] }]}
>
  Content
</AppShell>`}>
        <div style={{ height: 220, overflow: 'hidden', border: '1px solid var(--border)', borderRadius: 8 }}><AppShell brand={<Brand text="Demo" />} topbarTitle={d("Overview", "概览")} defaultCollapsed navGroups={[{ items: [{ to: '/components/app-shell', label: d("Home", "首页"), end: true }, { to: '/components', label: d("Components", "组件") }] }]}><div style={{ padding: 16 }}><Text variant="muted" size="md">{d("Main content area", "主内容区")}</Text></div></AppShell></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
