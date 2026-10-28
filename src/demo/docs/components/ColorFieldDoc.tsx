import { useState } from 'react'
import { ColorField } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('color-field')
const props: PropDef[] = [{ name: 'label', type: 'string', desc: { en: "Label", zh: "标签" } }, { name: 'disabled', type: 'boolean', desc: { en: "Disabled", zh: "禁用" } }, { name: 'invalid', type: 'boolean', desc: { en: "Validation failed", zh: "校验失败" } }]

export function ColorFieldDoc() {
  const d = useDemoT()
  const [color, setColor] = useState('#3b82f6')
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<ColorField label="Brand color" value={color} onChange={setColor} />`}>
        <ColorField label={d("Brand color", "品牌色")} value={color} onChange={setColor} />
      </DocDemo>
      <DocDemo title={d("Enhanced", "增强")} code={`<ColorField label="Disabled" disabled value={color} />
<ColorField label="Invalid" invalid value={color} onChange={setColor} />`}>
        <div className="stack"><ColorField label={d("Disabled", "禁用")} disabled value={color} onChange={setColor} /><ColorField label={d("Invalid", "无效")} invalid value={color} onChange={setColor} /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
