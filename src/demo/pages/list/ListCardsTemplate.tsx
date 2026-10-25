import {
  Badge,
  Button,
  Card,
  EmptyState,
  ListFilterBar,
  Muted,
  Tag,
  TagGroup,
  Text,
  useToast,
} from '@/components/ui'
import { filterFlat, FLAT_SEED } from './listSeed'

export function ListCardsTemplate({ q, onClear }: { q: string; onClear: () => void }) {
  const { toast } = useToast()
  const filtered = filterFlat(FLAT_SEED, q)

  return (
    <>
      <ListFilterBar
        query={q}
        total={FLAT_SEED.length}
        matched={filtered.length}
        unit="个"
        onClear={onClear}
      />
      {filtered.length === 0 ? (
        <Card padded>
          <EmptyState
            title={q ? '无匹配集群' : '还没有集群'}
            description={q ? `没有与「${q}」匹配的结果。` : '创建第一个集群开始使用。'}
            action={
              q ? undefined : (
                <Button variant="primary" onClick={() => toast('打开创建流程（示例）', 'info')}>
                  创建集群
                </Button>
              )
            }
          />
        </Card>
      ) : (
        <div className="list-card-grid">
          {filtered.map((r) => (
            <Card key={r.id} padded className="list-card-item">
              <div className="list-card-head">
                <div>
                  <Text variant="strong">{r.name}</Text>
                  <Muted as="div" style={{ marginTop: 2 }}>
                    {r.note}
                  </Muted>
                </div>
                <Badge
                  tone={
                    r.status === 'running'
                      ? 'success'
                      : r.status === 'degraded'
                        ? 'warn'
                        : 'neutral'
                  }
                >
                  {r.status}
                </Badge>
              </div>
              <dl className="list-card-meta">
                <div>
                  <dt>版本</dt>
                  <dd className="mono">{r.version}</dd>
                </div>
                <div>
                  <dt>节点</dt>
                  <dd>{r.nodes}</dd>
                </div>
              </dl>
              <TagGroup>
                {r.tags.map((t) => (
                  <Tag key={t} tone="neutral">
                    {t}
                  </Tag>
                ))}
              </TagGroup>
              <div className="actions" style={{ marginTop: 12 }}>
                <Button size="sm" variant="primary" onClick={() => toast(`打开 ${r.name}`, 'info')}>
                  打开
                </Button>
                <Button size="sm" onClick={() => toast(`诊断 ${r.name}`, 'success')}>
                  诊断
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  )
}
