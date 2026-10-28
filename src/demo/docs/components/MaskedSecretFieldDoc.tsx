import { MaskedSecretField } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('masked-secret-field')
const props: PropDef[] = [
  { name: 'label', type: 'ReactNode', desc: { en: 'Field label', zh: '标签' } },
  { name: 'value', type: 'string', desc: { en: 'Secret value', zh: '密钥值' } },
  { name: 'maskRatio', type: 'number', desc: { en: 'Visible fraction when masked (default 0.5)', zh: '掩码时可见比例（默认 0.5）' } },
  { name: 'hint', type: 'ReactNode', desc: { en: 'Hint under the field', zh: '字段提示' } },
  { name: 'extraActions', type: 'ReactNode', desc: { en: 'Extra action buttons', zh: '额外操作' } },
]

export function MaskedSecretFieldDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo
        title={d('Basic', '基础')}
        description={d(
          'First half stays visible; toggle reveal and copy.',
          '默认前半可见；可显隐与复制。',
        )}
        code={`<MaskedSecretField label="API Key" value="sk_live_abc123XYZ789secret" hint="Rotate regularly" />`}
      >
        <MaskedSecretField
          label={d('API Key', 'API Key')}
          value="sk_live_abc123XYZ789secret"
          hint={d('Rotate regularly', '请定期轮换')}
        />
      </DocDemo>
    </ComponentDocLayout>
  )
}
