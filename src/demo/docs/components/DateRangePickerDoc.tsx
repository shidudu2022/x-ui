import { useState } from 'react'
import { DateRangePicker } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('date-range-picker')
const props: PropDef[] = [{ name: 'mode', type: "'date'|'datetime'", desc: { en: "Mode", zh: "模式" } }, { name: 'start/end', type: 'string', desc: { en: "Range", zh: "范围" } }]

export function DateRangePickerDoc() {
  const d = useDemoT()
  const [range, setRange] = useState({ start: '2026-10-01', end: '2026-10-12' })
  const [dtRange, setDtRange] = useState({ start: '2026-10-01T09:00', end: '2026-10-12T18:00' })
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Date range", "日期范围")} code={`<DateRangePicker mode="date" start={range.start} end={range.end} onChange={setRange} />`}>
        <DateRangePicker mode="date" start={range.start} end={range.end} onChange={setRange} />
      </DocDemo>
      <DocDemo title={d("Date-time range", "日期时间范围")} code={`<DateRangePicker mode="datetime" start={dtRange.start} end={dtRange.end} onChange={setDtRange} />`}>
        <DateRangePicker mode="datetime" start={dtRange.start} end={dtRange.end} onChange={setDtRange} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
