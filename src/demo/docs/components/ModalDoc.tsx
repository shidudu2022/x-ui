import { useState } from 'react'
import { Button, Modal } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('modal')
const props: PropDef[] = [{ name: 'open', type: 'boolean', desc: '是否打开' }, { name: 'onClose', type: '() => void', desc: '关闭' }, { name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'footer', type: 'ReactNode', desc: '底部' }, { name: 'size', type: "'sm'|'md'|'lg'", default: "'md'", desc: '尺寸' }]

export function ModalDoc() {
  const [open, setOpen] = useState(false)
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md')
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<Button onClick={() => { setSize('md'); setOpen(true) }}>
  打开 Modal
</Button>
<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="示例弹窗"
  size={size}
  footer={
    <div className="actions">
      <Button onClick={() => setOpen(false)}>取消</Button>
      <Button variant="primary" onClick={() => setOpen(false)}>
        确定
      </Button>
    </div>
  }
>
  <p style={{ margin: 0, fontSize: 13 }}>
    居中对话框内容（size={size}）。
  </p>
</Modal>`}>
        <><Button onClick={() => { setSize('md'); setOpen(true) }}>打开 Modal</Button><Modal open={open} onClose={() => setOpen(false)} title="示例弹窗" size={size} footer={<div className="actions"><Button onClick={() => setOpen(false)}>取消</Button><Button variant="primary" onClick={() => setOpen(false)}>确定</Button></div>}><p style={{ margin: 0, fontSize: 13 }}>居中对话框内容（size={size}）。</p></Modal></>
      </DocDemo>
      <DocDemo title="尺寸" code={`<Button onClick={() => openSm()}>sm</Button>
<Button onClick={() => openLg()}>lg</Button>`}>
        <div className="showcase-row"><Button size="sm" onClick={() => { setSize('sm'); setOpen(true) }}>sm</Button><Button size="sm" onClick={() => { setSize('md'); setOpen(true) }}>md</Button><Button size="sm" onClick={() => { setSize('lg'); setOpen(true) }}>lg</Button></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
