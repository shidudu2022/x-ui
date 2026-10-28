import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/ui'
import { ALL_TEMPLATES, TEMPLATE_GROUPS } from '@/demo/catalog/templates'
import { ShowcaseSection } from '../ShowcaseSection'

const LIST_VARIANTS: Array<[tpl: string, desc: string]> = [
  ['sortable', '可排序表格（默认）'],
  ['static', '不可排序表格'],
  ['pinned', '左固定名称 + 右固定操作'],
  ['tree', '树表（TreeTableCell）'],
  ['cards', '卡片列表'],
  ['compact', '紧凑密度表格'],
  ['resource', 'ResourceList 一体列表'],
]

export function TemplatesIndexPage() {
  return (
    <div>
      <PageHeader
        title="页面模板"
        description={`${ALL_TEMPLATES.length} 个整页示例，按场景分组。实现类似页面前先打开最接近的模板，对照组件、校验与布局。`}
      />

      {TEMPLATE_GROUPS.map((g) => (
        <ShowcaseSection key={g.id} title={g.label} description={g.description}>
          <div className="index-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
            {g.items.map((t) => (
              <Link key={t.to} to={t.to} className="index-tile">
                <span className="index-tile-label">{t.label}</span>
                <span className="index-tile-desc">{t.desc}</span>
              </Link>
            ))}
          </div>
        </ShowcaseSection>
      ))}

      <ShowcaseSection title="列表模板变体" description="列表页通过 ?tpl= 切换，覆盖常见表格形态。">
        <div className="index-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
          {LIST_VARIANTS.map(([tpl, desc]) => (
            <Link key={tpl} to={`/examples/list?tpl=${tpl}`} className="index-tile">
              <span className="index-tile-label">{tpl}</span>
              <span className="index-tile-desc">{desc}</span>
            </Link>
          ))}
        </div>
      </ShowcaseSection>

      <p className="index-footnote muted">
        局部组合（登录卡片、向导、仪表盘片段）见 <Link to="/patterns" className="text-link">组合模式</Link>。
      </p>
    </div>
  )
}
