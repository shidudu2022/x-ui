import { useState } from 'react'
import { Tabs } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('tabs')
const props: PropDef[] = [{ name: 'items', type: 'TabItem[]', desc: { en: "Panel", zh: "面板" } }, { name: 'value', type: 'string', desc: { en: "Current id", zh: "当前 id" } }, { name: 'onChange', type: '(id: string) => void', desc: { en: "Toggle", zh: "切换" } }]

export function TabsDoc() {
  const d = useDemoT()
  const [tab, setTab] = useState('one')
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<Tabs
  value={tab}
  onChange={setTab}
  items={[
    { id: 'one', label: 'Basic info', content: <p className="muted">Tab panel one</p> },
    { id: 'two', label: 'Advanced', content: <p className="muted">Tab panel two</p> },
    { id: 'three', label: 'Events', content: <p className="muted">Tab panel three</p> },
  ]}
/>`}>
        <Tabs value={tab} onChange={setTab} items={[{ id: 'one', label: d("Basic info", "基本信息"), content: <p className="muted">{d("Tab panel one", "Tab 面板一")}</p> }, { id: 'two', label: d("Advanced", "高级"), content: <p className="muted">{d("Tab panel two", "Tab 面板二")}</p> }, { id: 'three', label: d("Events", "事件"), content: <p className="muted">{d("Tab panel three", "Tab 面板三")}</p> }]} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
