import { FormErrors } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('form-errors')
const props: PropDef[] = [{ name: 'errors', type: 'ReactNode[]', desc: '错误列表' }, { name: 'title', type: 'ReactNode', desc: '标题' }]

export function FormErrorsDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<FormErrors errors={['请输入用户名', '密码至少 6 位']} />`}>
        <FormErrors errors={['请输入用户名', '密码至少 6 位']} />
      </DocDemo>
      <DocDemo title="自定义标题" code={`<FormErrors title="提交失败" errors={['网络超时']} />`}>
        <FormErrors title="提交失败" errors={['网络超时']} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
