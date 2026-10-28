import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button, Field, Input, ListPage, PageTabs, useToast } from '@/components/ui'
import { useListSearch } from '@/lib/useListSearch'
import { useLocale } from '@/i18n'
import { pickL10n } from '@/demo/i18n/types'
import { useDemoT } from '@/demo/i18n/useDemoT'
import { ListCardsTemplate } from './list/ListCardsTemplate'
import { ListCompactTemplate } from './list/ListCompactTemplate'
import { ListPinnedTemplate } from './list/ListPinnedTemplate'
import { ListResourceTemplate } from './list/ListResourceTemplate'
import { ListTableTemplate } from './list/ListTableTemplate'
import { ListTreeTemplate } from './list/ListTreeTemplate'
import {
  LIST_TEMPLATES,
  parseListTemplateId,
  type ListTemplateId,
} from './list/listSeed'

const DESCRIPTIONS: Record<ListTemplateId, { en: string; zh: string }> = {
  sortable:
    {
      en: 'Sortable flat table: header sort, column visibility, resize, multi-select bulk actions.',
      zh: '可排序平面表：表头点击排序、列显隐、列宽拖拽、多选批量。',
    },
  static: {
    en: 'Static flat table: fixed column order, good for read-only browsing.',
    zh: '不可排序平面表：固定列顺序与展示，适合只读浏览与操作。',
  },
  pinned: {
    en: 'Pinned columns: name left + actions right stay visible while scrolling.',
    zh: '固定列：左侧名称 + 右侧操作列 sticky，横向滚动时保持可见。',
  },
  tree: {
    en: 'Namespace tree: expand/collapse child rows; pagination counts root nodes.',
    zh: '命名空间分组树：展开/折叠子行，分页按根节点计。',
  },
  cards: {
    en: 'Card grid: browse with fewer fields, no table.',
    zh: '卡片网格：适合浏览与少字段摘要，无表格。',
  },
  compact: {
    en: 'Compact list: fewer columns, larger page size, ops scanning (no sort).',
    zh: '紧凑列表：少列、大页容量，偏运维扫读（无排序）。',
  },
  resource: {
    en: 'ResourceList: filters + table + pagination in one shell.',
    zh: 'ResourceList：筛选栏 + 表格 + 分页一体，适合业务资源列表页。',
  },
}

/**
 * List page templates — switch via PageTabs + URL `?tpl=`.
 * Topbar search drawer (`?q=`) applies to every template.
 */
export function ExampleListPage() {
  const t = useDemoT()
  const { locale } = useLocale()
  const { toast } = useToast()
  const { q, setQuery, clear } = useListSearch()
  const [draft, setDraft] = useState(q)
  const [params, setParams] = useSearchParams()
  const tpl = parseListTemplateId(params.get('tpl'))

  useEffect(() => {
    setDraft(q)
  }, [q])

  const setTpl = useCallback(
    (id: string) => {
      const next = new URLSearchParams(params)
      if (id === 'sortable') next.delete('tpl')
      else next.set('tpl', id)
      setParams(next, { replace: true })
    },
    [params, setParams],
  )

  const tabItems = useMemo(
    () => LIST_TEMPLATES.map((item) => ({ id: item.id, label: pickL10n(locale, item.label) })),
    [locale],
  )

  return (
    <ListPage
      title={t('Clusters', '集群')}
      description={pickL10n(locale, DESCRIPTIONS[tpl])}
      actions={
        <Button variant="primary" onClick={() => toast(t('Open create flow (demo)', '打开创建流程（示例）'), 'info')}>
          {t('Create cluster', '创建集群')}
        </Button>
      }
      search={{
        title: t('Filter clusters', '筛选集群'),
        hasQuery: Boolean(q),
        triggerLabel: q || t('Search', '搜索'),
        onClear: () => {
          setDraft('')
          clear()
        },
        onSubmit: () => setQuery(draft),
        children: (
          <Field label={t('Keyword', '关键词')} htmlFor="list-q" hint={t('Filters all list templates via ?q=', '通过 ?q= 作用于全部列表模板')}>
            <Input
              id="list-q"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={t('Name / tag…', '名称 / 标签…')}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setQuery(draft)
              }}
            />
          </Field>
        ),
      }}
    >
      <PageTabs value={tpl} onChange={setTpl} items={tabItems} />
      {tpl === 'sortable' ? <ListTableTemplate q={q} onClear={clear} sortable /> : null}
      {tpl === 'static' ? <ListTableTemplate q={q} onClear={clear} sortable={false} /> : null}
      {tpl === 'pinned' ? <ListPinnedTemplate q={q} onClear={clear} /> : null}
      {tpl === 'tree' ? <ListTreeTemplate q={q} onClear={clear} /> : null}
      {tpl === 'cards' ? <ListCardsTemplate q={q} onClear={clear} /> : null}
      {tpl === 'compact' ? <ListCompactTemplate q={q} onClear={clear} /> : null}
      {tpl === 'resource' ? <ListResourceTemplate q={q} onClear={clear} /> : null}
    </ListPage>
  )
}
