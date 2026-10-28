import { Badge, StepHeading } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('step-heading')
const props: PropDef[] = [{ name: 'title', type: 'ReactNode', desc: { en: "Title", zh: "标题" } }, { name: 'aside', type: 'ReactNode', desc: { en: "Right-side extra", zh: "右侧附加" } }]

export function StepHeadingDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<StepHeading title="Network configuration" aside={<Badge>Optional</Badge>} />`}>
        <StepHeading title={d("Network configuration", "网络配置")} aside={<Badge>{d("Optional", "可选")}</Badge>} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
