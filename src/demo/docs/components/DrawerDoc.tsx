import { useState } from 'react'
import { Button, Drawer } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('drawer')
const props: PropDef[] = [{ name: 'open', type: 'boolean', desc: { en: "Whether open", zh: "是否打开" } }, { name: 'onClose', type: 'fn', desc: { en: "Close", zh: "关闭" } }, { name: 'side', type: "'right'|'left'", default: "'right'", desc: { en: "Direction", zh: "方向" } }, { name: 'size', type: "'sm'|'md'|'lg'|'xl'", default: "'lg'", desc: { en: "Width", zh: "宽度" } }]

export function DrawerDoc() {
  const d = useDemoT()
  const [open, setOpen] = useState(false)
  const [side, setSide] = useState<'right' | 'left'>('right')
  const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('lg')
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<Button onClick={() => { setSide('right'); setSize('lg'); setOpen(true) }}>
  Open Drawer
</Button>
<Drawer
  open={open}
  onClose={() => setOpen(false)}
  title="Details"
  side={side}
  size={size}
  footer={<Button onClick={() => setOpen(false)}>Close</Button>}
>
  <p className="muted" style={{ margin: 0 }}>
    Slide-in drawer (side={side}, size={size}).
  </p>
</Drawer>`}>
        <><Button onClick={() => { setSide('right'); setSize('lg'); setOpen(true) }}>{d('Open Drawer', '打开 Drawer')}</Button><Drawer open={open} onClose={() => setOpen(false)} title={d('Details', '详情')} side={side} size={size} footer={<Button onClick={() => setOpen(false)}>{d('Close', '关闭')}</Button>}><p className="muted" style={{ margin: 0 }}>{d('Slide-in drawer (side=', '侧滑抽屉（side=')}{side}{d(', size=', ' · size=')}{size}{d(').', '）。')}</p></Drawer></>
      </DocDemo>
      <DocDemo title={d("Direction & sizes", "方向 / 尺寸")} code={`<Button
  size="sm"
  onClick={() => { setSide('left'); setSize('sm'); setOpen(true) }}
>
  Left sm
</Button>
<Button
  size="sm"
  onClick={() => { setSide('right'); setSize('xl'); setOpen(true) }}
>
  Right xl
</Button>`}>
        <div className="showcase-row"><Button size="sm" onClick={() => { setSide('left'); setSize('sm'); setOpen(true) }}>{d("Left sm", "左侧 sm")}</Button><Button size="sm" onClick={() => { setSide('right'); setSize('xl'); setOpen(true) }}>{d("Right xl", "右侧 xl")}</Button></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
