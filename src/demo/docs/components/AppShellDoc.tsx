import { AppShell, Brand } from '@/components/layout'
import { Text } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('app-shell')
const props: PropDef[] = [{ name: 'navGroups', type: 'NavGroup[]', desc: '侧栏分组；支持 section 分区标题与 collapsible 可折叠分组，见 Sidebar' }, { name: 'brand', type: 'ReactNode', desc: '品牌区' }, { name: 'topbarTitle', type: 'ReactNode', desc: '顶栏标题' }, { name: 'topbarRight', type: 'ReactNode', desc: '顶栏右侧' }, { name: 'children', type: 'ReactNode', desc: '主内容' }]

export function AppShellDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="迷你预览" description="完整壳层；此处缩小高度便于馆页展示。" wide code={`<AppShell
  brand={<Brand />}
  topbarTitle="概览"
  navGroups={[{ items: [{ to: '/', label: '首页', end: true }] }]}
>
  内容
</AppShell>`}>
        <div style={{ height: 220, overflow: 'hidden', border: '1px solid var(--border)', borderRadius: 8 }}><AppShell brand={<Brand text="Demo" />} topbarTitle="概览" defaultCollapsed navGroups={[{ items: [{ to: '/components/app-shell', label: '首页', end: true }, { to: '/components', label: '组件' }] }]}><div style={{ padding: 16 }}><Text variant="muted" size="md">主内容区</Text></div></AppShell></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
