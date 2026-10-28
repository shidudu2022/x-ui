import { MermaidDiagram } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const SAMPLE = `flowchart LR
  A[Client] --> B[API]
  B --> C[(DB)]`

const meta = docMeta('mermaid-diagram')
const props: PropDef[] = [
  { name: 'chart', type: 'string', desc: { en: 'Mermaid source', zh: 'Mermaid 源码' } },
  { name: 'title', type: 'ReactNode', desc: { en: 'Optional title', zh: '可选标题' } },
]

export function MermaidDiagramDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo
        title={d('Basic', '基础')}
        description={d(
          'Requires peer dependency mermaid in the host app.',
          '宿主需安装 peer 依赖 mermaid。',
        )}
        code={`<MermaidDiagram title="Flow" chart={\`flowchart LR
  A[Client] --> B[API]
  B --> C[(DB)]\`} />`}
      >
        <MermaidDiagram title={d('Request flow', '请求流程')} chart={SAMPLE} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
