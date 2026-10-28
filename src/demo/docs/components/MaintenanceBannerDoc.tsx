import { MaintenanceBanner } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('maintenance-banner')
const props: PropDef[] = []

export function MaintenanceBannerDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<MaintenanceBanner />`}>
        <MaintenanceBanner />
      </DocDemo>
    </ComponentDocLayout>
  )
}
