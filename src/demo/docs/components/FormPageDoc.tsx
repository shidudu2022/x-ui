import { Button, Field, FormPage, Input } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('form-page')
const props: PropDef[] = [{ name: 'title', type: 'ReactNode', desc: { en: "Title", zh: "标题" } }, { name: 'description', type: 'ReactNode', desc: { en: "Description", zh: "说明" } }, { name: 'actions', type: 'ReactNode', desc: { en: "Page header actions", zh: "页头操作" } }, { name: 'children', type: 'ReactNode', desc: { en: "Form content", zh: "表单内容" } }]

export function FormPageDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Mini preview", "迷你预览")} description={d("Fixed-width form page skeleton (page-narrow).", "定宽表单页骨架（page-narrow）。")} wide code={`<FormPage title="Create resource" description="Fill in the basic info." actions={<Button variant="primary">Save</Button>}>
  <Field label="Name"><Input /></Field>
</FormPage>`}>
        <div style={{ border: '1px solid var(--border)', borderRadius: 8, padding: '20px 24px', background: 'var(--bg)' }}><FormPage title={d("Create resource", "创建资源")} description={d("Fill in the basic info.", "填写基本信息。")} actions={<Button variant="primary">{d("Save", "保存")}</Button>}><Field label={d("Name", "名称")} htmlFor="doc-fp-name"><Input id="doc-fp-name" placeholder="demo" /></Field></FormPage></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
