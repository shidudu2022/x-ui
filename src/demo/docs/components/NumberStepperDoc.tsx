import { useState } from 'react'
import { NumberStepper } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('number-stepper')
const props: PropDef[] = [{ name: 'value', type: 'number', desc: { en: "Value", zh: "值" } }, { name: 'min', type: 'number', desc: { en: "Min", zh: "最小" } }, { name: 'max', type: 'number', desc: { en: "Max", zh: "最大" } }, { name: 'step', type: 'number', desc: { en: "Stepper", zh: "步进" } }]

export function NumberStepperDoc() {
  const d = useDemoT()
  const [n, setN] = useState(3)
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<NumberStepper value={n} onChange={setN} min={0} max={10} />`}>
        <NumberStepper value={n} onChange={setN} min={0} max={10} />
      </DocDemo>
      <DocDemo title={d("Stepper", "步进")} code={`<NumberStepper value={n} onChange={setN} min={0} max={100} step={5} />`}>
        <NumberStepper value={n} onChange={setN} min={0} max={100} step={5} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
