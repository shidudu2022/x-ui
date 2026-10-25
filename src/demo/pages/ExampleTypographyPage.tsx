import { Card, Heading, Mono, Muted, PageHeader, Text } from '@/components/ui'
import { ShowcaseSection } from '../ShowcaseSection'

const SCALE: Array<{ token: string; size: string; sample: string; className: string }> = [
  { token: '--fs-xs', size: '11px', sample: '辅助标注 / Badge', className: 'text text-xs' },
  { token: '--fs-sm', size: '12px', sample: '提示、次要文案、等宽', className: 'text text-sm text-muted' },
  { token: '--fs-md', size: '13px', sample: '表头、KV、侧栏邻近密度', className: 'text text-md' },
  { token: '--fs-base', size: '14px', sample: '正文默认（内容区）', className: 'text text-base' },
  { token: '--fs-lg', size: '15px', sample: '小标题 / node-meta', className: 'text text-lg text-strong' },
  { token: '--fs-xl', size: '16px', sample: '卡片标题', className: 'text text-xl text-strong' },
  { token: '--fs-2xl', size: '20px', sample: '区块标题', className: 'heading heading-section' },
  { token: '--fs-3xl / page', size: '24–26px', sample: '页面主标题', className: 'heading heading-page' },
]

export function ExampleTypographyPage() {
  return (
    <section className="page active">
      <PageHeader
        title="字体与字号"
        description="统一 CSS 变量字号阶梯；业务文案优先用 Text / Heading，避免散落 inline fontSize。"
      />

      <ShowcaseSection title="字号阶梯" description="来自 styles/typography.css">
        <Card padded>
          {SCALE.map((row) => (
            <div key={row.token} className="type-scale-row">
              <span className="type-scale-token">{row.token}</span>
              <Muted>{row.size}</Muted>
              <span className={row.className}>{row.sample}</span>
            </div>
          ))}
        </Card>
      </ShowcaseSection>

      <ShowcaseSection title="组件 API">
        <div className="grid-2">
          <Card padded className="stack">
            <Heading level="card">Heading</Heading>
            <Heading level="page">页面标题 page</Heading>
            <Heading level="section">区块标题 section</Heading>
            <Heading level="card">卡片标题 card</Heading>
            <Heading level="sub">步骤小标题 sub</Heading>
          </Card>
          <Card padded className="stack">
            <Heading level="card">Text</Heading>
            <Text>正文 body — 默认 14px</Text>
            <Text variant="muted">次要 muted</Text>
            <Text variant="faint">更弱 faint</Text>
            <Text variant="strong">强调 strong</Text>
            <Text variant="hint">字段提示 hint</Text>
            <Text variant="caption">说明 caption</Text>
            <Mono>Mono /var/lib/rancher</Mono>
            <Muted as="p">Muted 快捷组件</Muted>
          </Card>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="颜色角色">
        <Card padded className="stack">
          <Text>text — 主文案</Text>
          <Text variant="muted">text-muted — 副文案 / 说明</Text>
          <Text variant="faint">text-faint — 分隔、占位</Text>
          <Text variant="mono">text-mono — 代码与 ID</Text>
        </Card>
      </ShowcaseSection>
    </section>
  )
}
