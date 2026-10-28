import { useState } from 'react'
import { PageTabs } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('page-tabs')
const props: PropDef[] = [{ name: 'items', type: 'PageTabItem[]', desc: '页签' }, { name: 'value', type: 'string', desc: '当前 id' }, { name: 'onChange', type: '(id: string) => void', desc: '切换' }]

export function PageTabsDoc() {
  const [tab, setTab] = useState('overview')
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<PageTabs
  value={tab}
  onChange={setTab}
  items={[
    { id: 'overview', label: '概览' },
    { id: 'events', label: '事件' },
  ]}
/>`}>
        <PageTabs value={tab} onChange={setTab} items={[{ id: 'overview', label: '概览' }, { id: 'events', label: '事件' }, { id: 'yaml', label: 'YAML' }]} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
