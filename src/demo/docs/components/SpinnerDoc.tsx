import { Spinner } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('spinner')
const props: PropDef[] = [{ name: 'size', type: "'sm'|'md'|'lg'", desc: { en: "Sizes", zh: "尺寸" } }]

export function SpinnerDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Sizes", "尺寸")} code={`<Spinner size="sm" />
<Spinner />
<Spinner size="lg" />`}>
        <div className="showcase-row"><Spinner size="sm" /><Spinner /><Spinner size="lg" /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
