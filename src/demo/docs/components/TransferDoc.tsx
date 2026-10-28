import { useState } from 'react'
import { Transfer } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('transfer')
const props: PropDef[] = [{ name: 'data', type: 'TransferItem[]', desc: '全部项；可 disabled' }, { name: 'targetKeys', type: 'string[]', desc: '右侧选中' }, { name: 'titles', type: '[string, string]', desc: '两侧标题' }, { name: 'searchable', type: 'boolean', default: 'true', desc: '搜索' }]

export function TransferDoc() {
  const [keys, setKeys] = useState(['b'])
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" wide code={`<Transfer
  data={[
    { key: 'a', label: '节点 A' },
    { key: 'b', label: '节点 B' },
    { key: 'c', label: '节点 C' },
    { key: 'd', label: '维护中', disabled: true },
  ]}
  targetKeys={keys}
  onChange={setKeys}
  titles={['可选节点', '已选']}
/>`}>
        <Transfer data={[{ key: 'a', label: '节点 A' }, { key: 'b', label: '节点 B' }, { key: 'c', label: '节点 C' }, { key: 'd', label: '维护中', disabled: true }]} targetKeys={keys} onChange={setKeys} titles={['可选节点', '已选']} />
      </DocDemo>
      <DocDemo title="无搜索" wide code={`<Transfer
  searchable={false}
  data={[
    { key: 'a', label: 'A' },
    { key: 'b', label: 'B' },
  ]}
  targetKeys={keys}
  onChange={setKeys}
/>`}>
        <Transfer searchable={false} data={[{ key: 'a', label: 'A' }, { key: 'b', label: 'B' }]} targetKeys={keys} onChange={setKeys} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
