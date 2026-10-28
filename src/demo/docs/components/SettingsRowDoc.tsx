import { useState } from 'react'
import { SettingsRow, Switch } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('settings-row')
const props: PropDef[] = [{ name: 'title', type: 'ReactNode', desc: { en: "Title", zh: "标题" } }, { name: 'control', type: 'ReactNode', desc: { en: "Right-side control", zh: "右侧控件" } }]

export function SettingsRowDoc() {
  const d = useDemoT()
  const [on, setOn] = useState(true)
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<SettingsRow
  title="Auto refresh"
  description="Polls every 30 seconds"
  control={<Switch checked={on} onChange={(e) => setOn(e.target.checked)} />}
/>`}>
        <SettingsRow title={d("Auto refresh", "自动刷新")} description={d("Polls every 30 seconds", "每 30 秒拉取一次")} control={<Switch checked={on} onChange={(e) => setOn(e.target.checked)} />} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
