import { Banner } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('banner')
const props: PropDef[] = [{ name: 'children', type: 'ReactNode', desc: '横幅内容' }]

export function BannerDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<Banner>维护模式进行中，危险操作已锁定。</Banner>`}>
        <Banner>维护模式进行中，危险操作已锁定。</Banner>
      </DocDemo>
    </ComponentDocLayout>
  )
}
