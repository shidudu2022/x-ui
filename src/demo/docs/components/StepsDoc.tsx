import { useState } from 'react'
import { Button, Steps } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('steps')
const props: PropDef[] = [{ name: 'items', type: 'StepItem[]', desc: '步骤' }, { name: 'current', type: 'number', desc: '当前索引' }, { name: 'size', type: "'sm'|'md'", default: "'md'", desc: '尺寸' }]

export function StepsDoc() {
  const [step, setStep] = useState(1)
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<Steps
  current={step}
  items={[
    { id: '1', label: '命名' },
    { id: '2', label: '配置' },
    { id: '3', label: '确认' },
  ]}
/>
<div className="actions">
  <Button disabled={step <= 0} onClick={() => setStep((s) => s - 1)}>
    上一步
  </Button>
  <Button
    variant="primary"
    disabled={step >= 2}
    onClick={() => setStep((s) => s + 1)}
  >
    下一步
  </Button>
</div>`}>
        <div className="stack"><Steps current={step} items={[{ id: '1', label: '命名' }, { id: '2', label: '配置' }, { id: '3', label: '确认' }]} /><div className="actions"><Button disabled={step <= 0} onClick={() => setStep((s) => s - 1)}>上一步</Button><Button variant="primary" disabled={step >= 2} onClick={() => setStep((s) => s + 1)}>下一步</Button></div></div>
      </DocDemo>
      <DocDemo title="尺寸" code={`<Steps
  size="sm"
  current={1}
  items={[
    { id: '1', label: '命名' },
    { id: '2', label: '配置' },
    { id: '3', label: '确认' },
  ]}
/>`}>
        <Steps size="sm" current={1} items={[{ id: '1', label: '命名' }, { id: '2', label: '配置' }, { id: '3', label: '确认' }]} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
