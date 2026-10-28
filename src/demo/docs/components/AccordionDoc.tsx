import { Accordion } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('accordion')
const props: PropDef[] = [{ name: 'items', type: 'AccordionItemData[]', desc: { en: "Panel items", zh: "面板项" } }, { name: 'defaultOpenId', type: 'string', desc: { en: "Expanded by default", zh: "默认展开" } }]

export function AccordionDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} description={d("Click the title to expand / collapse.", "点击标题展开 / 折叠。")} code={`<Accordion
  defaultOpenId="1"
  items={[
    { id: '1', title: 'What is x-ui?', content: 'A set of admin components and layouts.' },
    { id: '2', title: 'How do I integrate it?', content: 'npm install @shidudu2022/x-ui' },
  ]}
/>`}>
        <Accordion defaultOpenId="1" items={[{ id: '1', title: d("What is x-ui?", "什么是 x-ui？"), content: d("A set of admin components and layouts.", "一套管理端组件与布局。") }, { id: '2', title: d("How do I integrate it?", "如何接入？"), content: 'npm install @shidudu2022/x-ui' }, { id: '3', title: d("Theme?", "主题？"), content: 'AppearanceProvider + ThemeDrawer。' }]} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
