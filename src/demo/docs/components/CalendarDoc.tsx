import { Calendar } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('calendar')
const props: PropDef[] = [{ name: 'events', type: 'CalendarEvent[]', desc: '事件点；tone: primary|success|warn|danger' }]

export function CalendarDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="事件色调" code={`<Calendar events={[
  { date: '2026-10-25', label: '发布', tone: 'primary' },
  { date: '2026-10-28', label: '维护', tone: 'warn' },
  { date: '2026-10-30', label: '截止', tone: 'danger' },
]} />`}>
        <Calendar events={[{ date: '2026-10-25', label: '发布', tone: 'primary' }, { date: '2026-10-27', label: '完成', tone: 'success' }, { date: '2026-10-28', label: '维护', tone: 'warn' }, { date: '2026-10-30', label: '截止', tone: 'danger' }]} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
