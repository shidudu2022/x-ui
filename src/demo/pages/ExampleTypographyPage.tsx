import { Card, Heading, Mono, Muted, PageHeader, Text } from '@/components/ui'
import { useDemoT } from '@/demo/i18n/useDemoT'
import { ShowcaseSection } from '../ShowcaseSection'

export function ExampleTypographyPage() {
  const t = useDemoT()

  const scale: Array<{ token: string; size: string; sample: string; className: string }> = [
    { token: '--fs-xs', size: '11px', sample: t('Caption / Badge', '辅助标注 / Badge'), className: 'text text-xs' },
    {
      token: '--fs-sm',
      size: '12px',
      sample: t('Hints, secondary copy, mono', '提示、次要文案、等宽'),
      className: 'text text-sm text-muted',
    },
    { token: '--fs-md', size: '13px', sample: t('Table headers, KV, sidebar density', '表头、KV、侧栏邻近密度'), className: 'text text-md' },
    { token: '--fs-base', size: '14px', sample: t('Body default (content)', '正文默认（内容区）'), className: 'text text-base' },
    { token: '--fs-lg', size: '15px', sample: t('Subheading / node-meta', '小标题 / node-meta'), className: 'text text-lg text-strong' },
    { token: '--fs-xl', size: '16px', sample: t('Card title', '卡片标题'), className: 'text text-xl text-strong' },
    { token: '--fs-2xl', size: '20px', sample: t('Section title', '区块标题'), className: 'heading heading-section' },
    { token: '--fs-3xl / page', size: '24–26px', sample: t('Page title', '页面主标题'), className: 'heading heading-page' },
  ]

  return (
    <section className="page active">
      <PageHeader
        title={t('Type scale', '字体与字号')}
        description={t(
          'CSS variable scale; prefer Text / Heading over scattered inline fontSize.',
          '统一 CSS 变量字号阶梯；业务文案优先用 Text / Heading，避免散落 inline fontSize。',
        )}
      />

      <ShowcaseSection title={t('Size scale', '字号阶梯')} description={t('From styles/typography.css', '来自 styles/typography.css')}>
        <Card padded>
          {scale.map((row) => (
            <div key={row.token} className="type-scale-row">
              <span className="type-scale-token">{row.token}</span>
              <Muted>{row.size}</Muted>
              <span className={row.className}>{row.sample}</span>
            </div>
          ))}
        </Card>
      </ShowcaseSection>

      <ShowcaseSection title={t('Component API', '组件 API')}>
        <div className="grid-2">
          <Card padded className="stack">
            <Heading level="card">Heading</Heading>
            <Heading level="page">{t('Page title', '页面标题')} page</Heading>
            <Heading level="section">{t('Section title', '区块标题')} section</Heading>
            <Heading level="card">{t('Card title', '卡片标题')} card</Heading>
            <Heading level="sub">{t('Step subheading', '步骤小标题')} sub</Heading>
          </Card>
          <Card padded className="stack">
            <Heading level="card">Text</Heading>
            <Text>{t('Body — default 14px', '正文 body — 默认 14px')}</Text>
            <Text variant="muted">{t('Muted secondary', '次要 muted')}</Text>
            <Text variant="faint">{t('Faint', '更弱 faint')}</Text>
            <Text variant="strong">{t('Strong emphasis', '强调 strong')}</Text>
            <Text variant="hint">{t('Field hint', '字段提示 hint')}</Text>
            <Text variant="caption">{t('Caption', '说明 caption')}</Text>
            <Mono>Mono /var/lib/rancher</Mono>
            <Muted as="p">{t('Muted shortcut component', 'Muted 快捷组件')}</Muted>
          </Card>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title={t('Color roles', '颜色角色')}>
        <Card padded className="stack">
          <Text>{t('text — primary copy', 'text — 主文案')}</Text>
          <Text variant="muted">{t('text-muted — secondary / description', 'text-muted — 副文案 / 说明')}</Text>
          <Text variant="faint">{t('text-faint — dividers, placeholders', 'text-faint — 分隔、占位')}</Text>
          <Text variant="mono">{t('text-mono — code and IDs', 'text-mono — 代码与 ID')}</Text>
        </Card>
      </ShowcaseSection>
    </section>
  )
}
