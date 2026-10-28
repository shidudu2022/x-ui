import { useState } from 'react'
import { ColorField } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('color-field')
const props: PropDef[] = [{ name: 'label', type: 'string', desc: '标签' }, { name: 'disabled', type: 'boolean', desc: '禁用' }, { name: 'invalid', type: 'boolean', desc: '校验失败' }]

export function ColorFieldDoc() {
  const [color, setColor] = useState('#3b82f6')
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<ColorField label="品牌色" value={color} onChange={setColor} />`}>
        <ColorField label="品牌色" value={color} onChange={setColor} />
      </DocDemo>
      <DocDemo title="增强" code={`<ColorField label="禁用" disabled value={color} />
<ColorField label="无效" invalid value={color} onChange={setColor} />`}>
        <div className="stack"><ColorField label="禁用" disabled value={color} onChange={setColor} /><ColorField label="无效" invalid value={color} onChange={setColor} /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
