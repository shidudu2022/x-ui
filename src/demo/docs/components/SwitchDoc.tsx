import { useState } from 'react'
import { Switch } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('switch')
const props: PropDef[] = [{ name: 'checked', type: 'boolean', desc: { en: "On/off", zh: "开/关" } }, { name: 'label', type: 'ReactNode', desc: { en: "Copy text", zh: "文案" } }, { name: 'disabled', type: 'boolean', desc: { en: "Disabled", zh: "禁用" } }]

export function SwitchDoc() {
  const d = useDemoT()
  const [on, setOn] = useState(true)
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<Switch checked={on} onChange={(e) => setOn(e.target.checked)} label="Auto refresh" />`}>
        <Switch checked={on} onChange={(e) => setOn(e.target.checked)} label={d("Auto refresh", "自动刷新")} />
      </DocDemo>
      <DocDemo title={d("Disabled", "禁用")} code={`<Switch checked disabled label="Locked on" />
<Switch disabled label="Locked off" />`}>
        <div className="stack"><Switch checked disabled label={d("Locked on", "已锁定开启")} /><Switch disabled label={d("Locked off", "已锁定关闭")} /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
