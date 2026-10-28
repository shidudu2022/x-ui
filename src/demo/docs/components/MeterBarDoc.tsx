import { MeterBar, meterToneFromPct } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('meter-bar')
const props: PropDef[] = [{ name: 'value', type: 'number|null', desc: '0–100' }, { name: 'tone', type: "'default'|'success'|'warn'|'danger'|'muted'", desc: { en: "Tones", zh: "色调" } }]

export function MeterBarDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Tones", "色调")} code={`<MeterBar value={40} tone="default" />
<MeterBar value={40} tone="success" />
<MeterBar value={78} tone="warn" />
<MeterBar value={94} tone="danger" />
<MeterBar value={20} tone="muted" />`}>
        <div className="showcase-row" style={{ gap: 16 }}><div style={{ width: 100 }}><MeterBar value={40} tone="default" /></div><div style={{ width: 100 }}><MeterBar value={40} tone="success" /></div><div style={{ width: 100 }}><MeterBar value={78} tone="warn" /></div><div style={{ width: 100 }}><MeterBar value={94} tone="danger" /></div><div style={{ width: 100 }}><MeterBar value={20} tone="muted" /></div></div>
      </DocDemo>
      <DocDemo title={d("Mapped by percentage", "按占比映射")} description={d("meterToneFromPct: ≥90 danger, ≥75 warn, otherwise success.", "meterToneFromPct：≥90 danger，≥75 warn，否则 success。")} code={`<MeterBar value={32} tone={meterToneFromPct(32)} />
<MeterBar value={78} tone={meterToneFromPct(78)} />
<MeterBar value={94} tone={meterToneFromPct(94)} />`}>
        <div className="showcase-row" style={{ gap: 16 }}><div style={{ width: 120 }}><MeterBar value={32} tone={meterToneFromPct(32)} /></div><div style={{ width: 120 }}><MeterBar value={78} tone={meterToneFromPct(78)} /></div><div style={{ width: 120 }}><MeterBar value={94} tone={meterToneFromPct(94)} /></div></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
