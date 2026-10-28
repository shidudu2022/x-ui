import { Pill } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('pill')
const props: PropDef[] = [{ name: 'action', type: 'boolean', desc: '可点击（或传 onClick）' }]

export function PillDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<Pill>只读状态</Pill>`}>
        <div className="showcase-row"><Pill>只读状态</Pill><Pill>prod</Pill></div>
      </DocDemo>
      <DocDemo title="可点击" code={`<Pill action onClick={() => {}}>筛选外观</Pill>`}>
        <div className="showcase-row"><Pill action onClick={() => undefined}>筛选外观</Pill><Pill onClick={() => undefined}>带 onClick</Pill></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
