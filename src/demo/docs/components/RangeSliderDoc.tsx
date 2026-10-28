import { useState } from 'react'
import { RangeSlider } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('range-slider')
const props: PropDef[] = [{ name: 'value', type: 'number', desc: '值' }, { name: 'onChange', type: '(n: number) => void', desc: '变更' }, { name: 'min/max/step', type: 'number', desc: '范围' }, { name: 'label', type: 'string', desc: '标签' }]

export function RangeSliderDoc() {
  const [v, setV] = useState(40)
  const [v2, setV2] = useState(2)
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<RangeSlider value={v} onChange={setV} label="配额" />`}>
        <RangeSlider value={v} onChange={setV} label="配额" />
      </DocDemo>
      <DocDemo title="步进" code={`<RangeSlider min={0} max={10} step={2} value={v2} onChange={setV2} label="副本" />`}>
        <RangeSlider min={0} max={10} step={2} value={v2} onChange={setV2} label="副本" />
      </DocDemo>
    </ComponentDocLayout>
  )
}
