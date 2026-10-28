import { Alert } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('alert')
const props: PropDef[] = [{ name: 'tone', type: "'info'|'success'|'warn'|'danger'|'error'", default: "'info'", desc: { en: "Semantic tone; error is the same as danger", zh: "语义色；error 等同 danger" } }, { name: 'title', type: 'ReactNode', desc: { en: "Title", zh: "标题" } }, { name: 'dismissible', type: 'boolean', default: 'false', desc: { en: "Dismissible", zh: "可关闭" } }]

export function AlertDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Tones", "色调")} code={`<Alert tone="info" title="Hint">An info banner.</Alert>
<Alert tone="success" title="Success">The action has completed.</Alert>
<Alert tone="warn" title="Warning">Resources are about to run out.</Alert>
<Alert tone="danger" title="Error">The request failed.</Alert>`}>
        <div className="stack"><Alert tone="info" title={d("Hint", "提示")}>{d("An info banner.", "信息条。")}</Alert><Alert tone="success" title={d("Success", "成功")}>{d("The action has completed.", "操作已完成。")}</Alert><Alert tone="warn" title={d("Warning", "警告")}>{d("Resources are about to run out.", "资源即将耗尽。")}</Alert><Alert tone="danger" title={d("Error", "错误")}>{d("The request failed.", "请求失败。")}</Alert></div>
      </DocDemo>
      <DocDemo title={d("Dismissible", "可关闭")} code={`<Alert tone="warn" title="Dismissible" dismissible>Hides locally once dismissed.</Alert>`}>
        <Alert tone="warn" title={d("Dismissible", "可关闭")} dismissible>{d("Hides locally once dismissed.", "关闭后本地隐藏。")}</Alert>
      </DocDemo>
    </ComponentDocLayout>
  )
}
