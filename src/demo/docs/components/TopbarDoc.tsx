import { Button, Text } from '@/components/ui'
import { Topbar } from '@/components/layout'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('topbar')
const props: PropDef[] = [{ name: 'leading', type: 'ReactNode', desc: '左侧前置' }, { name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'right', type: 'ReactNode', desc: '右侧' }]

export function TopbarDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" wide code={`<Topbar title="概览" right={<Button size="sm">操作</Button>} />`}>
        <div style={{ border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}><Topbar title={<Text>概览</Text>} right={<Button size="sm">操作</Button>} /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
