import { Link } from 'react-router-dom'
import { CHART_COLORS, CHART_STATUS } from '@/components/charts'
import { CodeBlock, Text } from '@/components/ui'
import { useLocale } from '@/i18n'
import { pickL10n, type L10n } from '@/demo/i18n/types'
import { useDemoT } from '@/demo/i18n/useDemoT'
import { DocPage } from '../docs/DocPage'
import { ShowcaseSection } from '../ShowcaseSection'

type Token = [name: string, label: L10n]

const COLOR_GROUPS: Array<{ title: L10n; desc: L10n; tokens: Token[] }> = [
  {
    title: { en: 'Surface', zh: '表面' },
    desc: {
      en: 'Stacked from light to dark: page → card → inset area.',
      zh: '由浅到深逐级叠放：页面 → 卡片 → 内嵌区。',
    },
    tokens: [
      ['--bg', { en: 'Page background', zh: '页面背景' }],
      ['--bg-elevated', { en: 'Elevated background', zh: '浮起背景' }],
      ['--surface', { en: 'Card surface', zh: '卡片表面' }],
      ['--surface-2', { en: 'Inset / table head', zh: '内嵌 / 表头' }],
      ['--surface-3', { en: 'Code / emphasis base', zh: '代码 / 强调底' }],
      ['--control', { en: 'Control background', zh: '控件底色' }],
    ],
  },
  {
    title: { en: 'Text', zh: '文字' },
    desc: { en: 'Three text tiers: body, helper, placeholder / disabled.', zh: '三级文字色，正文、说明、占位 / 禁用。' },
    tokens: [
      ['--text', { en: 'Body', zh: '正文' }],
      ['--text-muted', { en: 'Secondary text', zh: '次要文字' }],
      ['--text-faint', { en: 'Faint / placeholder', zh: '弱化 / 占位' }],
    ],
  },
  {
    title: { en: 'Border & interaction', zh: '边框与交互' },
    desc: { en: 'Default border, strong border, hairline, and hover fill.', zh: '默认边框、强调边框、分隔线与悬停底。' },
    tokens: [
      ['--border', { en: 'Border', zh: '边框' }],
      ['--border-strong', { en: 'Strong border', zh: '强边框' }],
      ['--hairline', { en: 'Hairline', zh: '分隔线' }],
      ['--hover', { en: 'Hover fill', zh: '悬停底' }],
    ],
  },
  {
    title: { en: 'Primary (follows accent color)', zh: '主色（随强调色变化）' },
    desc: { en: 'Primary buttons, selected state, links, and focus rings.', zh: '主按钮、选中态、链接与焦点环。' },
    tokens: [
      ['--primary', { en: 'Primary', zh: '主色' }],
      ['--primary-hover', { en: 'Primary hover', zh: '主色悬停' }],
      ['--primary-soft', { en: 'Primary soft fill', zh: '主色淡底' }],
      ['--primary-ink', { en: 'Text on primary', zh: '主色上的文字' }],
    ],
  },
  {
    title: { en: 'Semantic colors', zh: '语义色' },
    desc: { en: 'Success / warn / danger, each with a solid and a soft-fill variant.', zh: '成功 / 警告 / 危险，各有实色与淡底两档。' },
    tokens: [
      ['--success', { en: 'Success', zh: '成功' }],
      ['--success-soft', { en: 'Success soft fill', zh: '成功淡底' }],
      ['--warn', { en: 'Warning', zh: '警告' }],
      ['--warn-soft', { en: 'Warning soft fill', zh: '警告淡底' }],
      ['--danger', { en: 'Danger', zh: '危险' }],
      ['--danger-soft', { en: 'Danger soft fill', zh: '危险淡底' }],
    ],
  },
]

const TYPE_SCALE: Array<[token: string, px: string, use: L10n]> = [
  ['--fs-xs', '11px', { en: 'Badges, kbd, very fine print', zh: '角标、键帽、极小说明' }],
  ['--fs-sm', '12px', { en: 'Hints, secondary notes, table headers', zh: '提示、次要说明、表头' }],
  ['--fs-md', '13px', { en: 'Control text, table content', zh: '控件文字、表格内容' }],
  ['--fs-base', '14px', { en: 'Body text', zh: '正文' }],
  ['--fs-lg', '15px', { en: 'Subheading, emphasized body', zh: '小标题、强调正文' }],
  ['--fs-xl', '16px', { en: 'Card title', zh: '卡片标题' }],
  ['--fs-2xl', '20px', { en: 'Section title', zh: '分区标题' }],
  ['--fs-3xl', '24px', { en: 'Page title', zh: '页面标题' }],
]

const RADII: Array<[token: string, px: string, use: L10n]> = [
  ['--radius-sm', '8px', { en: 'Buttons / inputs / small blocks', zh: '按钮 / 输入 / 小块' }],
  ['--radius', '10px', { en: 'Cards', zh: '卡片' }],
  ['--radius-lg', '14px', { en: 'Large containers / overlays', zh: '大容器 / 弹层' }],
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
  const { locale } = useLocale()
  const t = useDemoT()

  return (
    <DocPage
      eyebrow={t('Foundations', '基础')}
      title={t('Design tokens', '设计令牌')}
      description={t(
        'Color, type scale, radius, sizing, and the chart palette. Components only reference these CSS variables, and your business styles should too — they switch automatically with light/dark, theme, and accent color.',
        '颜色、字号、圆角、尺寸与图表色板。组件只引用这些 CSS 变量，业务样式也应如此；它们会随深浅色、主题与强调色自动切换。',
      )}
    >
      <ShowcaseSection
        title={t('Colors', '颜色')}
        description={t(
          'The swatches below read the current appearance’s actual values — switch light/dark or accent color to compare instantly.',
          '下面的色块读取当前外观的实际值，切换深浅色 / 强调色可即时对比。',
        )}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {COLOR_GROUPS.map((g) => (
            <div key={g.title.en}>
              <Text variant="strong" as="div">
                {pickL10n(locale, g.title)}
              </Text>
              <Text variant="muted" size="sm" as="p" style={{ margin: '2px 0 8px' }}>
                {pickL10n(locale, g.desc)}
              </Text>
              <div className="token-grid">
                {g.tokens.map(([name, label]) => (
                  <div key={name} className="token-swatch">
                    <span className="token-swatch-chip" style={{ background: `var(${name})` }} />
                    <span className="token-swatch-meta">
                      <strong>{pickL10n(locale, label)}</strong>
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
        title={t('Type scale', '字号')}
        description={t(
          'There is only one scale site-wide. Express it with Text size / Heading level — don’t write arbitrary px values.',
          '全站只有这一套阶梯。用 Text size / Heading level 表达，不要写任意 px。',
        )}
      >
        <div className="guide-table-wrap">
          <table className="guide-table">
            <thead>
              <tr>
                <th>{t('Token', '令牌')}</th>
                <th>{t('Size', '字号')}</th>
                <th>{t('Preview', '预览')}</th>
                <th>{t('Use', '用途')}</th>
              </tr>
            </thead>
            <tbody>
              {TYPE_SCALE.map(([token, px, use]) => (
                <tr key={token}>
                  <td>
                    <code>{token}</code>
                  </td>
                  <td>{px}</td>
                  <td style={{ fontSize: `var(${token})` }}>{t('Console Aa 123', '控制台 Aa 123')}</td>
                  <td>{pickL10n(locale, use)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Text variant="muted" size="md" as="p" style={{ marginTop: 10 }}>
          {t('Weight: ', '字重：')}
          <code className="guide-prose-code">--fw-normal 400</code> ·{' '}
          <code className="guide-prose-code">--fw-medium 500</code> ·{' '}
          <code className="guide-prose-code">--fw-semibold 600</code> ·{' '}
          <code className="guide-prose-code">--fw-bold 650</code>
          {t('; line height: ', '；行高：')}
          <code className="guide-prose-code">--lh-tight 1.25</code> /{' '}
          <code className="guide-prose-code">--lh-normal 1.45</code> /{' '}
          <code className="guide-prose-code">--lh-relaxed 1.6</code>
          {t('. More comparisons in ', '。更多对照见 ')}
          <Link to="/examples/typography" className="text-link">
            {t('Typography', '字体字号模板')}
          </Link>
          {t('.', '。')}
        </Text>
      </ShowcaseSection>

      <ShowcaseSection title={t('Fonts', '字体')}>
        <div className="guide-table-wrap">
          <table className="guide-table">
            <thead>
              <tr>
                <th>{t('Token', '令牌')}</th>
                <th>{t('Preview', '预览')}</th>
                <th>{t('Use', '用途')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>--font</code>
                </td>
                <td style={{ fontFamily: 'var(--font)' }}>Inter · PingFang SC · {t('Console', '控制台')}</td>
                <td>{t('UI text', '界面文字')}</td>
              </tr>
              <tr>
                <td>
                  <code>--mono</code>
                </td>
                <td style={{ fontFamily: 'var(--mono)' }}>JetBrains Mono · 0123456789</td>
                <td>{t('IDs, paths, code, numeric columns', 'ID、路径、代码、数字列')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title={t('Radius, controls & shadow', '圆角、控件与阴影')}>
        <div className="token-grid">
          {RADII.map(([token, px, use]) => (
            <div key={token} className="token-swatch">
              <span className="radius-demo" style={{ borderRadius: `var(${token})`, width: 44, height: 32 }} />
              <span className="token-swatch-meta">
                <strong>
                  {px} · {pickL10n(locale, use)}
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
              <strong>{t('Shadow · overlay', '阴影 · 弹层')}</strong>
              <code>--shadow / --shadow-lg</code>
            </span>
          </div>
        </div>
        <Text variant="muted" size="md" as="p" style={{ marginTop: 10 }}>
          {t('Control height ', '控件高度 ')}
          <code className="guide-prose-code">--control-h</code>
          {t(' 36px (32px compact), small size ', ' 36px（紧凑密度 32px）、小号 ')}
          <code className="guide-prose-code">--control-h-sm</code>
          {t(' 28px (26px compact); control font size is uniformly ', ' 28px（紧凑 26px），控件字号统一 ')}
          <code className="guide-prose-code">--control-fs</code>
          {t(' 13px. Sidebar width ', ' 13px。侧栏宽度 ')}
          <code className="guide-prose-code">--sidebar-w</code>
          {t(' 232px.', ' 232px。')}
        </Text>
      </ShowcaseSection>

      <ShowcaseSection
        title={t('Chart palette', '图表色板')}
        description={t(
          'Follows light/dark mode and accent color; chart-1 is always the primary color. Prefer CHART_STATUS for semantic colors.',
          '跟随深浅色与强调色，chart-1 恒为主色。语义色优先使用 CHART_STATUS。',
        )}
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

      <ShowcaseSection
        title={t('Using tokens in business styles', '在业务样式中使用')}
        description={t(
          'Reference the variables directly; overriding a variable is enough to customize it — see "Theming".',
          '直接引用变量；覆盖变量即可定制，参见「主题与外观」。',
        )}
      >
        <CodeBlock className="guide-code" code={USAGE} language="css" title="css" />
        <Text variant="muted" size="md" as="p" style={{ marginTop: 10 }}>
          {t('Brand color customization and appearance dimensions are covered in ', '品牌色定制与外观维度见 ')}
          <Link to="/docs/theming" className="text-link">
            {t('Theming', '主题与外观')}
          </Link>
          {t('.', '。')}
        </Text>
      </ShowcaseSection>
    </DocPage>
  )
}
