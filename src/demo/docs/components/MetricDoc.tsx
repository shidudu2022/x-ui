import { Metric, MetricGrid } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('metric')
const props: PropDef[] = [{ name: 'label', type: 'ReactNode', desc: '标签' }, { name: 'value', type: 'ReactNode', desc: '数值' }]

export function MetricDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<MetricGrid>
  <Metric label="请求" value="12.4k" />
  <Metric label="延迟" value="86ms" />
</MetricGrid>`}>
        <MetricGrid><Metric label="请求" value="12.4k" /><Metric label="延迟" value="86ms" /><Metric label="错误率" value="0.2%" /></MetricGrid>
      </DocDemo>
    </ComponentDocLayout>
  )
}
