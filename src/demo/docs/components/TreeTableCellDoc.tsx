import { useState } from 'react'
import { TreeTableCell } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('tree-table-cell')
const props: PropDef[] = [{ name: 'depth', type: 'number', desc: '缩进层级' }, { name: 'expandable', type: 'boolean', desc: '可展开' }, { name: 'expanded', type: 'boolean', desc: '展开态' }, { name: 'onToggle', type: '() => void', desc: '切换' }]

export function TreeTableCellDoc() {
  const [open, setOpen] = useState(true)
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<TreeTableCell
  depth={0}
  expandable
  expanded={open}
  onToggle={() => setOpen((v) => !v)}
>
  cluster
</TreeTableCell>
{open ? <TreeTableCell depth={1}>default</TreeTableCell> : null}
<TreeTableCell depth={1}>kube-system</TreeTableCell>`}>
        <div className="stack"><TreeTableCell depth={0} expandable expanded={open} onToggle={() => setOpen((v) => !v)}>cluster</TreeTableCell>{open ? <TreeTableCell depth={1}>default</TreeTableCell> : null}<TreeTableCell depth={1}>kube-system</TreeTableCell></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
