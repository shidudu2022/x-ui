import { Callout } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('callout')
const props: PropDef[] = [{ name: 'variant', type: "'mirror'|'firewall'|'info'", default: "'mirror'", desc: '样式' }, { name: 'title', type: 'ReactNode', desc: '标题' }]

export function CalloutDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="变体" code={`<Callout title="镜像" variant="mirror">官方源说明。</Callout>
<Callout title="防火墙" variant="firewall">出入站规则提示。</Callout>
<Callout title="说明" variant="info">补充上下文。</Callout>`}>
        <div className="stack"><Callout title="镜像" variant="mirror">官方源说明。</Callout><Callout title="防火墙" variant="firewall">出入站规则提示。</Callout><Callout title="说明" variant="info">补充上下文。</Callout></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
