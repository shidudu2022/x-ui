import { Button, ResourceState, Text } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('resource-state')
const props: PropDef[] = [{ name: 'status', type: "'idle'|'loading'|'empty'|'error'|'offline'", desc: { en: "Status", zh: "状态" } }, { name: 'loadingVariant', type: "'spinner'|'skeleton'|'table'|'card'", desc: { en: "Loading styles", zh: "加载样式" } }]

export function ResourceStateDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Status", "状态")} code={`<ResourceState
  status="empty"
  emptyTitle="No resources yet"
  emptyDescription="Create the first one to get started."
  emptyAction={<Button variant="primary">Create</Button>}
/>
<ResourceState status="error" onRetry={() => undefined} />
<ResourceState status="offline" onRetry={() => undefined} />
<ResourceState status="idle">
  <Text variant="muted" size="md">Normal content</Text>
</ResourceState>`}>
        <div className="grid-2"><ResourceState status="empty" emptyTitle={d("No resources yet", "还没有资源")} emptyDescription={d("Create the first one to get started.", "创建第一条开始。")} emptyAction={<Button variant="primary">{d("Create", "创建")}</Button>} /><ResourceState status="error" onRetry={() => undefined} /><ResourceState status="offline" onRetry={() => undefined} /><ResourceState status="idle"><Text variant="muted" size="md">{d("Normal content", "正常内容")}</Text></ResourceState></div>
      </DocDemo>
      <DocDemo title={d("Loading styles", "加载样式")} code={`<ResourceState status="loading" loadingVariant="spinner" />
<ResourceState status="loading" loadingVariant="table" />`}>
        <div className="grid-2"><ResourceState status="loading" loadingVariant="spinner" /><ResourceState status="loading" loadingVariant="skeleton" /><ResourceState status="loading" loadingVariant="table" /><ResourceState status="loading" loadingVariant="card" /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
