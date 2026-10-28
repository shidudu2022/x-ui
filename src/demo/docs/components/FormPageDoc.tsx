import { Button, Field, FormPage, Input } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('form-page')
const props: PropDef[] = [{ name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'description', type: 'ReactNode', desc: '说明' }, { name: 'actions', type: 'ReactNode', desc: '页头操作' }, { name: 'children', type: 'ReactNode', desc: '表单内容' }]

export function FormPageDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="迷你预览" description="定宽表单页骨架（page-narrow）。" wide code={`<FormPage title="创建资源" description="填写基本信息。" actions={<Button variant="primary">保存</Button>}>
  <Field label="名称"><Input /></Field>
</FormPage>`}>
        <div style={{ border: '1px solid var(--border)', borderRadius: 8, padding: '20px 24px', background: 'var(--bg)' }}><FormPage title="创建资源" description="填写基本信息。" actions={<Button variant="primary">保存</Button>}><Field label="名称" htmlFor="doc-fp-name"><Input id="doc-fp-name" placeholder="demo" /></Field></FormPage></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
