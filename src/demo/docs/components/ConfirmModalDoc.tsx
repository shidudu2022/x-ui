import { useState } from 'react'
import { Button, ConfirmModal } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('confirm-modal')
const props: PropDef[] = [{ name: 'open', type: 'boolean', desc: { en: "Open", zh: "打开" } }, { name: 'title', type: 'ReactNode', desc: { en: "Title", zh: "标题" } }, { name: 'resourceName', type: 'string', desc: { en: "Highlighted resource name", zh: "高亮资源名" } }, { name: 'confirmValue', type: 'string', desc: { en: "Confirmation string the user must type", zh: "需输入的确认串" } }, { name: 'danger', type: 'boolean', desc: { en: "Danger style", zh: "危险样式" } }, { name: 'onConfirm', type: '() => void', desc: { en: "Confirm", zh: "确认" } }]

export function ConfirmModalDoc() {
  const d = useDemoT()
  const [open, setOpen] = useState(false)
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<ConfirmModal
  open={open}
  onClose={() => setOpen(false)}
  title="Delete resource?"
  resourceName="prod-api"
  danger
  onConfirm={() => {}}
>
  Cannot be undone after deletion.
</ConfirmModal>`}>
        <><Button variant="danger" onClick={() => setOpen(true)}>{d("Open ConfirmModal", "打开 ConfirmModal")}</Button><ConfirmModal open={open} onClose={() => setOpen(false)} title={d("Delete resource?", "删除资源？")} resourceName="prod-api" danger onConfirm={() => undefined}>{d("Cannot be undone after deletion.", "删除后不可恢复。")}</ConfirmModal></>
      </DocDemo>
    </ComponentDocLayout>
  )
}
