import { useState } from 'react'
import { Tree } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('tree')
const props: PropDef[] = [{ name: 'nodes', type: 'TreeNodeData[]', desc: '节点' }, { name: 'activeId', type: 'string', desc: '选中' }]

export function TreeDoc() {
  const [id, setId] = useState('ns-default')
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<Tree activeId={id} onSelect={setId} nodes={[
  { id: 'cluster', label: 'cluster', children: [
    { id: 'ns-default', label: 'default' },
  ]},
]} />`}>
        <Tree activeId={id} onSelect={setId} nodes={[{ id: 'cluster', label: 'cluster', children: [{ id: 'ns-default', label: 'default' }, { id: 'ns-sys', label: 'kube-system' }] }]} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
