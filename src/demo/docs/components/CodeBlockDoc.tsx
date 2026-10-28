import { CodeBlock } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('code-block')
const props: PropDef[] = [{ name: 'code', type: 'string', desc: '代码' }, { name: 'language', type: 'string', desc: '语言标签' }, { name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'compact', type: 'boolean', desc: '紧凑' }]

export function CodeBlockDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<CodeBlock language="ts" code="export const x = 1" />`}>
        <CodeBlock language="ts" code={"export const version = '1.0.0'\n"} />
      </DocDemo>
      <DocDemo title="紧凑" code={`<CodeBlock language="bash" compact code="npm install @shidudu2022/x-ui" />`}>
        <CodeBlock language="bash" compact code="npm install @shidudu2022/x-ui" />
      </DocDemo>
      <DocDemo title="自定义标题" code={`<CodeBlock
  title="install.sh"
  compact
  code="curl -fsSL https://example.com/install.sh | sh"
/>`}>
        <CodeBlock title="install.sh" compact code="curl -fsSL https://example.com/install.sh | sh" />
      </DocDemo>
    </ComponentDocLayout>
  )
}
