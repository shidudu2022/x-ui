import { useState } from 'react'
import { Button, StrongConfirmDrawer } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('strong-confirm-drawer')
const props: PropDef[] = [{ name: 'open', type: 'boolean', desc: '打开' }, { name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'resourceName', type: 'string', desc: '需输入的资源名' }, { name: 'confirmValue', type: 'string', desc: '覆盖确认串' }, { name: 'danger', type: 'boolean', desc: '危险样式' }, { name: 'onConfirm', type: '() => void', desc: '确认' }]

export function StrongConfirmDrawerDoc() {
  const [open, setOpen] = useState(false)
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<StrongConfirmDrawer
  open={open}
  onClose={() => setOpen(false)}
  title="删除集群"
  resourceName="prod-cluster"
  onConfirm={() => {}}
/>`}>
        <><Button variant="danger" onClick={() => setOpen(true)}>打开强确认抽屉</Button><StrongConfirmDrawer open={open} onClose={() => setOpen(false)} title="删除集群" resourceName="prod-cluster" onConfirm={() => undefined}>将永久删除该集群及关联资源。</StrongConfirmDrawer></>
      </DocDemo>
    </ComponentDocLayout>
  )
}
