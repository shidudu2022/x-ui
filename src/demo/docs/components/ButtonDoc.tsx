import { Plus } from 'lucide-react'
import { Button } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('button')
const props: PropDef[] = [{ name: 'variant', type: "'primary'|'secondary'|'danger'|'ghost'", default: "'secondary'", desc: { en: "Variants", zh: "变体" } }, { name: 'size', type: "'sm'|'md'|'lg'", default: "'md'", desc: { en: "Sizes", zh: "尺寸" } }, { name: 'loading', type: 'boolean', default: 'false', desc: { en: "Loading", zh: "加载" } }, { name: 'block', type: 'boolean', desc: { en: "Full width", zh: "全宽" } }, { name: 'iconOnly', type: 'boolean', desc: { en: "Icon only", zh: "仅图标" } }, { name: 'href', type: 'string', desc: { en: "Link mode", zh: "链接模式" } }]

export function ButtonDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Variants", "变体")} code={`<Button variant="primary">Primary</Button>
<Button>Secondary</Button>
<Button variant="danger">Danger</Button>
<Button variant="ghost">Ghost</Button>`}>
        <div className="showcase-row"><Button variant="primary">Primary</Button><Button>Secondary</Button><Button variant="danger">Danger</Button><Button variant="ghost">Ghost</Button></div>
      </DocDemo>
      <DocDemo title={d("Sizes", "尺寸")} code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}>
        <div className="showcase-row"><Button size="sm">Small</Button><Button size="md">Medium</Button><Button size="lg">Large</Button></div>
      </DocDemo>
      <DocDemo title={d("Loading", "加载")} code={`<Button variant="primary" loading>Saving</Button>
<Button loading>Processing</Button>`}>
        <div className="showcase-row"><Button variant="primary" loading>{d("Saving", "保存中")}</Button><Button loading>{d("Processing", "处理中")}</Button></div>
      </DocDemo>
      <DocDemo title={d("Links", "链接")} code={`<Button href="/components" variant="primary">Internal link</Button>
<Button href="https://example.com" variant="ghost">External link</Button>`}>
        <div className="showcase-row"><Button href="/components" variant="primary">{d("Internal link", "内部链接")}</Button><Button href="https://example.com" variant="ghost">{d("External link", "外链")}</Button></div>
      </DocDemo>
      <DocDemo title={d("Enhanced", "增强")} description={d("Disabled, block, and icon-only.", "禁用、块级、仅图标。")} code={`<Button disabled>Disabled</Button>
<Button variant="primary" block>Full width</Button>
<Button iconOnly aria-label="Add"><Plus size={16} /></Button>`}>
        <div className="stack" style={{ maxWidth: 280 }}><div className="showcase-row"><Button disabled>Disabled</Button><Button iconOnly aria-label={d("Add", "添加")}><Plus size={16} /></Button></div><Button variant="primary" block>{d("Full width", "全宽")}</Button></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
