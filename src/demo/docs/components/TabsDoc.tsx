import { useState } from 'react'
import { Tabs } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('tabs')
const props: PropDef[] = [{ name: 'items', type: 'TabItem[]', desc: '面板' }, { name: 'value', type: 'string', desc: '当前 id' }, { name: 'onChange', type: '(id: string) => void', desc: '切换' }]

export function TabsDoc() {
  const [tab, setTab] = useState('one')
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<Tabs
  value={tab}
  onChange={setTab}
  items={[
    { id: 'one', label: '基本信息', content: <p className="muted">Tab 面板一</p> },
    { id: 'two', label: '高级', content: <p className="muted">Tab 面板二</p> },
    { id: 'three', label: '事件', content: <p className="muted">Tab 面板三</p> },
  ]}
/>`}>
        <Tabs value={tab} onChange={setTab} items={[{ id: 'one', label: '基本信息', content: <p className="muted">Tab 面板一</p> }, { id: 'two', label: '高级', content: <p className="muted">Tab 面板二</p> }, { id: 'three', label: '事件', content: <p className="muted">Tab 面板三</p> }]} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
