import { ChartContainer, RadialProgress } from '@/components/charts'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('radial-progress')
const props: PropDef[] = [{ name: 'value', type: 'number', desc: '0–100' }, { name: 'label', type: 'ReactNode', desc: '中心标签' }]

export function RadialProgressDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" wide code={`<RadialProgress value={76} label="本周目标" />`}>
        <ChartContainer title="完成度" height={240}><RadialProgress value={76} label="本周目标" /></ChartContainer>
      </DocDemo>
    </ComponentDocLayout>
  )
}
