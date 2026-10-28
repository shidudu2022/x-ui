import { useState } from 'react'
import { Button, Drawer } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('drawer')
const props: PropDef[] = [{ name: 'open', type: 'boolean', desc: '是否打开' }, { name: 'onClose', type: 'fn', desc: '关闭' }, { name: 'side', type: "'right'|'left'", default: "'right'", desc: '方向' }, { name: 'size', type: "'sm'|'md'|'lg'|'xl'", default: "'lg'", desc: '宽度' }]

export function DrawerDoc() {
  const [open, setOpen] = useState(false)
  const [side, setSide] = useState<'right' | 'left'>('right')
  const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('lg')
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<Button onClick={() => { setSide('right'); setSize('lg'); setOpen(true) }}>
  打开 Drawer
</Button>
<Drawer
  open={open}
  onClose={() => setOpen(false)}
  title="详情"
  side={side}
  size={size}
  footer={<Button onClick={() => setOpen(false)}>关闭</Button>}
>
  <p className="muted" style={{ margin: 0 }}>
    侧滑抽屉（side={side} · size={size}）。
  </p>
</Drawer>`}>
        <><Button onClick={() => { setSide('right'); setSize('lg'); setOpen(true) }}>打开 Drawer</Button><Drawer open={open} onClose={() => setOpen(false)} title="详情" side={side} size={size} footer={<Button onClick={() => setOpen(false)}>关闭</Button>}><p className="muted" style={{ margin: 0 }}>侧滑抽屉（side={side} · size={size}）。</p></Drawer></>
      </DocDemo>
      <DocDemo title="方向 / 尺寸" code={`<Button
  size="sm"
  onClick={() => { setSide('left'); setSize('sm'); setOpen(true) }}
>
  左侧 sm
</Button>
<Button
  size="sm"
  onClick={() => { setSide('right'); setSize('xl'); setOpen(true) }}
>
  右侧 xl
</Button>`}>
        <div className="showcase-row"><Button size="sm" onClick={() => { setSide('left'); setSize('sm'); setOpen(true) }}>左侧 sm</Button><Button size="sm" onClick={() => { setSide('right'); setSize('xl'); setOpen(true) }}>右侧 xl</Button></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
