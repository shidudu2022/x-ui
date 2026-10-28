import { Spinner } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('spinner')
const props: PropDef[] = [{ name: 'size', type: "'sm'|'md'|'lg'", desc: '尺寸' }]

export function SpinnerDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="尺寸" code={`<Spinner size="sm" />
<Spinner />
<Spinner size="lg" />`}>
        <div className="showcase-row"><Spinner size="sm" /><Spinner /><Spinner size="lg" /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
