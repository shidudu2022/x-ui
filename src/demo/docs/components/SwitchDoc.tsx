import { useState } from 'react'
import { Switch } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('switch')
const props: PropDef[] = [{ name: 'checked', type: 'boolean', desc: '开/关' }, { name: 'label', type: 'ReactNode', desc: '文案' }, { name: 'disabled', type: 'boolean', desc: '禁用' }]

export function SwitchDoc() {
  const [on, setOn] = useState(true)
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<Switch checked={on} onChange={(e) => setOn(e.target.checked)} label="自动刷新" />`}>
        <Switch checked={on} onChange={(e) => setOn(e.target.checked)} label="自动刷新" />
      </DocDemo>
      <DocDemo title="禁用" code={`<Switch checked disabled label="已锁定开启" />
<Switch disabled label="已锁定关闭" />`}>
        <div className="stack"><Switch checked disabled label="已锁定开启" /><Switch disabled label="已锁定关闭" /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
