import { useState } from 'react'
import { RangeSlider } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('range-slider')
const props: PropDef[] = [{ name: 'value', type: 'number', desc: { en: "Value", zh: "值" } }, { name: 'onChange', type: '(n: number) => void', desc: { en: "Change", zh: "变更" } }, { name: 'min/max/step', type: 'number', desc: { en: "Range", zh: "范围" } }, { name: 'label', type: 'string', desc: { en: "Label", zh: "标签" } }]

export function RangeSliderDoc() {
  const d = useDemoT()
  const [v, setV] = useState(40)
  const [v2, setV2] = useState(2)
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<RangeSlider value={v} onChange={setV} label="Quota" />`}>
        <RangeSlider value={v} onChange={setV} label={d("Quota", "配额")} />
      </DocDemo>
      <DocDemo title={d("Stepper", "步进")} code={`<RangeSlider min={0} max={10} step={2} value={v2} onChange={setV2} label="Replica" />`}>
        <RangeSlider min={0} max={10} step={2} value={v2} onChange={setV2} label={d("Replica", "副本")} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
