import { Button, StatCard } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('stat-card')
const props: PropDef[] = [{ name: 'label', type: 'ReactNode', desc: { en: "Label", zh: "标签" } }, { name: 'value', type: 'ReactNode', desc: { en: "Value", zh: "数值" } }, { name: 'hint', type: 'ReactNode', desc: { en: "Hint", zh: "辅助" } }, { name: 'tone', type: "'neutral'|'success'|'warn'|'danger'|'info'", desc: { en: "Tones", zh: "色调" } }, { name: 'action', type: 'ReactNode', desc: { en: "Top-right action", zh: "右上操作" } }]

export function StatCardDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Tones", "色调")} wide code={`<StatCard label="Neutral" value="—" tone="neutral" />
<StatCard label="Success" value="12" tone="success" />
<StatCard label="Warning" value="3" tone="warn" />
<StatCard label="Danger" value="1" tone="danger" />
<StatCard label="Info" value="8" tone="info" />`}>
        <div className="grid-2"><StatCard label={d("Neutral", "中性")} value="—" hint={d("No data", "无数据")} tone="neutral" /><StatCard label={d("Success", "成功")} value="12" hint={d("+2 vs last week", "较上周 +2")} tone="success" /><StatCard label={d("Warning", "警告")} value="3" hint={d("Needs attention", "需处理")} tone="warn" /><StatCard label={d("Danger", "危险")} value="1" hint={d("Needs immediate attention", "立即处理")} tone="danger" /><StatCard label={d("Info", "信息")} value="8" hint={d("In progress", "进行中")} tone="info" /></div>
      </DocDemo>
      <DocDemo title={d("Enhanced", "增强")} description={d("Action in the top-right corner.", "右上角 action。")} code={`<StatCard label="Quota" value="86%" hint="14% remaining" tone="info" action={<Button size="sm">Details</Button>} />`}>
        <StatCard label={d("Quota", "配额")} value="86%" hint={d("14% remaining", "剩余 14%")} tone="info" action={<Button size="sm">{d("Details", "详情")}</Button>} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
