import { Button, EmptyState } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('empty-state')
const props: PropDef[] = [{ name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'description', type: 'ReactNode', desc: '说明' }, { name: 'action', type: 'ReactNode', desc: '操作' }]

export function EmptyStateDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<EmptyState title="还没有数据" description="创建第一条记录开始。" />`}>
        <EmptyState title="还没有数据" description="创建第一条记录开始。" />
      </DocDemo>
      <DocDemo title="带操作" code={`<EmptyState
  title="还没有数据"
  description="创建第一条记录开始。"
  action={<Button variant="primary">创建</Button>}
/>`}>
        <EmptyState title="还没有数据" description="创建第一条记录开始。" action={<Button variant="primary">创建</Button>} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
