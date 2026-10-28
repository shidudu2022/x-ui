#!/usr/bin/env node
/**
 * Generate component docs with live DocDemo + source code.
 * Usage: node scripts/gen-component-docs.mjs --force
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { DEMO_EXPANSIONS } from './demo-expansions.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(root, 'src/demo/docs/components')
const force = process.argv.includes('--force')

function pascal(slug) {
  return slug.split('-').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join('')
}

/** @type {Record<string, { imports: string, hooks?: string, props: string, demos: { title: string, desc?: string, code: string, jsx: string }[] }>} */
const DEMOS = {
  accordion: {
    imports: `import { Accordion } from '@/components/ui'`,
    props: `[{ name: 'items', type: 'AccordionItemData[]', desc: '面板项' }, { name: 'defaultOpenId', type: 'string', desc: '默认展开' }]`,
    demos: [{
      title: '基础',
      desc: '点击标题展开 / 折叠。',
      code: `<Accordion
  defaultOpenId="1"
  items={[
    { id: '1', title: '什么是 x-ui？', content: '一套管理端组件与布局。' },
    { id: '2', title: '如何接入？', content: 'npm install @shidudu2022/x-ui' },
  ]}
/>`,
      jsx: `<Accordion defaultOpenId="1" items={[{ id: '1', title: '什么是 x-ui？', content: '一套管理端组件与布局。' }, { id: '2', title: '如何接入？', content: 'npm install @shidudu2022/x-ui' }]} />`,
    }],
  },
  alert: {
    imports: `import { Alert } from '@/components/ui'`,
    props: `[{ name: 'tone', type: "'info'|'success'|'warn'|'danger'", default: "'info'", desc: '语义色' }, { name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'dismissible', type: 'boolean', default: 'false', desc: '可关闭' }]`,
    demos: [{
      title: '基础',
      code: `<Alert tone="info" title="提示">信息条。</Alert>
<Alert tone="success" title="成功">操作已完成。</Alert>
<Alert tone="warn" title="警告">资源即将耗尽。</Alert>
<Alert tone="danger" title="错误" dismissible>请求失败。</Alert>`,
      jsx: `<div className="stack">
          <Alert tone="info" title="提示">信息条。</Alert>
          <Alert tone="success" title="成功">操作已完成。</Alert>
          <Alert tone="warn" title="警告">资源即将耗尽。</Alert>
          <Alert tone="danger" title="错误" dismissible>请求失败。</Alert>
        </div>`,
    }],
  },
  badge: {
    imports: `import { Badge } from '@/components/ui'`,
    props: `[{ name: 'tone', type: 'BadgeTone', desc: '语义色' }]`,
    demos: [{
      title: '基础',
      code: `<Badge>default</Badge>
<Badge tone="success">success</Badge>
<Badge tone="warn">warn</Badge>
<Badge tone="danger">danger</Badge>`,
      jsx: `<div className="showcase-row"><Badge>default</Badge><Badge tone="success">success</Badge><Badge tone="warn">warn</Badge><Badge tone="danger">danger</Badge></div>`,
    }],
  },
  button: {
    imports: `import { Button } from '@/components/ui'`,
    props: `[{ name: 'variant', type: "'primary'|'secondary'|'danger'|'ghost'", default: "'secondary'", desc: '变体' }, { name: 'size', type: "'sm'|'md'|'lg'", default: "'md'", desc: '尺寸' }, { name: 'loading', type: 'boolean', default: 'false', desc: '加载' }, { name: 'block', type: 'boolean', desc: '全宽' }, { name: 'href', type: 'string', desc: '链接模式' }]`,
    demos: [
      {
        title: '基础',
        code: `<Button variant="primary">Primary</Button>
<Button>Secondary</Button>
<Button variant="danger">Danger</Button>
<Button variant="ghost">Ghost</Button>`,
        jsx: `<div className="showcase-row"><Button variant="primary">Primary</Button><Button>Secondary</Button><Button variant="danger">Danger</Button><Button variant="ghost">Ghost</Button></div>`,
      },
      {
        title: '增强',
        desc: '尺寸、禁用、块级。',
        code: `<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button disabled>Disabled</Button>
<Button variant="primary" block>全宽</Button>`,
        jsx: `<div className="stack" style={{ maxWidth: 280 }}><div className="showcase-row"><Button size="sm">Small</Button><Button size="lg">Large</Button><Button disabled>Disabled</Button></div><Button variant="primary" block>全宽</Button></div>`,
      },
    ],
  },
  banner: {
    imports: `import { Banner } from '@/components/ui'`,
    props: `[]`,
    demos: [{ title: '基础', code: `<Banner>维护模式进行中，危险操作已锁定。</Banner>`, jsx: `<Banner>维护模式进行中，危险操作已锁定。</Banner>` }],
  },
  card: {
    imports: `import { Card, Text } from '@/components/ui'`,
    props: `[{ name: 'padded', type: 'boolean', default: 'false', desc: '内边距' }]`,
    demos: [{ title: '基础', code: `<Card padded><Text>卡片内容</Text></Card>`, jsx: `<Card padded><Text>卡片内容</Text></Card>` }],
  },
  checkbox: {
    imports: `import { Checkbox } from '@/components/ui'`,
    props: `[{ name: 'checked', type: 'boolean', desc: '受控选中' }, { name: 'disabled', type: 'boolean', desc: '禁用' }]`,
    demos: [{ title: '基础', code: `<Checkbox defaultChecked>同意条款</Checkbox>`, jsx: `<Checkbox defaultChecked>同意条款</Checkbox>` }],
  },
  divider: {
    imports: `import { Divider } from '@/components/ui'`,
    props: `[]`,
    demos: [{ title: '基础', code: `<Divider />`, jsx: `<Divider />` }],
  },
  'empty-state': {
    imports: `import { Button, EmptyState } from '@/components/ui'`,
    props: `[{ name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'description', type: 'ReactNode', desc: '说明' }, { name: 'action', type: 'ReactNode', desc: '操作' }]`,
    demos: [{
      title: '基础',
      code: `<EmptyState
  title="还没有数据"
  description="创建第一条记录开始。"
  action={<Button variant="primary">创建</Button>}
/>`,
      jsx: `<EmptyState title="还没有数据" description="创建第一条记录开始。" action={<Button variant="primary">创建</Button>} />`,
    }],
  },
  field: {
    imports: `import { Field, Input } from '@/components/ui'`,
    props: `[{ name: 'label', type: 'ReactNode', desc: '标签' }, { name: 'hint', type: 'ReactNode', desc: '提示' }, { name: 'error', type: 'ReactNode', desc: '错误' }]`,
    demos: [
      {
        title: '基础',
        code: `<Field label="名称" htmlFor="name" hint="用于展示">
  <Input id="name" placeholder="demo" />
</Field>`,
        jsx: `<Field label="名称" htmlFor="doc-name" hint="用于展示"><Input id="doc-name" placeholder="demo" /></Field>`,
      },
      {
        title: '错误态',
        code: `<Field label="名称" htmlFor="bad" error="必填">
  <Input id="bad" invalid placeholder="请输入" />
</Field>`,
        jsx: `<Field label="名称" htmlFor="doc-bad" error="必填"><Input id="doc-bad" invalid placeholder="请输入" /></Field>`,
      },
    ],
  },
  heading: {
    imports: `import { Heading } from '@/components/ui'`,
    props: `[{ name: 'level', type: 'HeadingLevel', desc: '层级' }]`,
    demos: [{ title: '基础', code: `<Heading level="section">区块标题</Heading>`, jsx: `<Heading level="section">区块标题</Heading>` }],
  },
  input: {
    imports: `import { Input } from '@/components/ui'`,
    props: `[{ name: 'size', type: "'sm'|'md'|'lg'", default: "'md'", desc: '尺寸' }, { name: 'invalid', type: 'boolean', desc: '校验失败' }]`,
    demos: [{
      title: '基础',
      code: `<Input placeholder="默认" />
<Input size="sm" placeholder="size=sm" />
<Input disabled defaultValue="disabled" />`,
      jsx: `<div className="stack" style={{ maxWidth: 280 }}><Input placeholder="默认" /><Input size="sm" placeholder="size=sm" /><Input disabled defaultValue="disabled" /></div>`,
    }],
  },
  'input-group': {
    imports: `import { Input, InputGroup } from '@/components/ui'`,
    props: `[{ name: 'prefix', type: 'ReactNode', desc: '前缀' }, { name: 'suffix', type: 'ReactNode', desc: '后缀' }]`,
    demos: [{
      title: '基础',
      code: `<InputGroup prefix="https://" suffix=".com">
  <Input placeholder="example" />
</InputGroup>`,
      jsx: `<InputGroup prefix="https://" suffix=".com"><Input placeholder="example" /></InputGroup>`,
    }],
  },
  kbd: {
    imports: `import { Kbd } from '@/components/ui'`,
    props: `[]`,
    demos: [{ title: '基础', code: `<Kbd>⌘</Kbd> <Kbd>K</Kbd>`, jsx: `<div className="showcase-row"><Kbd>⌘</Kbd><Kbd>K</Kbd></div>` }],
  },
  'meter-bar': {
    imports: `import { MeterBar, meterToneFromPct } from '@/components/ui'`,
    props: `[{ name: 'value', type: 'number|null', desc: '0–100' }, { name: 'tone', type: 'MeterBarTone', desc: '色调' }]`,
    demos: [{
      title: '基础',
      code: `<MeterBar value={32} tone={meterToneFromPct(32)} />
<MeterBar value={78} tone={meterToneFromPct(78)} />
<MeterBar value={94} tone={meterToneFromPct(94)} />`,
      jsx: `<div className="showcase-row" style={{ gap: 16 }}><div style={{ width: 120 }}><MeterBar value={32} tone={meterToneFromPct(32)} /></div><div style={{ width: 120 }}><MeterBar value={78} tone={meterToneFromPct(78)} /></div><div style={{ width: 120 }}><MeterBar value={94} tone={meterToneFromPct(94)} /></div></div>`,
    }],
  },
  pagination: {
    imports: `import { Pagination } from '@/components/ui'`,
    props: `[{ name: 'page', type: 'number', desc: '当前页' }, { name: 'pageCount', type: 'number', desc: '总页数' }, { name: 'onChange', type: '(p:number)=>void', desc: '翻页' }]`,
    demos: [{ title: '基础', code: `<Pagination page={2} pageCount={8} onChange={setPage} />`, jsx: `<Pagination page={2} pageCount={8} onChange={() => undefined} />` }],
  },
  pill: {
    imports: `import { Pill } from '@/components/ui'`,
    props: `[{ name: 'action', type: 'boolean', desc: '可点击' }]`,
    demos: [{ title: '基础', code: `<Pill>状态</Pill>
<Pill action onClick={() => undefined}>外观</Pill>`, jsx: `<div className="showcase-row"><Pill>状态</Pill><Pill action onClick={() => undefined}>外观</Pill></div>` }],
  },
  progress: {
    imports: `import { Progress } from '@/components/ui'`,
    props: `[{ name: 'value', type: 'number', desc: '0–100' }, { name: 'tone', type: 'ProgressTone', desc: '色调' }, { name: 'indeterminate', type: 'boolean', desc: '不确定' }]`,
    demos: [{
      title: '基础',
      code: `<Progress label="上传" value={62} />
<Progress label="告警" value={82} tone="warn" />
<Progress label="处理中" indeterminate />`,
      jsx: `<div className="stack"><Progress label="上传" value={62} /><Progress label="告警" value={82} tone="warn" /><Progress label="处理中" indeterminate /></div>`,
    }],
  },
  radio: {
    imports: `import { Radio, RadioGroup } from '@/components/ui'`,
    props: `[{ name: 'label', type: 'ReactNode', desc: '文案' }]`,
    demos: [{
      title: '基础',
      code: `<RadioGroup>
  <Radio name="demo" value="a" defaultChecked label="选项 A" />
  <Radio name="demo" value="b" label="选项 B" />
</RadioGroup>`,
      jsx: `<RadioGroup><Radio name="doc-radio" value="a" defaultChecked label="选项 A" /><Radio name="doc-radio" value="b" label="选项 B" /></RadioGroup>`,
    }],
  },
  select: {
    imports: `import { useState } from 'react'\nimport { Select } from '@/components/ui'`,
    hooks: `  const [value, setValue] = useState('a')\n`,
    props: `[{ name: 'options', type: 'SelectOption[]', desc: '选项' }, { name: 'value', type: 'string', desc: '受控值' }, { name: 'size', type: "'sm'|'md'", desc: '尺寸' }]`,
    demos: [{
      title: '基础',
      code: `const [value, setValue] = useState('a')

<Select
  value={value}
  onChange={setValue}
  options={[
    { value: 'a', label: '选项 A' },
    { value: 'b', label: '选项 B' },
  ]}
/>`,
      jsx: `<Select value={value} onChange={setValue} options={[{ value: 'a', label: '选项 A' }, { value: 'b', label: '选项 B' }]} />`,
    }],
  },
  spinner: {
    imports: `import { Spinner } from '@/components/ui'`,
    props: `[{ name: 'size', type: "'sm'|'md'|'lg'", desc: '尺寸' }]`,
    demos: [{ title: '基础', code: `<Spinner />
<Spinner size="lg" />`, jsx: `<div className="showcase-row"><Spinner /><Spinner size="lg" /></div>` }],
  },
  'status-dot': {
    imports: `import { StatusDot } from '@/components/ui'`,
    props: `[{ name: 'tone', type: "'ok'|'bad'|'warn'|'neutral'|'info'", desc: '色调' }, { name: 'ok', type: 'boolean', desc: '快捷映射' }]`,
    demos: [{ title: '基础', code: `<StatusDot tone="ok" />
<StatusDot tone="warn" />
<StatusDot tone="bad" />
<StatusDot ok={false} />`, jsx: `<div className="showcase-row"><StatusDot tone="ok" /><StatusDot tone="warn" /><StatusDot tone="bad" /><StatusDot ok={false} /></div>` }],
  },
  switch: {
    imports: `import { useState } from 'react'\nimport { Switch } from '@/components/ui'`,
    hooks: `  const [on, setOn] = useState(true)\n`,
    props: `[{ name: 'checked', type: 'boolean', desc: '开/关' }, { name: 'label', type: 'ReactNode', desc: '文案' }]`,
    demos: [{
      title: '基础',
      code: `const [on, setOn] = useState(true)
<Switch checked={on} onChange={(e) => setOn(e.target.checked)} label="自动刷新" />`,
      jsx: `<Switch checked={on} onChange={(e) => setOn(e.target.checked)} label="自动刷新" />`,
    }],
  },
  tag: {
    imports: `import { Tag, TagGroup } from '@/components/ui'`,
    props: `[{ name: 'tone', type: 'TagTone', desc: '色调' }]`,
    demos: [{ title: '基础', code: `<TagGroup>
  <Tag>default</Tag>
  <Tag tone="primary">primary</Tag>
  <Tag tone="info">info</Tag>
</TagGroup>`, jsx: `<TagGroup><Tag>default</Tag><Tag tone="primary">primary</Tag><Tag tone="info">info</Tag></TagGroup>` }],
  },
  text: {
    imports: `import { Text, Muted, Mono } from '@/components/ui'`,
    props: `[{ name: 'variant', type: 'TextVariant', desc: '样式' }, { name: 'size', type: 'TextSize', desc: '字号' }]`,
    demos: [{ title: '基础', code: `<Text>正文 Text</Text>
<Muted>次要 Muted</Muted>
<Mono>mono 代码感</Mono>`, jsx: `<div className="stack"><Text>正文 Text</Text><Muted>次要 Muted</Muted><Mono>mono 代码感</Mono></div>` }],
  },
  textarea: {
    imports: `import { Textarea } from '@/components/ui'`,
    props: `[{ name: 'rows', type: 'number', desc: '行数' }]`,
    demos: [{ title: '基础', code: `<Textarea rows={3} placeholder="备注" />`, jsx: `<Textarea rows={3} placeholder="备注" />` }],
  },
  'text-link': {
    imports: `import { TextLink } from '@/components/ui'`,
    props: `[{ name: 'href', type: 'string', desc: '链接' }, { name: 'external', type: 'boolean', desc: '外链图标' }]`,
    demos: [{ title: '基础', code: `<TextLink href="/components">组件索引</TextLink>`, jsx: `<TextLink href="/components">组件索引</TextLink>` }],
  },
  'toggle-button': {
    imports: `import { useState } from 'react'\nimport { ToggleButton } from '@/components/ui'`,
    hooks: `  const [checked, setChecked] = useState(true)\n`,
    props: `[{ name: 'checked', type: 'boolean', desc: '选中' }]`,
    demos: [{
      title: '基础',
      code: `const [checked, setChecked] = useState(true)
<ToggleButton checked={checked} onClick={() => setChecked((v) => !v)}>
  自动刷新
</ToggleButton>`,
      jsx: `<ToggleButton checked={checked} onClick={() => setChecked((v) => !v)}>自动刷新</ToggleButton>`,
    }],
  },
  tooltip: {
    imports: `import { Button, Tooltip } from '@/components/ui'`,
    props: `[{ name: 'content', type: 'ReactNode', desc: '提示内容' }, { name: 'side', type: 'TooltipSide', desc: '方向' }]`,
    demos: [{
      title: '基础',
      code: `<Tooltip content="快捷说明">
  <Button variant="ghost">悬停我</Button>
</Tooltip>`,
      jsx: `<Tooltip content="快捷说明"><Button variant="ghost">悬停我</Button></Tooltip>`,
    }],
  },
  steps: {
    imports: `import { useState } from 'react'\nimport { Button, Steps } from '@/components/ui'`,
    hooks: `  const [step, setStep] = useState(1)\n`,
    props: `[{ name: 'items', type: 'StepItem[]', desc: '步骤' }, { name: 'current', type: 'number', desc: '当前索引' }, { name: 'size', type: "'sm'|'md'", desc: '尺寸' }]`,
    demos: [{
      title: '基础',
      code: `const [step, setStep] = useState(1)
<Steps current={step} items={[
  { id: '1', label: '命名' },
  { id: '2', label: '配置' },
  { id: '3', label: '确认' },
]} />`,
      jsx: `<div className="stack"><Steps current={step} items={[{ id: '1', label: '命名' }, { id: '2', label: '配置' }, { id: '3', label: '确认' }]} /><div className="actions"><Button disabled={step <= 0} onClick={() => setStep((s) => s - 1)}>上一步</Button><Button variant="primary" disabled={step >= 2} onClick={() => setStep((s) => s + 1)}>下一步</Button></div></div>`,
    }],
  },
  segmented: {
    imports: `import { useState } from 'react'\nimport { Segmented } from '@/components/ui'`,
    hooks: `  const [value, setValue] = useState('overview')\n`,
    props: `[{ name: 'options', type: 'SegmentedOption[]', desc: '选项' }, { name: 'value', type: 'string', desc: '当前值' }]`,
    demos: [{
      title: '基础',
      code: `<Segmented
  value={value}
  onChange={setValue}
  options={[
    { value: 'overview', label: '概览' },
    { value: 'workloads', label: '工作负载' },
  ]}
/>`,
      jsx: `<Segmented value={value} onChange={setValue} options={[{ value: 'overview', label: '概览' }, { value: 'workloads', label: '工作负载' }, { value: 'meta', label: '元数据' }]} />`,
    }],
  },
  tabs: {
    imports: `import { useState } from 'react'\nimport { Tabs } from '@/components/ui'`,
    hooks: `  const [tab, setTab] = useState('one')\n`,
    props: `[{ name: 'items', type: 'TabItem[]', desc: '面板' }, { name: 'value', type: 'string', desc: '当前 id' }]`,
    demos: [{
      title: '基础',
      code: `<Tabs
  value={tab}
  onChange={setTab}
  items={[
    { id: 'one', label: '基本信息', content: <p>面板一</p> },
    { id: 'two', label: '高级', content: <p>面板二</p> },
  ]}
/>`,
      jsx: `<Tabs value={tab} onChange={setTab} items={[{ id: 'one', label: '基本信息', content: <p className="muted">Tab 面板一</p> }, { id: 'two', label: '高级', content: <p className="muted">Tab 面板二</p> }]} />`,
    }],
  },
  'search-input': {
    imports: `import { useState } from 'react'\nimport { SearchInput } from '@/components/ui'`,
    hooks: `  const [q, setQ] = useState('')\n`,
    props: `[{ name: 'value', type: 'string', desc: '受控值' }, { name: 'allowClear', type: 'boolean', default: 'true', desc: '清除按钮' }, { name: 'loading', type: 'boolean', desc: '加载' }]`,
    demos: [{
      title: '基础',
      code: `const [q, setQ] = useState('')
<SearchInput value={q} onChange={(e) => setQ(e.target.value)} placeholder="名称 / 标签…" />`,
      jsx: `<SearchInput value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ('')} placeholder="名称 / 标签…" />`,
    }],
  },
  'copy-button': {
    imports: `import { CopyButton } from '@/components/ui'`,
    props: `[{ name: 'value', type: 'string', desc: '复制内容' }]`,
    demos: [{ title: '基础', code: `<CopyButton value="npm install @shidudu2022/x-ui" />`, jsx: `<CopyButton value="npm install @shidudu2022/x-ui" />` }],
  },
  'code-block': {
    imports: `import { CodeBlock } from '@/components/ui'`,
    props: `[{ name: 'code', type: 'string', desc: '代码' }, { name: 'language', type: 'string', desc: '语言标签' }, { name: 'compact', type: 'boolean', desc: '紧凑' }]`,
    demos: [{
      title: '基础',
      code: `<CodeBlock language="bash" compact code="npm install @shidudu2022/x-ui" />`,
      jsx: `<CodeBlock language="bash" compact code="npm install @shidudu2022/x-ui" />`,
    }],
  },
  toast: {
    imports: `import { Button, useToast } from '@/components/ui'`,
    hooks: `  const { toast } = useToast()\n`,
    props: `[{ name: 'toast(msg, tone?)', type: 'fn', desc: '需 ToastProvider' }]`,
    demos: [{
      title: '基础',
      code: `const { toast } = useToast()
<Button onClick={() => toast('已保存', 'success')}>成功</Button>
<Button onClick={() => toast('出错了', 'error')}>错误</Button>`,
      jsx: `<div className="showcase-row"><Button onClick={() => toast('已保存', 'success')}>成功</Button><Button onClick={() => toast('出错了', 'error')}>错误</Button></div>`,
    }],
  },
  confirm: {
    imports: `import { Button, confirm, useToast } from '@/components/ui'`,
    hooks: `  const { toast } = useToast()\n`,
    props: `[{ name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'danger', type: 'boolean', desc: '危险样式' }]`,
    demos: [{
      title: '基础',
      desc: '需 ConfirmProvider。',
      code: `const ok = await confirm({
  title: '删除？',
  description: '不可恢复',
  danger: true,
})`,
      jsx: `<Button variant="danger" onClick={() => { void confirm({ title: '删除？', description: '不可恢复', danger: true }).then((ok) => { if (ok) toast('已确认', 'success') }) }}>confirm()</Button>`,
    }],
  },
  'page-header': {
    imports: `import { Button, PageHeader } from '@/components/ui'`,
    props: `[{ name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'description', type: 'ReactNode', desc: '描述' }, { name: 'actions', type: 'ReactNode', desc: '右侧操作' }]`,
    demos: [{
      title: '基础',
      code: `<PageHeader
  title="资源名称"
  description="简短说明。"
  actions={<Button variant="primary">创建</Button>}
/>`,
      jsx: `<PageHeader title="资源名称" description="简短说明。" actions={<Button variant="primary">创建</Button>} />`,
    }],
  },
  'choice-card': {
    imports: `import { ChoiceCard, ChoiceCardGrid } from '@/components/ui'`,
    props: `[{ name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'recommended', type: 'boolean', desc: '推荐徽标' }]`,
    demos: [{
      title: '基础',
      code: `<ChoiceCardGrid>
  <ChoiceCard
    title="从模板创建"
    description="快速起步"
    recommended
    onClick={() => undefined}
  />
  <ChoiceCard
    title="空白创建"
    description="完全自定义"
    onClick={() => undefined}
  />
</ChoiceCardGrid>`,
      jsx: `<ChoiceCardGrid><ChoiceCard title="从模板创建" description="快速起步" recommended onClick={() => undefined} /><ChoiceCard title="空白创建" description="完全自定义" onClick={() => undefined} /></ChoiceCardGrid>`,
    }],
  },
  'settings-row': {
    imports: `import { useState } from 'react'\nimport { SettingsRow, Switch } from '@/components/ui'`,
    hooks: `  const [on, setOn] = useState(true)\n`,
    props: `[{ name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'control', type: 'ReactNode', desc: '右侧控件' }]`,
    demos: [{
      title: '基础',
      code: `<SettingsRow
  title="自动刷新"
  description="每 30 秒拉取一次"
  control={<Switch checked={on} onChange={(e) => setOn(e.target.checked)} />}
/>`,
      jsx: `<SettingsRow title="自动刷新" description="每 30 秒拉取一次" control={<Switch checked={on} onChange={(e) => setOn(e.target.checked)} />} />`,
    }],
  },
  metric: {
    imports: `import { Metric, MetricGrid } from '@/components/ui'`,
    props: `[{ name: 'label', type: 'ReactNode', desc: '标签' }, { name: 'value', type: 'ReactNode', desc: '数值' }]`,
    demos: [{
      title: '基础',
      code: `<MetricGrid>
  <Metric label="请求" value="12.4k" />
  <Metric label="延迟" value="86ms" />
</MetricGrid>`,
      jsx: `<MetricGrid><Metric label="请求" value="12.4k" /><Metric label="延迟" value="86ms" /><Metric label="错误率" value="0.2%" /></MetricGrid>`,
    }],
  },
  avatar: {
    imports: `import { Avatar, AvatarGroup } from '@/components/ui'`,
    props: `[{ name: 'name', type: 'string', desc: '缩写来源' }]`,
    demos: [{
      title: '基础',
      code: `<Avatar name="Ada Lovelace" />
<AvatarGroup>
  <Avatar name="Ada" />
  <Avatar name="Grace" />
</AvatarGroup>`,
      jsx: `<div className="showcase-row"><Avatar name="Ada Lovelace" /><AvatarGroup><Avatar name="Ada" /><Avatar name="Grace" /><Avatar name="Alan" /></AvatarGroup></div>`,
    }],
  },
  skeleton: {
    imports: `import { Skeleton, SkeletonTable } from '@/components/ui'`,
    props: `[]`,
    demos: [{
      title: '基础',
      code: `<Skeleton />
<SkeletonTable rows={3} />`,
      jsx: `<div className="stack"><Skeleton /><SkeletonTable rows={3} /></div>`,
    }],
  },
  callout: {
    imports: `import { Callout } from '@/components/ui'`,
    props: `[{ name: 'variant', type: "'mirror'|'firewall'|'info'", desc: '样式' }, { name: 'title', type: 'ReactNode', desc: '标题' }]`,
    demos: [{
      title: '基础',
      code: `<Callout title="说明" variant="info">用于补充上下文的提示块。</Callout>`,
      jsx: `<Callout title="说明" variant="info">用于补充上下文的提示块。</Callout>`,
    }],
  },
  'stat-card': {
    imports: `import { StatCard } from '@/components/ui'`,
    props: `[{ name: 'label', type: 'ReactNode', desc: '标签' }, { name: 'value', type: 'ReactNode', desc: '数值' }, { name: 'tone', type: 'string', desc: '色调' }]`,
    demos: [{
      title: '基础',
      code: `<StatCard label="活跃集群" value="12" hint="较上周 +2" tone="success" />`,
      jsx: `<div className="grid-2"><StatCard label="活跃集群" value="12" hint="较上周 +2" tone="success" /><StatCard label="告警" value="3" hint="需处理" tone="warn" /></div>`,
    }],
  },
  'number-stepper': {
    imports: `import { useState } from 'react'\nimport { NumberStepper } from '@/components/ui'`,
    hooks: `  const [n, setN] = useState(3)\n`,
    props: `[{ name: 'value', type: 'number', desc: '值' }, { name: 'min/max/step', type: 'number', desc: '范围' }]`,
    demos: [{
      title: '基础',
      code: `const [n, setN] = useState(3)
<NumberStepper value={n} onChange={setN} min={0} max={10} />`,
      jsx: `<NumberStepper value={n} onChange={setN} min={0} max={10} />`,
    }],
  },
  'range-slider': {
    imports: `import { useState } from 'react'\nimport { RangeSlider } from '@/components/ui'`,
    hooks: `  const [v, setV] = useState(40)\n`,
    props: `[{ name: 'value', type: 'number', desc: '值' }, { name: 'onChange', type: 'fn', desc: '变更' }]`,
    demos: [{
      title: '基础',
      code: `<RangeSlider value={v} onChange={setV} label="配额" />`,
      jsx: `<RangeSlider value={v} onChange={setV} label="配额" />`,
    }],
  },
  'tags-input': {
    imports: `import { useState } from 'react'\nimport { TagsInput } from '@/components/ui'`,
    hooks: `  const [tags, setTags] = useState(['prod', 'edge'])\n`,
    props: `[{ name: 'value', type: 'string[]', desc: '标签' }, { name: 'onChange', type: 'fn', desc: '变更' }]`,
    demos: [{
      title: '基础',
      code: `const [tags, setTags] = useState(['prod', 'edge'])
<TagsInput value={tags} onChange={setTags} />`,
      jsx: `<TagsInput value={tags} onChange={setTags} />`,
    }],
  },
  'pin-input': {
    imports: `import { useState } from 'react'\nimport { PinInput } from '@/components/ui'`,
    hooks: `  const [pin, setPin] = useState('')\n`,
    props: `[{ name: 'length', type: 'number', default: '6', desc: '位数' }, { name: 'value', type: 'string', desc: '值' }]`,
    demos: [{
      title: '基础',
      code: `<PinInput value={pin} onChange={setPin} />`,
      jsx: `<PinInput value={pin} onChange={setPin} />`,
    }],
  },
  'native-select': {
    imports: `import { NativeSelect } from '@/components/ui'`,
    props: `[]`,
    demos: [{
      title: '基础',
      code: `<NativeSelect defaultValue="a">
  <option value="a">选项 A</option>
  <option value="b">选项 B</option>
</NativeSelect>`,
      jsx: `<NativeSelect defaultValue="a"><option value="a">选项 A</option><option value="b">选项 B</option></NativeSelect>`,
    }],
  },
}

function fallback(slug, name) {
  return {
    imports: `import { Text } from '@/components/ui'`,
    props: `[]`,
    demos: [{
      title: '用法说明',
      desc: `${name} 的完整交互示例仍在补齐；以下为推荐接入方式。`,
      code: `import { ${name} } from '@shidudu2022/x-ui'\n\n<${name} />`,
      jsx: `<Text variant="muted" size="md">请结合侧栏页面示例与源码使用 <code>${name}</code>。</Text>`,
    }],
  }
}

DEMOS['line-chart'] = {
  imports: `import { ChartContainer, LineChart, CHART_STATUS } from '@/components/charts'`,
  props: `[{ name: 'data', type: 'object[]', desc: '数据' }, { name: 'series', type: 'LineSeries[]', desc: '系列' }]`,
  demos: [{
    title: '基础',
    code: `<ChartContainer title="请求量">
  <LineChart
    data={[{ month: 'Jan', requests: 400 }, { month: 'Feb', requests: 520 }]}
    xKey="month"
    series={[{ dataKey: 'requests', name: '请求', color: CHART_STATUS.primary }]}
  />
</ChartContainer>`,
    jsx: `<ChartContainer title="请求量"><LineChart data={[{ month: 'Jan', requests: 400 }, { month: 'Feb', requests: 520 }, { month: 'Mar', requests: 480 }]} xKey="month" series={[{ dataKey: 'requests', name: '请求', color: CHART_STATUS.primary }]} /></ChartContainer>`,
  }],
}
DEMOS['area-chart'] = {
  imports: `import { AreaChart, ChartContainer, CHART_STATUS } from '@/components/charts'`,
  props: `[]`,
  demos: [{
    title: '基础',
    code: `<ChartContainer title="面积图">
  <AreaChart
    data={[
      { month: 'Jan', requests: 400 },
      { month: 'Feb', requests: 520 },
      { month: 'Mar', requests: 480 },
    ]}
    xKey="month"
    series={[
      {
        dataKey: 'requests',
        name: '请求',
        color: CHART_STATUS.primary,
      },
    ]}
  />
</ChartContainer>`,
    jsx: `<ChartContainer title="面积图"><AreaChart data={[{ month: 'Jan', requests: 400 }, { month: 'Feb', requests: 520 }, { month: 'Mar', requests: 480 }]} xKey="month" series={[{ dataKey: 'requests', name: '请求', color: CHART_STATUS.primary }]} /></ChartContainer>`,
  }],
}
DEMOS['bar-chart'] = {
  imports: `import { BarChart, ChartContainer, CHART_STATUS } from '@/components/charts'`,
  props: `[]`,
  demos: [{
    title: '基础',
    code: `<ChartContainer title="服务健康">
  <BarChart data={bars} xKey="name" series={[
    { dataKey: 'ok', name: '成功', stackId: 'a', color: CHART_STATUS.success },
    { dataKey: 'fail', name: '失败', stackId: 'a', color: CHART_STATUS.danger },
  ]} />
</ChartContainer>`,
    jsx: `<ChartContainer title="服务健康"><BarChart data={[{ name: 'API', ok: 120, fail: 8 }, { name: 'Worker', ok: 90, fail: 12 }]} xKey="name" series={[{ dataKey: 'ok', name: '成功', stackId: 'a', color: CHART_STATUS.success }, { dataKey: 'fail', name: '失败', stackId: 'a', color: CHART_STATUS.danger }]} /></ChartContainer>`,
  }],
}
DEMOS['pie-chart'] = {
  imports: `import { ChartContainer, PieChart, CHART_STATUS } from '@/components/charts'`,
  props: `[]`,
  demos: [{
    title: '基础',
    code: `<ChartContainer title="分布" height={280}>
  <PieChart donut data={[
    { name: '运行中', value: 58, color: CHART_STATUS.success },
    { name: '失败', value: 12, color: CHART_STATUS.danger },
  ]} />
</ChartContainer>`,
    jsx: `<ChartContainer title="分布" height={280}><PieChart donut data={[{ name: '运行中', value: 58, color: CHART_STATUS.success }, { name: '排队', value: 22, color: CHART_STATUS.info }, { name: '失败', value: 12, color: CHART_STATUS.danger }]} /></ChartContainer>`,
  }],
}
DEMOS['radial-progress'] = {
  imports: `import { ChartContainer, RadialProgress } from '@/components/charts'`,
  props: `[{ name: 'value', type: 'number', desc: '0–100' }]`,
  demos: [{
    title: '基础',
    code: `<ChartContainer title="完成度" height={240}>
  <RadialProgress value={76} label="本周目标" />
</ChartContainer>`,
    jsx: `<ChartContainer title="完成度" height={240}><RadialProgress value={76} label="本周目标" /></ChartContainer>`,
  }],
}
DEMOS['chart-container'] = {
  imports: `import { ChartContainer } from '@/components/charts'\nimport { Text } from '@/components/ui'`,
  props: `[{ name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'empty', type: 'boolean', desc: '空态' }, { name: 'loading', type: 'boolean', desc: '加载' }]`,
  demos: [
    { title: '基础', code: `<ChartContainer title="标题" description="说明">{children}</ChartContainer>`, jsx: `<ChartContainer title="示例"><div style={{ padding: 24 }}><Text variant="muted">图表内容区</Text></div></ChartContainer>` },
    { title: '空态 / 加载', code: `<ChartContainer title="空态" empty />
<ChartContainer title="加载中" loading />`, jsx: `<div className="grid-2"><ChartContainer title="空态" empty /><ChartContainer title="加载中" loading /></div>` },
  ],
}

// Modal / Drawer with state
DEMOS.modal = {
  imports: `import { useState } from 'react'\nimport { Button, Modal } from '@/components/ui'`,
  hooks: `  const [open, setOpen] = useState(false)\n`,
  props: `[{ name: 'open', type: 'boolean', desc: '是否打开' }, { name: 'onClose', type: '() => void', desc: '关闭' }, { name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'footer', type: 'ReactNode', desc: '底部' }]`,
  demos: [{
    title: '基础',
    code: `const [open, setOpen] = useState(false)
<Button onClick={() => setOpen(true)}>打开</Button>
<Modal open={open} onClose={() => setOpen(false)} title="示例"
  footer={<Button variant="primary" onClick={() => setOpen(false)}>确定</Button>}>
  内容
</Modal>`,
    jsx: `<><Button onClick={() => setOpen(true)}>打开 Modal</Button><Modal open={open} onClose={() => setOpen(false)} title="示例弹窗" footer={<div className="actions"><Button onClick={() => setOpen(false)}>取消</Button><Button variant="primary" onClick={() => setOpen(false)}>确定</Button></div>}><p style={{ margin: 0, fontSize: 13 }}>居中对话框内容。</p></Modal></>`,
  }],
}
DEMOS.drawer = {
  imports: `import { useState } from 'react'\nimport { Button, Drawer } from '@/components/ui'`,
  hooks: `  const [open, setOpen] = useState(false)\n`,
  props: `[{ name: 'open', type: 'boolean', desc: '是否打开' }, { name: 'onClose', type: 'fn', desc: '关闭' }, { name: 'size', type: 'DrawerSize', desc: '宽度' }]`,
  demos: [{
    title: '基础',
    code: `<Button onClick={() => setOpen(true)}>打开 Drawer</Button>
<Drawer
  open={open}
  onClose={() => setOpen(false)}
  title="详情"
  footer={<Button onClick={() => setOpen(false)}>关闭</Button>}
>
  <p className="muted" style={{ margin: 0 }}>侧滑抽屉内容。</p>
</Drawer>`,
    jsx: `<><Button onClick={() => setOpen(true)}>打开 Drawer</Button><Drawer open={open} onClose={() => setOpen(false)} title="详情" footer={<Button onClick={() => setOpen(false)}>关闭</Button>}><p className="muted" style={{ margin: 0 }}>侧滑抽屉内容。</p></Drawer></>`,
  }],
}
DEMOS.popover = {
  imports: `import { Button, Popover } from '@/components/ui'`,
  props: `[{ name: 'trigger', type: 'ReactNode', desc: '触发器' }, { name: 'children', type: 'ReactNode', desc: '内容' }]`,
  demos: [{
    title: '基础',
    code: `<Popover trigger={<Button>Popover</Button>}>
  <p>锚点浮层内容</p>
</Popover>`,
    jsx: `<Popover trigger={<Button variant="secondary">Popover</Button>}><p style={{ margin: 0, fontSize: 13 }}>锚点浮层内容。</p></Popover>`,
  }],
}
DEMOS['dropdown-menu'] = {
  imports: `import { Button, DropdownMenu } from '@/components/ui'`,
  props: `[{ name: 'trigger', type: 'ReactNode', desc: '触发器' }, { name: 'items', type: 'DropdownItem[]', desc: '菜单项' }]`,
  demos: [{
    title: '基础',
    code: `<DropdownMenu
  trigger={<Button>菜单</Button>}
  items={[
    { id: 'edit', label: '编辑', onSelect: () => {} },
    { id: 'del', label: '删除', danger: true, onSelect: () => {} },
  ]}
/>`,
    jsx: `<DropdownMenu trigger={<Button>菜单</Button>} items={[{ id: 'edit', label: '编辑', onSelect: () => undefined }, { id: 'sep', label: '', separator: true }, { id: 'del', label: '删除', danger: true, onSelect: () => undefined }]} />`,
  }],
}
DEMOS['split-pane'] = {
  imports: `import { SplitPane } from '@/components/ui'`,
  props: `[{ name: 'left', type: 'ReactNode', desc: '左侧' }, { name: 'right', type: 'ReactNode', desc: '右侧' }]`,
  demos: [{
    title: '基础',
    code: `<SplitPane left={<>左侧</>} right={<>右侧，拖拽分隔条</>} />`,
    jsx: `<div style={{ height: 160 }}><SplitPane left={<div className="muted">左侧面板</div>} right={<div className="muted">右侧内容区，拖拽中间分隔条。</div>} /></div>`,
  }],
}
DEMOS.timeline = {
  imports: `import { Timeline } from '@/components/ui'`,
  props: `[{ name: 'items', type: 'TimelineItemData[]', desc: '事件' }]`,
  demos: [{
    title: '基础',
    code: `<Timeline items={[
  { id: 'a', title: '创建资源', meta: '2 分钟前' },
  { id: 'b', title: '健康检查通过', meta: '刚刚' },
]} />`,
    jsx: `<Timeline items={[{ id: 'a', title: '创建资源', meta: '2 分钟前' }, { id: 'b', title: '健康检查通过', meta: '刚刚' }]} />`,
  }],
}
DEMOS.tree = {
  imports: `import { useState } from 'react'\nimport { Tree } from '@/components/ui'`,
  hooks: `  const [id, setId] = useState('ns-default')\n`,
  props: `[{ name: 'nodes', type: 'TreeNodeData[]', desc: '节点' }, { name: 'activeId', type: 'string', desc: '选中' }]`,
  demos: [{
    title: '基础',
    code: `<Tree activeId={id} onSelect={setId} nodes={[
  { id: 'cluster', label: 'cluster', children: [
    { id: 'ns-default', label: 'default' },
  ]},
]} />`,
    jsx: `<Tree activeId={id} onSelect={setId} nodes={[{ id: 'cluster', label: 'cluster', children: [{ id: 'ns-default', label: 'default' }, { id: 'ns-sys', label: 'kube-system' }] }]} />`,
  }],
}
DEMOS['description-list'] = {
  imports: `import { DescriptionList } from '@/components/ui'`,
  props: `[{ name: 'items', type: 'DescriptionItem[]', desc: '键值' }]`,
  demos: [{
    title: '基础',
    code: `<DescriptionList items={[
  { label: '环境', value: 'production' },
  { label: '区域', value: 'cn-east' },
]} />`,
    jsx: `<DescriptionList items={[{ label: '环境', value: 'production' }, { label: '区域', value: 'cn-east' }, { label: '负责人', value: 'demo@x-ui.dev' }]} />`,
  }],
}
DEMOS['json-viewer'] = {
  imports: `import { JsonViewer } from '@/components/ui'`,
  props: `[{ name: 'value', type: 'unknown', desc: 'JSON 数据' }]`,
  demos: [{
    title: '基础',
    code: `<JsonViewer value={{ cluster: 'demo', replicas: 3 }} />`,
    jsx: `<JsonViewer value={{ cluster: 'demo', replicas: 3, labels: { env: 'prod' } }} />`,
  }],
}
DEMOS['form-errors'] = {
  imports: `import { FormErrors } from '@/components/ui'`,
  props: `[{ name: 'errors', type: 'ReactNode[]', desc: '错误列表' }]`,
  demos: [{
    title: '基础',
    code: `<FormErrors errors={['请输入用户名', '密码至少 6 位']} />`,
    jsx: `<FormErrors errors={['请输入用户名', '密码至少 6 位']} />`,
  }],
}
DEMOS.combobox = {
  imports: `import { useState } from 'react'\nimport { Combobox } from '@/components/ui'`,
  hooks: `  const [v, setV] = useState('sh')\n`,
  props: `[{ name: 'options', type: 'SelectOption[]', desc: '选项' }]`,
  demos: [{
    title: '基础',
    code: `<Combobox value={v} onChange={setV} options={[
  { value: 'sh', label: '上海' },
  { value: 'bj', label: '北京' },
]} />`,
    jsx: `<Combobox value={v} onChange={setV} options={[{ value: 'sh', label: '上海' }, { value: 'bj', label: '北京' }, { value: 'gz', label: '广州' }]} />`,
  }],
}
DEMOS['date-picker'] = {
  imports: `import { useState } from 'react'\nimport { DatePicker } from '@/components/ui'`,
  hooks: `  const [date, setDate] = useState('2026-10-25')\n`,
  props: `[{ name: 'mode', type: "'date'|'datetime'", desc: '模式' }, { name: 'value', type: 'string', desc: '值' }]`,
  demos: [{
    title: '基础',
    code: `<DatePicker mode="date" value={date} onChange={setDate} />`,
    jsx: `<DatePicker mode="date" value={date} onChange={setDate} />`,
  }],
}
DEMOS['time-picker'] = {
  imports: `import { useState } from 'react'\nimport { TimePicker } from '@/components/ui'`,
  hooks: `  const [time, setTime] = useState('09:30')\n`,
  props: `[{ name: 'value', type: 'string', desc: 'HH:mm' }]`,
  demos: [{
    title: '基础',
    code: `<TimePicker value={time} onChange={setTime} minuteStep={5} />`,
    jsx: `<TimePicker value={time} onChange={setTime} minuteStep={5} />`,
  }],
}
DEMOS['date-range-picker'] = {
  imports: `import { useState } from 'react'\nimport { DateRangePicker } from '@/components/ui'`,
  hooks: `  const [range, setRange] = useState({ start: '2026-10-01', end: '2026-10-12' })\n`,
  props: `[{ name: 'start/end', type: 'string', desc: '范围' }]`,
  demos: [{
    title: '基础',
    code: `<DateRangePicker mode="date" start={range.start} end={range.end} onChange={setRange} />`,
    jsx: `<DateRangePicker mode="date" start={range.start} end={range.end} onChange={setRange} />`,
  }],
}
DEMOS.sheet = {
  imports: `import { useState } from 'react'\nimport { Button, Sheet } from '@/components/ui'`,
  hooks: `  const [open, setOpen] = useState(false)\n`,
  props: `[{ name: 'open', type: 'boolean', desc: '打开' }, { name: 'side', type: "'bottom'|'top'", desc: '方向' }]`,
  demos: [{
    title: '基础',
    code: `<Button onClick={() => setOpen(true)}>打开 Sheet</Button>
<Sheet open={open} onClose={() => setOpen(false)} title="面板">
  <p className="muted" style={{ margin: 0 }}>底部/顶部薄板内容。</p>
</Sheet>`,
    jsx: `<><Button onClick={() => setOpen(true)}>打开 Sheet</Button><Sheet open={open} onClose={() => setOpen(false)} title="面板"><p className="muted" style={{ margin: 0 }}>底部/顶部薄板内容。</p></Sheet></>`,
  }],
}
DEMOS.calendar = {
  imports: `import { Calendar } from '@/components/ui'`,
  props: `[{ name: 'events', type: 'CalendarEvent[]', desc: '事件点' }]`,
  demos: [{
    title: '基础',
    code: `<Calendar events={[{ date: '2026-10-25', label: '发布' }]} />`,
    jsx: `<Calendar events={[{ date: '2026-10-25', label: '发布' }]} />`,
  }],
}
DEMOS.checklist = {
  imports: `import { useState } from 'react'\nimport { Checklist } from '@/components/ui'`,
  hooks: `  const [items, setItems] = useState([
    { id: 'a', title: '配置网络', checked: true },
    { id: 'b', title: '绑定域名', checked: false },
    { id: 'c', title: '开启 TLS', checked: false },
  ])\n`,
  props: `[{ name: 'items', type: 'ChecklistItem[]', desc: '项' }, { name: 'onChange', type: '(id, checked) => void', desc: '变更' }]`,
  demos: [{
    title: '基础',
    code: `const [items, setItems] = useState([
  { id: 'a', title: '配置网络', checked: true },
  { id: 'b', title: '绑定域名', checked: false },
])
<Checklist
  items={items}
  onChange={(id, checked) =>
    setItems((list) => list.map((it) => (it.id === id ? { ...it, checked } : it)))
  }
/>`,
    jsx: `<Checklist items={items} onChange={(id, checked) => setItems((list) => list.map((it) => (it.id === id ? { ...it, checked } : it)))} />`,
  }],
}
DEMOS['key-value-editor'] = {
  imports: `import { useState } from 'react'\nimport { KeyValueEditor } from '@/components/ui'`,
  hooks: `  const [kv, setKv] = useState([{ key: 'REGION', value: 'cn-east' }, { key: 'TIER', value: 'prod' }])\n`,
  props: `[{ name: 'value', type: 'KeyValuePair[]', desc: '键值' }]`,
  demos: [{
    title: '基础',
    code: `<KeyValueEditor value={kv} onChange={setKv} />`,
    jsx: `<KeyValueEditor value={kv} onChange={setKv} />`,
  }],
}
DEMOS.sparkline = {
  imports: `import { Sparkline, Stat } from '@/components/ui'`,
  props: `[{ name: 'data', type: 'number[]', desc: '点列' }]`,
  demos: [{
    title: '基础',
    code: `<Sparkline data={[3, 5, 4, 8, 6, 9, 7]} />
<Stat label="QPS" value="1.2k" data={[3, 5, 4, 8, 6, 9, 7]} />`,
    jsx: `<div className="showcase-row" style={{ alignItems: 'center', gap: 24 }}><Sparkline data={[3, 5, 4, 8, 6, 9, 7]} /><Stat label="QPS" value="1.2k" data={[3, 5, 4, 8, 6, 9, 7]} /></div>`,
  }],
}
DEMOS.stat = {
  imports: `import { Stat } from '@/components/ui'`,
  props: `[{ name: 'label', type: 'string', desc: '标签' }, { name: 'value', type: 'string|number', desc: '数值' }, { name: 'data', type: 'number[]', desc: '迷你图' }]`,
  demos: [{
    title: '基础',
    code: `<Stat label="QPS" value="1.2k" delta="+4%" data={[3, 5, 4, 8, 6, 9, 7]} />`,
    jsx: `<Stat label="QPS" value="1.2k" delta="+4%" data={[3, 5, 4, 8, 6, 9, 7]} />`,
  }],
}
DEMOS['data-table'] = {
  imports: `import { DataTable, type DataTableColumn } from '@/components/ui'`,
  hooks: `  type Row = { id: string; name: string; status: string }
  const rows: Row[] = [
    { id: '1', name: 'api-gateway', status: 'Running' },
    { id: '2', name: 'worker', status: 'Pending' },
  ]
  const columns: DataTableColumn<Row>[] = [
    { key: 'name', header: '名称', render: (r) => r.name },
    { key: 'status', header: '状态', render: (r) => r.status },
  ]
`,
  props: `[{ name: 'columns', type: 'DataTableColumn<T>[]', desc: '列' }, { name: 'rows', type: 'T[]', desc: '行' }, { name: 'rowKey', type: '(row) => string', desc: '行键' }]`,
  demos: [{
    title: '基础',
    desc: '列定义 + 行数据。更多筛选/分页见「列表」页面示例。',
    code: `type Row = { id: string; name: string; status: string }
const rows = [
  { id: '1', name: 'api-gateway', status: 'Running' },
  { id: '2', name: 'worker', status: 'Pending' },
]
const columns: DataTableColumn<Row>[] = [
  { key: 'name', header: '名称', render: (r) => r.name },
  { key: 'status', header: '状态', render: (r) => r.status },
]
<DataTable columns={columns} rows={rows} rowKey={(r) => r.id} />`,
    jsx: `<DataTable columns={columns} rows={rows} rowKey={(r) => r.id} />`,
  }],
}
DEMOS['resource-list'] = {
  imports: `import { Button, ResourceList, type ResourceColumn } from '@/components/ui'`,
  hooks: `  type Row = { id: string; name: string; region: string }
  const rows: Row[] = [
    { id: '1', name: 'prod-api', region: 'cn-east' },
    { id: '2', name: 'staging', region: 'cn-north' },
  ]
  const columns: ResourceColumn<Row>[] = [
    { key: 'name', header: '名称', render: (r) => r.name },
    { key: 'region', header: '区域', render: (r) => r.region, muted: true },
  ]
`,
  props: `[{ name: 'columns', type: 'ResourceColumn<T>[]', desc: '列' }, { name: 'rows', type: 'T[]', desc: '行' }, { name: 'rowKey', type: '(row) => string', desc: '行键' }, { name: 'filters', type: 'ResourceFilter[]', desc: '筛选' }, { name: 'rowActions', type: 'ResourceRowAction<T>[]', desc: '行操作' }, { name: 'page/pageSize/total', type: 'number', desc: '分页' }]`,
  demos: [{
    title: '基础',
    desc: '筛选条 + 表格 + 行操作。完整场景见「列表」示例页。',
    code: `<ResourceList
  framed={false}
  columns={columns}
  rows={rows}
  rowKey={(r) => r.id}
  filters={[{ key: 'region', label: '区域', type: 'select', options: [{ value: 'cn-east', label: '华东' }] }]}
  filterValues={{}}
  onFilterChange={() => {}}
  onSearch={() => {}}
  onRefresh={() => {}}
  page={1}
  pageSize={10}
  total={2}
  onPageChange={() => {}}
  rowActions={[{ key: 'edit', label: '编辑', onClick: () => {} }]}
  toolbar={<Button variant="primary">新建</Button>}
/>`,
    jsx: `<ResourceList framed={false} columns={columns} rows={rows} rowKey={(r) => r.id} filters={[{ key: 'region', label: '区域', type: 'select', options: [{ value: 'cn-east', label: '华东' }, { value: 'cn-north', label: '华北' }] }]} filterValues={{}} onFilterChange={() => undefined} onSearch={() => undefined} onRefresh={() => undefined} page={1} pageSize={10} total={rows.length} onPageChange={() => undefined} rowActions={[{ key: 'edit', label: '编辑', onClick: () => undefined }]} toolbar={<Button variant="primary">新建</Button>} />`,
  }],
}
DEMOS['color-input'] = {
  imports: `import { useState } from 'react'\nimport { ColorInput } from '@/components/ui'`,
  hooks: `  const [color, setColor] = useState('#3b82f6')\n`,
  props: `[{ name: 'value', type: 'string', desc: 'hex' }]`,
  demos: [{
    title: '基础',
    code: `<ColorInput value={color} onChange={setColor} />`,
    jsx: `<ColorInput value={color} onChange={setColor} />`,
  }],
}
DEMOS['color-field'] = {
  imports: `import { useState } from 'react'\nimport { ColorField } from '@/components/ui'`,
  hooks: `  const [color, setColor] = useState('#3b82f6')\n`,
  props: `[{ name: 'label', type: 'string', desc: '标签' }]`,
  demos: [{
    title: '基础',
    code: `<ColorField label="品牌色" value={color} onChange={setColor} />`,
    jsx: `<ColorField label="品牌色" value={color} onChange={setColor} />`,
  }],
}
DEMOS.transfer = {
  imports: `import { useState } from 'react'\nimport { Transfer } from '@/components/ui'`,
  hooks: `  const [keys, setKeys] = useState(['b'])\n`,
  props: `[{ name: 'data', type: 'TransferItem[]', desc: '全部项' }, { name: 'targetKeys', type: 'string[]', desc: '右侧选中' }]`,
  demos: [{
    title: '基础',
    code: `<Transfer
  data={[{ key: 'a', label: 'A' }, { key: 'b', label: 'B' }, { key: 'c', label: 'C' }]}
  targetKeys={keys}
  onChange={setKeys}
/>`,
    jsx: `<Transfer data={[{ key: 'a', label: '节点 A' }, { key: 'b', label: '节点 B' }, { key: 'c', label: '节点 C' }]} targetKeys={keys} onChange={setKeys} />`,
  }],
}
DEMOS.cascader = {
  imports: `import { useState } from 'react'\nimport { Cascader } from '@/components/ui'`,
  hooks: `  const [v, setV] = useState(['cn', 'sh'])\n`,
  props: `[{ name: 'options', type: 'CascaderOption[]', desc: '树选项' }]`,
  demos: [{
    title: '基础',
    code: `<Cascader value={v} onChange={setV} options={[
  { value: 'cn', label: '中国', children: [
    { value: 'sh', label: '上海' },
    { value: 'bj', label: '北京' },
  ]},
]} />`,
    jsx: `<Cascader value={v} onChange={setV} options={[{ value: 'cn', label: '中国', children: [{ value: 'sh', label: '上海' }, { value: 'bj', label: '北京' }] }]} />`,
  }],
}
DEMOS['maintenance-banner'] = {
  imports: `import { MaintenanceBanner } from '@/components/ui'`,
  props: `[]`,
  demos: [{ title: '基础', code: `<MaintenanceBanner />`, jsx: `<MaintenanceBanner />` }],
}
DEMOS['notification-list'] = {
  imports: `import { NotificationList } from '@/components/ui'`,
  props: `[{ name: 'items', type: 'NotificationItem[]', desc: '通知' }]`,
  demos: [{
    title: '基础',
    code: `<NotificationList items={[
  { id: '1', title: '部署完成', description: 'prod 已就绪', time: '刚刚', unread: true },
]} />`,
    jsx: `<NotificationList items={[{ id: '1', title: '部署完成', description: 'prod 已就绪', time: '刚刚', unread: true }, { id: '2', title: '证书将过期', description: '还有 7 天', time: '1 小时前', unread: false }]} />`,
  }],
}

const DEMO_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='100'%3E%3Crect fill='%233b82f6' width='160' height='100'/%3E%3Ctext x='50%25' y='55%25' fill='white' font-size='14' text-anchor='middle' font-family='sans-serif'%3Ex-ui%3C/text%3E%3C/svg%3E"

DEMOS['accent-picker'] = {
  imports: `import { AccentPicker } from '@/components/ui'`,
  props: `[{ name: 'value', type: 'Accent', desc: '受控强调色' }, { name: 'onChange', type: '(accent: Accent) => void', desc: '变更；默认写入 Appearance' }]`,
  demos: [{
    title: '基础',
    desc: '未传 value 时读写 AppearanceProvider。',
    code: `<AccentPicker />`,
    jsx: `<AccentPicker />`,
  }],
}

DEMOS['app-shell'] = {
  imports: `import { AppShell, Brand } from '@/components/layout'\nimport { Text } from '@/components/ui'`,
  props: `[{ name: 'navGroups', type: 'NavGroup[]', desc: '侧栏分组；支持 section 分区标题与 collapsible 可折叠分组，见 Sidebar' }, { name: 'brand', type: 'ReactNode', desc: '品牌区' }, { name: 'topbarTitle', type: 'ReactNode', desc: '顶栏标题' }, { name: 'topbarRight', type: 'ReactNode', desc: '顶栏右侧' }, { name: 'children', type: 'ReactNode', desc: '主内容' }]`,
  demos: [{
    title: '迷你预览',
    desc: '完整壳层；此处缩小高度便于馆页展示。',
    code: `<AppShell
  brand={<Brand />}
  topbarTitle="概览"
  navGroups={[{ items: [{ to: '/', label: '首页', end: true }] }]}
>
  内容
</AppShell>`,
    jsx: `<div style={{ height: 220, overflow: 'hidden', border: '1px solid var(--border)', borderRadius: 8 }}><AppShell brand={<Brand text="Demo" />} topbarTitle="概览" defaultCollapsed navGroups={[{ items: [{ to: '/components/app-shell', label: '首页', end: true }, { to: '/components', label: '组件' }] }]}><div style={{ padding: 16 }}><Text variant="muted" size="md">主内容区</Text></div></AppShell></div>`,
  }],
}

DEMOS['avatar-upload'] = {
  imports: `import { AvatarUpload } from '@/components/ui'`,
  props: `[{ name: 'name', type: 'string', default: "'用户'", desc: '缩写来源' }, { name: 'src', type: 'string', desc: '头像 URL' }, { name: 'onFile', type: '(file: File) => void', desc: '选中文件' }]`,
  demos: [{
    title: '基础',
    code: `<AvatarUpload name="Ada Lovelace" onFile={(f) => console.log(f.name)} />`,
    jsx: `<AvatarUpload name="Ada Lovelace" onFile={() => undefined} />`,
  }],
}

DEMOS.brand = {
  imports: `import { Brand } from '@/components/layout'`,
  props: `[{ name: 'mark', type: 'ReactNode', default: "'X'", desc: '徽标' }, { name: 'text', type: 'ReactNode', default: "'X-UI'", desc: '文案' }, { name: 'showText', type: 'boolean', default: 'true', desc: '显示文案' }]`,
  demos: [{
    title: '基础',
    code: `<Brand />
<Brand mark="D" text="Demo" />
<Brand showText={false} />`,
    jsx: `<div className="showcase-row" style={{ gap: 24 }}><Brand /><Brand mark="D" text="Demo" /><Brand showText={false} /></div>`,
  }],
}

DEMOS['breadcrumb-nav'] = {
  imports: `import { BreadcrumbNav } from '@/components/ui'`,
  props: `[{ name: 'items', type: 'BreadcrumbNavItem[]', desc: '段；末段可无 to' }]`,
  demos: [{
    title: '基础',
    code: `<BreadcrumbNav items={[
  { label: '资源', to: '/components' },
  { label: '集群' },
]} />`,
    jsx: `<BreadcrumbNav items={[{ label: '资源', to: '/components' }, { label: '集群', to: '/components/breadcrumb-nav' }, { label: '详情' }]} />`,
  }],
}

DEMOS.breadcrumbs = {
  imports: `import { Home } from 'lucide-react'\nimport { Breadcrumbs, NavIcon } from '@/components/layout'`,
  props: `[{ name: 'current', type: 'ReactNode', desc: '当前页' }, { name: 'currentIcon', type: 'ReactNode', desc: '根页图标' }, { name: 'parent', type: 'BreadcrumbParent', desc: '父级链接' }]`,
  demos: [{
    title: '基础',
    code: `<Breadcrumbs current="概览" currentIcon={<NavIcon icon={Home} />} />
<Breadcrumbs
  current="详情"
  parent={{ label: '列表', to: '/components', icon: <NavIcon icon={Home} /> }}
/>`,
    jsx: `<div className="stack"><Breadcrumbs current="概览" currentIcon={<NavIcon icon={Home} />} /><Breadcrumbs current="详情" parent={{ label: '列表', to: '/components', icon: <NavIcon icon={Home} /> }} /></div>`,
  }],
}

DEMOS['cell-ellipsis'] = {
  imports: `import { CellEllipsis, CellStack } from '@/components/ui'`,
  props: `[{ name: 'children', type: 'ReactNode', desc: '内容' }, { name: 'title', type: 'string', desc: '原生 title 提示' }]`,
  demos: [{
    title: '基础',
    code: `<div style={{ width: 140 }}>
  <CellEllipsis title="很长的资源名称 api-gateway-prod">
    很长的资源名称 api-gateway-prod
  </CellEllipsis>
  <CellStack>
    <strong>api-gateway</strong>
    <span className="muted">cn-east / production</span>
  </CellStack>
</div>`,
    jsx: `<div style={{ width: 160 }} className="stack"><CellEllipsis title="很长的资源名称 api-gateway-prod-east-01">很长的资源名称 api-gateway-prod-east-01</CellEllipsis><CellStack><strong>api-gateway</strong><span className="muted">cn-east / production</span></CellStack></div>`,
  }],
}

DEMOS['command-palette'] = {
  imports: `import { useState } from 'react'\nimport { Button, CommandPalette } from '@/components/ui'`,
  hooks: `  const [open, setOpen] = useState(false)\n`,
  props: `[{ name: 'open', type: 'boolean', desc: '是否打开' }, { name: 'onClose', type: '() => void', desc: '关闭' }, { name: 'items', type: 'CommandItem[]', desc: '命令项' }, { name: 'placeholder', type: 'string', desc: '搜索框' }]`,
  demos: [{
    title: '基础',
    desc: '点击打开命令面板。',
    code: `const [open, setOpen] = useState(false)
<Button onClick={() => setOpen(true)}>打开 ⌘K</Button>
<CommandPalette
  open={open}
  onClose={() => setOpen(false)}
  items={[
    { id: 'home', label: '首页', group: '导航', onSelect: () => {} },
    { id: 'settings', label: '设置', group: '导航' },
  ]}
/>`,
    jsx: `<><Button onClick={() => setOpen(true)}>打开命令面板</Button><CommandPalette open={open} onClose={() => setOpen(false)} items={[{ id: 'home', label: '首页', group: '导航', onSelect: () => setOpen(false) }, { id: 'settings', label: '外观设置', group: '导航', onSelect: () => setOpen(false) }, { id: 'docs', label: '组件文档', group: '帮助', onSelect: () => setOpen(false) }]} /></>`,
  }],
}

DEMOS['confirm-modal'] = {
  imports: `import { useState } from 'react'\nimport { Button, ConfirmModal } from '@/components/ui'`,
  hooks: `  const [open, setOpen] = useState(false)\n`,
  props: `[{ name: 'open', type: 'boolean', desc: '打开' }, { name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'resourceName', type: 'string', desc: '高亮资源名' }, { name: 'confirmValue', type: 'string', desc: '需输入的确认串' }, { name: 'danger', type: 'boolean', desc: '危险样式' }, { name: 'onConfirm', type: '() => void', desc: '确认' }]`,
  demos: [{
    title: '基础',
    code: `<ConfirmModal
  open={open}
  onClose={() => setOpen(false)}
  title="删除资源？"
  resourceName="prod-api"
  danger
  onConfirm={() => {}}
>
  删除后不可恢复。
</ConfirmModal>`,
    jsx: `<><Button variant="danger" onClick={() => setOpen(true)}>打开 ConfirmModal</Button><ConfirmModal open={open} onClose={() => setOpen(false)} title="删除资源？" resourceName="prod-api" danger onConfirm={() => undefined}>删除后不可恢复。</ConfirmModal></>`,
  }],
}

DEMOS['file-upload'] = {
  imports: `import { FileUpload } from '@/components/ui'`,
  props: `[{ name: 'accept', type: 'string', desc: 'accept' }, { name: 'multiple', type: 'boolean', desc: '多选' }, { name: 'maxSizeMb', type: 'number', desc: '大小限制' }, { name: 'onFiles', type: '(files: File[]) => void', desc: '选中回调' }, { name: 'files', type: 'FileUploadItem[]', desc: '受控进度列表' }]`,
  demos: [{
    title: '基础',
    code: `<FileUpload
  accept=".png,.jpg,.pdf"
  maxSizeMb={5}
  files={[{ name: 'spec.pdf', size: 120000, progress: 62 }]}
/>`,
    jsx: `<FileUpload accept=".png,.jpg,.pdf" maxSizeMb={5} files={[{ name: 'spec.pdf', size: 120000, progress: 62 }, { name: 'logo.png', size: 24000, progress: 100 }]} onFiles={() => undefined} />`,
  }],
}

DEMOS['filter-bar'] = {
  imports: `import { FilterBar, SearchInput, Select } from '@/components/ui'`,
  hooks: `  const [q, setQ] = useState('')\n  const [region, setRegion] = useState('all')\n`,
  props: `[{ name: 'children', type: 'ReactNode', desc: '筛选控件' }]`,
  demos: [{
    title: '基础',
    code: `<FilterBar>
  <SearchInput
    value={q}
    onChange={(e) => setQ(e.target.value)}
    onClear={() => setQ('')}
    placeholder="搜索…"
  />
  <Select
    value={region}
    onChange={setRegion}
    options={[
      { value: 'all', label: '全部区域' },
      { value: 'cn-east', label: '华东' },
    ]}
  />
</FilterBar>`,
    jsx: `<FilterBar><SearchInput value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ('')} placeholder="搜索…" /><Select value={region} onChange={setRegion} options={[{ value: 'all', label: '全部区域' }, { value: 'cn-east', label: '华东' }]} /></FilterBar>`,
  }],
}
// fix imports for filter-bar hooks
DEMOS['filter-bar'].imports = `import { useState } from 'react'\nimport { FilterBar, SearchInput, Select } from '@/components/ui'`

DEMOS['form-page'] = {
  imports: `import { Button, Field, FormPage, Input } from '@/components/ui'`,
  props: `[{ name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'description', type: 'ReactNode', desc: '说明' }, { name: 'actions', type: 'ReactNode', desc: '页头操作' }, { name: 'children', type: 'ReactNode', desc: '表单内容' }]`,
  demos: [{
    title: '迷你预览',
    desc: '定宽表单页骨架（page-narrow）。',
    code: `<FormPage title="创建资源" description="填写基本信息。" actions={<Button variant="primary">保存</Button>}>
  <Field label="名称"><Input /></Field>
</FormPage>`,
    jsx: `<div style={{ border: '1px solid var(--border)', borderRadius: 8, padding: '20px 24px', background: 'var(--bg)' }}><FormPage title="创建资源" description="填写基本信息。" actions={<Button variant="primary">保存</Button>}><Field label="名称" htmlFor="doc-fp-name"><Input id="doc-fp-name" placeholder="demo" /></Field></FormPage></div>`,
  }],
}

DEMOS['image-preview'] = {
  imports: `import { ImagePreview } from '@/components/ui'`,
  props: `[{ name: 'src', type: 'string', desc: '大图 URL' }, { name: 'alt', type: 'string', desc: '替代文本' }, { name: 'thumbSrc', type: 'string', desc: '缩略图' }]`,
  demos: [{
    title: '基础',
    desc: '点击缩略图打开灯箱。',
    code: `<ImagePreview src="/demo.png" alt="示例" />`,
    jsx: `<ImagePreview src="${DEMO_IMG}" alt="示例图" />`,
  }],
}

DEMOS['image-upload-field'] = {
  imports: `import { useState } from 'react'\nimport { ImageUploadField } from '@/components/ui'`,
  hooks: `  const [url, setUrl] = useState<string | null>(null)\n`,
  props: `[{ name: 'value', type: 'string | null', desc: '当前 URL' }, { name: 'onChange', type: '(v: string | null) => void', desc: '变更' }, { name: 'onUpload', type: '(file: File) => Promise<string>', desc: '上传并返回 URL' }, { name: 'label', type: 'ReactNode', desc: '标签' }]`,
  demos: [{
    title: '基础',
    code: `const [url, setUrl] = useState<string | null>(null)
<ImageUploadField
  value={url}
  onChange={setUrl}
  onUpload={async (file) => URL.createObjectURL(file)}
/>`,
    jsx: `<ImageUploadField value={url} onChange={setUrl} onUpload={async (file) => URL.createObjectURL(file)} />`,
  }],
}

DEMOS['list-filter-bar'] = {
  imports: `import { useState } from 'react'\nimport { ListFilterBar, SearchInput } from '@/components/ui'`,
  hooks: `  const [q, setQ] = useState('api')\n`,
  props: `[{ name: 'query', type: 'string', desc: '当前搜索词；空则不渲染' }, { name: 'total', type: 'number', desc: '总数' }, { name: 'matched', type: 'number', desc: '命中数' }, { name: 'unit', type: 'string', default: "'条'", desc: '单位' }, { name: 'onClear', type: '() => void', desc: '清除' }]`,
  demos: [{
    title: '基础',
    code: `<ListFilterBar query="api" total={24} matched={3} onClear={() => setQ('')} />`,
    jsx: `<div className="stack"><SearchInput value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ('')} placeholder="搜索…" /><ListFilterBar query={q} total={24} matched={q ? 3 : 24} onClear={() => setQ('')} /></div>`,
  }],
}

DEMOS['list-page'] = {
  imports: `import { Button, ListPage, SearchInput, Text } from '@/components/ui'`,
  props: `[{ name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'description', type: 'ReactNode', desc: '说明' }, { name: 'actions', type: 'ReactNode', desc: '页头操作' }, { name: 'toolbar', type: 'ReactNode', desc: '筛选条' }, { name: 'children', type: 'ReactNode', desc: '列表内容' }]`,
  demos: [{
    title: '迷你预览',
    code: `<ListPage
  title="资源列表"
  description="管理全部资源。"
  actions={<Button variant="primary">新建</Button>}
  toolbar={<SearchInput placeholder="搜索…" />}
>
  …
</ListPage>`,
    jsx: `<div style={{ border: '1px solid var(--border)', borderRadius: 8, padding: '20px 24px', background: 'var(--bg)' }}><ListPage title="资源列表" description="管理全部资源。" actions={<Button variant="primary">新建</Button>} toolbar={<SearchInput placeholder="搜索…" onChange={() => undefined} />}><Text variant="muted" size="md">表格 / ResourceList 放这里</Text></ListPage></div>`,
  }],
}

DEMOS['log-viewer'] = {
  imports: `import { Button, LogViewer } from '@/components/ui'`,
  props: `[{ name: 'toolbar', type: 'ReactNode', desc: '工具栏' }, { name: 'height', type: 'number | string', default: '360', desc: '高度' }, { name: 'children', type: 'ReactNode', desc: '日志文本' }]`,
  demos: [{
    title: '基础',
    code: `<LogViewer toolbar={<Button size="sm">刷新</Button>} height={160}>
  [12:00:01] ready
  [12:00:02] sync ok
</LogViewer>`,
    jsx: `<LogViewer toolbar={<Button size="sm">刷新</Button>} height={160}>{\`[12:00:01] INFO  ready\\n[12:00:02] INFO  sync ok\\n[12:00:03] WARN  retry #1\`}</LogViewer>`,
  }],
}

DEMOS['login-card'] = {
  imports: `import { Button, Field, Input, LoginCard } from '@/components/ui'`,
  props: `[{ name: 'brandMark', type: 'ReactNode', desc: '徽标' }, { name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'subtitle', type: 'ReactNode', desc: '副标题' }, { name: 'hint', type: 'ReactNode', desc: '底部提示' }, { name: 'onSubmit', type: '(e) => void', desc: '提交' }, { name: 'minHeight', type: 'string | number', desc: '最小高度' }]`,
  demos: [{
    title: '迷你预览',
    code: `<LoginCard title="X-UI" subtitle="管理员登录" hint="演示账号 demo / demo" minHeight={280} onSubmit={(e) => e.preventDefault()}>
  <Field label="用户名"><Input /></Field>
  <Button variant="primary" type="submit" block>登录</Button>
</LoginCard>`,
    jsx: `<LoginCard title="X-UI" subtitle="管理员登录" hint="演示账号 demo / demo" minHeight={280} onSubmit={(e) => e.preventDefault()}><Field label="用户名" htmlFor="doc-login-user"><Input id="doc-login-user" defaultValue="demo" /></Field><Field label="密码" htmlFor="doc-login-pass"><Input id="doc-login-pass" type="password" defaultValue="demo" /></Field><Button variant="primary" type="submit" block>登录</Button></LoginCard>`,
  }],
}

DEMOS['meta-row'] = {
  imports: `import { Badge, MetaRow, Muted } from '@/components/ui'`,
  props: `[{ name: 'children', type: 'ReactNode', desc: '行内混排内容' }]`,
  demos: [{
    title: '基础',
    code: `<MetaRow>
  <Muted>api-gateway</Muted>
  <Badge tone="success" size="sm">Running</Badge>
  <Muted>cn-east</Muted>
</MetaRow>`,
    jsx: `<MetaRow><Muted>api-gateway</Muted><Badge tone="success" size="sm">Running</Badge><Muted>cn-east</Muted></MetaRow>`,
  }],
}

DEMOS['mirror-card'] = {
  imports: `import { MirrorCard, Text } from '@/components/ui'`,
  props: `[{ name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'children', type: 'ReactNode', desc: '内容' }]`,
  demos: [{
    title: '基础',
    code: `<MirrorCard title="官方源">
  <Text variant="muted">https://registry.example.com</Text>
</MirrorCard>`,
    jsx: `<MirrorCard title="官方源"><Text variant="muted" size="md">https://registry.example.com</Text></MirrorCard>`,
  }],
}

DEMOS['nav-icon'] = {
  imports: `import { LayoutDashboard, Settings } from 'lucide-react'\nimport { NavIcon } from '@/components/layout'`,
  props: `[{ name: 'icon', type: 'LucideIcon', desc: 'lucide 图标组件' }, { name: 'size', type: 'number', desc: '尺寸' }, { name: 'strokeWidth', type: 'number', desc: '描边' }]`,
  demos: [{
    title: '基础',
    code: `<NavIcon icon={LayoutDashboard} />
<NavIcon icon={Settings} />`,
    jsx: `<div className="showcase-row"><NavIcon icon={LayoutDashboard} /><NavIcon icon={Settings} /></div>`,
  }],
}

DEMOS['node-picker'] = {
  imports: `import { useState } from 'react'\nimport { NodePicker } from '@/components/ui'`,
  hooks: `  const [id, setId] = useState('n1')\n`,
  props: `[{ name: 'options', type: 'NodeOption[]', desc: '节点' }, { name: 'value', type: 'string', desc: '选中 id' }, { name: 'onChange', type: '(id: string) => void', desc: '变更' }]`,
  demos: [{
    title: '基础',
    code: `<NodePicker
  value={id}
  onChange={setId}
  options={[
    { id: 'n1', title: 'node-a', meta: 'cn-east' },
    { id: 'n2', title: 'node-b', meta: 'cn-north' },
  ]}
/>`,
    jsx: `<NodePicker value={id} onChange={setId} options={[{ id: 'n1', title: 'node-a', meta: 'cn-east · ready' }, { id: 'n2', title: 'node-b', meta: 'cn-north · ready' }, { id: 'n3', title: 'node-c', meta: '维护中', disabled: true }]} />`,
  }],
}

DEMOS['page-tabs'] = {
  imports: `import { useState } from 'react'\nimport { PageTabs } from '@/components/ui'`,
  hooks: `  const [tab, setTab] = useState('overview')\n`,
  props: `[{ name: 'items', type: 'PageTabItem[]', desc: '页签' }, { name: 'value', type: 'string', desc: '当前 id' }, { name: 'onChange', type: '(id: string) => void', desc: '切换' }]`,
  demos: [{
    title: '基础',
    code: `<PageTabs
  value={tab}
  onChange={setTab}
  items={[
    { id: 'overview', label: '概览' },
    { id: 'events', label: '事件' },
  ]}
/>`,
    jsx: `<PageTabs value={tab} onChange={setTab} items={[{ id: 'overview', label: '概览' }, { id: 'events', label: '事件' }, { id: 'yaml', label: 'YAML' }]} />`,
  }],
}

DEMOS['resource-state'] = {
  imports: `import { Button, ResourceState, Text } from '@/components/ui'`,
  props: `[{ name: 'status', type: "ResourceStatus", desc: "'idle'|'loading'|'empty'|'error'|'offline'" }, { name: 'loadingVariant', type: "'spinner'|'skeleton'|'table'|'card'", desc: '加载样式' }, { name: 'emptyTitle', type: 'ReactNode', desc: '空态标题' }, { name: 'onRetry', type: '() => void', desc: '错误重试' }]`,
  demos: [{
    title: '基础',
    code: `<ResourceState status="empty" emptyTitle="还没有资源" emptyAction={<Button>创建</Button>} />
<ResourceState status="error" onRetry={() => {}} />`,
    jsx: `<div className="grid-2"><ResourceState status="empty" emptyTitle="还没有资源" emptyDescription="创建第一条开始。" emptyAction={<Button variant="primary">创建</Button>} /><ResourceState status="error" onRetry={() => undefined} /><ResourceState status="loading" loadingVariant="spinner" /><ResourceState status="idle"><Text variant="muted" size="md">正常内容</Text></ResourceState></div>`,
  }],
}

DEMOS['search-result-list'] = {
  imports: `import { SearchResultList } from '@/components/ui'`,
  props: `[{ name: 'items', type: 'SearchResultItemData[]', desc: '结果项' }]`,
  demos: [{
    title: '基础',
    code: `<SearchResultList items={[
  { id: '1', title: 'Button', type: '组件', description: '按钮', href: '/components/button' },
  { id: '2', title: '登录页', type: '示例', onSelect: () => {} },
]} />`,
    jsx: `<SearchResultList items={[{ id: '1', title: 'Button', type: '组件', description: '操作按钮', href: '/components/button' }, { id: '2', title: '登录页', type: '示例', description: 'LoginCard 示例', onSelect: () => undefined }, { id: '3', title: 'AppShell', type: '组件', description: '应用壳', active: true, href: '/components/app-shell' }]} />`,
  }],
}

DEMOS['section-card'] = {
  imports: `import { Button, SectionCard, Text } from '@/components/ui'`,
  props: `[{ name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'subtitle', type: 'ReactNode', desc: '副标题' }, { name: 'actions', type: 'ReactNode', desc: '右侧操作' }, { name: 'children', type: 'ReactNode', desc: '内容' }]`,
  demos: [{
    title: '基础',
    code: `<SectionCard title="基本信息" subtitle="只读" actions={<Button size="sm">编辑</Button>}>
  <Text>分区内容</Text>
</SectionCard>`,
    jsx: `<SectionCard title="基本信息" subtitle="只读" actions={<Button size="sm">编辑</Button>}><Text>分区内容放这里。</Text></SectionCard>`,
  }],
}

DEMOS.sidebar = {
  imports: `import { useState } from 'react'\nimport { LayoutDashboard, Rocket, Settings, Table2, TextCursorInput } from 'lucide-react'\nimport { Brand, NavIcon, Sidebar } from '@/components/layout'`,
  hooks: `  const [collapsed, setCollapsed] = useState(false)\n`,
  props: `[{ name: 'groups', type: 'NavGroup[]', desc: '导航分组' }, { name: 'brand', type: 'ReactNode', desc: '品牌' }, { name: 'collapsed', type: 'boolean', default: 'false', desc: '图标栏模式' }, { name: 'onToggleCollapse', type: '() => void', desc: '折叠切换；不传则不显示折叠把手' }, { name: 'footer', type: 'ReactNode', desc: '底部' }, { name: 'NavGroup.label', type: 'string', desc: '分组标题' }, { name: 'NavGroup.section', type: 'string', desc: '分区标题；在首个同名分组前渲染一次' }, { name: 'NavGroup.collapsible', type: 'boolean', default: 'false', desc: '渲染为可折叠分组（需要 label）；含当前路由时自动展开' }, { name: 'NavGroup.defaultOpen', type: 'boolean', default: 'false', desc: '初始展开' }, { name: 'NavGroup.icon', type: 'ReactNode', desc: '分组图标；图标栏模式下代表整个分组' }, { name: 'NavItem', type: '{ to, label, icon?, end? }', desc: '导航项，to 为路由路径' }]`,
  demos: [{
    title: '基础与图标栏',
    desc: '点击左侧把手在完整模式与图标栏之间切换。',
    code: `<Sidebar
  brand={<Brand />}
  collapsed={collapsed}
  onToggleCollapse={() => setCollapsed((v) => !v)}
  groups={[
    {
      label: '导航',
      items: [
        { to: '/', label: '概览', icon: <NavIcon icon={LayoutDashboard} />, end: true },
        { to: '/settings', label: '设置', icon: <NavIcon icon={Settings} /> },
      ],
    },
  ]}
/>`,
    jsx: `<div className="sidebar-demo-frame" style={{ width: collapsed ? 72 : 232 }}><Sidebar brand={<Brand text="Demo" showText={!collapsed} />} collapsed={collapsed} onToggleCollapse={() => setCollapsed((v) => !v)} groups={[{ label: '导航', items: [{ to: '/components/sidebar', label: '概览', icon: <NavIcon icon={LayoutDashboard} />, end: true }, { to: '/components', label: '设置', icon: <NavIcon icon={Settings} /> }] }]} /></div>`,
  }, {
    title: '分区标题与可折叠分组',
    desc: 'section 渲染分区标题；collapsible 的分组默认收起，含当前路由或 defaultOpen 时展开。分组较多（如组件分类）时使用。',
    code: `<Sidebar
  groups={[
    {
      section: '开始',
      items: [
        { to: '/', label: '概览', icon: <NavIcon icon={LayoutDashboard} />, end: true },
        { to: '/docs/getting-started', label: '快速开始', icon: <NavIcon icon={Rocket} /> },
      ],
    },
    {
      section: '组件',
      label: '表单',
      collapsible: true,
      defaultOpen: true,
      icon: <NavIcon icon={TextCursorInput} />,
      items: [
        { to: '/components/input', label: 'Input' },
        { to: '/components/select', label: 'Select' },
        { to: '/components/checkbox', label: 'Checkbox' },
      ],
    },
    {
      section: '组件',
      label: '数据展示',
      collapsible: true,
      icon: <NavIcon icon={Table2} />,
      items: [
        { to: '/components/table', label: 'Table' },
        { to: '/components/data-table', label: 'DataTable' },
      ],
    },
  ]}
/>`,
    jsx: `<div className="sidebar-demo-frame" style={{ width: 240, height: 420 }}><Sidebar brand={<Brand text="Demo" />} groups={[{ section: '开始', items: [{ to: '/', label: '概览', icon: <NavIcon icon={LayoutDashboard} />, end: true }, { to: '/docs/getting-started', label: '快速开始', icon: <NavIcon icon={Rocket} /> }] }, { section: '组件', label: '表单', collapsible: true, defaultOpen: true, icon: <NavIcon icon={TextCursorInput} />, items: [{ to: '/components/input', label: 'Input' }, { to: '/components/select', label: 'Select' }, { to: '/components/checkbox', label: 'Checkbox' }] }, { section: '组件', label: '数据展示', collapsible: true, icon: <NavIcon icon={Table2} />, items: [{ to: '/components/table', label: 'Table' }, { to: '/components/data-table', label: 'DataTable' }] }]} /></div>`,
  }],
}

DEMOS.stack = {
  imports: `import { Stack, Text } from '@/components/ui'`,
  props: `[{ name: 'gap', type: "'sm'|'md'|'lg'", default: "'md'", desc: '间距' }, { name: 'children', type: 'ReactNode', desc: '子节点' }]`,
  demos: [{
    title: '基础',
    code: `<Stack gap="sm">
  <Text>第一行</Text>
  <Text>第二行</Text>
</Stack>`,
    jsx: `<Stack gap="sm"><Text>第一行</Text><Text variant="muted">第二行（gap=sm）</Text></Stack>`,
  }],
}

DEMOS['step-heading'] = {
  imports: `import { Badge, StepHeading } from '@/components/ui'`,
  props: `[{ name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'aside', type: 'ReactNode', desc: '右侧附加' }]`,
  demos: [{
    title: '基础',
    code: `<StepHeading title="网络配置" aside={<Badge>可选</Badge>} />`,
    jsx: `<StepHeading title="网络配置" aside={<Badge>可选</Badge>} />`,
  }],
}

DEMOS['strong-confirm-drawer'] = {
  imports: `import { useState } from 'react'\nimport { Button, StrongConfirmDrawer } from '@/components/ui'`,
  hooks: `  const [open, setOpen] = useState(false)\n`,
  props: `[{ name: 'open', type: 'boolean', desc: '打开' }, { name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'resourceName', type: 'string', desc: '需输入的资源名' }, { name: 'confirmValue', type: 'string', desc: '覆盖确认串' }, { name: 'danger', type: 'boolean', desc: '危险样式' }, { name: 'onConfirm', type: '() => void', desc: '确认' }]`,
  demos: [{
    title: '基础',
    code: `<StrongConfirmDrawer
  open={open}
  onClose={() => setOpen(false)}
  title="删除集群"
  resourceName="prod-cluster"
  onConfirm={() => {}}
/>`,
    jsx: `<><Button variant="danger" onClick={() => setOpen(true)}>打开强确认抽屉</Button><StrongConfirmDrawer open={open} onClose={() => setOpen(false)} title="删除集群" resourceName="prod-cluster" onConfirm={() => undefined}>将永久删除该集群及关联资源。</StrongConfirmDrawer></>`,
  }],
}

DEMOS.table = {
  imports: `import { Table, type TableColumn } from '@/components/ui'`,
  hooks: `  type Row = { id: string; name: string; region: string }
  const rows: Row[] = [
    { id: '1', name: 'api-gateway', region: 'cn-east' },
    { id: '2', name: 'worker', region: 'cn-north' },
  ]
  const columns: TableColumn<Row>[] = [
    { key: 'name', header: '名称', render: (r) => r.name },
    { key: 'region', header: '区域', render: (r) => r.region },
  ]
`,
  props: `[{ name: 'columns', type: 'TableColumn<T>[]', desc: '列（key + render）' }, { name: 'rows', type: 'T[]', desc: '行' }, { name: 'rowKey', type: '(row) => string', desc: '行键' }, { name: 'sortable', type: 'via column.sortable', desc: '列排序' }, { name: 'selectable', type: 'boolean', desc: '多选' }]`,
  demos: [{
    title: '基础',
    code: `const columns: TableColumn<Row>[] = [
  { key: 'name', header: '名称', render: (r) => r.name },
  { key: 'region', header: '区域', render: (r) => r.region },
]
<Table columns={columns} rows={rows} rowKey={(r) => r.id} />`,
    jsx: `<Table columns={columns} rows={rows} rowKey={(r) => r.id} />`,
  }],
}

DEMOS['table-card'] = {
  imports: `import { Table, TableCard, type TableColumn } from '@/components/ui'`,
  hooks: `  type Row = { id: string; name: string }
  const rows: Row[] = [{ id: '1', name: 'api-gateway' }, { id: '2', name: 'worker' }]
  const columns: TableColumn<Row>[] = [{ key: 'name', header: '名称', render: (r) => r.name }]
`,
  props: `[{ name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'subtitle', type: 'ReactNode', desc: '副标题' }, { name: 'actions', type: 'ReactNode', desc: '操作' }, { name: 'footer', type: 'ReactNode', desc: '页脚' }, { name: 'children', type: 'ReactNode', desc: '通常为 Table' }]`,
  demos: [{
    title: '基础',
    code: `<TableCard title="工作负载" subtitle="2">
  <Table columns={columns} rows={rows} rowKey={(r) => r.id} />
</TableCard>`,
    jsx: `<TableCard title="工作负载" subtitle="2"><Table columns={columns} rows={rows} rowKey={(r) => r.id} /></TableCard>`,
  }],
}

DEMOS['theme-drawer'] = {
  imports: `import { useState } from 'react'\nimport { Button } from '@/components/ui'\nimport { ThemeDrawer } from '@/components/layout'`,
  hooks: `  const [open, setOpen] = useState(false)\n`,
  props: `[{ name: 'open', type: 'boolean', desc: '打开' }, { name: 'onClose', type: '() => void', desc: '关闭' }]`,
  demos: [{
    title: '基础',
    desc: '深浅色 / 主题 / 壁纸 / 强调色 / 密度。',
    code: `<Button onClick={() => setOpen(true)}>外观</Button>
<ThemeDrawer open={open} onClose={() => setOpen(false)} />`,
    jsx: `<><Button onClick={() => setOpen(true)}>打开外观抽屉</Button><ThemeDrawer open={open} onClose={() => setOpen(false)} /></>`,
  }],
}

DEMOS['theme-picker'] = {
  imports: `import { ThemePicker } from '@/components/ui'`,
  props: `[{ name: 'value', type: 'ThemeId', desc: '受控主题' }, { name: 'onChange', type: '(theme: ThemeId) => void', desc: '变更' }]`,
  demos: [{
    title: '基础',
    code: `<ThemePicker />`,
    jsx: `<ThemePicker />`,
  }],
}

DEMOS.topbar = {
  imports: `import { Button, Text } from '@/components/ui'\nimport { Topbar } from '@/components/layout'`,
  props: `[{ name: 'leading', type: 'ReactNode', desc: '左侧前置' }, { name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'right', type: 'ReactNode', desc: '右侧' }]`,
  demos: [{
    title: '基础',
    code: `<Topbar title="概览" right={<Button size="sm">操作</Button>} />`,
    jsx: `<div style={{ border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}><Topbar title={<Text>概览</Text>} right={<Button size="sm">操作</Button>} /></div>`,
  }],
}

DEMOS['totp-bind-panel'] = {
  imports: `import { TotpBindPanel } from '@/components/ui'`,
  props: `[{ name: 'secret', type: 'string', desc: 'Base32 密钥' }, { name: 'account', type: 'string', desc: '账号' }, { name: 'issuer', type: 'string', default: "'X-UI'", desc: '发行方' }, { name: 'onBound', type: '() => void', desc: '完成绑定' }]`,
  demos: [{
    title: '基础',
    code: `<TotpBindPanel
  secret="JBSWY3DPEHPK3PXP"
  account="demo@x-ui.dev"
  onBound={() => {}}
/>`,
    jsx: `<div style={{ maxWidth: 320 }}><TotpBindPanel secret="JBSWY3DPEHPK3PXP" account="demo@x-ui.dev" onBound={() => undefined} /></div>`,
  }],
}

DEMOS['tree-table-cell'] = {
  imports: `import { useState } from 'react'\nimport { TreeTableCell } from '@/components/ui'`,
  hooks: `  const [open, setOpen] = useState(true)\n`,
  props: `[{ name: 'depth', type: 'number', desc: '缩进层级' }, { name: 'expandable', type: 'boolean', desc: '可展开' }, { name: 'expanded', type: 'boolean', desc: '展开态' }, { name: 'onToggle', type: '() => void', desc: '切换' }, { name: 'children', type: 'ReactNode', desc: '单元格内容' }]`,
  demos: [{
    title: '基础',
    code: `<TreeTableCell depth={0} expandable expanded={open} onToggle={() => setOpen((v) => !v)}>
  cluster
</TreeTableCell>
<TreeTableCell depth={1}>default</TreeTableCell>`,
    jsx: `<div className="stack"><TreeTableCell depth={0} expandable expanded={open} onToggle={() => setOpen((v) => !v)}>cluster</TreeTableCell>{open ? <TreeTableCell depth={1}>default</TreeTableCell> : null}<TreeTableCell depth={1}>kube-system</TreeTableCell></div>`,
  }],
}

DEMOS['user-menu'] = {
  imports: `import { UserMenu } from '@/components/layout'`,
  props: `[{ name: 'name', type: 'string', desc: '显示名' }, { name: 'role', type: 'string', desc: '角色' }, { name: 'items', type: 'UserMenuItem[]', desc: '菜单项' }, { name: 'compact', type: 'boolean', desc: '仅图标触发' }]`,
  demos: [{
    title: '基础',
    code: `<UserMenu
  name="Ada"
  role="Admin"
  items={[
    { id: 'profile', label: '个人资料', onSelect: () => {} },
    { id: 'logout', label: '退出', danger: true, onSelect: () => {} },
  ]}
/>`,
    jsx: `<div style={{ maxWidth: 220 }}><UserMenu name="Ada" role="Admin" items={[{ id: 'profile', label: '个人资料', onSelect: () => undefined }, { id: 'logout', label: '退出', danger: true, onSelect: () => undefined }]} /></div>`,
  }],
}

DEMOS['wallpaper-picker'] = {
  imports: `import { WallpaperPicker } from '@/components/ui'`,
  props: `[{ name: 'value', type: 'WallpaperId', desc: '受控壁纸' }, { name: 'onChange', type: '(id: WallpaperId) => void', desc: '变更' }]`,
  demos: [{
    title: '基础',
    desc: '通常配合 glass 主题使用。',
    code: `<WallpaperPicker />`,
    jsx: `<WallpaperPicker />`,
  }],
}

for (const [slug, patch] of Object.entries(DEMO_EXPANSIONS)) {
  const cur = DEMOS[slug]
  if (!cur) {
    DEMOS[slug] = patch
    continue
  }
  if (patch.imports) cur.imports = patch.imports
  if (patch.hooks !== undefined) cur.hooks = patch.hooks
  if (patch.props) cur.props = patch.props
  if (patch.demos) cur.demos = patch.demos
}

const WIDE_SLUGS = new Set([
  'app-shell',
  'area-chart',
  'bar-chart',
  'chart-container',
  'data-table',
  'filter-bar',
  'form-page',
  'line-chart',
  'list-filter-bar',
  'list-page',
  'log-viewer',
  'pie-chart',
  'radial-progress',
  'resource-list',
  'sidebar',
  'split-pane',
  'table',
  'table-card',
  'topbar',
  'transfer',
])

function fileBody(slug, name, def) {
  const docName = `${pascal(slug)}Doc`
  const demosJsx = def.demos
    .map((d) => {
      const wide = d.wide === true || (d.wide !== false && WIDE_SLUGS.has(slug))
      return `      <DocDemo title="${d.title}"${d.desc ? ` description="${d.desc.replace(/"/g, '\\"')}"` : ''}${wide ? ' wide' : ''} code={\`${d.code.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`}>
        ${d.jsx}
      </DocDemo>`
    })
    .join('\n')
  return `${def.imports}
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('${slug}')
const props: PropDef[] = ${def.props}

export function ${docName}() {
${def.hooks || ''}  return (
    <ComponentDocLayout meta={meta} props={props}>
${demosJsx}
    </ComponentDocLayout>
  )
}
`
}

const registrySrc = fs.readFileSync(path.join(root, 'src/demo/catalog/registry.ts'), 'utf8')
const entries = [...registrySrc.matchAll(/slug: '([^']+)', name: '([^']+)'/g)].map((m) => ({
  slug: m[1],
  name: m[2],
}))

fs.mkdirSync(outDir, { recursive: true })
let written = 0
const indexExports = []

for (const e of entries) {
  const def = DEMOS[e.slug] ?? fallback(e.slug, e.name)
  // Fix chart import line if broken
  if (def.imports.includes('CHART_STATUS') && def.imports.includes("''")) {
    def.imports = def.imports.replace(/, ''/g, '')
  }
  const file = path.join(outDir, `${pascal(e.slug)}Doc.tsx`)
  indexExports.push({ slug: e.slug, docName: `${pascal(e.slug)}Doc`, file: `./${pascal(e.slug)}Doc` })
  if (fs.existsSync(file) && !force && DEMOS[e.slug] == null) {
    // still rewrite stubs that are placeholders
    const cur = fs.readFileSync(file, 'utf8')
    if (!cur.includes('打开源码') && cur.includes('DocDemo')) continue
  }
  fs.writeFileSync(file, fileBody(e.slug, e.name, def))
  written++
}

fs.writeFileSync(
  path.join(outDir, 'index.ts'),
  `import type { ComponentType } from 'react'
${indexExports.map((e) => `import { ${e.docName} } from '${e.file}'`).join('\n')}

export const DOC_PAGES: Record<string, ComponentType> = {
${indexExports.map((e) => `  '${e.slug}': ${e.docName},`).join('\n')}
}
`,
)

console.log(`wrote ${written}/${entries.length}, demos defined=${Object.keys(DEMOS).length}`)
