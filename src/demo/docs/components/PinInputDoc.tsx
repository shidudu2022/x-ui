import { useState } from 'react'
import { PinInput } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('pin-input')
const props: PropDef[] = [{ name: 'length', type: 'number', default: '6', desc: '位数' }, { name: 'masked', type: 'boolean', desc: '掩码' }, { name: 'invalid', type: 'boolean', desc: '校验失败' }, { name: 'disabled', type: 'boolean', desc: '禁用' }]

export function PinInputDoc() {
  const [pin, setPin] = useState('')
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<PinInput value={pin} onChange={setPin} />`}>
        <PinInput value={pin} onChange={setPin} />
      </DocDemo>
      <DocDemo title="长度 / 掩码" code={`<PinInput length={4} masked value={pin} onChange={setPin} />`}>
        <PinInput length={4} masked value={pin} onChange={setPin} />
      </DocDemo>
      <DocDemo title="增强" code={`<PinInput invalid value={pin} onChange={setPin} />
<PinInput disabled value="123456" />`}>
        <div className="stack"><PinInput invalid value={pin} onChange={setPin} /><PinInput disabled value="123456" /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
