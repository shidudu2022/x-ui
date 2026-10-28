import { Button, Tooltip } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('tooltip')
const props: PropDef[] = [{ name: 'content', type: 'ReactNode', desc: { en: "Tooltip content", zh: "提示内容" } }, { name: 'side', type: "'top'|'right'|'bottom'|'left'", default: "'top'", desc: { en: "Direction", zh: "方向" } }, { name: 'disabled', type: 'boolean', desc: { en: "Disabled", zh: "禁用" } }]

export function TooltipDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Direction", "方向")} code={`<Tooltip content="Top" side="top"><Button>Top</Button></Tooltip>
<Tooltip content="Right" side="right"><Button>Right</Button></Tooltip>
<Tooltip content="Bottom" side="bottom"><Button>Bottom</Button></Tooltip>
<Tooltip content="Left" side="left"><Button>Left</Button></Tooltip>`}>
        <div className="showcase-row"><Tooltip content={d("Top", "上")} side="top"><Button variant="ghost">{d("Top", "上")}</Button></Tooltip><Tooltip content={d("Right", "右")} side="right"><Button variant="ghost">{d("Right", "右")}</Button></Tooltip><Tooltip content={d("Bottom", "下")} side="bottom"><Button variant="ghost">{d("Bottom", "下")}</Button></Tooltip><Tooltip content={d("Left", "左")} side="left"><Button variant="ghost">{d("Left", "左")}</Button></Tooltip></div>
      </DocDemo>
      <DocDemo title={d("Disabled", "禁用")} code={`<Tooltip content="Won't appear" disabled>
  <Button>Disabled tooltip</Button>
</Tooltip>`}>
        <Tooltip content={d("Won't appear", "不会出现")} disabled><Button variant="ghost">{d("Disabled tooltip", "禁用提示")}</Button></Tooltip>
      </DocDemo>
    </ComponentDocLayout>
  )
}
