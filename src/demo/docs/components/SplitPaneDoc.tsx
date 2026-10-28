import { SplitPane } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('split-pane')
const props: PropDef[] = [{ name: 'left', type: 'ReactNode', desc: { en: "Left side", zh: "左侧" } }, { name: 'right', type: 'ReactNode', desc: { en: "Right side", zh: "右侧" } }]

export function SplitPaneDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} wide code={`<SplitPane left={<>Left side</>} right={<>Right side, drag the divider</>} />`}>
        <div style={{ height: 160 }}><SplitPane left={<div className="muted">{d("Left panel", "左侧面板")}</div>} right={<div className="muted">{d("Right content area; drag the middle divider.", "右侧内容区，拖拽中间分隔条。")}</div>} /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
