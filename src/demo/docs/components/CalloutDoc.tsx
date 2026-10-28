import { Callout } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('callout')
const props: PropDef[] = [{ name: 'variant', type: "'mirror'|'firewall'|'info'", default: "'mirror'", desc: { en: "Style", zh: "样式" } }, { name: 'title', type: 'ReactNode', desc: { en: "Title", zh: "标题" } }]

export function CalloutDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Variants", "变体")} code={`<Callout title="Image" variant="mirror">Notes on the official source.</Callout>
<Callout title="Firewall" variant="firewall">Inbound/outbound rule note.</Callout>
<Callout title="Description" variant="info">Supplementary context.</Callout>`}>
        <div className="stack"><Callout title={d("Image", "镜像")} variant="mirror">{d("Notes on the official source.", "官方源说明。")}</Callout><Callout title={d("Firewall", "防火墙")} variant="firewall">{d("Inbound/outbound rule note.", "出入站规则提示。")}</Callout><Callout title={d("Description", "说明")} variant="info">{d("Supplementary context.", "补充上下文。")}</Callout></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
