import { Banner } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('banner')
const props: PropDef[] = [{ name: 'children', type: 'ReactNode', desc: { en: "Banner content", zh: "横幅内容" } }]

export function BannerDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<Banner>Maintenance mode is active; dangerous actions are locked.</Banner>`}>
        <Banner>{d("Maintenance mode is active; dangerous actions are locked.", "维护模式进行中，危险操作已锁定。")}</Banner>
      </DocDemo>
    </ComponentDocLayout>
  )
}
