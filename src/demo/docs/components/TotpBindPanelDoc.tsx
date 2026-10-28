import { TotpBindPanel } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('totp-bind-panel')
const props: PropDef[] = [{ name: 'secret', type: 'string', desc: 'Base32 密钥' }, { name: 'account', type: 'string', desc: '账号' }, { name: 'issuer', type: 'string', default: "'X-UI'", desc: '发行方' }, { name: 'onBound', type: '() => void', desc: '完成绑定' }]

export function TotpBindPanelDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<TotpBindPanel
  secret="JBSWY3DPEHPK3PXP"
  account="demo@x-ui.dev"
  onBound={() => {}}
/>`}>
        <div style={{ maxWidth: 320 }}><TotpBindPanel secret="JBSWY3DPEHPK3PXP" account="demo@x-ui.dev" onBound={() => undefined} /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
