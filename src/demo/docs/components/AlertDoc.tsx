import { Alert } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('alert')
const props: PropDef[] = [{ name: 'tone', type: "'info'|'success'|'warn'|'danger'|'error'", default: "'info'", desc: '语义色；error 等同 danger' }, { name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'dismissible', type: 'boolean', default: 'false', desc: '可关闭' }]

export function AlertDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="色调" code={`<Alert tone="info" title="提示">信息条。</Alert>
<Alert tone="success" title="成功">操作已完成。</Alert>
<Alert tone="warn" title="警告">资源即将耗尽。</Alert>
<Alert tone="danger" title="错误">请求失败。</Alert>`}>
        <div className="stack"><Alert tone="info" title="提示">信息条。</Alert><Alert tone="success" title="成功">操作已完成。</Alert><Alert tone="warn" title="警告">资源即将耗尽。</Alert><Alert tone="danger" title="错误">请求失败。</Alert></div>
      </DocDemo>
      <DocDemo title="可关闭" code={`<Alert tone="warn" title="可关闭" dismissible>关闭后本地隐藏。</Alert>`}>
        <Alert tone="warn" title="可关闭" dismissible>关闭后本地隐藏。</Alert>
      </DocDemo>
    </ComponentDocLayout>
  )
}
