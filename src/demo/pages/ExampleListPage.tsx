import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button, ListPage, PageTabs, useToast } from '@/components/ui'
import { useListSearch } from '@/lib/useListSearch'
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

const DESCRIPTIONS: Record<ListTemplateId, string> = {
  sortable: '可排序平面表：表头点击排序、列显隐、列宽拖拽、多选批量。',
  static: '不可排序平面表：固定列顺序与展示，适合只读浏览与操作。',
  pinned: '固定列：左侧名称 + 右侧操作列 sticky，横向滚动时保持可见。',
  tree: '命名空间分组树：展开/折叠子行，分页按根节点计。',
  cards: '卡片网格：适合浏览与少字段摘要，无表格。',
  compact: '紧凑列表：少列、大页容量，偏运维扫读（无排序）。',
  resource: 'ResourceList：筛选栏 + 表格 + 分页一体，适合业务资源列表页。',
}

/**
 * List page templates — switch via PageTabs + URL `?tpl=`.
 * Topbar search (`?q=`) applies to every template.
 */
export function ExampleListPage() {
  const { toast } = useToast()
  const { q, clear } = useListSearch()
  const [params, setParams] = useSearchParams()
  const tpl = parseListTemplateId(params.get('tpl'))

  const setTpl = useCallback(
    (id: string) => {
      const next = new URLSearchParams(params)
      if (id === 'sortable') next.delete('tpl')
      else next.set('tpl', id)
      setParams(next, { replace: true })
    },
    [params, setParams],
  )

  return (
    <ListPage
      title="集群"
      description={DESCRIPTIONS[tpl]}
      actions={
        <Button variant="primary" onClick={() => toast('打开创建流程（示例）', 'info')}>
          创建集群
        </Button>
      }
    >
      <PageTabs
        value={tpl}
        onChange={setTpl}
        items={LIST_TEMPLATES.map((t) => ({ id: t.id, label: t.label }))}
      />
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
