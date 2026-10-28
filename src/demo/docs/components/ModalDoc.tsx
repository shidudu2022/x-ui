import { useState } from 'react'
import { Button, Modal } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('modal')
const props: PropDef[] = [{ name: 'open', type: 'boolean', desc: { en: "Whether open", zh: "是否打开" } }, { name: 'onClose', type: '() => void', desc: { en: "Close", zh: "关闭" } }, { name: 'title', type: 'ReactNode', desc: { en: "Title", zh: "标题" } }, { name: 'footer', type: 'ReactNode', desc: { en: "Bottom", zh: "底部" } }, { name: 'size', type: "'sm'|'md'|'lg'", default: "'md'", desc: { en: "Sizes", zh: "尺寸" } }]

export function ModalDoc() {
  const d = useDemoT()
  const [open, setOpen] = useState(false)
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md')
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<Button onClick={() => { setSize('md'); setOpen(true) }}>
  Open Modal
</Button>
<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Example dialog"
  size={size}
  footer={
    <div className="actions">
      <Button onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="primary" onClick={() => setOpen(false)}>
        OK
      </Button>
    </div>
  }
>
  <p style={{ margin: 0, fontSize: 13 }}>
    Centered dialog content (size={size}).
  </p>
</Modal>`}>
        <><Button onClick={() => { setSize('md'); setOpen(true) }}>{d('Open Modal', '打开 Modal')}</Button><Modal open={open} onClose={() => setOpen(false)} title={d('Example dialog', '示例弹窗')} size={size} footer={<div className="actions"><Button onClick={() => setOpen(false)}>{d('Cancel', '取消')}</Button><Button variant="primary" onClick={() => setOpen(false)}>{d('OK', '确定')}</Button></div>}><p style={{ margin: 0, fontSize: 13 }}>{d('Centered dialog content (size=', '居中对话框内容（size=')}{size}{d(').', '）。')}</p></Modal></>
      </DocDemo>
      <DocDemo title={d("Sizes", "尺寸")} code={`<Button onClick={() => openSm()}>sm</Button>
<Button onClick={() => openLg()}>lg</Button>`}>
        <div className="showcase-row"><Button size="sm" onClick={() => { setSize('sm'); setOpen(true) }}>sm</Button><Button size="sm" onClick={() => { setSize('md'); setOpen(true) }}>md</Button><Button size="sm" onClick={() => { setSize('lg'); setOpen(true) }}>lg</Button></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
