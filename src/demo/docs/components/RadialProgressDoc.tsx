import { ChartContainer, RadialProgress } from '@/components/charts'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('radial-progress')
const props: PropDef[] = [{ name: 'value', type: 'number', desc: '0–100' }, { name: 'label', type: 'ReactNode', desc: { en: "Center label", zh: "中心标签" } }]

export function RadialProgressDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} wide code={`<RadialProgress value={76} label="This week's goal" />`}>
        <ChartContainer title={d("Completion", "完成度")} height={240}><RadialProgress value={76} label={d("This week's goal", "本周目标")} /></ChartContainer>
      </DocDemo>
    </ComponentDocLayout>
  )
}
