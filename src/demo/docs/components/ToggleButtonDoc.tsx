import { useState } from 'react'
import { ToggleButton } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('toggle-button')
const props: PropDef[] = [{ name: 'checked', type: 'boolean', desc: { en: "Selected", zh: "选中" } }, { name: 'disabled', type: 'boolean', desc: { en: "Disabled", zh: "禁用" } }]

export function ToggleButtonDoc() {
  const d = useDemoT()
  const [checked, setChecked] = useState(true)
  const [off, setOff] = useState(false)
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<ToggleButton checked={checked} onClick={() => setChecked((v) => !v)}>
  Auto refresh
</ToggleButton>`}>
        <div className="showcase-row"><ToggleButton checked={checked} onClick={() => setChecked((v) => !v)}>{d("Auto refresh", "自动刷新")}</ToggleButton><ToggleButton checked={off} onClick={() => setOff((v) => !v)}>{d("Unselected", "未选中")}</ToggleButton></div>
      </DocDemo>
      <DocDemo title={d("Disabled", "禁用")} code={`<ToggleButton checked disabled>Locked</ToggleButton>`}>
        <div className="showcase-row"><ToggleButton checked disabled>{d("Locked", "已锁定")}</ToggleButton><ToggleButton disabled>{d("Not clickable", "不可点")}</ToggleButton></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
