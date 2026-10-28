import { useState } from 'react'
import { KeyValueEditor } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('key-value-editor')
const props: PropDef[] = [{ name: 'value', type: 'KeyValuePair[]', desc: '键值' }]

export function KeyValueEditorDoc() {
  const [kv, setKv] = useState([{ key: 'REGION', value: 'cn-east' }, { key: 'TIER', value: 'prod' }])
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<KeyValueEditor value={kv} onChange={setKv} />`}>
        <KeyValueEditor value={kv} onChange={setKv} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
