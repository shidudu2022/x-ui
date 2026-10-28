import { Button, ListPage, SearchInput, Text } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('list-page')
const props: PropDef[] = [{ name: 'title', type: 'ReactNode', desc: { en: "Title", zh: "标题" } }, { name: 'description', type: 'ReactNode', desc: { en: "Description", zh: "说明" } }, { name: 'actions', type: 'ReactNode', desc: { en: "Page header actions", zh: "页头操作" } }, { name: 'toolbar', type: 'ReactNode', desc: { en: "Filter bar", zh: "筛选条" } }, { name: 'children', type: 'ReactNode', desc: { en: "List content", zh: "列表内容" } }]

export function ListPageDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Mini preview", "迷你预览")} wide code={`<ListPage
  title="Resource list"
  description="Manage all resources."
  actions={<Button variant="primary">New</Button>}
  toolbar={<SearchInput placeholder="Search…" />}
>
  …
</ListPage>`}>
        <div style={{ border: '1px solid var(--border)', borderRadius: 8, padding: '20px 24px', background: 'var(--bg)' }}><ListPage title={d("Resource list", "资源列表")} description={d("Manage all resources.", "管理全部资源。")} actions={<Button variant="primary">{d("New", "新建")}</Button>} toolbar={<SearchInput placeholder={d("Search…", "搜索…")} onChange={() => undefined} />}><Text variant="muted" size="md">{d("Table / ResourceList goes here", "表格 / ResourceList 放这里")}</Text></ListPage></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
