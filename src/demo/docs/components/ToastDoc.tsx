import { Button, useToast } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('toast')
const props: PropDef[] = [{ name: 'toast(msg, tone?)', type: 'fn', desc: '需 ToastProvider；tone: info|success|warn|error|danger' }]

export function ToastDoc() {
  const { toast } = useToast()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="色调" code={`toast('提示', 'info')
toast('已保存', 'success')
toast('注意', 'warn')
toast('出错了', 'error')`}>
        <div className="showcase-row"><Button onClick={() => toast('提示信息', 'info')}>info</Button><Button onClick={() => toast('已保存', 'success')}>success</Button><Button onClick={() => toast('请注意', 'warn')}>warn</Button><Button onClick={() => toast('出错了', 'error')}>error</Button><Button onClick={() => toast('危险操作', 'danger')}>danger</Button></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
