import { MaintenanceBanner } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('maintenance-banner')
const props: PropDef[] = []

export function MaintenanceBannerDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<MaintenanceBanner />`}>
        <MaintenanceBanner />
      </DocDemo>
    </ComponentDocLayout>
  )
}
