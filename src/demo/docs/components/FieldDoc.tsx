import { Field, Input } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('field')
const props: PropDef[] = [{ name: 'label', type: 'ReactNode', desc: { en: "Label", zh: "标签" } }, { name: 'hint', type: 'ReactNode', desc: { en: "Hint", zh: "提示" } }, { name: 'error', type: 'ReactNode', desc: { en: "Error", zh: "错误" } }]

export function FieldDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<Field label="Name" htmlFor="name" hint="For display">
  <Input id="name" placeholder="demo" />
</Field>`}>
        <Field label={d("Name", "名称")} htmlFor="doc-name" hint={d("For display", "用于展示")}><Input id="doc-name" placeholder="demo" /></Field>
      </DocDemo>
      <DocDemo title={d("Error state", "错误态")} code={`<Field label="Name" htmlFor="bad" error="Required">
  <Input id="bad" invalid placeholder="Please enter" />
</Field>`}>
        <Field label={d("Name", "名称")} htmlFor="doc-bad" error={d("Required", "必填")}><Input id="doc-bad" invalid placeholder={d("Please enter", "请输入")} /></Field>
      </DocDemo>
    </ComponentDocLayout>
  )
}
