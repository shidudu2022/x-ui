import { Badge, StepHeading } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('step-heading')
const props: PropDef[] = [{ name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'aside', type: 'ReactNode', desc: '右侧附加' }]

export function StepHeadingDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<StepHeading title="网络配置" aside={<Badge>可选</Badge>} />`}>
        <StepHeading title="网络配置" aside={<Badge>可选</Badge>} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
