import { useState } from 'react'
import { Select } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('select')
const props: PropDef[] = [{ name: 'options', type: 'SelectOption[]', desc: { en: "Options", zh: "选项" } }, { name: 'value', type: 'string', desc: { en: "Controlled value", zh: "受控值" } }, { name: 'size', type: "'sm'|'md'", desc: { en: "Sizes", zh: "尺寸" } }, { name: 'multiple', type: 'boolean', desc: { en: "Multi-select", zh: "多选" } }, { name: 'disabled', type: 'boolean', desc: { en: "Disabled", zh: "禁用" } }, { name: 'invalid', type: 'boolean', desc: { en: "Validation failed", zh: "校验失败" } }, { name: 'block', type: 'boolean', desc: { en: "Full width", zh: "全宽" } }]

export function SelectDoc() {
  const d = useDemoT()
  const [value, setValue] = useState('a')
  const [multi, setMulti] = useState(['a'])
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<Select
  value={value}
  onChange={setValue}
  options={[
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
    { value: 'c', label: 'Disabled items', disabled: true },
  ]}
/>`}>
        <Select value={value} onChange={setValue} options={[{ value: 'a', label: d("Option A", "选项 A") }, { value: 'b', label: d("Option B", "选项 B") }, { value: 'c', label: d("Disabled items", "禁用项"), disabled: true }]} />
      </DocDemo>
      <DocDemo title={d("Sizes", "尺寸")} code={`<Select
  size="sm"
  value={value}
  onChange={setValue}
  options={[
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
  ]}
/>
<Select
  block
  value={value}
  onChange={setValue}
  options={[
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
  ]}
/>`}>
        <div className="stack" style={{ maxWidth: 280 }}><Select size="sm" value={value} onChange={setValue} options={[{ value: 'a', label: d("Option A", "选项 A") }, { value: 'b', label: d("Option B", "选项 B") }]} /><Select block value={value} onChange={setValue} options={[{ value: 'a', label: d("Option A", "选项 A") }, { value: 'b', label: d("Option B", "选项 B") }]} /></div>
      </DocDemo>
      <DocDemo title={d("Multi-select", "多选")} code={`<Select
  multiple
  values={multi}
  onValuesChange={setMulti}
  options={[
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
    { value: 'c', label: 'Option C' },
  ]}
/>`}>
        <Select multiple values={multi} onValuesChange={setMulti} options={[{ value: 'a', label: d("Option A", "选项 A") }, { value: 'b', label: d("Option B", "选项 B") }, { value: 'c', label: d("Option C", "选项 C") }]} />
      </DocDemo>
      <DocDemo title={d("Enhanced", "增强")} code={`<Select
  disabled
  value="a"
  options={[{ value: 'a', label: 'Disabled' }]}
/>
<Select
  invalid
  value={value}
  onChange={setValue}
  options={[
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
  ]}
/>`}>
        <div className="stack" style={{ maxWidth: 280 }}><Select disabled value="a" options={[{ value: 'a', label: d("Disabled", "禁用") }]} /><Select invalid value={value} onChange={setValue} options={[{ value: 'a', label: d("Option A", "选项 A") }, { value: 'b', label: d("Option B", "选项 B") }]} /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
