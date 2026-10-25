import { useMemo, useState } from 'react'
import { Button, Card, Input, PageHeader, Tag } from '@/components/ui'

const ALL = [
  { id: '1', title: 'Button 组件', type: '组件', path: '/components/buttons' },
  { id: '2', title: '列表页示例', type: '示例', path: '/examples/list' },
  { id: '3', title: '图表色板', type: '基础', path: '/foundations' },
  { id: '4', title: 'DatePicker', type: '组件', path: '/components/advanced' },
  { id: '5', title: '仪表盘', type: '示例', path: '/examples/dashboard' },
]

export function ExampleSearchPage() {
  const [q, setQ] = useState('button')
  const results = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return ALL
    return ALL.filter((r) => r.title.toLowerCase().includes(s) || r.type.includes(s))
  }, [q])

  return (
    <div>
      <PageHeader title="搜索结果" description="顶栏搜索落地页模式。" />
      <Card padded>
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="搜索组件 / 示例…"
          autoFocus
        />
        <p className="muted" style={{ margin: '10px 0 0', fontSize: 12 }}>
          找到 {results.length} 条结果
        </p>
        <ul className="search-result-list" style={{ marginTop: 12 }}>
          {results.map((r) => (
            <li key={r.id}>
              <a className="search-result-item" href={r.path}>
                <span className="search-result-type">
                  <Tag tone="neutral">{r.type}</Tag>
                </span>
                <span className="search-result-main">
                  <strong>{r.title}</strong>
                  <span className="muted">{r.path}</span>
                </span>
                <Button size="sm" href={r.path}>
                  打开
                </Button>
              </a>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
