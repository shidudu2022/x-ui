import { Button, confirm, useToast } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('confirm')
const props: PropDef[] = [{ name: 'title', type: 'ReactNode', desc: { en: "Title", zh: "标题" } }, { name: 'description', type: 'ReactNode', desc: { en: "Description", zh: "说明" } }, { name: 'danger', type: 'boolean', desc: { en: "Danger style", zh: "危险样式" } }, { name: 'resourceName', type: 'string', desc: { en: "Resource name required to confirm", zh: "需输入确认的资源名" } }]

export function ConfirmDoc() {
  const d = useDemoT()
  const { toast } = useToast()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} description={d("Requires ConfirmProvider.", "需 ConfirmProvider。")} code={`await confirm({ title: 'Continue?', description: 'Plain confirm' })`}>
        <Button onClick={() => { void confirm({ title: d("Continue?", "继续？"), description: d("Plain confirm", "普通确认") }).then((ok) => { if (ok) toast(d("Confirmed", "已确认"), 'success') }) }}>confirm()</Button>
      </DocDemo>
      <DocDemo title={d("Danger", "危险")} code={`await confirm({ title: 'Delete?', description: 'Cannot be undone', danger: true })`}>
        <Button variant="danger" onClick={() => { void confirm({ title: d("Delete?", "删除？"), description: d("Cannot be undone", "不可恢复"), danger: true }).then((ok) => { if (ok) toast(d("Deleted", "已删除"), 'success') }) }}>{d("Danger confirm", "危险确认")}</Button>
      </DocDemo>
    </ComponentDocLayout>
  )
}
