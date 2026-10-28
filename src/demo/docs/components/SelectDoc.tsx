import { useState } from 'react'
import { Select } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('select')
const props: PropDef[] = [{ name: 'options', type: 'SelectOption[]', desc: '选项' }, { name: 'value', type: 'string', desc: '受控值' }, { name: 'size', type: "'sm'|'md'", desc: '尺寸' }, { name: 'multiple', type: 'boolean', desc: '多选' }, { name: 'disabled', type: 'boolean', desc: '禁用' }, { name: 'invalid', type: 'boolean', desc: '校验失败' }, { name: 'block', type: 'boolean', desc: '全宽' }]

export function SelectDoc() {
  const [value, setValue] = useState('a')
  const [multi, setMulti] = useState(['a'])
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<Select
  value={value}
  onChange={setValue}
  options={[
    { value: 'a', label: '选项 A' },
    { value: 'b', label: '选项 B' },
    { value: 'c', label: '禁用项', disabled: true },
  ]}
/>`}>
        <Select value={value} onChange={setValue} options={[{ value: 'a', label: '选项 A' }, { value: 'b', label: '选项 B' }, { value: 'c', label: '禁用项', disabled: true }]} />
      </DocDemo>
      <DocDemo title="尺寸" code={`<Select
  size="sm"
  value={value}
  onChange={setValue}
  options={[
    { value: 'a', label: '选项 A' },
    { value: 'b', label: '选项 B' },
  ]}
/>
<Select
  block
  value={value}
  onChange={setValue}
  options={[
    { value: 'a', label: '选项 A' },
    { value: 'b', label: '选项 B' },
  ]}
/>`}>
        <div className="stack" style={{ maxWidth: 280 }}><Select size="sm" value={value} onChange={setValue} options={[{ value: 'a', label: '选项 A' }, { value: 'b', label: '选项 B' }]} /><Select block value={value} onChange={setValue} options={[{ value: 'a', label: '选项 A' }, { value: 'b', label: '选项 B' }]} /></div>
      </DocDemo>
      <DocDemo title="多选" code={`<Select
  multiple
  values={multi}
  onValuesChange={setMulti}
  options={[
    { value: 'a', label: '选项 A' },
    { value: 'b', label: '选项 B' },
    { value: 'c', label: '选项 C' },
  ]}
/>`}>
        <Select multiple values={multi} onValuesChange={setMulti} options={[{ value: 'a', label: '选项 A' }, { value: 'b', label: '选项 B' }, { value: 'c', label: '选项 C' }]} />
      </DocDemo>
      <DocDemo title="增强" code={`<Select
  disabled
  value="a"
  options={[{ value: 'a', label: '禁用' }]}
/>
<Select
  invalid
  value={value}
  onChange={setValue}
  options={[
    { value: 'a', label: '选项 A' },
    { value: 'b', label: '选项 B' },
  ]}
/>`}>
        <div className="stack" style={{ maxWidth: 280 }}><Select disabled value="a" options={[{ value: 'a', label: '禁用' }]} /><Select invalid value={value} onChange={setValue} options={[{ value: 'a', label: '选项 A' }, { value: 'b', label: '选项 B' }]} /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
