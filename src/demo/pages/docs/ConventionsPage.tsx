import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useDemoT } from '@/demo/i18n/useDemoT'
import { DocPage } from '@/demo/docs/DocPage'
import { ShowcaseSection } from '@/demo/ShowcaseSection'

type Rule = { topic: ReactNode; body: ReactNode }

function Rules({ rules }: { rules: Rule[] }) {
  return (
    <dl className="rule-list">
      {rules.map((r, i) => (
        <div key={i} className="rule-item">
          <dt>{r.topic}</dt>
          <dd>{r.body}</dd>
        </div>
      ))}
    </dl>
  )
}

function useRuleGroups() {
  const t = useDemoT()

  const LAYOUT: Rule[] = [
    {
      topic: t('Page skeleton', '页面骨架'),
      body: (
        <>
          {t('One ', '每页顶部一个 ')}
          <code>PageHeader</code>
          {t(' per page. Use ', '。创建 / 编辑 / 设置用 ')}
          <code>FormPage</code>
          {t(' (fixed-width, centered) for create/edit/settings, and ', '（定宽居中），列表与表格用')}
          <code>ListPage</code>
          {t(' (full-width) for lists and tables.', '全宽。')}
        </>
      ),
    },
    {
      topic: t('Vertical spacing', '垂直间距'),
      body: (
        <>
          {t('Control spacing with ', '用 ')}
          <code>Stack</code>
          {t(' (', '（')}
          <code>sm / md / lg</code>
          {t(') and ', '）与 ')}
          <code>FormGrid</code>
          {t(' — don’t hand-write margins in business code.', ' 控制间距，不要在业务里手写 margin。')}
        </>
      ),
    },
    {
      topic: t('Container hierarchy', '容器层级'),
      body: (
        <>
          {t('Use ', '页面级分区用 ')}
          <code>SectionCard</code>
          {t(' for page-level sections, ', '；一般承载用 ')}
          <code>Card</code>
          {t(' for general containers, and ', '；带标题的表用 ')}
          <code>TableCard</code>
          {t(' for titled tables (don’t nest ', '（不要再嵌套 ')}
          <code>SectionCard</code>
          {t(' inside it).', ' ）。')}
        </>
      ),
    },
    {
      topic: t('Header actions', '页头操作'),
      body: (
        <>
          {t('Put only one ', '一页只放一个 ')}
          <code>primary</code>
          {t(' action per page; use ', ' 主操作；次要操作用 ')}
          <code>actionItems</code>
          {t(' for secondary actions and set ', ' 并设置 ')}
          <code>overflow</code>
          {t(' to collapse them into "more".', ' 收进「更多」。')}
        </>
      ),
    },
  ]

  const TYPE: Rule[] = [
    {
      topic: t('Type scale', '字号阶梯'),
      body: (
        <>
          {t('Only use the ', '只使用 ')}
          <code>--fs-xs … --fs-3xl</code>
          {t(' tokens, expressed through ', ' 令牌，通过 ')}
          <code>Text size</code>
          {' / '}
          <code>Heading level</code>
          {t(' — never write arbitrary px. See the full scale in ', ' 表达，不写任意 px。完整阶梯见 ')}
          <Link to="/examples/typography" className="text-link">
            {t('Typography', '字体字号')}
          </Link>
          .
        </>
      ),
    },
    {
      topic: t('Text roles', '文字角色'),
      body: (
        <>
          {t('Body text uses ', '正文 ')}
          <code>Text</code>
          {t(', secondary ', '，次要 ')}
          <code>Muted</code>
          {t(', numbers/IDs/paths ', '，数字 / ID / 路径 ')}
          <code>Mono</code>
          {t('; status uses ', '；状态用 ')}
          <code>Badge</code>
          {t(', category uses ', '，分类用 ')}
          <code>Tag</code>
          {t('; mixed text and tags use ', '；文字与标签混排用 ')}
          <code>MetaRow</code>.
        </>
      ),
    },
    {
      topic: t('Control font size', '控件字号'),
      body: (
        <>
          {t('Form controls use a uniform ', '表单控件统一 ')}
          <code>--control-fs</code>
          {t(' (13px) — don’t switch between 13 and 16 at breakpoints.', '（13px），不要按断点在 13 与 16 之间切换。')}
        </>
      ),
    },
  ]

  const FORM: Rule[] = [
    {
      topic: t('Field shell', '字段外壳'),
      body: (
        <>
          {t('Put every control inside ', '所有控件放进 ')}
          <code>Field</code>
          {t(', which provides label / hint / error / required — don’t hand-write ', '，由它提供 label / hint / error / required，不要手写 ')}
          <code>&lt;label&gt;</code>.
        </>
      ),
    },
    {
      topic: t('Validation feedback', '校验反馈'),
      body: (
        <>
          {t('Use ', '单字段错误用 ')}
          <code>Field.error</code>
          {t(' for single-field errors, and ', '，提交后的整体错误用 ')}
          <code>FormErrors</code>
          {t(' for the overall error after submit — required for auth-related pages.', '；鉴权类页面必须有。')}
        </>
      ),
    },
    {
      topic: t('Native controls', '原生控件'),
      body: (
        <>
          {t('Don’t use ', '不使用 ')}
          <code>type=color</code>
          {' / '}
          <code>type=date</code>
          {t(': use ', '：颜色用 ')}
          <code>ColorInput</code>
          {t(' for color, ', '，日期用 ')}
          <code>DatePicker</code>
          {t(' for date, and ', '；搜索框用 ')}
          <code>SearchInput</code>
          {t(' for search.', '。')}
        </>
      ),
    },
    {
      topic: t('Choosing a control', '选型'),
      body: (
        <>
          {t('Use ', '互斥 ≤5 项 ')}
          <code>Radio</code>
          {t(' for ≤5 mutually exclusive options, ', '，更多用 ')}
          <code>Select</code>
          {' / '}
          <code>Combobox</code>
          {t(' for more; ', '；即时生效 ')}
          <code>Switch</code>
          {t(' for immediate effect, ', '，需保存 ')}
          <code>Checkbox</code>
          {t(' when it needs saving.', '。')}
        </>
      ),
    },
  ]

  const DATA: Rule[] = [
    {
      topic: t('List pages', '列表页'),
      body: (
        <>
          {t('Use ', '标准资源列表直接用 ')}
          <code>ResourceList</code>
          {t(' directly for standard resource lists (filters + table + pagination); only drop down to ', '（筛选 + 表 + 分页）；需要定制再下沉到 ')}
          <code>DataTable</code>
          {' → '}
          <code>Table</code>
          {t(' when you need customization.', '。')}
        </>
      ),
    },
    {
      topic: t('Empty values & truncation', '空值与截断'),
      body: (
        <>
          {t('Empty values default to showing ', '空值默认显示 ')}
          <code>—</code>
          {t('; set ', '；操作列设 ')}
          <code>emptyPlaceholder: false</code>
          {t(' for action columns; long text truncates via CSS, use ', ' ；长文本由 CSS 截断，必要时用 ')}
          <code>CellEllipsis</code>
          {t(' when needed.', '。')}
        </>
      ),
    },
    {
      topic: t('Pinned columns', '固定列'),
      body: (
        <>
          {t('Set ', '列设 ')}
          <code>pinned: 'left' | 'right'</code>
          {t(' on a column; with multi-select + left-pinning, the checkbox column pins automatically.', '；多选 + 左固定时勾选列自动固定。')}
        </>
      ),
    },
  ]

  const FEEDBACK: Rule[] = [
    {
      topic: t('Pick by disruptiveness', '按打断程度选择'),
      body: (
        <>
          <code>Toast</code>
          {t(' (transient, non-blocking) → ', '（瞬时，不打断）→ ')}
          <code>Alert / Banner</code>
          {t(' (persistent in-page) → ', '（页内常驻）→ ')}
          <code>Modal</code>
          {t(' (needs handling) → ', '（需处理）→ ')}
          <code>ConfirmModal / StrongConfirm</code>
          {t(' (destructive).', '（破坏性）。')}
        </>
      ),
    },
    {
      topic: t('Loading', '加载'),
      body: (
        <>
          {t('Use ', '结构已知用 ')}
          <code>Skeleton</code>
          {t(' when the structure is known, ', '，不确定用 ')}
          <code>Spinner</code>
          {t(' otherwise; resource lists hand loading/empty/error off to ', '；资源列表的加载 / 空 / 错误统一交给 ')}
          <code>ResourceState</code>.
        </>
      ),
    },
    {
      topic: t('Destructive actions', '危险操作'),
      body: (
        <>
          {t('Deletes/disables must have a second confirmation; high-risk (production resources) use ', '删除 / 停用必须二次确认；高风险（生产资源）使用 ')}
          <code>StrongConfirm</code>
          {' / '}
          <code>StrongConfirmDrawer</code>
          {t(' to require typing the resource name.', ' 要求输入资源名。')}
        </>
      ),
    },
  ]

  const VISUAL: Rule[] = [
    {
      topic: t('Color', '颜色'),
      body: (
        <>
          {t('Only use CSS variables (', '只用 CSS 变量（')}
          <code>--primary</code>, <code>--surface</code>, <code>--text-muted</code>
          {t('…) — never write hex color values.', '…)，不要写十六进制色值。')}
        </>
      ),
    },
    {
      topic: t('Chart colors', '图表配色'),
      body: (
        <>
          {t('Use ', '语义色用 ')}
          <code>CHART_STATUS.success / warn / danger</code>
          {t(' for semantic colors — don’t rely on series order to hit a color.', '；不要依赖 series 顺序碰颜色。')}
        </>
      ),
    },
    {
      topic: t('Icons', '图标'),
      body: (
        <>
          {t('Use ', '使用 ')}
          <code>lucide-react</code>
          {t('; sidebar and breadcrumbs use ', '，侧栏与面包屑通过 ')}
          <code>NavIcon</code>
          {t(' for unified weight and size.', ' 统一字重与尺寸。')}
        </>
      ),
    },
    {
      topic: t('Accessibility', '可访问性'),
      body: (
        <>
          {t('Icon-only buttons need ', '纯图标按钮提供 ')}
          <code>aria-label</code>
          {t('; Modal / Drawer support closing with Esc; never convey status with color alone — pair it with text or an icon.', '；Modal / Drawer 支持 Esc 关闭；不要仅靠颜色表达状态，配合文字或图标。')}
        </>
      ),
    },
  ]

  return { LAYOUT, TYPE, FORM, DATA, FEEDBACK, VISUAL }
}

export function ConventionsPage() {
  const t = useDemoT()
  const { LAYOUT, TYPE, FORM, DATA, FEEDBACK, VISUAL } = useRuleGroups()

  return (
    <DocPage
      eyebrow={t('Start', '开始')}
      title={t('Conventions', '开发约定')}
      description={t(
        'How components are chosen and paired. Follow these rules so pages written by different people stay consistent.',
        '组件之间如何选型与搭配。遵循这些规则，不同人写出的页面风格一致。',
      )}
    >
      <ShowcaseSection title={t('Layout', '布局')}>
        <Rules rules={LAYOUT} />
      </ShowcaseSection>
      <ShowcaseSection title={t('Typography', '排版')}>
        <Rules rules={TYPE} />
      </ShowcaseSection>
      <ShowcaseSection title={t('Forms', '表单')}>
        <Rules rules={FORM} />
      </ShowcaseSection>
      <ShowcaseSection title={t('Data & lists', '数据与列表')}>
        <Rules rules={DATA} />
      </ShowcaseSection>
      <ShowcaseSection title={t('Feedback & confirmation', '反馈与确认')}>
        <Rules rules={FEEDBACK} />
      </ShowcaseSection>
      <ShowcaseSection title={t('Visuals & accessibility', '视觉与无障碍')}>
        <Rules rules={VISUAL} />
      </ShowcaseSection>
    </DocPage>
  )
}
