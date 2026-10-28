import { Button, Field, Input, LoginCard } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('login-card')
const props: PropDef[] = [{ name: 'brandMark', type: 'ReactNode', desc: { en: "Mark", zh: "徽标" } }, { name: 'title', type: 'ReactNode', desc: { en: "Title", zh: "标题" } }, { name: 'subtitle', type: 'ReactNode', desc: { en: "Subtitle", zh: "副标题" } }, { name: 'hint', type: 'ReactNode', desc: { en: "Bottom hint", zh: "底部提示" } }, { name: 'onSubmit', type: '(e) => void', desc: { en: "Submit", zh: "提交" } }, { name: 'minHeight', type: 'string | number', desc: { en: "Min height", zh: "最小高度" } }]

export function LoginCardDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Mini preview", "迷你预览")} code={`<LoginCard title="X-UI" subtitle="Admin sign-in" hint="Demo account demo / demo" minHeight={280} onSubmit={(e) => e.preventDefault()}>
  <Field label="Username"><Input /></Field>
  <Button variant="primary" type="submit" block>Log in</Button>
</LoginCard>`}>
        <LoginCard title="X-UI" subtitle={d("Admin sign-in", "管理员登录")} hint={d("Demo account demo / demo", "演示账号 demo / demo")} minHeight={280} onSubmit={(e) => e.preventDefault()}><Field label={d("Username", "用户名")} htmlFor="doc-login-user"><Input id="doc-login-user" defaultValue="demo" /></Field><Field label={d("Password", "密码")} htmlFor="doc-login-pass"><Input id="doc-login-pass" type="password" defaultValue="demo" /></Field><Button variant="primary" type="submit" block>{d("Log in", "登录")}</Button></LoginCard>
      </DocDemo>
    </ComponentDocLayout>
  )
}
