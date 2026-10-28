import { Sparkline, Stat } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('sparkline')
const props: PropDef[] = [{ name: 'data', type: 'number[]', desc: '点列' }, { name: 'color', type: 'string', desc: '描边色' }, { name: 'height', type: 'number', desc: '高度' }]

export function SparklineDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<Sparkline data={[3, 5, 4, 8, 6, 9, 7]} />`}>
        <div className="showcase-row" style={{ alignItems: 'center', gap: 24 }}><Sparkline data={[3, 5, 4, 8, 6, 9, 7]} /><Sparkline data={[9, 7, 8, 4, 5, 3, 2]} color="var(--danger)" height={36} /></div>
      </DocDemo>
      <DocDemo title="配合 Stat" code={`<Stat label="QPS" value="1.2k" data={[3, 5, 4, 8, 6, 9, 7]} />`}>
        <Stat label="QPS" value="1.2k" delta="+4%" data={[3, 5, 4, 8, 6, 9, 7]} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
