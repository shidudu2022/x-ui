import { UserMenu } from '@/components/layout'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('user-menu')
const props: PropDef[] = [{ name: 'name', type: 'string', desc: { en: "Display name", zh: "显示名" } }, { name: 'role', type: 'string', desc: { en: "Roles", zh: "角色" } }, { name: 'items', type: 'UserMenuItem[]', desc: { en: "Menu items", zh: "菜单项" } }, { name: 'compact', type: 'boolean', desc: { en: "Icon-only trigger", zh: "仅图标触发" } }]

export function UserMenuDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<UserMenu
  name="Ada"
  role="Admin"
  items={[
    { id: 'profile', label: 'Profile', onSelect: () => {} },
    { id: 'logout', label: 'Log out', danger: true, onSelect: () => {} },
  ]}
/>`}>
        <div style={{ maxWidth: 220 }}><UserMenu name="Ada" role="Admin" items={[{ id: 'profile', label: d("Profile", "个人资料"), onSelect: () => undefined }, { id: 'logout', label: d("Log out", "退出"), danger: true, onSelect: () => undefined }]} /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
