import { useMemo, useState } from 'react'
import {
  Accordion,
  Avatar,
  AvatarGroup,
  Badge,
  Card,
  DescriptionList,
  EmptyState,
  MetaRow,
  Metric,
  MetricGrid,
  Muted,
  PageHeader,
  Pagination,
  SkeletonCard,
  SkeletonTable,
  Table,
  TableCard,
  Tag,
  TagGroup,
  Text,
  Timeline,
  Tree,
  type SortDir,
} from '@/components/ui'
import { ShowcaseSection } from '../ShowcaseSection'

type Row = { id: string; name: string; status: string; cpu: number }

const seed: Row[] = [
  { id: '1', name: 'api-gateway', status: 'running', cpu: 32 },
  { id: '2', name: 'worker', status: 'degraded', cpu: 71 },
  { id: '3', name: 'cache', status: 'running', cpu: 18 },
  { id: '4', name: 'queue', status: 'failed', cpu: 0 },
]

export function DataPage() {
  const [sortKey, setSortKey] = useState<string | null>('name')
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const [selected, setSelected] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const [treeId, setTreeId] = useState('ns-default')

  const rows = useMemo(() => {
    const copy = [...seed]
    if (!sortKey || !sortDir) return copy
    copy.sort((a, b) => {
      const av = a[sortKey as keyof Row]
      const bv = b[sortKey as keyof Row]
      if (av === bv) return 0
      const cmp = av > bv ? 1 : -1
      return sortDir === 'asc' ? cmp : -cmp
    })
    return copy
  }, [sortKey, sortDir])

  return (
    <div>
      <PageHeader title="数据展示" description="表格、分页、描述列表、树与时间线。" />

      <ShowcaseSection title="TableCard">
        <TableCard
          title="节点"
          subtitle="示例嵌入表"
          footer={
            <div className="data-table-footer">
              <div className="data-table-summary">已选 {selected.length} 项</div>
              <Pagination page={page} pageCount={5} onChange={setPage} />
            </div>
          }
        >
          <Table
            rows={rows}
            rowKey={(r) => r.id}
            selectable
            selectedKeys={selected}
            onSelectedChange={setSelected}
            sortKey={sortKey}
            sortDir={sortDir}
            onSort={(key) => {
              if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
              else {
                setSortKey(key)
                setSortDir('asc')
              }
            }}
            columns={[
              { key: 'name', header: '名称', sortable: true, render: (r) => r.name },
              {
                key: 'status',
                header: '状态',
                sortable: true,
                render: (r) => (
                  <Badge
                    tone={
                      r.status === 'running' ? 'success' : r.status === 'failed' ? 'danger' : 'warn'
                    }
                  >
                    {r.status}
                  </Badge>
                ),
              },
              { key: 'cpu', header: 'CPU', sortable: true, render: (r) => `${r.cpu}%` },
            ]}
          />
        </TableCard>
      </ShowcaseSection>

      <ShowcaseSection
        title="Badge / Tag / MetaRow"
        description="Badge 默认有边框；文字与标签混排用 MetaRow（竖直居中）。Tag 也可 size=&quot;sm&quot;。"
      >
        <div className="stack">
          <div>
            <p className="muted" style={{ margin: '0 0 8px', fontSize: 12 }}>
              bordered（默认）
            </p>
            <div className="showcase-row">
              <Badge tone="success">success</Badge>
              <Badge tone="warn">warn</Badge>
              <Badge tone="danger">danger</Badge>
              <Badge tone="info">info</Badge>
              <Badge tone="neutral">neutral</Badge>
            </div>
          </div>
          <div>
            <p className="muted" style={{ margin: '0 0 8px', fontSize: 12 }}>
              size=&quot;sm&quot;
            </p>
            <div className="showcase-row">
              <Badge tone="success" size="sm">
                success
              </Badge>
              <Badge tone="info" size="sm">
                Docker
              </Badge>
              <Badge tone="neutral" size="sm">
                3
              </Badge>
              <Tag tone="primary" size="sm">
                primary
              </Tag>
              <Tag tone="info" size="sm">
                info
              </Tag>
            </div>
          </div>
          <div>
            <p className="muted" style={{ margin: '0 0 8px', fontSize: 12 }}>
              bordered={false}
            </p>
            <div className="showcase-row">
              <Badge tone="success" bordered={false}>
                success
              </Badge>
              <Badge tone="warn" bordered={false}>
                warn
              </Badge>
              <Badge tone="danger" bordered={false}>
                danger
              </Badge>
              <Badge tone="info" bordered={false}>
                info
              </Badge>
              <Badge tone="neutral" bordered={false}>
                neutral
              </Badge>
            </div>
          </div>
          <div>
            <p className="muted" style={{ margin: '0 0 8px', fontSize: 12 }}>
              MetaRow：文字 + Badge / Tag（列表单元格 / 详情顶栏）
            </p>
            <div className="stack" style={{ gap: 10 }}>
              <MetaRow>
                <Text size="sm" variant="muted">
                  admin
                </Text>
                <Badge tone="info" size="sm">
                  平台
                </Badge>
                <Badge tone="success" size="sm">
                  200
                </Badge>
              </MetaRow>
              <MetaRow>
                <Badge tone="success" size="sm">
                  running
                </Badge>
                <Muted>api-gateway · cn-east</Muted>
              </MetaRow>
              <MetaRow>
                <Text size="sm">worker</Text>
                <TagGroup>
                  <Tag tone="warn" size="sm">
                    degraded
                  </Tag>
                  <Tag tone="neutral" size="sm">
                    queue
                  </Tag>
                </TagGroup>
              </MetaRow>
            </div>
          </div>
          <div className="showcase-row">
            <TagGroup>
              <Tag tone="primary">primary</Tag>
              <Tag tone="info">info</Tag>
            </TagGroup>
            <AvatarGroup>
              <Avatar name="Ada Lovelace" />
              <Avatar name="Grace Hopper" />
              <Avatar name="Alan Turing" />
            </AvatarGroup>
          </div>
          <Card padded>
            <MetricGrid>
              <Metric label="请求" value="12.4k" />
              <Metric label="延迟" value="86ms" />
              <Metric label="错误率" value="0.2%" />
            </MetricGrid>
          </Card>
          <Card>
            <EmptyState title="还没有数据" description="创建第一条记录开始。" />
          </Card>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="KV / Accordion / Tree / Timeline / Skeleton">
        <div className="grid-2">
          <Card padded>
            <DescriptionList
              items={[
                { label: '环境', value: 'production' },
                { label: '区域', value: 'cn-east' },
                { label: '负责人', value: 'demo@x-ui.dev' },
              ]}
            />
          </Card>
          <Accordion
            items={[
              { id: '1', title: '什么是 x-ui？', content: '一套可复用的管理端组件与布局。' },
              { id: '2', title: '如何接入？', content: '从 @/components/ui 按需导入组件即可。' },
            ]}
          />
          <Card padded>
            <Tree
              activeId={treeId}
              onSelect={setTreeId}
              nodes={[
                {
                  id: 'cluster',
                  label: 'cluster',
                  children: [
                    { id: 'ns-default', label: 'default' },
                    { id: 'ns-sys', label: 'kube-system' },
                  ],
                },
              ]}
            />
          </Card>
          <Card padded>
            <Timeline
              items={[
                { id: 'a', title: '创建资源', meta: '2 分钟前' },
                { id: 'b', title: '健康检查通过', meta: '刚刚' },
              ]}
            />
          </Card>
          <SkeletonTable rows={3} />
          <SkeletonCard />
        </div>
      </ShowcaseSection>
    </div>
  )
}
