import { SearchResultList } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('search-result-list')
const props: PropDef[] = [{ name: 'items', type: 'SearchResultItemData[]', desc: { en: "Result items", zh: "结果项" } }]

export function SearchResultListDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<SearchResultList items={[
  { id: '1', title: 'Button', type: 'Components', description: 'Button', href: '/components/button' },
  { id: '2', title: 'Login page', type: 'Example', onSelect: () => {} },
]} />`}>
        <SearchResultList items={[{ id: '1', title: 'Button', type: d("Components", "组件"), description: d("Action button", "操作按钮"), href: '/components/button' }, { id: '2', title: d("Login page", "登录页"), type: d("Example", "示例"), description: d("LoginCard example", "LoginCard 示例"), onSelect: () => undefined }, { id: '3', title: 'AppShell', type: d("Components", "组件"), description: d("App shell", "应用壳"), active: true, href: '/components/app-shell' }]} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
