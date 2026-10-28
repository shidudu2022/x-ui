import { CodeBlock } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('code-block')
const props: PropDef[] = [{ name: 'code', type: 'string', desc: { en: "Code", zh: "代码" } }, { name: 'language', type: 'string', desc: { en: "Language tag", zh: "语言标签" } }, { name: 'title', type: 'ReactNode', desc: { en: "Title", zh: "标题" } }, { name: 'compact', type: 'boolean', desc: { en: "Compact", zh: "紧凑" } }]

export function CodeBlockDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<CodeBlock language="ts" code="export const x = 1" />`}>
        <CodeBlock language="ts" code={"export const version = '1.0.0'\n"} />
      </DocDemo>
      <DocDemo title={d("Compact", "紧凑")} code={`<CodeBlock language="bash" compact code="npm install @shidudu2022/x-ui" />`}>
        <CodeBlock language="bash" compact code="npm install @shidudu2022/x-ui" />
      </DocDemo>
      <DocDemo title={d("Custom title", "自定义标题")} code={`<CodeBlock
  title="install.sh"
  compact
  code="curl -fsSL https://example.com/install.sh | sh"
/>`}>
        <CodeBlock title="install.sh" compact code="curl -fsSL https://example.com/install.sh | sh" />
      </DocDemo>
    </ComponentDocLayout>
  )
}
