import { useState } from 'react'
import { NumberStepper } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('number-stepper')
const props: PropDef[] = [{ name: 'value', type: 'number', desc: '值' }, { name: 'min', type: 'number', desc: '最小' }, { name: 'max', type: 'number', desc: '最大' }, { name: 'step', type: 'number', desc: '步进' }]

export function NumberStepperDoc() {
  const [n, setN] = useState(3)
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<NumberStepper value={n} onChange={setN} min={0} max={10} />`}>
        <NumberStepper value={n} onChange={setN} min={0} max={10} />
      </DocDemo>
      <DocDemo title="步进" code={`<NumberStepper value={n} onChange={setN} min={0} max={100} step={5} />`}>
        <NumberStepper value={n} onChange={setN} min={0} max={100} step={5} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
