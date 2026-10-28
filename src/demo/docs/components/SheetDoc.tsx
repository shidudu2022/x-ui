import { useState } from 'react'
import { Button, Sheet } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('sheet')
const props: PropDef[] = [{ name: 'open', type: 'boolean', desc: '打开' }, { name: 'side', type: "'bottom'|'top'", default: "'bottom'", desc: '方向' }, { name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'footer', type: 'ReactNode', desc: '底部' }]

export function SheetDoc() {
  const [open, setOpen] = useState(false)
  const [side, setSide] = useState<'bottom' | 'top'>('bottom')
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<Button onClick={() => { setSide('bottom'); setOpen(true) }}>
  打开 Sheet
</Button>
<Sheet
  open={open}
  onClose={() => setOpen(false)}
  title="面板"
  side={side}
  footer={<Button onClick={() => setOpen(false)}>关闭</Button>}
>
  <p className="muted" style={{ margin: 0 }}>
    薄板内容（side={side}）。
  </p>
</Sheet>`}>
        <><Button onClick={() => { setSide('bottom'); setOpen(true) }}>打开 Sheet</Button><Sheet open={open} onClose={() => setOpen(false)} title="面板" side={side} footer={<Button onClick={() => setOpen(false)}>关闭</Button>}><p className="muted" style={{ margin: 0 }}>薄板内容（side={side}）。</p></Sheet></>
      </DocDemo>
      <DocDemo title="方向" code={`<Button size="sm" onClick={() => { setSide('top'); setOpen(true) }}>
  顶部
</Button>
<Button size="sm" onClick={() => { setSide('bottom'); setOpen(true) }}>
  底部
</Button>`}>
        <div className="showcase-row"><Button size="sm" onClick={() => { setSide('top'); setOpen(true) }}>顶部</Button><Button size="sm" onClick={() => { setSide('bottom'); setOpen(true) }}>底部</Button></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
