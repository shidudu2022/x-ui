import { LayoutDashboard, Settings } from 'lucide-react'
import { NavIcon } from '@/components/layout'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('nav-icon')
const props: PropDef[] = [{ name: 'icon', type: 'LucideIcon', desc: 'lucide 图标组件' }, { name: 'size', type: 'number', desc: '尺寸' }, { name: 'strokeWidth', type: 'number', desc: '描边' }]

export function NavIconDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<NavIcon icon={LayoutDashboard} />
<NavIcon icon={Settings} />`}>
        <div className="showcase-row"><NavIcon icon={LayoutDashboard} /><NavIcon icon={Settings} /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
