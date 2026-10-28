import { Text, TextLink } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('text-link')
const props: PropDef[] = [{ name: 'href', type: 'string', desc: { en: "Links", zh: "链接" } }, { name: 'external', type: 'boolean', desc: { en: "External link (new window + icon)", zh: "外链（新窗口 + 图标）" } }, { name: 'muted', type: 'boolean', desc: { en: "Muted style", zh: "弱化样式" } }]

export function TextLinkDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Inline link", "句中链接")} description={d("Embed in body copy instead of a standalone button row.", "嵌在正文里，而不是单独一行摆按钮。")} code={`<Text as="p">
  See the full font-size scale at{' '}
  <TextLink href="/examples/typography">Typography</TextLink>
  , design tokens at{' '}
  <TextLink href="/foundations">Foundations</TextLink>.
</Text>`}>
        <Text as="p">{d('See the full font-size scale at ', '完整字号阶梯见 ')}<TextLink href="/examples/typography">{d('Typography', '字体字号')}</TextLink>{d(', design tokens at ', '，设计令牌见 ')}<TextLink href="/foundations">{d('Foundations', '基础')}</TextLink>{d('.', '。')}</Text>
      </DocDemo>
      <DocDemo title={d("External & muted", "外链 / 弱化")} code={`<TextLink href="https://example.com" external>Docs site</TextLink>
<TextLink href="/components" muted>Secondary entry</TextLink>`}>
        <div className="stack"><TextLink href="https://example.com" external>{d("Docs site", "文档站点")}</TextLink><Text variant="muted" size="sm">{d("A secondary action is available ", "次要操作可用 ")}<TextLink href="/components" muted>{d("Muted link", "弱化链接")}</TextLink>。</Text></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
