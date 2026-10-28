import { ChartContainer } from '@/components/charts'
import { Text } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('chart-container')
const props: PropDef[] = [{ name: 'title', type: 'ReactNode', desc: { en: "Title", zh: "标题" } }, { name: 'empty', type: 'boolean', desc: { en: "Empty", zh: "空态" } }, { name: 'loading', type: 'boolean', desc: { en: "Loading", zh: "加载" } }]

export function ChartContainerDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} wide code={`<ChartContainer title="Title" description="Description">{children}</ChartContainer>`}>
        <ChartContainer title={d("Example", "示例")} description={d("Description", "说明")}><div style={{ padding: 24 }}><Text variant="muted">{d("Chart content area", "图表内容区")}</Text></div></ChartContainer>
      </DocDemo>
      <DocDemo title={d("Empty", "空态")} wide code={`<ChartContainer title="Empty" empty />`}>
        <ChartContainer title={d("Empty", "空态")} empty />
      </DocDemo>
      <DocDemo title={d("Loading", "加载")} wide code={`<ChartContainer title="Loading" loading />`}>
        <ChartContainer title={d("Loading", "加载中")} loading />
      </DocDemo>
    </ComponentDocLayout>
  )
}
