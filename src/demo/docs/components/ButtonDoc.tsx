import { Plus } from 'lucide-react'
import { Button } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('button')
const props: PropDef[] = [{ name: 'variant', type: "'primary'|'secondary'|'danger'|'ghost'", default: "'secondary'", desc: '变体' }, { name: 'size', type: "'sm'|'md'|'lg'", default: "'md'", desc: '尺寸' }, { name: 'loading', type: 'boolean', default: 'false', desc: '加载' }, { name: 'block', type: 'boolean', desc: '全宽' }, { name: 'iconOnly', type: 'boolean', desc: '仅图标' }, { name: 'href', type: 'string', desc: '链接模式' }]

export function ButtonDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="变体" code={`<Button variant="primary">Primary</Button>
<Button>Secondary</Button>
<Button variant="danger">Danger</Button>
<Button variant="ghost">Ghost</Button>`}>
        <div className="showcase-row"><Button variant="primary">Primary</Button><Button>Secondary</Button><Button variant="danger">Danger</Button><Button variant="ghost">Ghost</Button></div>
      </DocDemo>
      <DocDemo title="尺寸" code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}>
        <div className="showcase-row"><Button size="sm">Small</Button><Button size="md">Medium</Button><Button size="lg">Large</Button></div>
      </DocDemo>
      <DocDemo title="加载" code={`<Button variant="primary" loading>保存中</Button>
<Button loading>处理中</Button>`}>
        <div className="showcase-row"><Button variant="primary" loading>保存中</Button><Button loading>处理中</Button></div>
      </DocDemo>
      <DocDemo title="链接" code={`<Button href="/components" variant="primary">内部链接</Button>
<Button href="https://example.com" variant="ghost">外链</Button>`}>
        <div className="showcase-row"><Button href="/components" variant="primary">内部链接</Button><Button href="https://example.com" variant="ghost">外链</Button></div>
      </DocDemo>
      <DocDemo title="增强" description="禁用、块级、仅图标。" code={`<Button disabled>Disabled</Button>
<Button variant="primary" block>全宽</Button>
<Button iconOnly aria-label="添加"><Plus size={16} /></Button>`}>
        <div className="stack" style={{ maxWidth: 280 }}><div className="showcase-row"><Button disabled>Disabled</Button><Button iconOnly aria-label="添加"><Plus size={16} /></Button></div><Button variant="primary" block>全宽</Button></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
