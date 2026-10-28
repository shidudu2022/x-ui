import { Button, Tooltip } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('tooltip')
const props: PropDef[] = [{ name: 'content', type: 'ReactNode', desc: '提示内容' }, { name: 'side', type: "'top'|'right'|'bottom'|'left'", default: "'top'", desc: '方向' }, { name: 'disabled', type: 'boolean', desc: '禁用' }]

export function TooltipDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="方向" code={`<Tooltip content="上" side="top"><Button>上</Button></Tooltip>
<Tooltip content="右" side="right"><Button>右</Button></Tooltip>
<Tooltip content="下" side="bottom"><Button>下</Button></Tooltip>
<Tooltip content="左" side="left"><Button>左</Button></Tooltip>`}>
        <div className="showcase-row"><Tooltip content="上" side="top"><Button variant="ghost">上</Button></Tooltip><Tooltip content="右" side="right"><Button variant="ghost">右</Button></Tooltip><Tooltip content="下" side="bottom"><Button variant="ghost">下</Button></Tooltip><Tooltip content="左" side="left"><Button variant="ghost">左</Button></Tooltip></div>
      </DocDemo>
      <DocDemo title="禁用" code={`<Tooltip content="不会出现" disabled>
  <Button>禁用提示</Button>
</Tooltip>`}>
        <Tooltip content="不会出现" disabled><Button variant="ghost">禁用提示</Button></Tooltip>
      </DocDemo>
    </ComponentDocLayout>
  )
}
