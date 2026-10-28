import { ChoiceCard, ChoiceCardGrid } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('choice-card')
const props: PropDef[] = [{ name: 'title', type: 'ReactNode', desc: { en: "Title", zh: "标题" } }, { name: 'recommended', type: 'boolean', desc: { en: "Recommended badge", zh: "推荐徽标" } }, { name: 'disabled', type: 'boolean', desc: { en: "Disabled", zh: "禁用" } }]

export function ChoiceCardDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<ChoiceCardGrid>
  <ChoiceCard
    title="Create from template"
    description="Get started quickly"
    recommended
    onClick={() => undefined}
  />
  <ChoiceCard
    title="Create blank"
    description="Fully custom"
    onClick={() => undefined}
  />
</ChoiceCardGrid>`}>
        <ChoiceCardGrid><ChoiceCard title={d("Create from template", "从模板创建")} description={d("Get started quickly", "快速起步")} recommended onClick={() => undefined} /><ChoiceCard title={d("Create blank", "空白创建")} description={d("Fully custom", "完全自定义")} onClick={() => undefined} /></ChoiceCardGrid>
      </DocDemo>
      <DocDemo title={d("Disabled", "禁用")} code={`<ChoiceCard title="Unavailable" description="Under maintenance" disabled />`}>
        <ChoiceCardGrid><ChoiceCard title={d("Unavailable", "不可用")} description={d("Under maintenance", "维护中")} disabled /><ChoiceCard title={d("Optional", "可选")} description={d("Normal", "正常")} onClick={() => undefined} /></ChoiceCardGrid>
      </DocDemo>
    </ComponentDocLayout>
  )
}
