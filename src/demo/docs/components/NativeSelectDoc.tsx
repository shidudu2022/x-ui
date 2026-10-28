import { NativeSelect } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('native-select')
const props: PropDef[] = [{ name: 'size', type: "'sm'|'md'|'lg'", desc: '尺寸' }, { name: 'invalid', type: 'boolean', desc: '校验失败' }, { name: 'disabled', type: 'boolean', desc: '禁用' }]

export function NativeSelectDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<NativeSelect defaultValue="a">
  <option value="a">选项 A</option>
  <option value="b">选项 B</option>
</NativeSelect>`}>
        <NativeSelect defaultValue="a"><option value="a">选项 A</option><option value="b">选项 B</option></NativeSelect>
      </DocDemo>
      <DocDemo title="尺寸" code={`<NativeSelect size="sm" defaultValue="a">
  <option value="a">sm</option>
  <option value="b">B</option>
</NativeSelect>
<NativeSelect size="lg" defaultValue="a">
  <option value="a">lg</option>
  <option value="b">B</option>
</NativeSelect>`}>
        <div className="stack" style={{ maxWidth: 280 }}><NativeSelect size="sm" defaultValue="a"><option value="a">sm</option><option value="b">B</option></NativeSelect><NativeSelect size="lg" defaultValue="a"><option value="a">lg</option><option value="b">B</option></NativeSelect></div>
      </DocDemo>
      <DocDemo title="增强" code={`<NativeSelect invalid defaultValue="a">
  <option value="a">invalid</option>
</NativeSelect>
<NativeSelect disabled defaultValue="a">
  <option value="a">disabled</option>
</NativeSelect>`}>
        <div className="stack" style={{ maxWidth: 280 }}><NativeSelect invalid defaultValue="a"><option value="a">invalid</option></NativeSelect><NativeSelect disabled defaultValue="a"><option value="a">disabled</option></NativeSelect></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
