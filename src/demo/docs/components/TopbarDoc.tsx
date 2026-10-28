import { Button, Text } from '@/components/ui'
import { Topbar } from '@/components/layout'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('topbar')
const props: PropDef[] = [{ name: 'leading', type: 'ReactNode', desc: { en: "Left-side leading", zh: "左侧前置" } }, { name: 'title', type: 'ReactNode', desc: { en: "Title", zh: "标题" } }, { name: 'right', type: 'ReactNode', desc: { en: "Right side", zh: "右侧" } }]

export function TopbarDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} wide code={`<Topbar title="Overview" right={<Button size="sm">Action</Button>} />`}>
        <div style={{ border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}><Topbar title={<Text>{d("Overview", "概览")}</Text>} right={<Button size="sm">{d("Action", "操作")}</Button>} /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
