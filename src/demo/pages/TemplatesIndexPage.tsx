import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/ui'
import { useLocale } from '@/i18n'
import { ALL_TEMPLATES, TEMPLATE_GROUPS } from '@/demo/catalog/templates'
import { pickL10n } from '@/demo/i18n/types'
import { useDemoT } from '@/demo/i18n/useDemoT'
import { ShowcaseSection } from '../ShowcaseSection'

const LIST_VARIANTS: Array<[tpl: string, descEn: string, descZh: string]> = [
  ['sortable', 'Sortable table (default)', '可排序表格（默认）'],
  ['static', 'Non-sortable table', '不可排序表格'],
  ['pinned', 'Name pinned left + actions pinned right', '左固定名称 + 右固定操作'],
  ['tree', 'Tree table (TreeTableCell)', '树表（TreeTableCell）'],
  ['cards', 'Card list', '卡片列表'],
  ['compact', 'Compact-density table', '紧凑密度表格'],
  ['resource', 'All-in-one ResourceList', 'ResourceList 一体列表'],
]

export function TemplatesIndexPage() {
  const { locale } = useLocale()
  const t = useDemoT()
  return (
    <div>
      <PageHeader
        title={t('Templates', '页面模板')}
        description={
          locale === 'zh'
            ? `${ALL_TEMPLATES.length} 个整页示例，按场景分组。实现类似页面前先打开最接近的模板，对照组件、校验与布局。`
            : `${ALL_TEMPLATES.length} full-page examples grouped by scenario. Before building a similar page, open the closest template and compare its components, validation, and layout.`
        }
      />

      {TEMPLATE_GROUPS.map((g) => (
        <ShowcaseSection key={g.id} title={pickL10n(locale, g.label)} description={pickL10n(locale, g.description)}>
          <div className="index-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
            {g.items.map((item) => (
              <Link key={item.to} to={item.to} className="index-tile">
                <span className="index-tile-label">{pickL10n(locale, item.label)}</span>
                <span className="index-tile-desc">{pickL10n(locale, item.desc)}</span>
              </Link>
            ))}
          </div>
        </ShowcaseSection>
      ))}

      <ShowcaseSection
        title={t('List template variants', '列表模板变体')}
        description={t('The list page switches via ?tpl=, covering common table shapes.', '列表页通过 ?tpl= 切换，覆盖常见表格形态。')}
      >
        <div className="index-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
          {LIST_VARIANTS.map(([tpl, descEn, descZh]) => (
            <Link key={tpl} to={`/examples/list?tpl=${tpl}`} className="index-tile">
              <span className="index-tile-label">{tpl}</span>
              <span className="index-tile-desc">{t(descEn, descZh)}</span>
            </Link>
          ))}
        </div>
      </ShowcaseSection>

      <p className="index-footnote muted">
        {t('Smaller compositions (login cards, wizards, dashboard snippets) are in ', '局部组合（登录卡片、向导、仪表盘片段）见 ')}
        <Link to="/patterns" className="text-link">
          {t('Patterns', '组合模式')}
        </Link>
        {locale === 'zh' ? '。' : '.'}
      </p>
    </div>
  )
}
