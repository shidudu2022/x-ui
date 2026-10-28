import { Field, Input } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('field')
const props: PropDef[] = [{ name: 'label', type: 'ReactNode', desc: '标签' }, { name: 'hint', type: 'ReactNode', desc: '提示' }, { name: 'error', type: 'ReactNode', desc: '错误' }]

export function FieldDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<Field label="名称" htmlFor="name" hint="用于展示">
  <Input id="name" placeholder="demo" />
</Field>`}>
        <Field label="名称" htmlFor="doc-name" hint="用于展示"><Input id="doc-name" placeholder="demo" /></Field>
      </DocDemo>
      <DocDemo title="错误态" code={`<Field label="名称" htmlFor="bad" error="必填">
  <Input id="bad" invalid placeholder="请输入" />
</Field>`}>
        <Field label="名称" htmlFor="doc-bad" error="必填"><Input id="doc-bad" invalid placeholder="请输入" /></Field>
      </DocDemo>
    </ComponentDocLayout>
  )
}
