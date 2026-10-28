import { Pill } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('pill')
const props: PropDef[] = [{ name: 'action', type: 'boolean', desc: { en: "Clickable (or pass onClick)", zh: "可点击（或传 onClick）" } }]

export function PillDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<Pill>Read-only status</Pill>`}>
        <div className="showcase-row"><Pill>{d("Read-only status", "只读状态")}</Pill><Pill>prod</Pill></div>
      </DocDemo>
      <DocDemo title={d("Clickable", "可点击")} code={`<Pill action onClick={() => {}}>Filter appearance</Pill>`}>
        <div className="showcase-row"><Pill action onClick={() => undefined}>{d("Filter appearance", "筛选外观")}</Pill><Pill onClick={() => undefined}>{d("With onClick", "带 onClick")}</Pill></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
