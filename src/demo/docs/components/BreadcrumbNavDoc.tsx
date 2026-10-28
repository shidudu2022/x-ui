import { BreadcrumbNav } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('breadcrumb-nav')
const props: PropDef[] = [{ name: 'items', type: 'BreadcrumbNavItem[]', desc: '段；末段可无 to' }]

export function BreadcrumbNavDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<BreadcrumbNav items={[
  { label: '资源', to: '/components' },
  { label: '集群' },
]} />`}>
        <BreadcrumbNav items={[{ label: '资源', to: '/components' }, { label: '集群', to: '/components/breadcrumb-nav' }, { label: '详情' }]} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
