import { Button, confirm, useToast } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('confirm')
const props: PropDef[] = [{ name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'description', type: 'ReactNode', desc: '说明' }, { name: 'danger', type: 'boolean', desc: '危险样式' }, { name: 'resourceName', type: 'string', desc: '需输入确认的资源名' }]

export function ConfirmDoc() {
  const { toast } = useToast()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" description="需 ConfirmProvider。" code={`await confirm({ title: '继续？', description: '普通确认' })`}>
        <Button onClick={() => { void confirm({ title: '继续？', description: '普通确认' }).then((ok) => { if (ok) toast('已确认', 'success') }) }}>confirm()</Button>
      </DocDemo>
      <DocDemo title="危险" code={`await confirm({ title: '删除？', description: '不可恢复', danger: true })`}>
        <Button variant="danger" onClick={() => { void confirm({ title: '删除？', description: '不可恢复', danger: true }).then((ok) => { if (ok) toast('已删除', 'success') }) }}>危险确认</Button>
      </DocDemo>
    </ComponentDocLayout>
  )
}
