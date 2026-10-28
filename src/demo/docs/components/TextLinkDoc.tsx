import { Text, TextLink } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('text-link')
const props: PropDef[] = [{ name: 'href', type: 'string', desc: '链接' }, { name: 'external', type: 'boolean', desc: '外链（新窗口 + 图标）' }, { name: 'muted', type: 'boolean', desc: '弱化样式' }]

export function TextLinkDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="句中链接" description="嵌在正文里，而不是单独一行摆按钮。" code={`<Text as="p">
  完整字号阶梯见{' '}
  <TextLink href="/examples/typography">字体字号</TextLink>
  ，令牌见{' '}
  <TextLink href="/foundations">基础</TextLink>。
</Text>`}>
        <Text as="p">完整字号阶梯见 <TextLink href="/examples/typography">字体字号</TextLink>，设计令牌见 <TextLink href="/foundations">基础</TextLink>。</Text>
      </DocDemo>
      <DocDemo title="外链 / 弱化" code={`<TextLink href="https://example.com" external>文档站点</TextLink>
<TextLink href="/components" muted>次要入口</TextLink>`}>
        <div className="stack"><TextLink href="https://example.com" external>文档站点</TextLink><Text variant="muted" size="sm">次要操作可用 <TextLink href="/components" muted>弱化链接</TextLink>。</Text></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
