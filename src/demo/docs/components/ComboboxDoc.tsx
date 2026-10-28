import { useState } from 'react'
import { Combobox } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('combobox')
const props: PropDef[] = [{ name: 'options', type: 'SelectOption[]', desc: { en: "Options", zh: "选项" } }, { name: 'disabled', type: 'boolean', desc: { en: "Disabled", zh: "禁用" } }, { name: 'invalid', type: 'boolean', desc: { en: "Validation failed", zh: "校验失败" } }]

export function ComboboxDoc() {
  const d = useDemoT()
  const [v, setV] = useState('sh')
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<Combobox
  value={v}
  onChange={setV}
  options={[
    { value: 'sh', label: 'Shanghai' },
    { value: 'bj', label: 'Beijing' },
    { value: 'gz', label: 'Guangzhou' },
  ]}
/>`}>
        <Combobox value={v} onChange={setV} options={[{ value: 'sh', label: d("Shanghai", "上海") }, { value: 'bj', label: d("Beijing", "北京") }, { value: 'gz', label: d("Guangzhou", "广州") }]} />
      </DocDemo>
      <DocDemo title={d("Enhanced", "增强")} code={`<Combobox
  disabled
  value={v}
  onChange={setV}
  options={[{ value: 'sh', label: 'Shanghai' }]}
/>
<Combobox
  invalid
  value={v}
  onChange={setV}
  options={[
    { value: 'sh', label: 'Shanghai' },
    { value: 'bj', label: 'Beijing' },
  ]}
/>`}>
        <div className="stack" style={{ maxWidth: 280 }}><Combobox disabled value={v} onChange={setV} options={[{ value: 'sh', label: d("Shanghai", "上海") }]} /><Combobox invalid value={v} onChange={setV} options={[{ value: 'sh', label: d("Shanghai", "上海") }, { value: 'bj', label: d("Beijing", "北京") }]} /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
