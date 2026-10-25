import { useMemo, useState } from 'react'
import { Card, Field, Input, PageHeader, SearchResultList } from '@/components/ui'

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
      <Card padded className="stack">
        <Field label="关键词" htmlFor="search-q">
          <Input
            id="search-q"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜索组件 / 示例…"
            autoFocus
          />
        </Field>
        <p className="muted search-result-count">找到 {results.length} 条结果</p>
        <SearchResultList
          items={results.map((r) => ({
            id: r.id,
            title: r.title,
            description: r.path,
            type: r.type,
            href: r.path,
          }))}
        />
      </Card>
    </div>
  )
}
