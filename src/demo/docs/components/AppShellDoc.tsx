import { AppShell, Brand } from '@/components/layout'
import { Text } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('app-shell')
const props: PropDef[] = [
  { name: 'navGroups', type: 'NavGroup[]', desc: { en: 'Sidebar nav groups', zh: '侧栏分组' } },
  { name: 'brand', type: 'ReactNode', desc: { en: 'Brand area', zh: '品牌区' } },
  {
    name: 'topbarTitle',
    type: 'ReactNode',
    desc: {
      en: 'Override auto title; default follows active nav (icon + label) or Breadcrumbs when nested',
      zh: '覆盖自动标题；默认跟随当前菜单（图标+文案），子路径用 Breadcrumbs',
    },
  },
  {
    name: 'breadcrumbCurrent',
    type: 'ReactNode',
    desc: { en: 'Current crumb under a matched nav parent', zh: '命中父菜单时的当前段文案' },
  },
  {
    name: 'showAppearance',
    type: 'boolean',
    desc: { en: 'Topbar appearance pill + ThemeDrawer (default true)', zh: '顶栏外观按钮 + ThemeDrawer（默认 true）' },
  },
  { name: 'topbarRight', type: 'ReactNode', desc: { en: 'Extra topbar right (before search / appearance)', zh: '顶栏右侧额外内容（在搜索/外观之前）' } },
  { name: 'children', type: 'ReactNode', desc: { en: 'Main content', zh: '主内容' } },
]

export function AppShellDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo
        title={d('Mini preview', '迷你预览')}
        description={d(
          'Title follows nav; appearance is built-in. ListPage.search adds a search trigger.',
          '标题跟随菜单；外观按钮内建。ListPage.search 会注册顶栏搜索。',
        )}
        wide
        code={`<AppShell
  brand={<Brand />}
  navGroups={[{ items: [{ to: '/', label: 'Home', end: true }] }]}
>
  Content
</AppShell>`}
      >
        <div style={{ height: 220, overflow: 'hidden', border: '1px solid var(--border)', borderRadius: 8 }}>
          <AppShell
            brand={<Brand text="Demo" />}
            defaultCollapsed
            showAppearance={false}
            topbarTitle={d('Overview', '概览')}
            navGroups={[
              {
                items: [
                  { to: '/components/app-shell', label: d('Home', '首页'), end: true },
                  { to: '/components', label: d('Components', '组件') },
                ],
              },
            ]}
          >
            <div style={{ padding: 16 }}>
              <Text variant="muted" size="md">
                {d('Main content area', '主内容区')}
              </Text>
            </div>
          </AppShell>
        </div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
