import { Brand } from '@/components/layout'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('brand')
const props: PropDef[] = [{ name: 'mark', type: 'ReactNode', default: "'X'", desc: '徽标' }, { name: 'text', type: 'ReactNode', default: "'X-UI'", desc: '文案' }, { name: 'showText', type: 'boolean', default: 'true', desc: '显示文案（侧栏折叠时常关）' }]

export function BrandDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="品牌标识" description="侧栏顶部品牌；折叠时通常 showText={false}。" code={`<Brand />
<Brand mark="D" text="Demo" />
<Brand showText={false} />`}>
        <div className="showcase-row" style={{ gap: 24, alignItems: 'center' }}><Brand /><Brand mark="D" text="Demo" /><Brand showText={false} /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
