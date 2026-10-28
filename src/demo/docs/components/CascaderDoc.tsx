import { useState } from 'react'
import { Cascader } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('cascader')
const props: PropDef[] = [{ name: 'options', type: 'CascaderOption[]', desc: { en: "Tree options; individual items can be disabled", zh: "树选项；单项可 disabled" } }, { name: 'value', type: 'string[]', desc: { en: "Path value", zh: "路径值" } }, { name: 'placeholder', type: 'string', desc: { en: "Placeholder", zh: "占位" } }]

export function CascaderDoc() {
  const d = useDemoT()
  const [v, setV] = useState(['cn', 'sh'])
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<Cascader
  value={v}
  onChange={setV}
  options={[
    {
      value: 'cn',
      label: 'China',
      children: [
        { value: 'sh', label: 'Shanghai' },
        { value: 'bj', label: 'Beijing' },
      ],
    },
    {
      value: 'us',
      label: 'United States',
      children: [{ value: 'sf', label: 'San Francisco' }],
    },
  ]}
/>`}>
        <Cascader value={v} onChange={setV} options={[{ value: 'cn', label: d("China", "中国"), children: [{ value: 'sh', label: d("Shanghai", "上海") }, { value: 'bj', label: d("Beijing", "北京") }] }, { value: 'us', label: d("United States", "美国"), children: [{ value: 'sf', label: d("San Francisco", "旧金山") }] }]} />
      </DocDemo>
      <DocDemo title={d("Disabled items", "禁用项")} code={`<Cascader options={[{ value: 'cn', label: 'China', children: [{ value: 'hk', label: 'Hong Kong', disabled: true }] }]} />`}>
        <Cascader value={[]} onChange={setV} options={[{ value: 'cn', label: d("China", "中国"), children: [{ value: 'sh', label: d("Shanghai", "上海") }, { value: 'hk', label: d("Hong Kong", "香港"), disabled: true }] }]} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
