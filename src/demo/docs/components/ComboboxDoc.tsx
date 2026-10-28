import { useState } from 'react'
import { Combobox } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('combobox')
const props: PropDef[] = [{ name: 'options', type: 'SelectOption[]', desc: '选项' }, { name: 'disabled', type: 'boolean', desc: '禁用' }, { name: 'invalid', type: 'boolean', desc: '校验失败' }]

export function ComboboxDoc() {
  const [v, setV] = useState('sh')
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<Combobox
  value={v}
  onChange={setV}
  options={[
    { value: 'sh', label: '上海' },
    { value: 'bj', label: '北京' },
    { value: 'gz', label: '广州' },
  ]}
/>`}>
        <Combobox value={v} onChange={setV} options={[{ value: 'sh', label: '上海' }, { value: 'bj', label: '北京' }, { value: 'gz', label: '广州' }]} />
      </DocDemo>
      <DocDemo title="增强" code={`<Combobox
  disabled
  value={v}
  onChange={setV}
  options={[{ value: 'sh', label: '上海' }]}
/>
<Combobox
  invalid
  value={v}
  onChange={setV}
  options={[
    { value: 'sh', label: '上海' },
    { value: 'bj', label: '北京' },
  ]}
/>`}>
        <div className="stack" style={{ maxWidth: 280 }}><Combobox disabled value={v} onChange={setV} options={[{ value: 'sh', label: '上海' }]} /><Combobox invalid value={v} onChange={setV} options={[{ value: 'sh', label: '上海' }, { value: 'bj', label: '北京' }]} /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
