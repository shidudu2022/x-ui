import { Home } from 'lucide-react'
import { Breadcrumbs, NavIcon } from '@/components/layout'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('breadcrumbs')
const props: PropDef[] = [{ name: 'current', type: 'ReactNode', desc: '当前页' }, { name: 'currentIcon', type: 'ReactNode', desc: '根页图标' }, { name: 'parent', type: 'BreadcrumbParent', desc: '父级链接' }]

export function BreadcrumbsDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<Breadcrumbs current="概览" currentIcon={<NavIcon icon={Home} />} />
<Breadcrumbs
  current="详情"
  parent={{ label: '列表', to: '/components', icon: <NavIcon icon={Home} /> }}
/>`}>
        <div className="stack"><Breadcrumbs current="概览" currentIcon={<NavIcon icon={Home} />} /><Breadcrumbs current="详情" parent={{ label: '列表', to: '/components', icon: <NavIcon icon={Home} /> }} /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
