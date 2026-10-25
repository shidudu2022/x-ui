import { useMemo, useState } from 'react'
import { Badge, Button, LogViewer, PageHeader, useToast } from '@/components/ui'

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
  const { toast } = useToast()
  const [filter, setFilter] = useState('')

  const shown = useMemo(() => {
    if (!filter.trim()) return SAMPLE_LOG
    return SAMPLE_LOG.split('\n')
      .filter((l) => l.toLowerCase().includes(filter.toLowerCase()))
      .join('\n')
  }, [filter])

  return (
    <section className="page active">
      <PageHeader
        title="安装 demo-cluster"
        description={
          <>
            <Badge tone="warn">running</Badge> · install ·{' '}
            <button
              type="button"
              className="crumb-link"
              onClick={() => toast('跳转集群（示例）', 'info')}
            >
              查看集群
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
            下载日志
          </Button>
        }
      />

      <LogViewer
        height={360}
        toolbar={
          <input
            type="search"
            placeholder="搜索日志关键字"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        }
      >
        {shown || '无匹配行'}
      </LogViewer>
    </section>
  )
}
