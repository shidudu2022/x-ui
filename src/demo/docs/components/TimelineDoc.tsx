import { Timeline } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('timeline')
const props: PropDef[] = [{ name: 'items', type: 'TimelineItemData[]', desc: { en: "Events; may include content", zh: "事件；可含 content" } }]

export function TimelineDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<Timeline items={[
  { id: 'a', title: 'Create resource', meta: '2 minutes ago' },
  { id: 'b', title: 'Health check passed', meta: 'Just now' },
]} />`}>
        <Timeline items={[{ id: 'a', title: d("Create resource", "创建资源"), meta: d("2 minutes ago", "2 分钟前") }, { id: 'b', title: d("Health check passed", "健康检查通过"), meta: d("Just now", "刚刚") }]} />
      </DocDemo>
      <DocDemo title={d("With content", "带内容")} code={`<Timeline items={[
  { id: 'a', title: 'Deploy', meta: 'Just now', content: <p className="muted">image v1.2.0</p> },
]} />`}>
        <Timeline items={[{ id: 'a', title: d("Deploy", "部署"), meta: d("Just now", "刚刚"), content: <p className="muted" style={{ margin: 0 }}>{d("image v1.2.0", "镜像 v1.2.0")}</p> }, { id: 'b', title: d("Probe passed", "探测通过"), meta: d("1 minute ago", "1 分钟前") }]} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
