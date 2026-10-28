import { useState } from 'react'
import { ColorInput } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('color-input')
const props: PropDef[] = [{ name: 'value', type: 'string', desc: 'hex' }, { name: 'disabled', type: 'boolean', desc: '禁用' }, { name: 'invalid', type: 'boolean', desc: '校验失败' }]

export function ColorInputDoc() {
  const [color, setColor] = useState('#3b82f6')
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<ColorInput value={color} onChange={setColor} />`}>
        <ColorInput value={color} onChange={setColor} />
      </DocDemo>
      <DocDemo title="增强" code={`<ColorInput disabled value={color} />
<ColorInput invalid value={color} onChange={setColor} />`}>
        <div className="stack" style={{ maxWidth: 240 }}><ColorInput disabled value={color} onChange={setColor} /><ColorInput invalid value={color} onChange={setColor} /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
