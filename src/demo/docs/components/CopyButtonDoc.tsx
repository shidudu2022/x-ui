import { CopyButton } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('copy-button')
const props: PropDef[] = [{ name: 'value', type: 'string', desc: '复制内容' }, { name: 'variant', type: 'ButtonVariant', desc: '按钮变体' }, { name: 'size', type: 'ButtonSize', desc: '尺寸' }, { name: 'label', type: 'string', desc: '文案' }]

export function CopyButtonDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<CopyButton value="npm install @shidudu2022/x-ui" />`}>
        <CopyButton value="npm install @shidudu2022/x-ui" />
      </DocDemo>
      <DocDemo title="变体 / 尺寸" code={`<CopyButton value="x" variant="secondary" size="md" label="复制密钥" />`}>
        <div className="showcase-row"><CopyButton value="secret" variant="secondary" size="md" label="复制密钥" /><CopyButton value="x" variant="ghost" size="sm" /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
