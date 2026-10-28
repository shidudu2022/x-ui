import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { DocPage } from '@/demo/docs/DocPage'
import { ShowcaseSection } from '@/demo/ShowcaseSection'

type Rule = { topic: string; body: ReactNode }

function Rules({ rules }: { rules: Rule[] }) {
  return (
    <dl className="rule-list">
      {rules.map((r) => (
        <div key={r.topic} className="rule-item">
          <dt>{r.topic}</dt>
          <dd>{r.body}</dd>
        </div>
      ))}
    </dl>
  )
}

const LAYOUT: Rule[] = [
  {
    topic: '页面骨架',
    body: (
      <>
        每页顶部一个 <code>PageHeader</code>。创建 / 编辑 / 设置用 <code>FormPage</code>（定宽居中），列表与表格用{' '}
        <code>ListPage</code> 全宽。
      </>
    ),
  },
  {
    topic: '垂直间距',
    body: (
      <>
        用 <code>Stack</code>（<code>sm / md / lg</code>）与 <code>FormGrid</code> 控制间距，不要在业务里手写 margin。
      </>
    ),
  },
  {
    topic: '容器层级',
    body: (
      <>
        页面级分区用 <code>SectionCard</code>；一般承载用 <code>Card</code>；带标题的表用 <code>TableCard</code>（不要再嵌套{' '}
        <code>SectionCard</code>）。
      </>
    ),
  },
  {
    topic: '页头操作',
    body: (
      <>
        一页只放一个 <code>primary</code> 主操作；次要操作用 <code>actionItems</code> 并设置 <code>overflow</code> 收进「更多」。
      </>
    ),
  },
]

const TYPE: Rule[] = [
  {
    topic: '字号阶梯',
    body: (
      <>
        只使用 <code>--fs-xs … --fs-3xl</code> 令牌，通过 <code>Text size</code> / <code>Heading level</code> 表达，不写任意 px。
        完整阶梯见 <Link to="/examples/typography" className="text-link">字体字号</Link>。
      </>
    ),
  },
  {
    topic: '文字角色',
    body: (
      <>
        正文 <code>Text</code>，次要 <code>Muted</code>，数字 / ID / 路径 <code>Mono</code>；状态用 <code>Badge</code>，分类用{' '}
        <code>Tag</code>；文字与标签混排用 <code>MetaRow</code>。
      </>
    ),
  },
  {
    topic: '控件字号',
    body: (
      <>
        表单控件统一 <code>--control-fs</code>（13px），不要按断点在 13 与 16 之间切换。
      </>
    ),
  },
]

const FORM: Rule[] = [
  {
    topic: '字段外壳',
    body: (
      <>
        所有控件放进 <code>Field</code>，由它提供 label / hint / error / required，不要手写 <code>&lt;label&gt;</code>。
      </>
    ),
  },
  {
    topic: '校验反馈',
    body: (
      <>
        单字段错误用 <code>Field.error</code>，提交后的整体错误用 <code>FormErrors</code>；鉴权类页面必须有。
      </>
    ),
  },
  {
    topic: '原生控件',
    body: (
      <>
        不使用 <code>type=color</code> / <code>type=date</code>：颜色用 <code>ColorInput</code>，日期用 <code>DatePicker</code>；搜索框用{' '}
        <code>SearchInput</code>。
      </>
    ),
  },
  {
    topic: '选型',
    body: (
      <>
        互斥 ≤5 项 <code>Radio</code>，更多用 <code>Select</code> / <code>Combobox</code>；即时生效 <code>Switch</code>，需保存{' '}
        <code>Checkbox</code>。
      </>
    ),
  },
]

const DATA: Rule[] = [
  {
    topic: '列表页',
    body: (
      <>
        标准资源列表直接用 <code>ResourceList</code>（筛选 + 表 + 分页）；需要定制再下沉到 <code>DataTable</code> → <code>Table</code>。
      </>
    ),
  },
  {
    topic: '空值与截断',
    body: (
      <>
        空值默认显示 <code>—</code>；操作列设 <code>emptyPlaceholder: false</code>；长文本由 CSS 截断，必要时用 <code>CellEllipsis</code>。
      </>
    ),
  },
  {
    topic: '固定列',
    body: (
      <>
        列设 <code>pinned: 'left' | 'right'</code>；多选 + 左固定时勾选列自动固定。
      </>
    ),
  },
]

const FEEDBACK: Rule[] = [
  {
    topic: '按打断程度选择',
    body: (
      <>
        <code>Toast</code>（瞬时，不打断）→ <code>Alert / Banner</code>（页内常驻）→ <code>Modal</code>（需处理）→{' '}
        <code>ConfirmModal / StrongConfirm</code>（破坏性）。
      </>
    ),
  },
  {
    topic: '加载',
    body: (
      <>
        结构已知用 <code>Skeleton</code>，不确定用 <code>Spinner</code>；资源列表的加载 / 空 / 错误统一交给{' '}
        <code>ResourceState</code>。
      </>
    ),
  },
  {
    topic: '危险操作',
    body: (
      <>
        删除 / 停用必须二次确认；高风险（生产资源）使用 <code>StrongConfirm</code> / <code>StrongConfirmDrawer</code> 要求输入资源名。
      </>
    ),
  },
]

const VISUAL: Rule[] = [
  {
    topic: '颜色',
    body: (
      <>
        只用 CSS 变量（<code>--primary</code>、<code>--surface</code>、<code>--text-muted</code>…），不要写十六进制色值。
      </>
    ),
  },
  {
    topic: '图表配色',
    body: (
      <>
        语义色用 <code>CHART_STATUS.success / warn / danger</code>；不要依赖 series 顺序碰颜色。
      </>
    ),
  },
  {
    topic: '图标',
    body: (
      <>
        使用 <code>lucide-react</code>，侧栏与面包屑通过 <code>NavIcon</code> 统一字重与尺寸。
      </>
    ),
  },
  {
    topic: '可访问性',
    body: (
      <>
        纯图标按钮提供 <code>aria-label</code>；Modal / Drawer 支持 Esc 关闭；不要仅靠颜色表达状态，配合文字或图标。
      </>
    ),
  },
]

export function ConventionsPage() {
  return (
    <DocPage
      eyebrow="开始"
      title="开发约定"
      description="组件之间如何选型与搭配。遵循这些规则，不同人写出的页面风格一致。"
    >
      <ShowcaseSection title="布局">
        <Rules rules={LAYOUT} />
      </ShowcaseSection>
      <ShowcaseSection title="排版">
        <Rules rules={TYPE} />
      </ShowcaseSection>
      <ShowcaseSection title="表单">
        <Rules rules={FORM} />
      </ShowcaseSection>
      <ShowcaseSection title="数据与列表">
        <Rules rules={DATA} />
      </ShowcaseSection>
      <ShowcaseSection title="反馈与确认">
        <Rules rules={FEEDBACK} />
      </ShowcaseSection>
      <ShowcaseSection title="视觉与无障碍">
        <Rules rules={VISUAL} />
      </ShowcaseSection>
    </DocPage>
  )
}
