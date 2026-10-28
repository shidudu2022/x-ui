import { useState } from 'react'
import { Button, StrongConfirmDrawer } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('strong-confirm-drawer')
const props: PropDef[] = [{ name: 'open', type: 'boolean', desc: { en: "Open", zh: "打开" } }, { name: 'title', type: 'ReactNode', desc: { en: "Title", zh: "标题" } }, { name: 'resourceName', type: 'string', desc: { en: "Resource name the user must type", zh: "需输入的资源名" } }, { name: 'confirmValue', type: 'string', desc: { en: "Override confirmation string", zh: "覆盖确认串" } }, { name: 'danger', type: 'boolean', desc: { en: "Danger style", zh: "危险样式" } }, { name: 'onConfirm', type: '() => void', desc: { en: "Confirm", zh: "确认" } }]

export function StrongConfirmDrawerDoc() {
  const d = useDemoT()
  const [open, setOpen] = useState(false)
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<StrongConfirmDrawer
  open={open}
  onClose={() => setOpen(false)}
  title="Delete cluster"
  resourceName="prod-cluster"
  onConfirm={() => {}}
/>`}>
        <><Button variant="danger" onClick={() => setOpen(true)}>{d("Open strong-confirm drawer", "打开强确认抽屉")}</Button><StrongConfirmDrawer open={open} onClose={() => setOpen(false)} title={d("Delete cluster", "删除集群")} resourceName="prod-cluster" onConfirm={() => undefined}>{d("This will permanently delete the cluster and its associated resources.", "将永久删除该集群及关联资源。")}</StrongConfirmDrawer></>
      </DocDemo>
    </ComponentDocLayout>
  )
}
