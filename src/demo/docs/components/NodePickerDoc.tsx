import { useState } from 'react'
import { NodePicker } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('node-picker')
const props: PropDef[] = [{ name: 'options', type: 'NodeOption[]', desc: '节点' }, { name: 'value', type: 'string', desc: '选中 id' }, { name: 'onChange', type: '(id: string) => void', desc: '变更' }]

export function NodePickerDoc() {
  const [id, setId] = useState('n1')
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<NodePicker
  value={id}
  onChange={setId}
  options={[
    { id: 'n1', title: 'node-a', meta: 'cn-east' },
    { id: 'n2', title: 'node-b', meta: 'cn-north' },
  ]}
/>`}>
        <NodePicker value={id} onChange={setId} options={[{ id: 'n1', title: 'node-a', meta: 'cn-east · ready' }, { id: 'n2', title: 'node-b', meta: 'cn-north · ready' }, { id: 'n3', title: 'node-c', meta: '维护中', disabled: true }]} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
