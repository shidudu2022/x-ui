import { LayoutDashboard, Settings } from 'lucide-react'
import { NavIcon } from '@/components/layout'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('nav-icon')
const props: PropDef[] = [{ name: 'icon', type: 'LucideIcon', desc: { en: "lucide icon component", zh: "lucide 图标组件" } }, { name: 'size', type: 'number', desc: { en: "Sizes", zh: "尺寸" } }, { name: 'strokeWidth', type: 'number', desc: { en: "Stroke", zh: "描边" } }]

export function NavIconDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<NavIcon icon={LayoutDashboard} />
<NavIcon icon={Settings} />`}>
        <div className="showcase-row"><NavIcon icon={LayoutDashboard} /><NavIcon icon={Settings} /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
