import { Home } from 'lucide-react'
import { Breadcrumbs, NavIcon } from '@/components/layout'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('breadcrumbs')
const props: PropDef[] = [{ name: 'current', type: 'ReactNode', desc: { en: "Current page", zh: "当前页" } }, { name: 'currentIcon', type: 'ReactNode', desc: { en: "Root page icon", zh: "根页图标" } }, { name: 'parent', type: 'BreadcrumbParent', desc: { en: "Parent link", zh: "父级链接" } }]

export function BreadcrumbsDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<Breadcrumbs current="Overview" currentIcon={<NavIcon icon={Home} />} />
<Breadcrumbs
  current="Details"
  parent={{ label: 'List', to: '/components', icon: <NavIcon icon={Home} /> }}
/>`}>
        <div className="stack"><Breadcrumbs current={d("Overview", "概览")} currentIcon={<NavIcon icon={Home} />} /><Breadcrumbs current={d("Details", "详情")} parent={{ label: d("List", "列表"), to: '/components', icon: <NavIcon icon={Home} /> }} /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
