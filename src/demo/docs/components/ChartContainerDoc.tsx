import { ChartContainer } from '@/components/charts'
import { Text } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('chart-container')
const props: PropDef[] = [{ name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'empty', type: 'boolean', desc: '空态' }, { name: 'loading', type: 'boolean', desc: '加载' }]

export function ChartContainerDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" wide code={`<ChartContainer title="标题" description="说明">{children}</ChartContainer>`}>
        <ChartContainer title="示例" description="说明"><div style={{ padding: 24 }}><Text variant="muted">图表内容区</Text></div></ChartContainer>
      </DocDemo>
      <DocDemo title="空态" wide code={`<ChartContainer title="空态" empty />`}>
        <ChartContainer title="空态" empty />
      </DocDemo>
      <DocDemo title="加载" wide code={`<ChartContainer title="加载中" loading />`}>
        <ChartContainer title="加载中" loading />
      </DocDemo>
    </ComponentDocLayout>
  )
}
