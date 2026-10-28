import { JsonViewer } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('json-viewer')
const props: PropDef[] = [{ name: 'value', type: 'unknown', desc: { en: "JSON data", zh: "JSON 数据" } }, { name: 'collapsed', type: 'boolean', desc: { en: "Collapsed by default", zh: "默认折叠" } }, { name: 'maxHeight', type: 'number', desc: { en: "Max height", zh: "最大高度" } }]

export function JsonViewerDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<JsonViewer value={{ cluster: 'demo', replicas: 3 }} />`}>
        <JsonViewer value={{ cluster: 'demo', replicas: 3, labels: { env: 'prod' } }} />
      </DocDemo>
      <DocDemo title={d("Collapsed by default", "默认折叠")} code={`<JsonViewer collapsed value={{ a: 1 }} />`}>
        <JsonViewer collapsed value={{ cluster: 'demo', replicas: 3 }} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
