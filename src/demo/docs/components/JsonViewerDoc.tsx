import { JsonViewer } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('json-viewer')
const props: PropDef[] = [{ name: 'value', type: 'unknown', desc: 'JSON 数据' }, { name: 'collapsed', type: 'boolean', desc: '默认折叠' }, { name: 'maxHeight', type: 'number', desc: '最大高度' }]

export function JsonViewerDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<JsonViewer value={{ cluster: 'demo', replicas: 3 }} />`}>
        <JsonViewer value={{ cluster: 'demo', replicas: 3, labels: { env: 'prod' } }} />
      </DocDemo>
      <DocDemo title="默认折叠" code={`<JsonViewer collapsed value={{ a: 1 }} />`}>
        <JsonViewer collapsed value={{ cluster: 'demo', replicas: 3 }} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
