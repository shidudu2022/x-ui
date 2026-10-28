import { useState } from 'react'
import { PinInput } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('pin-input')
const props: PropDef[] = [{ name: 'length', type: 'number', default: '6', desc: { en: "Digits", zh: "位数" } }, { name: 'masked', type: 'boolean', desc: { en: "Mask", zh: "掩码" } }, { name: 'invalid', type: 'boolean', desc: { en: "Validation failed", zh: "校验失败" } }, { name: 'disabled', type: 'boolean', desc: { en: "Disabled", zh: "禁用" } }]

export function PinInputDoc() {
  const d = useDemoT()
  const [pin, setPin] = useState('')
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<PinInput value={pin} onChange={setPin} />`}>
        <PinInput value={pin} onChange={setPin} />
      </DocDemo>
      <DocDemo title={d("Length & mask", "长度 / 掩码")} code={`<PinInput length={4} masked value={pin} onChange={setPin} />`}>
        <PinInput length={4} masked value={pin} onChange={setPin} />
      </DocDemo>
      <DocDemo title={d("Enhanced", "增强")} code={`<PinInput invalid value={pin} onChange={setPin} />
<PinInput disabled value="123456" />`}>
        <div className="stack"><PinInput invalid value={pin} onChange={setPin} /><PinInput disabled value="123456" /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
