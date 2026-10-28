import { Button, Popover } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('popover')
const props: PropDef[] = [{ name: 'trigger', type: 'ReactNode', desc: { en: "Trigger", zh: "触发器" } }, { name: 'children', type: 'ReactNode', desc: { en: "Content", zh: "内容" } }, { name: 'align', type: "'start'|'center'|'end'", default: "'start'", desc: { en: "Alignment", zh: "对齐" } }]

export function PopoverDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<Popover trigger={<Button>Popover</Button>}>
  <p>Anchored popover content</p>
</Popover>`}>
        <Popover trigger={<Button variant="secondary">Popover</Button>}><p style={{ margin: 0, fontSize: 13 }}>{d("Anchored popover content.", "锚点浮层内容。")}</p></Popover>
      </DocDemo>
      <DocDemo title={d("Alignment", "对齐")} code={`<Popover
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
