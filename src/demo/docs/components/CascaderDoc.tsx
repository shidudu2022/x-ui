import { useState } from 'react'
import { Cascader } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('cascader')
const props: PropDef[] = [{ name: 'options', type: 'CascaderOption[]', desc: '树选项；单项可 disabled' }, { name: 'value', type: 'string[]', desc: '路径值' }, { name: 'placeholder', type: 'string', desc: '占位' }]

export function CascaderDoc() {
  const [v, setV] = useState(['cn', 'sh'])
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<Cascader
  value={v}
  onChange={setV}
  options={[
    {
      value: 'cn',
      label: '中国',
      children: [
        { value: 'sh', label: '上海' },
        { value: 'bj', label: '北京' },
      ],
    },
    {
      value: 'us',
      label: '美国',
      children: [{ value: 'sf', label: '旧金山' }],
    },
  ]}
/>`}>
        <Cascader value={v} onChange={setV} options={[{ value: 'cn', label: '中国', children: [{ value: 'sh', label: '上海' }, { value: 'bj', label: '北京' }] }, { value: 'us', label: '美国', children: [{ value: 'sf', label: '旧金山' }] }]} />
      </DocDemo>
      <DocDemo title="禁用项" code={`<Cascader options={[{ value: 'cn', label: '中国', children: [{ value: 'hk', label: '香港', disabled: true }] }]} />`}>
        <Cascader value={[]} onChange={setV} options={[{ value: 'cn', label: '中国', children: [{ value: 'sh', label: '上海' }, { value: 'hk', label: '香港', disabled: true }] }]} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
