import { BreadcrumbNav } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('breadcrumb-nav')
const props: PropDef[] = [{ name: 'items', type: 'BreadcrumbNavItem[]', desc: { en: "Segments; the last segment may omit `to`", zh: "段；末段可无 to" } }]

export function BreadcrumbNavDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<BreadcrumbNav items={[
  { label: 'Resource', to: '/components' },
  { label: 'Cluster' },
]} />`}>
        <BreadcrumbNav items={[{ label: d("Resource", "资源"), to: '/components' }, { label: d("Cluster", "集群"), to: '/components/breadcrumb-nav' }, { label: d("Details", "详情") }]} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
