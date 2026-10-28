import { useState } from 'react'
import { DatePicker } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('date-picker')
const props: PropDef[] = [{ name: 'mode', type: "'date'|'datetime'", desc: { en: "Mode", zh: "模式" } }, { name: 'value', type: 'string', desc: { en: "Value", zh: "值" } }, { name: 'inline', type: 'boolean', desc: { en: "Inline panel", zh: "内联面板" } }, { name: 'disabled', type: 'boolean', desc: { en: "Disabled", zh: "禁用" } }, { name: 'invalid', type: 'boolean', desc: { en: "Validation failed", zh: "校验失败" } }]

export function DatePickerDoc() {
  const d = useDemoT()
  const [date, setDate] = useState('2026-10-25')
  const [dt, setDt] = useState('2026-10-25T09:30')
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Date", "日期")} code={`<DatePicker mode="date" value={date} onChange={setDate} />`}>
        <DatePicker mode="date" value={date} onChange={setDate} />
      </DocDemo>
      <DocDemo title={d("Date & time", "日期时间")} code={`<DatePicker mode="datetime" value={dt} onChange={setDt} minuteStep={5} />`}>
        <DatePicker mode="datetime" value={dt} onChange={setDt} minuteStep={5} />
      </DocDemo>
      <DocDemo title={d("Enhanced", "增强")} code={`<DatePicker disabled value={date} />
<DatePicker invalid value={date} onChange={setDate} />`}>
        <div className="stack" style={{ maxWidth: 280 }}><DatePicker disabled value={date} onChange={setDate} /><DatePicker invalid value={date} onChange={setDate} /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
