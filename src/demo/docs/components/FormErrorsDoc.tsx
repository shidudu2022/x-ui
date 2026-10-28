import { FormErrors } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('form-errors')
const props: PropDef[] = [{ name: 'errors', type: 'ReactNode[]', desc: { en: "Error list", zh: "错误列表" } }, { name: 'title', type: 'ReactNode', desc: { en: "Title", zh: "标题" } }]

export function FormErrorsDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<FormErrors errors={['Please enter a username', 'Password must be at least 6 characters']} />`}>
        <FormErrors errors={[d("Please enter a username", "请输入用户名"), d("Password must be at least 6 characters", "密码至少 6 位")]} />
      </DocDemo>
      <DocDemo title={d("Custom title", "自定义标题")} code={`<FormErrors title="Submission failed" errors={['Network timeout']} />`}>
        <FormErrors title={d("Submission failed", "提交失败")} errors={[d("Network timeout", "网络超时")]} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
