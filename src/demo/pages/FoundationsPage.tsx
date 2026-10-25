import { Link } from 'react-router-dom'
import { Card, Heading, Mono, Muted, PageHeader, Text } from '@/components/ui'
import { CHART_COLORS } from '@/components/charts'
import { ShowcaseSection } from '../ShowcaseSection'

const tokens = [
  ['--bg', '页面背景'],
  ['--surface', '卡片表面'],
  ['--text', '正文'],
  ['--text-muted', '次要文字'],
  ['--primary', '主色'],
  ['--border', '边框'],
  ['--success', '成功'],
  ['--warn', '警告'],
  ['--danger', '危险'],
]

export function FoundationsPage() {
  return (
    <div>
      <PageHeader
        title="基础"
        description="设计令牌、字体与图表色板。完整字号阶梯见「字体字号」示例。"
      />

      <ShowcaseSection title="颜色令牌">
        <div className="grid-2">
          {tokens.map(([name, label]) => (
            <Card key={name} padded>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <span
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: `var(${name})`,
                    border: '1px solid var(--border)',
                  }}
                />
                <div>
                  <Text variant="strong">{label}</Text>
                  <Mono as="div" className="text-muted">
                    {name}
                  </Mono>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="字体">
        <Card padded className="stack">
          <Heading level="section">Inter · PingFang SC</Heading>
          <Mono>JetBrains Mono · 0123456789</Mono>
          <Muted>
            字号变量见{' '}
            <Link to="/examples/typography" className="crumb-link">
              字体字号示例
            </Link>
          </Muted>
        </Card>
      </ShowcaseSection>

      <ShowcaseSection title="图表色板">
        <div className="chart-swatch-row">
          {CHART_COLORS.map((c, i) => (
            <div key={c} className="chart-swatch" style={{ background: c }} title={`chart-${i + 1}`} />
          ))}
        </div>
      </ShowcaseSection>
    </div>
  )
}
