import { Timeline } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('timeline')
const props: PropDef[] = [{ name: 'items', type: 'TimelineItemData[]', desc: '事件；可含 content' }]

export function TimelineDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<Timeline items={[
  { id: 'a', title: '创建资源', meta: '2 分钟前' },
  { id: 'b', title: '健康检查通过', meta: '刚刚' },
]} />`}>
        <Timeline items={[{ id: 'a', title: '创建资源', meta: '2 分钟前' }, { id: 'b', title: '健康检查通过', meta: '刚刚' }]} />
      </DocDemo>
      <DocDemo title="带内容" code={`<Timeline items={[
  { id: 'a', title: '部署', meta: '刚刚', content: <p className="muted">镜像 v1.2.0</p> },
]} />`}>
        <Timeline items={[{ id: 'a', title: '部署', meta: '刚刚', content: <p className="muted" style={{ margin: 0 }}>镜像 v1.2.0</p> }, { id: 'b', title: '探测通过', meta: '1 分钟前' }]} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
