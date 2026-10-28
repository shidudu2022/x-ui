import { CodeBlock } from '@/components/ui'
import { useLocale } from '@/i18n'
import { pickL10n, type L10n } from '@/demo/i18n/types'
import { useDemoT } from '@/demo/i18n/useDemoT'
import { DocPage } from '@/demo/docs/DocPage'
import { ShowcaseSection } from '@/demo/ShowcaseSection'

type Row = [name: string, signature: string, desc: L10n]

function ApiTable({ rows }: { rows: Row[] }) {
  const { locale } = useLocale()
  const t = useDemoT()
  return (
    <div className="guide-table-wrap">
      <table className="guide-table">
        <thead>
          <tr>
            <th>{t('Export', '导出')}</th>
            <th>{t('Signature / value', '签名 / 值')}</th>
            <th>{t('Description', '说明')}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([name, sig, desc]) => (
            <tr key={name}>
              <td style={{ whiteSpace: 'nowrap' }}>
                <code>{name}</code>
              </td>
              <td>
                <code>{sig}</code>
              </td>
              <td>{pickL10n(locale, desc)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const APPEARANCE: Row[] = [
  ['AppearanceProvider', '({ children })', { en: 'Appearance context; writes to body[data-*] and localStorage', zh: '外观上下文，写入 body[data-*] 与 localStorage' }],
  ['useAppearance', '() => AppearanceContextValue', { en: 'Read / set mode, theme, accent, density, wallpaper', zh: '读取 / 设置 mode、theme、accent、density、wallpaper' }],
  ['ACCENTS', "readonly ['teal', 'blue', …]", { en: 'List of built-in accent color ids', zh: '内置强调色 id 列表' }],
  ['ACCENT_COLORS', 'Record<Accent, string>', { en: 'Preview color values for accents (fixed, doesn’t change with light/dark)', zh: '强调色预览色值（固定，不随深浅色变化）' }],
  ['THEMES / THEME_IDS / getTheme', 'ThemeId = "classic" | "glass"', { en: 'Theme pack registry', zh: '主题包注册表' }],
  ['resolveColorMode', "(pref: 'system' | 'light' | 'dark') => 'light' | 'dark'", { en: 'Resolve a user preference into an actual light/dark mode', zh: '把用户偏好解析为实际深浅色' }],
]

const CHART: Row[] = [
  ['CHART_COLORS', "['var(--chart-1)', … 6 items]", { en: 'Series palette; chart-1 is always the primary color', zh: '系列色板，chart-1 恒为主色' }],
  ['CHART_STATUS', '{ success, warn, danger, info, neutral, primary }', { en: 'Semantic colors for dashboard status', zh: '语义色，用于仪表盘状态' }],
  ['chartAxisProps', 'object', { en: 'Spread onto recharts’ XAxis / YAxis for consistent axis/tick styling', zh: '展开到 recharts 的 XAxis / YAxis，统一轴线与刻度样式' }],
  ['chartGridProps', 'object', { en: 'Spread onto CartesianGrid for consistent grid lines', zh: '展开到 CartesianGrid，统一网格线' }],
  ['chartLegendWrapperStyle', '{ paddingTop: 12 }', { en: 'Legend container style', zh: '图例容器样式' }],
  ['ChartTooltipContent / ChartLegendContent', 'ReactElement', { en: 'Content passed to Tooltip / Legend, styled to match the theme', zh: '传给 Tooltip / Legend 的 content，套用主题样式' }],
]

const LIST: Row[] = [
  ['buildListQuery', '(params) => string', { en: 'Builds ?a=1&b=2, skipping empty values and "all"', zh: '生成 ?a=1&b=2，跳过空值与 "all"' }],
  ['pageCount', '(total, pageSize) => number', { en: 'Total page count, at least 1', zh: '总页数，至少为 1' }],
  ['slicePage', '(items, page, pageSize) => T[]', { en: 'Client-side pagination slice (page starts at 1)', zh: '前端分页切片（页码从 1 开始）' }],
  ['defaultFilterRow', '(row, filters) => boolean', { en: 'Client-side filtering: q matches the whole row as JSON, other keys match exactly', zh: '客户端筛选：q 匹配整行 JSON，其余键精确匹配' }],
  ['ListPageResult<T>', '{ items, total, page?, take? }', { en: 'Return shape for a remote-paginated endpoint', zh: '远程分页接口的返回形状' }],
]

const MISC: Row[] = [
  ['cn', '(...classes) => string', { en: 'Merge className values', zh: '合并 className' }],
  ['EMPTY_CELL / emptyCell / isEmptyCellValue', '(value, placeholder?) => ReactNode', { en: 'Uniform — placeholder for empty table values', zh: '表格空值统一显示 —' }],
  ['meterToneFromPct', '(pct) => MeterBarTone', { en: '≥90 danger, ≥75 warn, otherwise success; muted when no value', zh: '≥90 danger，≥75 warn，否则 success；无值为 muted' }],
  ['buildTotpOtpauth', '({ secret, account, issuer? }) => string', { en: 'Builds an otpauth:// link for use with TotpBindPanel', zh: '生成 otpauth:// 链接，配合 TotpBindPanel' }],
]

const CHART_CODE = `import { Area, AreaChart as RAreaChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
import { CHART_STATUS, chartAxisProps, chartGridProps, ChartTooltipContent } from '@shidudu2022/x-ui'

<RAreaChart data={data}>
  <CartesianGrid {...chartGridProps} />
  <XAxis dataKey="t" {...chartAxisProps} />
  <YAxis {...chartAxisProps} />
  <Tooltip content={<ChartTooltipContent />} />
  <Area dataKey="ok" stroke={CHART_STATUS.success} fill={CHART_STATUS.success} fillOpacity={0.15} />
</RAreaChart>`

const LIST_CODE = `import { buildListQuery, defaultFilterRow, pageCount, slicePage } from '@shidudu2022/x-ui'

const filtered = rows.filter((r) => defaultFilterRow(r, { q: keyword, status }))
const pageRows = slicePage(filtered, page, 20)
const pages = pageCount(filtered.length, 20)

navigate(\`/clusters\${buildListQuery({ q: keyword, status, page })}\`)`

const CELL_CODE = `import { emptyCell } from '@shidudu2022/x-ui'

// Table / DataTable columns already apply the empty-value placeholder to the render result;
// for custom layouts, use it manually:
<dd>{emptyCell(item.owner)}</dd>
// Empty strings / null / empty arrays / an empty TagGroup all render as —

// Action columns don't need a placeholder:
{ key: 'actions', header: '', emptyPlaceholder: false, render: renderActions }`

export function UtilitiesPage() {
  const t = useDemoT()

  return (
    <DocPage
      eyebrow={t('Start', '开始')}
      title={t('Utilities & token API', '工具与令牌 API')}
      description={t(
        'Functions, constants, and types exported from the package entry besides components: appearance, chart tokens, list and table helpers.',
        '组件之外从包入口导出的函数、常量与类型：外观、图表令牌、列表与表格辅助。',
      )}
    >
      <ShowcaseSection title={t('Appearance', '外观')} description={t('See "Theming" for details.', '详见「主题与外观」。')}>
        <ApiTable rows={APPEARANCE} />
      </ShowcaseSection>

      <ShowcaseSection
        title={t('Chart tokens', '图表令牌')}
        description={t('Reuse these when building custom recharts charts to stay consistent with the built-in charts.', '自定义 recharts 图表时复用，保证与内置图表风格一致。')}
      >
        <ApiTable rows={CHART} />
        <div style={{ marginTop: 12 }}>
          <CodeBlock className="guide-code" code={CHART_CODE} language="tsx" title="tsx" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title={t('List helpers', '列表辅助')}
        description={t('Pair with ResourceList / DataTable for client-side pagination, filtering, and URL sync.', '配合 ResourceList / DataTable 做前端分页、筛选与 URL 同步。')}
      >
        <ApiTable rows={LIST} />
        <div style={{ marginTop: 12 }}>
          <CodeBlock className="guide-code" code={LIST_CODE} language="tsx" title="tsx" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title={t('Table empty values & more', '表格空值与其它')}>
        <ApiTable rows={MISC} />
        <div style={{ marginTop: 12 }}>
          <CodeBlock className="guide-code" code={CELL_CODE} language="tsx" title="tsx" />
        </div>
      </ShowcaseSection>
    </DocPage>
  )
}
