import { Button, useToast } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('toast')
const props: PropDef[] = [{ name: 'toast(msg, tone?)', type: 'fn', desc: { en: "Requires ToastProvider; tone: info|success|warn|error|danger", zh: "需 ToastProvider；tone: info|success|warn|error|danger" } }]

export function ToastDoc() {
  const d = useDemoT()
  const { toast } = useToast()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Tones", "色调")} code={`toast('Hint', 'info')
toast('Saved', 'success')
toast('Attention', 'warn')
toast('Something went wrong', 'error')`}>
        <div className="showcase-row"><Button onClick={() => toast(d("Info message", "提示信息"), 'info')}>info</Button><Button onClick={() => toast(d("Saved", "已保存"), 'success')}>success</Button><Button onClick={() => toast(d("Please note", "请注意"), 'warn')}>warn</Button><Button onClick={() => toast(d("Something went wrong", "出错了"), 'error')}>error</Button><Button onClick={() => toast(d("Dangerous action", "危险操作"), 'danger')}>danger</Button></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
