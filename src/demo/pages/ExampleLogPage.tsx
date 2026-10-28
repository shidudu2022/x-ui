import { useMemo, useState } from 'react'
import {
  Badge,
  Button,
  Card,
  Input,
  LogViewer,
  PageHeader,
  Select,
  useToast,
} from '@/components/ui'
import { useDemoT } from '@/demo/i18n/useDemoT'

const SAMPLE_LOG = `[info] preflight: checking ssh connectivity
[ok] edge-01 (10.0.0.1) reachable
[info] installing k3s server v1.31.3+k3s1
[ok] kubeconfig written
[info] joining agent edge-02
[err] agent edge-02: connection timed out
[info] retrying agent join…
[ok] cluster ready (degraded)
`

export function ExampleLogPage() {
  const t = useDemoT()
  const { toast } = useToast()
  const [filter, setFilter] = useState('')
  const [nodeKey, setNodeKey] = useState('all')

  const nodeOptions = useMemo(
    () => [
      { value: 'all', label: t('All nodes', '全部节点') },
      { value: 'edge-01', label: 'edge-01' },
      { value: 'edge-02', label: 'edge-02' },
    ],
    [t],
  )

  const shown = useMemo(() => {
    let lines = SAMPLE_LOG.split('\n')
    if (nodeKey !== 'all') {
      lines = lines.filter((l) => l.toLowerCase().includes(nodeKey.toLowerCase()))
    }
    const q = filter.trim().toLowerCase()
    if (q) {
      lines = lines.filter((l) => l.toLowerCase().includes(q))
    }
    return lines.join('\n')
  }, [filter, nodeKey])

  return (
    <section className="page active">
      <PageHeader
        title={t('Install demo-cluster', '安装 demo-cluster')}
        description={
          <>
            <Badge tone="warn">running</Badge> · install ·{' '}
            <button
              type="button"
              className="crumb-link"
              onClick={() => toast(t('Go to cluster (demo)', '跳转集群（示例）'), 'info')}
            >
              {t('View cluster', '查看集群')}
            </button>
          </>
        }
        actions={
          <Button
            onClick={() => {
              const blob = new Blob([SAMPLE_LOG], { type: 'text/plain' })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = 'job.log'
              a.click()
              URL.revokeObjectURL(url)
            }}
          >
            {t('Download log', '下载日志')}
          </Button>
        }
      />

      <div className="stack">
        <Card padded>
          <div className="log-toolbar-filters">
            <Select
              size="sm"
              value={nodeKey}
              options={nodeOptions}
              onChange={setNodeKey}
              aria-label={t('Filter by node', '按节点过滤')}
            />
            <Input
              size="sm"
              type="search"
              placeholder={t('Search log keywords', '搜索日志关键字')}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </Card>
        <LogViewer height={360}>
          {shown ||
            (nodeKey !== 'all' || filter ? t('No matching lines', '无匹配行') : t('No logs yet', '暂无日志'))}
        </LogViewer>
      </div>
    </section>
  )
}
