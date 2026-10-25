import { useMemo } from 'react'
import {
  Badge,
  Button,
  DataTable,
  ListFilterBar,
  ListPage,
  Muted,
  Tag,
  TagGroup,
  Text,
  useToast,
} from '@/components/ui'
import { matchText, useListSearch } from '@/lib/useListSearch'

type Row = {
  id: string
  name: string
  note: string
  status: 'running' | 'degraded' | 'stopped'
  version: string
  nodes: number
  tags: string[]
}

const SEED: Row[] = Array.from({ length: 23 }, (_, i) => ({
  id: String(i + 1),
  name: `cluster-${String(i + 1).padStart(2, '0')}`,
  note: i % 3 === 0 ? '生产环境' : i % 3 === 1 ? '预发' : '开发调试',
  status: (['running', 'degraded', 'stopped'] as const)[i % 3],
  version: i % 2 === 0 ? 'v1.31.3+k3s1' : 'v1.30.6+k3s1',
  nodes: 1 + (i % 5),
  tags: i % 2 === 0 ? ['prod', 'edge'] : ['dev'],
}))

/**
 * Full-width list — search via topbar (URL `?q=`), not an in-page search field.
 */
export function ExampleListPage() {
  const { toast } = useToast()
  const { q, clear } = useListSearch()

  const filtered = useMemo(() => {
    if (!q) return SEED
    return SEED.filter((r) =>
      matchText(`${r.name} ${r.note} ${r.status} ${r.version} ${r.tags.join(' ')}`, q),
    )
  }, [q])

  return (
    <ListPage
      title="集群"
      description="创建、扩缩、升级与卸载远程 k3s 集群。"
      actions={
        <Button variant="primary" onClick={() => toast('打开创建流程（示例）', 'info')}>
          创建集群
        </Button>
      }
      toolbar={
        <ListFilterBar
          query={q}
          total={SEED.length}
          matched={filtered.length}
          unit="个"
          onClear={clear}
        />
      }
    >
      <DataTable
        rows={filtered}
        rowKey={(r) => r.id}
        unit="个"
        emptyTitle={q ? '无匹配集群' : '还没有集群'}
        emptyDesc={
          q
            ? `没有与「${q}」匹配的集群，可清除筛选后重试。`
            : '先添加服务器，再创建集群。'
        }
        emptyAction={
          q ? undefined : (
            <Button variant="primary" onClick={() => toast('打开创建流程（示例）', 'info')}>
              创建集群
            </Button>
          )
        }
        onRowClick={(r) => toast(`打开 ${r.name}`, 'info')}
        columns={[
          {
            key: 'name',
            header: '名称',
            render: (r) => (
              <>
                <Text variant="strong">{r.name}</Text>
                <Muted as="div" style={{ marginTop: 2 }}>
                  {r.note}
                </Muted>
              </>
            ),
          },
          {
            key: 'status',
            header: '状态',
            render: (r) => (
              <Badge
                tone={
                  r.status === 'running' ? 'success' : r.status === 'degraded' ? 'warn' : 'neutral'
                }
              >
                {r.status}
              </Badge>
            ),
          },
          {
            key: 'version',
            header: '版本',
            render: (r) => <span className="mono">{r.version}</span>,
          },
          {
            key: 'nodes',
            header: '节点',
            render: (r) => r.nodes,
          },
          {
            key: 'tags',
            header: '标签',
            render: (r) => (
              <TagGroup>
                {r.tags.map((t) => (
                  <Tag key={t} tone="neutral">
                    {t}
                  </Tag>
                ))}
              </TagGroup>
            ),
          },
          {
            key: 'actions',
            header: '操作',
            render: (r) => (
              <div className="actions" onClick={(e) => e.stopPropagation()}>
                <Button
                  size="sm"
                  onClick={() => toast(`打开 ${r.name}`, 'info')}
                >
                  打开
                </Button>
                <Button
                  size="sm"
                  onClick={() => toast(`诊断 ${r.name}（示例）`, 'success')}
                >
                  诊断
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => toast(`删除 ${r.name}（示例）`, 'error')}
                >
                  删除
                </Button>
              </div>
            ),
          },
        ]}
      />
    </ListPage>
  )
}
