import { Button, ResourceState, Text } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('resource-state')
const props: PropDef[] = [{ name: 'status', type: "'idle'|'loading'|'empty'|'error'|'offline'", desc: '状态' }, { name: 'loadingVariant', type: "'spinner'|'skeleton'|'table'|'card'", desc: '加载样式' }]

export function ResourceStateDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="状态" code={`<ResourceState
  status="empty"
  emptyTitle="还没有资源"
  emptyDescription="创建第一条开始。"
  emptyAction={<Button variant="primary">创建</Button>}
/>
<ResourceState status="error" onRetry={() => undefined} />
<ResourceState status="offline" onRetry={() => undefined} />
<ResourceState status="idle">
  <Text variant="muted" size="md">正常内容</Text>
</ResourceState>`}>
        <div className="grid-2"><ResourceState status="empty" emptyTitle="还没有资源" emptyDescription="创建第一条开始。" emptyAction={<Button variant="primary">创建</Button>} /><ResourceState status="error" onRetry={() => undefined} /><ResourceState status="offline" onRetry={() => undefined} /><ResourceState status="idle"><Text variant="muted" size="md">正常内容</Text></ResourceState></div>
      </DocDemo>
      <DocDemo title="加载样式" code={`<ResourceState status="loading" loadingVariant="spinner" />
<ResourceState status="loading" loadingVariant="table" />`}>
        <div className="grid-2"><ResourceState status="loading" loadingVariant="spinner" /><ResourceState status="loading" loadingVariant="skeleton" /><ResourceState status="loading" loadingVariant="table" /><ResourceState status="loading" loadingVariant="card" /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
