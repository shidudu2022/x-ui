import { TotpBindPanel } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('totp-bind-panel')
const props: PropDef[] = [{ name: 'secret', type: 'string', desc: { en: "Base32 secret", zh: "Base32 密钥" } }, { name: 'account', type: 'string', desc: { en: "Account", zh: "账号" } }, { name: 'issuer', type: 'string', default: "'X-UI'", desc: { en: "Issuer", zh: "发行方" } }, { name: 'onBound', type: '() => void', desc: { en: "Completes binding", zh: "完成绑定" } }]

export function TotpBindPanelDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<TotpBindPanel
  secret="JBSWY3DPEHPK3PXP"
  account="demo@x-ui.dev"
  onBound={() => {}}
/>`}>
        <div style={{ maxWidth: 320 }}><TotpBindPanel secret="JBSWY3DPEHPK3PXP" account="demo@x-ui.dev" onBound={() => undefined} /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
