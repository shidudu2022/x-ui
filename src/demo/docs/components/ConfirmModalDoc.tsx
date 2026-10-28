import { useState } from 'react'
import { Button, ConfirmModal } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('confirm-modal')
const props: PropDef[] = [{ name: 'open', type: 'boolean', desc: '打开' }, { name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'resourceName', type: 'string', desc: '高亮资源名' }, { name: 'confirmValue', type: 'string', desc: '需输入的确认串' }, { name: 'danger', type: 'boolean', desc: '危险样式' }, { name: 'onConfirm', type: '() => void', desc: '确认' }]

export function ConfirmModalDoc() {
  const [open, setOpen] = useState(false)
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<ConfirmModal
  open={open}
  onClose={() => setOpen(false)}
  title="删除资源？"
  resourceName="prod-api"
  danger
  onConfirm={() => {}}
>
  删除后不可恢复。
</ConfirmModal>`}>
        <><Button variant="danger" onClick={() => setOpen(true)}>打开 ConfirmModal</Button><ConfirmModal open={open} onClose={() => setOpen(false)} title="删除资源？" resourceName="prod-api" danger onConfirm={() => undefined}>删除后不可恢复。</ConfirmModal></>
      </DocDemo>
    </ComponentDocLayout>
  )
}
