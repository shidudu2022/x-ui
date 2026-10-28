import { useState } from 'react'
import { Segmented } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('segmented')
const props: PropDef[] = [{ name: 'options', type: 'SegmentedOption[]', desc: { en: "Options", zh: "选项" } }, { name: 'value', type: 'string', desc: { en: "Current value", zh: "当前值" } }, { name: 'onChange', type: '(v: string) => void', desc: { en: "Toggle", zh: "切换" } }]

export function SegmentedDoc() {
  const d = useDemoT()
  const [value, setValue] = useState('overview')
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<Segmented
  value={value}
  onChange={setValue}
  options={[
    { value: 'overview', label: 'Overview' },
    { value: 'workloads', label: 'Workloads' },
    { value: 'meta', label: 'Metadata' },
  ]}
/>`}>
        <Segmented value={value} onChange={setValue} options={[{ value: 'overview', label: d("Overview", "概览") }, { value: 'workloads', label: d("Workloads", "工作负载") }, { value: 'meta', label: d("Metadata", "元数据") }]} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
