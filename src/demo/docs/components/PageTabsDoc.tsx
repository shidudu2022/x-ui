import { useState } from 'react'
import { PageTabs } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('page-tabs')
const props: PropDef[] = [{ name: 'items', type: 'PageTabItem[]', desc: { en: "Tab", zh: "页签" } }, { name: 'value', type: 'string', desc: { en: "Current id", zh: "当前 id" } }, { name: 'onChange', type: '(id: string) => void', desc: { en: "Toggle", zh: "切换" } }]

export function PageTabsDoc() {
  const d = useDemoT()
  const [tab, setTab] = useState('overview')
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<PageTabs
  value={tab}
  onChange={setTab}
  items={[
    { id: 'overview', label: 'Overview' },
    { id: 'events', label: 'Events' },
  ]}
/>`}>
        <PageTabs value={tab} onChange={setTab} items={[{ id: 'overview', label: d("Overview", "概览") }, { id: 'events', label: d("Events", "事件") }, { id: 'yaml', label: 'YAML' }]} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
