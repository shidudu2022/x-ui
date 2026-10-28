import { CodeBlock } from '@/components/ui'
import { DocPage } from '@/demo/docs/DocPage'
import { ShowcaseSection } from '@/demo/ShowcaseSection'

type Row = [name: string, signature: string, desc: string]

function ApiTable({ rows }: { rows: Row[] }) {
  return (
    <div className="guide-table-wrap">
      <table className="guide-table">
        <thead>
          <tr>
            <th>导出</th>
            <th>签名 / 值</th>
            <th>说明</th>
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
              <td>{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const APPEARANCE: Row[] = [
  ['AppearanceProvider', '({ children })', '外观上下文，写入 body[data-*] 与 localStorage'],
  ['useAppearance', '() => AppearanceContextValue', '读取 / 设置 mode、theme、accent、density、wallpaper'],
  ['ACCENTS', "readonly ['teal', 'blue', …]", '内置强调色 id 列表'],
  ['ACCENT_COLORS', 'Record<Accent, string>', '强调色预览色值（固定，不随深浅色变化）'],
  ['THEMES / THEME_IDS / getTheme', 'ThemeId = "classic" | "glass"', '主题包注册表'],
  ['resolveColorMode', "(pref: 'system' | 'light' | 'dark') => 'light' | 'dark'", '把用户偏好解析为实际深浅色'],
]

const CHART: Row[] = [
  ['CHART_COLORS', "['var(--chart-1)', … 6 项]", '系列色板，chart-1 恒为主色'],
  ['CHART_STATUS', '{ success, warn, danger, info, neutral, primary }', '语义色，用于仪表盘状态'],
  ['chartAxisProps', 'object', '展开到 recharts 的 XAxis / YAxis，统一轴线与刻度样式'],
  ['chartGridProps', 'object', '展开到 CartesianGrid，统一网格线'],
  ['chartLegendWrapperStyle', '{ paddingTop: 12 }', '图例容器样式'],
  ['ChartTooltipContent / ChartLegendContent', 'ReactElement', '传给 Tooltip / Legend 的 content，套用主题样式'],
]

const LIST: Row[] = [
  ['buildListQuery', '(params) => string', '生成 ?a=1&b=2，跳过空值与 "all"'],
  ['pageCount', '(total, pageSize) => number', '总页数，至少为 1'],
  ['slicePage', '(items, page, pageSize) => T[]', '前端分页切片（页码从 1 开始）'],
  ['defaultFilterRow', '(row, filters) => boolean', '客户端筛选：q 匹配整行 JSON，其余键精确匹配'],
  ['ListPageResult<T>', '{ items, total, page?, take? }', '远程分页接口的返回形状'],
]

const MISC: Row[] = [
  ['cn', '(...classes) => string', '合并 className'],
  ['EMPTY_CELL / emptyCell / isEmptyCellValue', '(value, placeholder?) => ReactNode', '表格空值统一显示 —'],
  ['meterToneFromPct', '(pct) => MeterBarTone', '≥90 danger，≥75 warn，否则 success；无值为 muted'],
  ['buildTotpOtpauth', '({ secret, account, issuer? }) => string', '生成 otpauth:// 链接，配合 TotpBindPanel'],
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

// Table / DataTable 的列已自动对 render 结果套用空值占位；
// 在自定义布局里手动使用：
<dd>{emptyCell(item.owner)}</dd>
// 空字符串 / null / 空数组 / 空 TagGroup 都显示 —

// 操作列不需要占位：
{ key: 'actions', header: '', emptyPlaceholder: false, render: renderActions }`

export function UtilitiesPage() {
  return (
    <DocPage
      eyebrow="开始"
      title="工具与令牌 API"
      description="组件之外从包入口导出的函数、常量与类型：外观、图表令牌、列表与表格辅助。"
    >
      <ShowcaseSection title="外观" description="详见「主题与外观」。">
        <ApiTable rows={APPEARANCE} />
      </ShowcaseSection>

      <ShowcaseSection title="图表令牌" description="自定义 recharts 图表时复用，保证与内置图表风格一致。">
        <ApiTable rows={CHART} />
        <div style={{ marginTop: 12 }}>
          <CodeBlock className="guide-code" code={CHART_CODE} language="tsx" title="tsx" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="列表辅助" description="配合 ResourceList / DataTable 做前端分页、筛选与 URL 同步。">
        <ApiTable rows={LIST} />
        <div style={{ marginTop: 12 }}>
          <CodeBlock className="guide-code" code={LIST_CODE} language="tsx" title="tsx" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="表格空值与其它">
        <ApiTable rows={MISC} />
        <div style={{ marginTop: 12 }}>
          <CodeBlock className="guide-code" code={CELL_CODE} language="tsx" title="tsx" />
        </div>
      </ShowcaseSection>
    </DocPage>
  )
}
