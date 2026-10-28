import { Button, Field, Input, LoginCard } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('login-card')
const props: PropDef[] = [{ name: 'brandMark', type: 'ReactNode', desc: '徽标' }, { name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'subtitle', type: 'ReactNode', desc: '副标题' }, { name: 'hint', type: 'ReactNode', desc: '底部提示' }, { name: 'onSubmit', type: '(e) => void', desc: '提交' }, { name: 'minHeight', type: 'string | number', desc: '最小高度' }]

export function LoginCardDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="迷你预览" code={`<LoginCard title="X-UI" subtitle="管理员登录" hint="演示账号 demo / demo" minHeight={280} onSubmit={(e) => e.preventDefault()}>
  <Field label="用户名"><Input /></Field>
  <Button variant="primary" type="submit" block>登录</Button>
</LoginCard>`}>
        <LoginCard title="X-UI" subtitle="管理员登录" hint="演示账号 demo / demo" minHeight={280} onSubmit={(e) => e.preventDefault()}><Field label="用户名" htmlFor="doc-login-user"><Input id="doc-login-user" defaultValue="demo" /></Field><Field label="密码" htmlFor="doc-login-pass"><Input id="doc-login-pass" type="password" defaultValue="demo" /></Field><Button variant="primary" type="submit" block>登录</Button></LoginCard>
      </DocDemo>
    </ComponentDocLayout>
  )
}
