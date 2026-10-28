import { Metric, MetricGrid } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('metric')
const props: PropDef[] = [{ name: 'label', type: 'ReactNode', desc: { en: "Label", zh: "标签" } }, { name: 'value', type: 'ReactNode', desc: { en: "Value", zh: "数值" } }]

export function MetricDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<MetricGrid>
  <Metric label="Requests" value="12.4k" />
  <Metric label="Latency" value="86ms" />
</MetricGrid>`}>
        <MetricGrid><Metric label={d("Requests", "请求")} value="12.4k" /><Metric label={d("Latency", "延迟")} value="86ms" /><Metric label={d("Error rate", "错误率")} value="0.2%" /></MetricGrid>
      </DocDemo>
    </ComponentDocLayout>
  )
}
