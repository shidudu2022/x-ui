import { Button, ListPage, SearchInput, Text } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('list-page')
const props: PropDef[] = [{ name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'description', type: 'ReactNode', desc: '说明' }, { name: 'actions', type: 'ReactNode', desc: '页头操作' }, { name: 'toolbar', type: 'ReactNode', desc: '筛选条' }, { name: 'children', type: 'ReactNode', desc: '列表内容' }]

export function ListPageDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="迷你预览" wide code={`<ListPage
  title="资源列表"
  description="管理全部资源。"
  actions={<Button variant="primary">新建</Button>}
  toolbar={<SearchInput placeholder="搜索…" />}
>
  …
</ListPage>`}>
        <div style={{ border: '1px solid var(--border)', borderRadius: 8, padding: '20px 24px', background: 'var(--bg)' }}><ListPage title="资源列表" description="管理全部资源。" actions={<Button variant="primary">新建</Button>} toolbar={<SearchInput placeholder="搜索…" onChange={() => undefined} />}><Text variant="muted" size="md">表格 / ResourceList 放这里</Text></ListPage></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
