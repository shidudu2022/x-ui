import { useState } from 'react'
import { Button, Steps } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('steps')
const props: PropDef[] = [{ name: 'items', type: 'StepItem[]', desc: { en: "Steps", zh: "步骤" } }, { name: 'current', type: 'number', desc: { en: "Current index", zh: "当前索引" } }, { name: 'size', type: "'sm'|'md'", default: "'md'", desc: { en: "Sizes", zh: "尺寸" } }]

export function StepsDoc() {
  const d = useDemoT()
  const [step, setStep] = useState(1)
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<Steps
  current={step}
  items={[
    { id: '1', label: 'Name' },
    { id: '2', label: 'Config' },
    { id: '3', label: 'Confirm' },
  ]}
/>
<div className="actions">
  <Button disabled={step <= 0} onClick={() => setStep((s) => s - 1)}>
    Previous
  </Button>
  <Button
    variant="primary"
    disabled={step >= 2}
    onClick={() => setStep((s) => s + 1)}
  >
    Next
  </Button>
</div>`}>
        <div className="stack"><Steps current={step} items={[{ id: '1', label: d("Name", "命名") }, { id: '2', label: d("Config", "配置") }, { id: '3', label: d("Confirm", "确认") }]} /><div className="actions"><Button disabled={step <= 0} onClick={() => setStep((s) => s - 1)}>{d("Previous", "上一步")}</Button><Button variant="primary" disabled={step >= 2} onClick={() => setStep((s) => s + 1)}>{d("Next", "下一步")}</Button></div></div>
      </DocDemo>
      <DocDemo title={d("Sizes", "尺寸")} code={`<Steps
  size="sm"
  current={1}
  items={[
    { id: '1', label: 'Name' },
    { id: '2', label: 'Config' },
    { id: '3', label: 'Confirm' },
  ]}
/>`}>
        <Steps size="sm" current={1} items={[{ id: '1', label: d("Name", "命名") }, { id: '2', label: d("Config", "配置") }, { id: '3', label: d("Confirm", "确认") }]} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
