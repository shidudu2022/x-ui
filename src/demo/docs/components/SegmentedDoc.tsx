import { useState } from 'react'
import { Segmented } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('segmented')
const props: PropDef[] = [{ name: 'options', type: 'SegmentedOption[]', desc: '选项' }, { name: 'value', type: 'string', desc: '当前值' }, { name: 'onChange', type: '(v: string) => void', desc: '切换' }]

export function SegmentedDoc() {
  const [value, setValue] = useState('overview')
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<Segmented
  value={value}
  onChange={setValue}
  options={[
    { value: 'overview', label: '概览' },
    { value: 'workloads', label: '工作负载' },
    { value: 'meta', label: '元数据' },
  ]}
/>`}>
        <Segmented value={value} onChange={setValue} options={[{ value: 'overview', label: '概览' }, { value: 'workloads', label: '工作负载' }, { value: 'meta', label: '元数据' }]} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
