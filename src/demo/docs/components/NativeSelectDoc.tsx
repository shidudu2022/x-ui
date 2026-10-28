import { NativeSelect } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('native-select')
const props: PropDef[] = [{ name: 'size', type: "'sm'|'md'|'lg'", desc: { en: "Sizes", zh: "尺寸" } }, { name: 'invalid', type: 'boolean', desc: { en: "Validation failed", zh: "校验失败" } }, { name: 'disabled', type: 'boolean', desc: { en: "Disabled", zh: "禁用" } }]

export function NativeSelectDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<NativeSelect defaultValue="a">
  <option value="a">Option A</option>
  <option value="b">Option B</option>
</NativeSelect>`}>
        <NativeSelect defaultValue="a"><option value="a">{d("Option A", "选项 A")}</option><option value="b">{d("Option B", "选项 B")}</option></NativeSelect>
      </DocDemo>
      <DocDemo title={d("Sizes", "尺寸")} code={`<NativeSelect size="sm" defaultValue="a">
  <option value="a">sm</option>
  <option value="b">B</option>
</NativeSelect>
<NativeSelect size="lg" defaultValue="a">
  <option value="a">lg</option>
  <option value="b">B</option>
</NativeSelect>`}>
        <div className="stack" style={{ maxWidth: 280 }}><NativeSelect size="sm" defaultValue="a"><option value="a">sm</option><option value="b">B</option></NativeSelect><NativeSelect size="lg" defaultValue="a"><option value="a">lg</option><option value="b">B</option></NativeSelect></div>
      </DocDemo>
      <DocDemo title={d("Enhanced", "增强")} code={`<NativeSelect invalid defaultValue="a">
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
