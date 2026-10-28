import { useState } from 'react'
import { Button, ResourceList, type ResourceColumn } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('resource-list')
const props: PropDef[] = [{ name: 'loading', type: 'boolean', desc: { en: "Skeleton", zh: "骨架" } }, { name: 'emptyTitle', type: 'string', desc: { en: "Empty-state title", zh: "空态标题" } }, { name: 'filters', type: 'ResourceFilter[]', desc: { en: "Filter", zh: "筛选" } }]

export function ResourceListDoc() {
  const d = useDemoT()
  type Row = { id: string; name: string; region: string }
  const rows: Row[] = [
    { id: '1', name: 'prod-api', region: 'cn-east' },
    { id: '2', name: 'staging', region: 'cn-north' },
  ]
  const columns: ResourceColumn<Row>[] = [
    { key: 'name', header: d("Name", "名称"), render: (r) => r.name },
    { key: 'region', header: d("Region", "区域"), render: (r) => r.region, muted: true },
  ]
  const [loading, setLoading] = useState(false)
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} description={d("Filter bar + table + row actions.", "筛选条 + 表格 + 行操作。")} wide code={`<ResourceList
  framed={false}
  columns={columns}
  rows={rows}
  rowKey={(r) => r.id}
  filters={[
    {
      key: 'region',
      label: 'Region',
      type: 'select',
      options: [
        { value: 'cn-east', label: 'East China' },
        { value: 'cn-north', label: 'North China' },
      ],
    },
  ]}
  filterValues={{}}
  onFilterChange={() => undefined}
  onSearch={() => undefined}
  onRefresh={() => undefined}
  page={1}
  pageSize={10}
  total={rows.length}
  onPageChange={() => undefined}
  rowActions={[{ key: 'edit', label: 'Edit', onClick: () => undefined }]}
  toolbar={<Button variant="primary">New</Button>}
/>`}>
        <ResourceList framed={false} columns={columns} rows={rows} rowKey={(r) => r.id} filters={[{ key: 'region', label: d("Region", "区域"), type: 'select', options: [{ value: 'cn-east', label: d("East China", "华东") }, { value: 'cn-north', label: d("North China", "华北") }] }]} filterValues={{}} onFilterChange={() => undefined} onSearch={() => undefined} onRefresh={() => undefined} page={1} pageSize={10} total={rows.length} onPageChange={() => undefined} rowActions={[{ key: 'edit', label: d("Edit", "编辑"), onClick: () => undefined }]} toolbar={<Button variant="primary">{d("New", "新建")}</Button>} />
      </DocDemo>
      <DocDemo title={d("Loading", "加载")} wide code={`<Button size="sm" onClick={() => setLoading((v) => !v)}>
  {loading ? 'Show empty state' : 'Show loading'}
</Button>
<ResourceList
  framed={false}
  columns={columns}
  rows={[]}
  rowKey={(r) => r.id}
  loading={loading}
  emptyTitle="No resources yet"
  emptyDesc="Create the first one to get started."
  page={1}
  pageSize={10}
  total={0}
  onPageChange={() => undefined}
  onRefresh={() => undefined}
/>`}>
        <div className="stack"><Button size="sm" onClick={() => setLoading((v) => !v)}>{loading ? d("Show empty state", "显示空态") : d("Show loading", "显示加载")}</Button><ResourceList framed={false} columns={columns} rows={[]} rowKey={(r) => r.id} loading={loading} emptyTitle={d("No resources yet", "暂无资源")} emptyDesc={d("Create the first one to get started.", "创建第一条开始。")} page={1} pageSize={10} total={0} onPageChange={() => undefined} onRefresh={() => undefined} /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
