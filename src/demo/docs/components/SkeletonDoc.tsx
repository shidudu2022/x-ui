import { Skeleton, SkeletonCard, SkeletonTable } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('skeleton')
const props: PropDef[] = [{ name: 'Skeleton', type: 'div', desc: '单条占位' }, { name: 'SkeletonTable', type: '{ rows?, cols? }', desc: '表格行骨架' }, { name: 'SkeletonCard', type: 'component', desc: '卡片骨架' }]

export function SkeletonDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<Skeleton />
<Skeleton style={{ width: '60%', height: 12 }} />`}>
        <div className="stack"><Skeleton /><Skeleton style={{ width: '60%', height: 12 }} /></div>
      </DocDemo>
      <DocDemo title="表格 / 卡片" code={`<SkeletonTable rows={3} />
<SkeletonCard />`}>
        <div className="stack"><SkeletonTable rows={3} /><SkeletonCard /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
