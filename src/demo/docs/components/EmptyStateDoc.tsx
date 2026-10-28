import { Button, EmptyState } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('empty-state')
const props: PropDef[] = [{ name: 'title', type: 'ReactNode', desc: { en: "Title", zh: "标题" } }, { name: 'description', type: 'ReactNode', desc: { en: "Description", zh: "说明" } }, { name: 'action', type: 'ReactNode', desc: { en: "Action", zh: "操作" } }]

export function EmptyStateDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<EmptyState title="No data yet" description="Create your first record to get started." />`}>
        <EmptyState title={d("No data yet", "还没有数据")} description={d("Create your first record to get started.", "创建第一条记录开始。")} />
      </DocDemo>
      <DocDemo title={d("With actions", "带操作")} code={`<EmptyState
  title="No data yet"
  description="Create your first record to get started."
  action={<Button variant="primary">Create</Button>}
/>`}>
        <EmptyState title={d("No data yet", "还没有数据")} description={d("Create your first record to get started.", "创建第一条记录开始。")} action={<Button variant="primary">{d("Create", "创建")}</Button>} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
