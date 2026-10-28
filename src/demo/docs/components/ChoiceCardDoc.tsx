import { ChoiceCard, ChoiceCardGrid } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('choice-card')
const props: PropDef[] = [{ name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'recommended', type: 'boolean', desc: '推荐徽标' }, { name: 'disabled', type: 'boolean', desc: '禁用' }]

export function ChoiceCardDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<ChoiceCardGrid>
  <ChoiceCard
    title="从模板创建"
    description="快速起步"
    recommended
    onClick={() => undefined}
  />
  <ChoiceCard
    title="空白创建"
    description="完全自定义"
    onClick={() => undefined}
  />
</ChoiceCardGrid>`}>
        <ChoiceCardGrid><ChoiceCard title="从模板创建" description="快速起步" recommended onClick={() => undefined} /><ChoiceCard title="空白创建" description="完全自定义" onClick={() => undefined} /></ChoiceCardGrid>
      </DocDemo>
      <DocDemo title="禁用" code={`<ChoiceCard title="不可用" description="维护中" disabled />`}>
        <ChoiceCardGrid><ChoiceCard title="不可用" description="维护中" disabled /><ChoiceCard title="可选" description="正常" onClick={() => undefined} /></ChoiceCardGrid>
      </DocDemo>
    </ComponentDocLayout>
  )
}
