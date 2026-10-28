import { Skeleton, SkeletonCard, SkeletonTable } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('skeleton')
const props: PropDef[] = [{ name: 'Skeleton', type: 'div', desc: { en: "Single placeholder line", zh: "单条占位" } }, { name: 'SkeletonTable', type: '{ rows?, cols? }', desc: { en: "Table-row skeleton", zh: "表格行骨架" } }, { name: 'SkeletonCard', type: 'component', desc: { en: "Card skeleton", zh: "卡片骨架" } }]

export function SkeletonDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<Skeleton />
<Skeleton style={{ width: '60%', height: 12 }} />`}>
        <div className="stack"><Skeleton /><Skeleton style={{ width: '60%', height: 12 }} /></div>
      </DocDemo>
      <DocDemo title={d("Table / card", "表格 / 卡片")} code={`<SkeletonTable rows={3} />
<SkeletonCard />`}>
        <div className="stack"><SkeletonTable rows={3} /><SkeletonCard /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
