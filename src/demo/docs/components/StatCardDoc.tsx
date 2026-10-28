import { Button, StatCard } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('stat-card')
const props: PropDef[] = [{ name: 'label', type: 'ReactNode', desc: '标签' }, { name: 'value', type: 'ReactNode', desc: '数值' }, { name: 'hint', type: 'ReactNode', desc: '辅助' }, { name: 'tone', type: "'neutral'|'success'|'warn'|'danger'|'info'", desc: '色调' }, { name: 'action', type: 'ReactNode', desc: '右上操作' }]

export function StatCardDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="色调" wide code={`<StatCard label="中性" value="—" tone="neutral" />
<StatCard label="成功" value="12" tone="success" />
<StatCard label="警告" value="3" tone="warn" />
<StatCard label="危险" value="1" tone="danger" />
<StatCard label="信息" value="8" tone="info" />`}>
        <div className="grid-2"><StatCard label="中性" value="—" hint="无数据" tone="neutral" /><StatCard label="成功" value="12" hint="较上周 +2" tone="success" /><StatCard label="警告" value="3" hint="需处理" tone="warn" /><StatCard label="危险" value="1" hint="立即处理" tone="danger" /><StatCard label="信息" value="8" hint="进行中" tone="info" /></div>
      </DocDemo>
      <DocDemo title="增强" description="右上角 action。" code={`<StatCard label="配额" value="86%" hint="剩余 14%" tone="info" action={<Button size="sm">详情</Button>} />`}>
        <StatCard label="配额" value="86%" hint="剩余 14%" tone="info" action={<Button size="sm">详情</Button>} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
