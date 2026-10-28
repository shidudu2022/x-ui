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
  emptyCell,
  useToast,
} from '@/components/ui'
import { useLocale } from '@/i18n'
import { useDemoT } from '@/demo/i18n/useDemoT'
import { filterFlat, FLAT_SEED, rowNote } from './listSeed'

export function ListCardsTemplate({ q, onClear }: { q: string; onClear: () => void }) {
  const t = useDemoT()
  const { locale } = useLocale()
  const { toast } = useToast()
  const filtered = filterFlat(FLAT_SEED, q)

  return (
    <>
      <ListFilterBar
        query={q}
        total={FLAT_SEED.length}
        matched={filtered.length}
        unit={t('items', '个')}
        onClear={onClear}
      />
      {filtered.length === 0 ? (
        <Card padded>
          <EmptyState
            title={q ? t('No matching clusters', '无匹配集群') : t('No clusters yet', '还没有集群')}
            description={
              q
                ? t(`No results match “${q}”.`, `没有与「${q}」匹配的结果。`)
                : t('Create your first cluster to get started.', '创建第一个集群开始使用。')
            }
            action={
              q ? undefined : (
                <Button variant="primary" onClick={() => toast(t('Open create flow (demo)', '打开创建流程（示例）'), 'info')}>
                  {t('Create cluster', '创建集群')}
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
                    {emptyCell(rowNote(locale, r.note))}
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
                  <dt>{t('Version', '版本')}</dt>
                  <dd className="mono">{emptyCell(r.version)}</dd>
                </div>
                <div>
                  <dt>{t('Nodes', '节点')}</dt>
                  <dd>{r.nodes}</dd>
                </div>
              </dl>
              {emptyCell(
                <TagGroup>
                  {r.tags
                    .filter((tag) => tag.trim())
                    .map((tag) => (
                      <Tag key={tag} tone="neutral">
                        {tag}
                      </Tag>
                    ))}
                </TagGroup>,
              )}
              <div className="actions" style={{ marginTop: 12 }}>
                <Button size="sm" variant="primary" onClick={() => toast(t(`Open ${r.name}`, `打开 ${r.name}`), 'info')}>
                  {t('Open', '打开')}
                </Button>
                <Button size="sm" onClick={() => toast(t(`Diagnose ${r.name}`, `诊断 ${r.name}`), 'success')}>
                  {t('Diagnose', '诊断')}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  )
}
