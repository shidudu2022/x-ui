import { useState } from 'react'
import { DatePicker } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('date-picker')
const props: PropDef[] = [{ name: 'mode', type: "'date'|'datetime'", desc: '模式' }, { name: 'value', type: 'string', desc: '值' }, { name: 'inline', type: 'boolean', desc: '内联面板' }, { name: 'disabled', type: 'boolean', desc: '禁用' }, { name: 'invalid', type: 'boolean', desc: '校验失败' }]

export function DatePickerDoc() {
  const [date, setDate] = useState('2026-10-25')
  const [dt, setDt] = useState('2026-10-25T09:30')
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="日期" code={`<DatePicker mode="date" value={date} onChange={setDate} />`}>
        <DatePicker mode="date" value={date} onChange={setDate} />
      </DocDemo>
      <DocDemo title="日期时间" code={`<DatePicker mode="datetime" value={dt} onChange={setDt} minuteStep={5} />`}>
        <DatePicker mode="datetime" value={dt} onChange={setDt} minuteStep={5} />
      </DocDemo>
      <DocDemo title="增强" code={`<DatePicker disabled value={date} />
<DatePicker invalid value={date} onChange={setDate} />`}>
        <div className="stack" style={{ maxWidth: 280 }}><DatePicker disabled value={date} onChange={setDate} /><DatePicker invalid value={date} onChange={setDate} /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
