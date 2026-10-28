import { SearchResultList } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('search-result-list')
const props: PropDef[] = [{ name: 'items', type: 'SearchResultItemData[]', desc: '结果项' }]

export function SearchResultListDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<SearchResultList items={[
  { id: '1', title: 'Button', type: '组件', description: '按钮', href: '/components/button' },
  { id: '2', title: '登录页', type: '示例', onSelect: () => {} },
]} />`}>
        <SearchResultList items={[{ id: '1', title: 'Button', type: '组件', description: '操作按钮', href: '/components/button' }, { id: '2', title: '登录页', type: '示例', description: 'LoginCard 示例', onSelect: () => undefined }, { id: '3', title: 'AppShell', type: '组件', description: '应用壳', active: true, href: '/components/app-shell' }]} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
