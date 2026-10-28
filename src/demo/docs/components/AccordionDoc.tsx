import { Accordion } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('accordion')
const props: PropDef[] = [{ name: 'items', type: 'AccordionItemData[]', desc: '面板项' }, { name: 'defaultOpenId', type: 'string', desc: '默认展开' }]

export function AccordionDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" description="点击标题展开 / 折叠。" code={`<Accordion
  defaultOpenId="1"
  items={[
    { id: '1', title: '什么是 x-ui？', content: '一套管理端组件与布局。' },
    { id: '2', title: '如何接入？', content: 'npm install @shidudu2022/x-ui' },
  ]}
/>`}>
        <Accordion defaultOpenId="1" items={[{ id: '1', title: '什么是 x-ui？', content: '一套管理端组件与布局。' }, { id: '2', title: '如何接入？', content: 'npm install @shidudu2022/x-ui' }, { id: '3', title: '主题？', content: 'AppearanceProvider + ThemeDrawer。' }]} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
