import { Brand } from '@/components/layout'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('brand')
const props: PropDef[] = [{ name: 'mark', type: 'ReactNode', default: "'X'", desc: { en: "Mark", zh: "徽标" } }, { name: 'text', type: 'ReactNode', default: "'X-UI'", desc: { en: "Copy text", zh: "文案" } }, { name: 'showText', type: 'boolean', default: 'true', desc: { en: "Show label (usually off when sidebar collapses)", zh: "显示文案（侧栏折叠时常关）" } }]

export function BrandDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Brand mark", "品牌标识")} description={d("Brand at the top of the sidebar; use showText={false} when collapsed.", "侧栏顶部品牌；折叠时通常 showText={false}。")} code={`<Brand />
<Brand mark="D" text="Demo" />
<Brand showText={false} />`}>
        <div className="showcase-row" style={{ gap: 24, alignItems: 'center' }}><Brand /><Brand mark="D" text="Demo" /><Brand showText={false} /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
