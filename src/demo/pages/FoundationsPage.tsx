import { Link } from 'react-router-dom'
import { CHART_COLORS, CHART_STATUS } from '@/components/charts'
import { CodeBlock, Text } from '@/components/ui'
import { DocPage } from '../docs/DocPage'
import { ShowcaseSection } from '../ShowcaseSection'

type Token = [name: string, label: string]

const COLOR_GROUPS: Array<{ title: string; desc: string; tokens: Token[] }> = [
  {
    title: '表面',
    desc: '由浅到深逐级叠放：页面 → 卡片 → 内嵌区。',
    tokens: [
      ['--bg', '页面背景'],
      ['--bg-elevated', '浮起背景'],
      ['--surface', '卡片表面'],
      ['--surface-2', '内嵌 / 表头'],
      ['--surface-3', '代码 / 强调底'],
      ['--control', '控件底色'],
    ],
  },
  {
    title: '文字',
    desc: '三级文字色，正文、说明、占位 / 禁用。',
    tokens: [
      ['--text', '正文'],
      ['--text-muted', '次要文字'],
      ['--text-faint', '弱化 / 占位'],
    ],
  },
  {
    title: '边框与交互',
    desc: '默认边框、强调边框、分隔线与悬停底。',
    tokens: [
      ['--border', '边框'],
      ['--border-strong', '强边框'],
      ['--hairline', '分隔线'],
      ['--hover', '悬停底'],
    ],
  },
  {
    title: '主色（随强调色变化）',
    desc: '主按钮、选中态、链接与焦点环。',
    tokens: [
      ['--primary', '主色'],
      ['--primary-hover', '主色悬停'],
      ['--primary-soft', '主色淡底'],
      ['--primary-ink', '主色上的文字'],
    ],
  },
  {
    title: '语义色',
    desc: '成功 / 警告 / 危险，各有实色与淡底两档。',
    tokens: [
      ['--success', '成功'],
      ['--success-soft', '成功淡底'],
      ['--warn', '警告'],
      ['--warn-soft', '警告淡底'],
      ['--danger', '危险'],
      ['--danger-soft', '危险淡底'],
    ],
  },
]

const TYPE_SCALE: Array<[token: string, px: string, use: string]> = [
  ['--fs-xs', '11px', '角标、键帽、极小说明'],
  ['--fs-sm', '12px', '提示、次要说明、表头'],
  ['--fs-md', '13px', '控件文字、表格内容'],
  ['--fs-base', '14px', '正文'],
  ['--fs-lg', '15px', '小标题、强调正文'],
  ['--fs-xl', '16px', '卡片标题'],
  ['--fs-2xl', '20px', '分区标题'],
  ['--fs-3xl', '24px', '页面标题'],
]

const RADII: Array<[token: string, px: string, use: string]> = [
  ['--radius-sm', '8px', '按钮 / 输入 / 小块'],
  ['--radius', '10px', '卡片'],
  ['--radius-lg', '14px', '大容器 / 弹层'],
]

const USAGE = `.my-panel {
  padding: 16px;
  color: var(--text);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.my-panel .meta {
  font-size: var(--fs-sm);
  color: var(--text-muted);
}`

export function FoundationsPage() {
  return (
    <DocPage
      eyebrow="基础"
      title="设计令牌"
      description="颜色、字号、圆角、尺寸与图表色板。组件只引用这些 CSS 变量，业务样式也应如此；它们会随深浅色、主题与强调色自动切换。"
    >
      <ShowcaseSection title="颜色" description="下面的色块读取当前外观的实际值，切换深浅色 / 强调色可即时对比。">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {COLOR_GROUPS.map((g) => (
            <div key={g.title}>
              <Text variant="strong" as="div">
                {g.title}
              </Text>
              <Text variant="muted" size="sm" as="p" style={{ margin: '2px 0 8px' }}>
                {g.desc}
              </Text>
              <div className="token-grid">
                {g.tokens.map(([name, label]) => (
                  <div key={name} className="token-swatch">
                    <span className="token-swatch-chip" style={{ background: `var(${name})` }} />
                    <span className="token-swatch-meta">
                      <strong>{label}</strong>
                      <code>{name}</code>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="字号"
        description="全站只有这一套阶梯。用 Text size / Heading level 表达，不要写任意 px。"
      >
        <div className="guide-table-wrap">
          <table className="guide-table">
            <thead>
              <tr>
                <th>令牌</th>
                <th>字号</th>
                <th>预览</th>
                <th>用途</th>
              </tr>
            </thead>
            <tbody>
              {TYPE_SCALE.map(([token, px, use]) => (
                <tr key={token}>
                  <td>
                    <code>{token}</code>
                  </td>
                  <td>{px}</td>
                  <td style={{ fontSize: `var(${token})` }}>控制台 Aa 123</td>
                  <td>{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Text variant="muted" size="md" as="p" style={{ marginTop: 10 }}>
          字重：<code className="guide-prose-code">--fw-normal 400</code> ·{' '}
          <code className="guide-prose-code">--fw-medium 500</code> ·{' '}
          <code className="guide-prose-code">--fw-semibold 600</code> ·{' '}
          <code className="guide-prose-code">--fw-bold 650</code>；行高：
          <code className="guide-prose-code">--lh-tight 1.25</code> /{' '}
          <code className="guide-prose-code">--lh-normal 1.45</code> /{' '}
          <code className="guide-prose-code">--lh-relaxed 1.6</code>。更多对照见{' '}
          <Link to="/examples/typography" className="text-link">
            字体字号模板
          </Link>
          。
        </Text>
      </ShowcaseSection>

      <ShowcaseSection title="字体">
        <div className="guide-table-wrap">
          <table className="guide-table">
            <thead>
              <tr>
                <th>令牌</th>
                <th>预览</th>
                <th>用途</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>--font</code>
                </td>
                <td style={{ fontFamily: 'var(--font)' }}>Inter · PingFang SC · 控制台</td>
                <td>界面文字</td>
              </tr>
              <tr>
                <td>
                  <code>--mono</code>
                </td>
                <td style={{ fontFamily: 'var(--mono)' }}>JetBrains Mono · 0123456789</td>
                <td>ID、路径、代码、数字列</td>
              </tr>
            </tbody>
          </table>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="圆角、控件与阴影">
        <div className="token-grid">
          {RADII.map(([token, px, use]) => (
            <div key={token} className="token-swatch">
              <span className="radius-demo" style={{ borderRadius: `var(${token})`, width: 44, height: 32 }} />
              <span className="token-swatch-meta">
                <strong>
                  {px} · {use}
                </strong>
                <code>{token}</code>
              </span>
            </div>
          ))}
          <div className="token-swatch">
            <span
              className="radius-demo"
              style={{ width: 44, height: 32, borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-lg)' }}
            />
            <span className="token-swatch-meta">
              <strong>阴影 · 弹层</strong>
              <code>--shadow / --shadow-lg</code>
            </span>
          </div>
        </div>
        <Text variant="muted" size="md" as="p" style={{ marginTop: 10 }}>
          控件高度 <code className="guide-prose-code">--control-h</code> 36px（紧凑密度 32px）、小号{' '}
          <code className="guide-prose-code">--control-h-sm</code> 28px（紧凑 26px），控件字号统一{' '}
          <code className="guide-prose-code">--control-fs</code> 13px。侧栏宽度{' '}
          <code className="guide-prose-code">--sidebar-w</code> 232px。
        </Text>
      </ShowcaseSection>

      <ShowcaseSection
        title="图表色板"
        description="跟随深浅色与强调色，chart-1 恒为主色。语义色优先使用 CHART_STATUS。"
      >
        <div className="chart-swatch-row">
          {CHART_COLORS.map((c, i) => (
            <div key={c} className="chart-swatch" style={{ background: c }} title={`--chart-${i + 1}`} />
          ))}
        </div>
        <div className="showcase-row" style={{ marginTop: 12 }}>
          {Object.entries(CHART_STATUS).map(([key, value]) => (
            <span key={key} className="pill">
              <span className="pill-dot" style={{ background: value }} />
              CHART_STATUS.{key}
            </span>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="在业务样式中使用" description="直接引用变量；覆盖变量即可定制，参见「主题与外观」。">
        <CodeBlock className="guide-code" code={USAGE} language="css" title="css" />
        <Text variant="muted" size="md" as="p" style={{ marginTop: 10 }}>
          品牌色定制与外观维度见{' '}
          <Link to="/docs/theming" className="text-link">
            主题与外观
          </Link>
          。
        </Text>
      </ShowcaseSection>
    </DocPage>
  )
}
