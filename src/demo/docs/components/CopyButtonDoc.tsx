import { CopyButton } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('copy-button')
const props: PropDef[] = [{ name: 'value', type: 'string', desc: { en: "Content to copy", zh: "复制内容" } }, { name: 'variant', type: 'ButtonVariant', desc: { en: "Button variant", zh: "按钮变体" } }, { name: 'size', type: 'ButtonSize', desc: { en: "Sizes", zh: "尺寸" } }, { name: 'label', type: 'string', desc: { en: "Copy text", zh: "文案" } }]

export function CopyButtonDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<CopyButton value="npm install @shidudu2022/x-ui" />`}>
        <CopyButton value="npm install @shidudu2022/x-ui" />
      </DocDemo>
      <DocDemo title={d("Variants & sizes", "变体 / 尺寸")} code={`<CopyButton value="x" variant="secondary" size="md" label="Copy key" />`}>
        <div className="showcase-row"><CopyButton value="secret" variant="secondary" size="md" label={d("Copy key", "复制密钥")} /><CopyButton value="x" variant="ghost" size="sm" /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
