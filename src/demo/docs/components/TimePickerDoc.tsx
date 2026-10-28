import { useState } from 'react'
import { TimePicker } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('time-picker')
const props: PropDef[] = [{ name: 'value', type: 'string', desc: 'HH:mm' }, { name: 'minuteStep', type: 'number', desc: { en: "Minute step", zh: "分钟步进" } }, { name: 'disabled', type: 'boolean', desc: { en: "Disabled", zh: "禁用" } }, { name: 'invalid', type: 'boolean', desc: { en: "Validation failed", zh: "校验失败" } }]

export function TimePickerDoc() {
  const d = useDemoT()
  const [time, setTime] = useState('09:30')
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<TimePicker value={time} onChange={setTime} minuteStep={5} />`}>
        <TimePicker value={time} onChange={setTime} minuteStep={5} />
      </DocDemo>
      <DocDemo title={d("Enhanced", "增强")} code={`<TimePicker disabled value={time} />
<TimePicker invalid value={time} onChange={setTime} />`}>
        <div className="stack" style={{ maxWidth: 200 }}><TimePicker disabled value={time} onChange={setTime} /><TimePicker invalid value={time} onChange={setTime} /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
