import { SplitPane } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('split-pane')
const props: PropDef[] = [{ name: 'left', type: 'ReactNode', desc: '左侧' }, { name: 'right', type: 'ReactNode', desc: '右侧' }]

export function SplitPaneDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" wide code={`<SplitPane left={<>左侧</>} right={<>右侧，拖拽分隔条</>} />`}>
        <div style={{ height: 160 }}><SplitPane left={<div className="muted">左侧面板</div>} right={<div className="muted">右侧内容区，拖拽中间分隔条。</div>} /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
