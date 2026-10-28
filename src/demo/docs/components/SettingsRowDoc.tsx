import { useState } from 'react'
import { SettingsRow, Switch } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('settings-row')
const props: PropDef[] = [{ name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'control', type: 'ReactNode', desc: '右侧控件' }]

export function SettingsRowDoc() {
  const [on, setOn] = useState(true)
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<SettingsRow
  title="自动刷新"
  description="每 30 秒拉取一次"
  control={<Switch checked={on} onChange={(e) => setOn(e.target.checked)} />}
/>`}>
        <SettingsRow title="自动刷新" description="每 30 秒拉取一次" control={<Switch checked={on} onChange={(e) => setOn(e.target.checked)} />} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
