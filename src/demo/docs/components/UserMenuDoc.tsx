import { UserMenu } from '@/components/layout'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('user-menu')
const props: PropDef[] = [{ name: 'name', type: 'string', desc: '显示名' }, { name: 'role', type: 'string', desc: '角色' }, { name: 'items', type: 'UserMenuItem[]', desc: '菜单项' }, { name: 'compact', type: 'boolean', desc: '仅图标触发' }]

export function UserMenuDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<UserMenu
  name="Ada"
  role="Admin"
  items={[
    { id: 'profile', label: '个人资料', onSelect: () => {} },
    { id: 'logout', label: '退出', danger: true, onSelect: () => {} },
  ]}
/>`}>
        <div style={{ maxWidth: 220 }}><UserMenu name="Ada" role="Admin" items={[{ id: 'profile', label: '个人资料', onSelect: () => undefined }, { id: 'logout', label: '退出', danger: true, onSelect: () => undefined }]} /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
