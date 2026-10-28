import { useState } from 'react'
import { Button, Sheet } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('sheet')
const props: PropDef[] = [{ name: 'open', type: 'boolean', desc: { en: "Open", zh: "打开" } }, { name: 'side', type: "'bottom'|'top'", default: "'bottom'", desc: { en: "Direction", zh: "方向" } }, { name: 'title', type: 'ReactNode', desc: { en: "Title", zh: "标题" } }, { name: 'footer', type: 'ReactNode', desc: { en: "Bottom", zh: "底部" } }]

export function SheetDoc() {
  const d = useDemoT()
  const [open, setOpen] = useState(false)
  const [side, setSide] = useState<'bottom' | 'top'>('bottom')
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<Button onClick={() => { setSide('bottom'); setOpen(true) }}>
  Open Sheet
</Button>
<Sheet
  open={open}
  onClose={() => setOpen(false)}
  title="Panel"
  side={side}
  footer={<Button onClick={() => setOpen(false)}>Close</Button>}
>
  <p className="muted" style={{ margin: 0 }}>
    Sheet content (side={side}).
  </p>
</Sheet>`}>
        <><Button onClick={() => { setSide('bottom'); setOpen(true) }}>{d('Open Sheet', '打开 Sheet')}</Button><Sheet open={open} onClose={() => setOpen(false)} title={d('Panel', '面板')} side={side} footer={<Button onClick={() => setOpen(false)}>{d('Close', '关闭')}</Button>}><p className="muted" style={{ margin: 0 }}>{d('Sheet content (side=', '薄板内容（side=')}{side}{d(').', '）。')}</p></Sheet></>
      </DocDemo>
      <DocDemo title={d("Direction", "方向")} code={`<Button size="sm" onClick={() => { setSide('top'); setOpen(true) }}>
  Top
</Button>
<Button size="sm" onClick={() => { setSide('bottom'); setOpen(true) }}>
  Bottom
</Button>`}>
        <div className="showcase-row"><Button size="sm" onClick={() => { setSide('top'); setOpen(true) }}>{d("Top", "顶部")}</Button><Button size="sm" onClick={() => { setSide('bottom'); setOpen(true) }}>{d("Bottom", "底部")}</Button></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
