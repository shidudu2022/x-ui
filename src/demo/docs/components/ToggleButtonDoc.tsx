import { useState } from 'react'
import { ToggleButton } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('toggle-button')
const props: PropDef[] = [{ name: 'checked', type: 'boolean', desc: '选中' }, { name: 'disabled', type: 'boolean', desc: '禁用' }]

export function ToggleButtonDoc() {
  const [checked, setChecked] = useState(true)
  const [off, setOff] = useState(false)
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<ToggleButton checked={checked} onClick={() => setChecked((v) => !v)}>
  自动刷新
</ToggleButton>`}>
        <div className="showcase-row"><ToggleButton checked={checked} onClick={() => setChecked((v) => !v)}>自动刷新</ToggleButton><ToggleButton checked={off} onClick={() => setOff((v) => !v)}>未选中</ToggleButton></div>
      </DocDemo>
      <DocDemo title="禁用" code={`<ToggleButton checked disabled>已锁定</ToggleButton>`}>
        <div className="showcase-row"><ToggleButton checked disabled>已锁定</ToggleButton><ToggleButton disabled>不可点</ToggleButton></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
