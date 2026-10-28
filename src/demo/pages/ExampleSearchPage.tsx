import { useMemo, useState } from 'react'
import { Card, Field, Input, PageHeader, SearchResultList } from '@/components/ui'
import { useDemoT } from '@/demo/i18n/useDemoT'

export function ExampleSearchPage() {
  const t = useDemoT()
  const [q, setQ] = useState('button')

  const all = useMemo(
    () => [
      { id: '1', title: t('Button component', 'Button 组件'), type: t('Component', '组件'), path: '/components/buttons' },
      { id: '2', title: t('List page example', '列表页示例'), type: t('Example', '示例'), path: '/examples/list' },
      { id: '3', title: t('Chart palette', '图表色板'), type: t('Foundation', '基础'), path: '/foundations' },
      { id: '4', title: 'DatePicker', type: t('Component', '组件'), path: '/components/advanced' },
      { id: '5', title: t('Dashboard', '仪表盘'), type: t('Example', '示例'), path: '/examples/dashboard' },
    ],
    [t],
  )

  const results = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return all
    return all.filter((r) => r.title.toLowerCase().includes(s) || r.type.toLowerCase().includes(s))
  }, [all, q])

  return (
    <div>
      <PageHeader
        title={t('Search results', '搜索结果')}
        description={t('Topbar search landing page pattern.', '顶栏搜索落地页模式。')}
      />
      <Card padded className="stack">
        <Field label={t('Keyword', '关键词')} htmlFor="search-q">
          <Input
            id="search-q"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t('Search components / examples…', '搜索组件 / 示例…')}
            autoFocus
          />
        </Field>
        <p className="muted search-result-count">
          {t(`${results.length} results`, `找到 ${results.length} 条结果`)}
        </p>
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
