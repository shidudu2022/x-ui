import { Button, Popover } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('popover')
const props: PropDef[] = [{ name: 'trigger', type: 'ReactNode', desc: '触发器' }, { name: 'children', type: 'ReactNode', desc: '内容' }, { name: 'align', type: "'start'|'center'|'end'", default: "'start'", desc: '对齐' }]

export function PopoverDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<Popover trigger={<Button>Popover</Button>}>
  <p>锚点浮层内容</p>
</Popover>`}>
        <Popover trigger={<Button variant="secondary">Popover</Button>}><p style={{ margin: 0, fontSize: 13 }}>锚点浮层内容。</p></Popover>
      </DocDemo>
      <DocDemo title="对齐" code={`<Popover
  align="start"
  trigger={<Button size="sm">start</Button>}
>
  <p style={{ margin: 0, fontSize: 13 }}>align=start</p>
</Popover>
<Popover
  align="center"
  trigger={<Button size="sm">center</Button>}
>
  <p style={{ margin: 0, fontSize: 13 }}>align=center</p>
</Popover>
<Popover
  align="end"
  trigger={<Button size="sm">end</Button>}
>
  <p style={{ margin: 0, fontSize: 13 }}>align=end</p>
</Popover>`}>
        <div className="showcase-row"><Popover align="start" trigger={<Button size="sm">start</Button>}><p style={{ margin: 0, fontSize: 13 }}>align=start</p></Popover><Popover align="center" trigger={<Button size="sm">center</Button>}><p style={{ margin: 0, fontSize: 13 }}>align=center</p></Popover><Popover align="end" trigger={<Button size="sm">end</Button>}><p style={{ margin: 0, fontSize: 13 }}>align=end</p></Popover></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
