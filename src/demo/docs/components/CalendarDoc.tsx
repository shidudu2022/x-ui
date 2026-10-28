import { Calendar } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('calendar')
const props: PropDef[] = [{ name: 'events', type: 'CalendarEvent[]', desc: { en: 'Events; optional tone: primary, success, warn, danger', zh: '事件点；tone: primary|success|warn|danger' } }]

export function CalendarDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Event tones", "事件色调")} description={d("The Today button in the bottom-right jumps to the current date.", "右下角「今天」按钮可快速回到当天。")} code={`<Calendar events={[
  { date: '2026-10-25', label: 'Ship', tone: 'primary' },
  { date: '2026-10-27', label: 'Done', tone: 'success' },
  { date: '2026-10-28', label: 'Maint', tone: 'warn' },
  { date: '2026-10-30', label: 'Due', tone: 'danger' },
]} />`}>
        <Calendar events={[{ date: '2026-10-25', label: d('Ship', '发布'), tone: 'primary' }, { date: '2026-10-27', label: d('Done', '完成'), tone: 'success' }, { date: '2026-10-28', label: d('Maint', '维护'), tone: 'warn' }, { date: '2026-10-30', label: d('Due', '截止'), tone: 'danger' }]} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
