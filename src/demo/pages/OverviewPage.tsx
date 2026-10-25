import { Link } from 'react-router-dom'
import { ACCENTS, ACCENT_COLORS } from '@/theme/accents'
import { useAppearance } from '@/theme/AppearanceProvider'
import { Card, PageHeader, Segmented } from '@/components/ui'
import { ShowcaseSection } from '../ShowcaseSection'

const COMPONENTS = [
  { label: '按钮', to: '/components/buttons', desc: '主次 / 危险 / Loading' },
  { label: '表单', to: '/components/forms', desc: '输入、选择、开关' },
  { label: '数据', to: '/components/data', desc: '表格、标签、空态' },
  { label: '反馈', to: '/components/feedback', desc: 'Alert、Toast、Modal' },
  { label: '导航', to: '/components/navigation', desc: 'Tabs、Steps、Split' },
  { label: '图表', to: '/components/charts', desc: '折线、柱状、饼图' },
  { label: '进阶', to: '/components/advanced', desc: '日期、级联、Sheet' },
]

const EXAMPLES = [
  { label: '仪表盘', to: '/examples/dashboard', desc: '指标 + 图表' },
  { label: '设置', to: '/examples/settings', desc: '分区表单' },
  { label: '空态 / 404', to: '/examples/empty', desc: 'EmptyState' },
  { label: '搜索', to: '/examples/search', desc: '结果列表' },
  { label: '对比', to: '/examples/compare', desc: '双栏 Diff' },
  { label: '资料', to: '/examples/profile', desc: '头像 + 抽屉' },
  { label: '角色', to: '/examples/roles', desc: '多选表格' },
  { label: '通知', to: '/examples/notifications', desc: '消息中心' },
  { label: '骨架', to: '/examples/skeleton', desc: '加载占位' },
  { label: '列表', to: '/examples/list', desc: '筛选 + 行操作' },
  { label: '表单页', to: '/examples/form', desc: '定宽表单' },
  { label: '登录', to: '/examples/login', desc: 'LoginCard' },
]

function IndexGroup({
  title,
  items,
}: {
  title: string
  items: { label: string; to: string; desc: string }[]
}) {
  return (
    <section className="index-group">
      <header className="index-group-head">
        <h3>{title}</h3>
        <span className="muted">{items.length}</span>
      </header>
      <div className="index-grid">
        {items.map((item) => (
          <Link key={item.to} to={item.to} className="index-tile">
            <span className="index-tile-label">{item.label}</span>
            <span className="index-tile-desc">{item.desc}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}

export function OverviewPage() {
  const { modePreference, setModePreference, accent, density, setAccent, setDensity } =
    useAppearance()

  return (
    <div>
      <PageHeader
        title="X-UI"
        description="从设计稿抽离的通用 React UI 框架。侧栏分页浏览组件，可按模块接入业务项目。"
      />

      <ShowcaseSection title="外观" description="明暗 / 强调色 / 密度会写入 body[data-*] 与 localStorage。">
        <div className="stack">
          <Card padded>
            <div className="stack">
              <strong>色彩模式</strong>
              <Segmented
                value={modePreference}
                onChange={setModePreference}
                options={[
                  { value: 'system', label: '跟随系统' },
                  { value: 'light', label: '浅色' },
                  { value: 'dark', label: '深色' },
                ]}
              />
              <strong>密度</strong>
              <Segmented
                value={density}
                onChange={setDensity}
                options={[
                  { value: 'comfortable', label: '舒适' },
                  { value: 'compact', label: '紧凑' },
                ]}
              />
              <strong>强调色</strong>
              <div className="accent-grid">
                {ACCENTS.map((a) => (
                  <button
                    key={a}
                    type="button"
                    className={`accent-swatch${accent === a ? ' active' : ''}`}
                    onClick={() => setAccent(a)}
                  >
                    <span
                      className="accent-dot"
                      data-accent={a}
                      style={{ background: ACCENT_COLORS[a] }}
                    />
                    <span className="accent-meta">{a}</span>
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="组件与示例索引"
        description="按模块跳转；也可从左侧导航进入。"
      >
        <div className="index-catalog">
          <IndexGroup title="组件" items={COMPONENTS} />
          <IndexGroup title="示例页" items={EXAMPLES} />
        </div>
        <p className="index-footnote muted">
          更多组合见 <Link to="/patterns" className="text-link">组合模式</Link>
          {' · '}
          令牌见 <Link to="/foundations" className="text-link">基础</Link>
        </p>
      </ShowcaseSection>
    </div>
  )
}
