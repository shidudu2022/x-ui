/**
 * Demo expansions merged into DEMOS by gen-component-docs.mjs.
 * Each entry may override imports / hooks / props / demos for a slug.
 */
export const DEMO_EXPANSIONS = {
  button: {
    imports: `import { Plus } from 'lucide-react'\nimport { Button } from '@/components/ui'`,
    props: `[{ name: 'variant', type: "'primary'|'secondary'|'danger'|'ghost'", default: "'secondary'", desc: '变体' }, { name: 'size', type: "'sm'|'md'|'lg'", default: "'md'", desc: '尺寸' }, { name: 'loading', type: 'boolean', default: 'false', desc: '加载' }, { name: 'block', type: 'boolean', desc: '全宽' }, { name: 'iconOnly', type: 'boolean', desc: '仅图标' }, { name: 'href', type: 'string', desc: '链接模式' }]`,
    demos: [
      {
        title: '变体',
        code: `<Button variant="primary">Primary</Button>
<Button>Secondary</Button>
<Button variant="danger">Danger</Button>
<Button variant="ghost">Ghost</Button>`,
        jsx: `<div className="showcase-row"><Button variant="primary">Primary</Button><Button>Secondary</Button><Button variant="danger">Danger</Button><Button variant="ghost">Ghost</Button></div>`,
      },
      {
        title: '尺寸',
        code: `<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`,
        jsx: `<div className="showcase-row"><Button size="sm">Small</Button><Button size="md">Medium</Button><Button size="lg">Large</Button></div>`,
      },
      {
        title: '加载',
        code: `<Button variant="primary" loading>保存中</Button>
<Button loading>处理中</Button>`,
        jsx: `<div className="showcase-row"><Button variant="primary" loading>保存中</Button><Button loading>处理中</Button></div>`,
      },
      {
        title: '链接',
        code: `<Button href="/components" variant="primary">内部链接</Button>
<Button href="https://example.com" variant="ghost">外链</Button>`,
        jsx: `<div className="showcase-row"><Button href="/components" variant="primary">内部链接</Button><Button href="https://example.com" variant="ghost">外链</Button></div>`,
      },
      {
        title: '增强',
        desc: '禁用、块级、仅图标。',
        code: `<Button disabled>Disabled</Button>
<Button variant="primary" block>全宽</Button>
<Button iconOnly aria-label="添加"><Plus size={16} /></Button>`,
        jsx: `<div className="stack" style={{ maxWidth: 280 }}><div className="showcase-row"><Button disabled>Disabled</Button><Button iconOnly aria-label="添加"><Plus size={16} /></Button></div><Button variant="primary" block>全宽</Button></div>`,
      },
    ],
  },

  badge: {
    imports: `import { Badge } from '@/components/ui'`,
    props: `[{ name: 'tone', type: "'success'|'warn'|'danger'|'info'|'neutral'", default: "'neutral'", desc: '语义色' }, { name: 'size', type: "'sm'|'md'", default: "'md'", desc: '尺寸' }, { name: 'bordered', type: 'boolean', default: 'true', desc: '描边' }]`,
    demos: [
      {
        title: '色调',
        code: `<Badge>neutral</Badge>
<Badge tone="info">info</Badge>
<Badge tone="success">success</Badge>
<Badge tone="warn">warn</Badge>
<Badge tone="danger">danger</Badge>`,
        jsx: `<div className="showcase-row"><Badge>neutral</Badge><Badge tone="info">info</Badge><Badge tone="success">success</Badge><Badge tone="warn">warn</Badge><Badge tone="danger">danger</Badge></div>`,
      },
      {
        title: '尺寸',
        code: `<Badge size="sm">sm</Badge>
<Badge size="md">md</Badge>`,
        jsx: `<div className="showcase-row"><Badge size="sm" tone="success">sm</Badge><Badge size="md" tone="success">md</Badge></div>`,
      },
      {
        title: '增强',
        desc: 'bordered=false 为纯填充。',
        code: `<Badge bordered={false} tone="info">plain</Badge>
<Badge bordered tone="info">bordered</Badge>`,
        jsx: `<div className="showcase-row"><Badge bordered={false} tone="info">plain</Badge><Badge bordered tone="info">bordered</Badge></div>`,
      },
    ],
  },

  tag: {
    imports: `import { Tag, TagGroup } from '@/components/ui'`,
    props: `[{ name: 'tone', type: "'neutral'|'primary'|'info'|'success'|'warn'|'danger'", default: "'neutral'", desc: '色调' }, { name: 'size', type: "'sm'|'md'", default: "'md'", desc: '尺寸' }]`,
    demos: [
      {
        title: '色调',
        code: `<TagGroup>
  <Tag>neutral</Tag>
  <Tag tone="primary">primary</Tag>
  <Tag tone="info">info</Tag>
  <Tag tone="success">success</Tag>
  <Tag tone="warn">warn</Tag>
  <Tag tone="danger">danger</Tag>
</TagGroup>`,
        jsx: `<TagGroup><Tag>neutral</Tag><Tag tone="primary">primary</Tag><Tag tone="info">info</Tag><Tag tone="success">success</Tag><Tag tone="warn">warn</Tag><Tag tone="danger">danger</Tag></TagGroup>`,
      },
      {
        title: '尺寸',
        code: `<Tag size="sm">sm</Tag>
<Tag size="md">md</Tag>`,
        jsx: `<div className="showcase-row"><Tag size="sm" tone="primary">sm</Tag><Tag size="md" tone="primary">md</Tag></div>`,
      },
    ],
  },

  pill: {
    imports: `import { Pill } from '@/components/ui'`,
    props: `[{ name: 'action', type: 'boolean', desc: '可点击（或传 onClick）' }]`,
    demos: [
      {
        title: '基础',
        code: `<Pill>只读状态</Pill>`,
        jsx: `<div className="showcase-row"><Pill>只读状态</Pill><Pill>prod</Pill></div>`,
      },
      {
        title: '可点击',
        code: `<Pill action onClick={() => {}}>筛选外观</Pill>`,
        jsx: `<div className="showcase-row"><Pill action onClick={() => undefined}>筛选外观</Pill><Pill onClick={() => undefined}>带 onClick</Pill></div>`,
      },
    ],
  },

  alert: {
    imports: `import { Alert } from '@/components/ui'`,
    props: `[{ name: 'tone', type: "'info'|'success'|'warn'|'danger'|'error'", default: "'info'", desc: '语义色；error 等同 danger' }, { name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'dismissible', type: 'boolean', default: 'false', desc: '可关闭' }]`,
    demos: [
      {
        title: '色调',
        code: `<Alert tone="info" title="提示">信息条。</Alert>
<Alert tone="success" title="成功">操作已完成。</Alert>
<Alert tone="warn" title="警告">资源即将耗尽。</Alert>
<Alert tone="danger" title="错误">请求失败。</Alert>`,
        jsx: `<div className="stack"><Alert tone="info" title="提示">信息条。</Alert><Alert tone="success" title="成功">操作已完成。</Alert><Alert tone="warn" title="警告">资源即将耗尽。</Alert><Alert tone="danger" title="错误">请求失败。</Alert></div>`,
      },
      {
        title: '可关闭',
        code: `<Alert tone="warn" title="可关闭" dismissible>关闭后本地隐藏。</Alert>`,
        jsx: `<Alert tone="warn" title="可关闭" dismissible>关闭后本地隐藏。</Alert>`,
      },
    ],
  },

  banner: {
    imports: `import { Banner } from '@/components/ui'`,
    props: `[{ name: 'children', type: 'ReactNode', desc: '横幅内容' }]`,
    demos: [
      {
        title: '基础',
        code: `<Banner>维护模式进行中，危险操作已锁定。</Banner>`,
        jsx: `<Banner>维护模式进行中，危险操作已锁定。</Banner>`,
      },
    ],
  },

  callout: {
    imports: `import { Callout } from '@/components/ui'`,
    props: `[{ name: 'variant', type: "'mirror'|'firewall'|'info'", default: "'mirror'", desc: '样式' }, { name: 'title', type: 'ReactNode', desc: '标题' }]`,
    demos: [
      {
        title: '变体',
        code: `<Callout title="镜像" variant="mirror">官方源说明。</Callout>
<Callout title="防火墙" variant="firewall">出入站规则提示。</Callout>
<Callout title="说明" variant="info">补充上下文。</Callout>`,
        jsx: `<div className="stack"><Callout title="镜像" variant="mirror">官方源说明。</Callout><Callout title="防火墙" variant="firewall">出入站规则提示。</Callout><Callout title="说明" variant="info">补充上下文。</Callout></div>`,
      },
    ],
  },

  'toggle-button': {
    imports: `import { useState } from 'react'\nimport { ToggleButton } from '@/components/ui'`,
    hooks: `  const [checked, setChecked] = useState(true)\n  const [off, setOff] = useState(false)\n`,
    props: `[{ name: 'checked', type: 'boolean', desc: '选中' }, { name: 'disabled', type: 'boolean', desc: '禁用' }]`,
    demos: [
      {
        title: '基础',
        code: `<ToggleButton checked={checked} onClick={() => setChecked((v) => !v)}>
  自动刷新
</ToggleButton>`,
        jsx: `<div className="showcase-row"><ToggleButton checked={checked} onClick={() => setChecked((v) => !v)}>自动刷新</ToggleButton><ToggleButton checked={off} onClick={() => setOff((v) => !v)}>未选中</ToggleButton></div>`,
      },
      {
        title: '禁用',
        code: `<ToggleButton checked disabled>已锁定</ToggleButton>`,
        jsx: `<div className="showcase-row"><ToggleButton checked disabled>已锁定</ToggleButton><ToggleButton disabled>不可点</ToggleButton></div>`,
      },
    ],
  },

  checkbox: {
    imports: `import { Checkbox } from '@/components/ui'`,
    props: `[{ name: 'label', type: 'ReactNode', desc: '文案' }, { name: 'checked', type: 'boolean', desc: '受控选中' }, { name: 'disabled', type: 'boolean', desc: '禁用' }]`,
    demos: [
      {
        title: '基础',
        code: `<Checkbox label="未选" />
<Checkbox defaultChecked label="已选" />`,
        jsx: `<div className="stack"><Checkbox label="未选" /><Checkbox defaultChecked label="已选" /></div>`,
      },
      {
        title: '禁用',
        code: `<Checkbox disabled label="禁用未选" />
<Checkbox disabled defaultChecked label="禁用已选" />`,
        jsx: `<div className="stack"><Checkbox disabled label="禁用未选" /><Checkbox disabled defaultChecked label="禁用已选" /></div>`,
      },
    ],
  },

  radio: {
    imports: `import { Radio, RadioGroup } from '@/components/ui'`,
    props: `[{ name: 'label', type: 'ReactNode', desc: '文案' }, { name: 'disabled', type: 'boolean', desc: '禁用' }]`,
    demos: [
      {
        title: '基础',
        code: `<RadioGroup>
  <Radio name="demo" value="a" defaultChecked label="选项 A" />
  <Radio name="demo" value="b" label="选项 B" />
</RadioGroup>`,
        jsx: `<RadioGroup><Radio name="doc-radio" value="a" defaultChecked label="选项 A" /><Radio name="doc-radio" value="b" label="选项 B" /></RadioGroup>`,
      },
      {
        title: '禁用',
        code: `<Radio name="x" value="a" disabled label="禁用" />
<Radio name="x" value="b" disabled defaultChecked label="禁用已选" />`,
        jsx: `<RadioGroup><Radio name="doc-radio-dis" value="a" disabled label="禁用" /><Radio name="doc-radio-dis" value="b" disabled defaultChecked label="禁用已选" /></RadioGroup>`,
      },
    ],
  },

  switch: {
    imports: `import { useState } from 'react'\nimport { Switch } from '@/components/ui'`,
    hooks: `  const [on, setOn] = useState(true)\n`,
    props: `[{ name: 'checked', type: 'boolean', desc: '开/关' }, { name: 'label', type: 'ReactNode', desc: '文案' }, { name: 'disabled', type: 'boolean', desc: '禁用' }]`,
    demos: [
      {
        title: '基础',
        code: `<Switch checked={on} onChange={(e) => setOn(e.target.checked)} label="自动刷新" />`,
        jsx: `<Switch checked={on} onChange={(e) => setOn(e.target.checked)} label="自动刷新" />`,
      },
      {
        title: '禁用',
        code: `<Switch checked disabled label="已锁定开启" />
<Switch disabled label="已锁定关闭" />`,
        jsx: `<div className="stack"><Switch checked disabled label="已锁定开启" /><Switch disabled label="已锁定关闭" /></div>`,
      },
    ],
  },

  input: {
    imports: `import { Input } from '@/components/ui'`,
    props: `[{ name: 'size', type: "'sm'|'md'|'lg'", default: "'md'", desc: '尺寸' }, { name: 'invalid', type: 'boolean', desc: '校验失败' }, { name: 'disabled', type: 'boolean', desc: '禁用' }]`,
    demos: [
      {
        title: '尺寸',
        code: `<Input size="sm" placeholder="sm" />
<Input placeholder="md" />
<Input size="lg" placeholder="lg" />`,
        jsx: `<div className="stack" style={{ maxWidth: 280 }}><Input size="sm" placeholder="sm" /><Input placeholder="md" /><Input size="lg" placeholder="lg" /></div>`,
      },
      {
        title: '增强',
        code: `<Input invalid placeholder="invalid" />
<Input disabled defaultValue="disabled" />`,
        jsx: `<div className="stack" style={{ maxWidth: 280 }}><Input invalid placeholder="invalid" /><Input disabled defaultValue="disabled" /></div>`,
      },
    ],
  },

  textarea: {
    imports: `import { Textarea } from '@/components/ui'`,
    props: `[{ name: 'rows', type: 'number', desc: '行数' }, { name: 'size', type: "'sm'|'md'|'lg'", desc: '尺寸' }, { name: 'invalid', type: 'boolean', desc: '校验失败' }]`,
    demos: [
      {
        title: '基础',
        code: `<Textarea rows={3} placeholder="备注" />`,
        jsx: `<Textarea rows={3} placeholder="备注" />`,
      },
      {
        title: '尺寸',
        code: `<Textarea size="sm" rows={2} placeholder="sm" />
<Textarea size="lg" rows={2} placeholder="lg" />`,
        jsx: `<div className="stack"><Textarea size="sm" rows={2} placeholder="sm" /><Textarea size="lg" rows={2} placeholder="lg" /></div>`,
      },
      {
        title: '增强',
        code: `<Textarea invalid rows={2} placeholder="invalid" />
<Textarea disabled rows={2} defaultValue="disabled" />`,
        jsx: `<div className="stack"><Textarea invalid rows={2} placeholder="invalid" /><Textarea disabled rows={2} defaultValue="disabled" /></div>`,
      },
    ],
  },

  select: {
    imports: `import { useState } from 'react'\nimport { Select } from '@/components/ui'`,
    hooks: `  const [value, setValue] = useState('a')\n  const [multi, setMulti] = useState(['a'])\n`,
    props: `[{ name: 'options', type: 'SelectOption[]', desc: '选项' }, { name: 'value', type: 'string', desc: '受控值' }, { name: 'size', type: "'sm'|'md'", desc: '尺寸' }, { name: 'multiple', type: 'boolean', desc: '多选' }, { name: 'disabled', type: 'boolean', desc: '禁用' }, { name: 'invalid', type: 'boolean', desc: '校验失败' }, { name: 'block', type: 'boolean', desc: '全宽' }]`,
    demos: [
      {
        title: '基础',
        code: `<Select
  value={value}
  onChange={setValue}
  options={[
    { value: 'a', label: '选项 A' },
    { value: 'b', label: '选项 B' },
    { value: 'c', label: '禁用项', disabled: true },
  ]}
/>`,
        jsx: `<Select value={value} onChange={setValue} options={[{ value: 'a', label: '选项 A' }, { value: 'b', label: '选项 B' }, { value: 'c', label: '禁用项', disabled: true }]} />`,
      },
      {
        title: '尺寸',
        code: `<Select
  size="sm"
  value={value}
  onChange={setValue}
  options={[
    { value: 'a', label: '选项 A' },
    { value: 'b', label: '选项 B' },
  ]}
/>
<Select
  block
  value={value}
  onChange={setValue}
  options={[
    { value: 'a', label: '选项 A' },
    { value: 'b', label: '选项 B' },
  ]}
/>`,
        jsx: `<div className="stack" style={{ maxWidth: 280 }}><Select size="sm" value={value} onChange={setValue} options={[{ value: 'a', label: '选项 A' }, { value: 'b', label: '选项 B' }]} /><Select block value={value} onChange={setValue} options={[{ value: 'a', label: '选项 A' }, { value: 'b', label: '选项 B' }]} /></div>`,
      },
      {
        title: '多选',
        code: `<Select
  multiple
  values={multi}
  onValuesChange={setMulti}
  options={[
    { value: 'a', label: '选项 A' },
    { value: 'b', label: '选项 B' },
    { value: 'c', label: '选项 C' },
  ]}
/>`,
        jsx: `<Select multiple values={multi} onValuesChange={setMulti} options={[{ value: 'a', label: '选项 A' }, { value: 'b', label: '选项 B' }, { value: 'c', label: '选项 C' }]} />`,
      },
      {
        title: '增强',
        code: `<Select
  disabled
  value="a"
  options={[{ value: 'a', label: '禁用' }]}
/>
<Select
  invalid
  value={value}
  onChange={setValue}
  options={[
    { value: 'a', label: '选项 A' },
    { value: 'b', label: '选项 B' },
  ]}
/>`,
        jsx: `<div className="stack" style={{ maxWidth: 280 }}><Select disabled value="a" options={[{ value: 'a', label: '禁用' }]} /><Select invalid value={value} onChange={setValue} options={[{ value: 'a', label: '选项 A' }, { value: 'b', label: '选项 B' }]} /></div>`,
      },
    ],
  },

  'native-select': {
    imports: `import { NativeSelect } from '@/components/ui'`,
    props: `[{ name: 'size', type: "'sm'|'md'|'lg'", desc: '尺寸' }, { name: 'invalid', type: 'boolean', desc: '校验失败' }, { name: 'disabled', type: 'boolean', desc: '禁用' }]`,
    demos: [
      {
        title: '基础',
        code: `<NativeSelect defaultValue="a">
  <option value="a">选项 A</option>
  <option value="b">选项 B</option>
</NativeSelect>`,
        jsx: `<NativeSelect defaultValue="a"><option value="a">选项 A</option><option value="b">选项 B</option></NativeSelect>`,
      },
      {
        title: '尺寸',
        code: `<NativeSelect size="sm" defaultValue="a">
  <option value="a">sm</option>
  <option value="b">B</option>
</NativeSelect>
<NativeSelect size="lg" defaultValue="a">
  <option value="a">lg</option>
  <option value="b">B</option>
</NativeSelect>`,
        jsx: `<div className="stack" style={{ maxWidth: 280 }}><NativeSelect size="sm" defaultValue="a"><option value="a">sm</option><option value="b">B</option></NativeSelect><NativeSelect size="lg" defaultValue="a"><option value="a">lg</option><option value="b">B</option></NativeSelect></div>`,
      },
      {
        title: '增强',
        code: `<NativeSelect invalid defaultValue="a">
  <option value="a">invalid</option>
</NativeSelect>
<NativeSelect disabled defaultValue="a">
  <option value="a">disabled</option>
</NativeSelect>`,
        jsx: `<div className="stack" style={{ maxWidth: 280 }}><NativeSelect invalid defaultValue="a"><option value="a">invalid</option></NativeSelect><NativeSelect disabled defaultValue="a"><option value="a">disabled</option></NativeSelect></div>`,
      },
    ],
  },

  spinner: {
    imports: `import { Spinner } from '@/components/ui'`,
    props: `[{ name: 'size', type: "'sm'|'md'|'lg'", desc: '尺寸' }]`,
    demos: [
      {
        title: '尺寸',
        code: `<Spinner size="sm" />
<Spinner />
<Spinner size="lg" />`,
        jsx: `<div className="showcase-row"><Spinner size="sm" /><Spinner /><Spinner size="lg" /></div>`,
      },
    ],
  },

  progress: {
    imports: `import { Progress } from '@/components/ui'`,
    props: `[{ name: 'value', type: 'number', desc: '0–100' }, { name: 'tone', type: "'default'|'success'|'warn'|'danger'|'info'|'muted'", desc: '色调' }, { name: 'indeterminate', type: 'boolean', desc: '不确定' }, { name: 'label', type: 'string', desc: '标签' }]`,
    demos: [
      {
        title: '色调',
        code: `<Progress label="default" value={62} />
<Progress label="success" value={62} tone="success" />
<Progress label="warn" value={82} tone="warn" />
<Progress label="danger" value={40} tone="danger" />
<Progress label="info" value={55} tone="info" />
<Progress label="muted" value={30} tone="muted" />`,
        jsx: `<div className="stack"><Progress label="default" value={62} /><Progress label="success" value={62} tone="success" /><Progress label="warn" value={82} tone="warn" /><Progress label="danger" value={40} tone="danger" /><Progress label="info" value={55} tone="info" /><Progress label="muted" value={30} tone="muted" /></div>`,
      },
      {
        title: '不确定',
        code: `<Progress label="处理中" indeterminate />`,
        jsx: `<Progress label="处理中" indeterminate />`,
      },
    ],
  },

  'meter-bar': {
    imports: `import { MeterBar, meterToneFromPct } from '@/components/ui'`,
    props: `[{ name: 'value', type: 'number|null', desc: '0–100' }, { name: 'tone', type: "'default'|'success'|'warn'|'danger'|'muted'", desc: '色调' }]`,
    demos: [
      {
        title: '色调',
        code: `<MeterBar value={40} tone="default" />
<MeterBar value={40} tone="success" />
<MeterBar value={78} tone="warn" />
<MeterBar value={94} tone="danger" />
<MeterBar value={20} tone="muted" />`,
        jsx: `<div className="showcase-row" style={{ gap: 16 }}><div style={{ width: 100 }}><MeterBar value={40} tone="default" /></div><div style={{ width: 100 }}><MeterBar value={40} tone="success" /></div><div style={{ width: 100 }}><MeterBar value={78} tone="warn" /></div><div style={{ width: 100 }}><MeterBar value={94} tone="danger" /></div><div style={{ width: 100 }}><MeterBar value={20} tone="muted" /></div></div>`,
      },
      {
        title: '按占比映射',
        desc: 'meterToneFromPct：≥90 danger，≥75 warn，否则 success。',
        code: `<MeterBar value={32} tone={meterToneFromPct(32)} />
<MeterBar value={78} tone={meterToneFromPct(78)} />
<MeterBar value={94} tone={meterToneFromPct(94)} />`,
        jsx: `<div className="showcase-row" style={{ gap: 16 }}><div style={{ width: 120 }}><MeterBar value={32} tone={meterToneFromPct(32)} /></div><div style={{ width: 120 }}><MeterBar value={78} tone={meterToneFromPct(78)} /></div><div style={{ width: 120 }}><MeterBar value={94} tone={meterToneFromPct(94)} /></div></div>`,
      },
    ],
  },

  'status-dot': {
    imports: `import { StatusDot } from '@/components/ui'`,
    props: `[{ name: 'tone', type: "'ok'|'bad'|'warn'|'neutral'|'info'", desc: '色调' }, { name: 'ok', type: 'boolean', desc: '快捷映射 ok/bad' }, { name: 'label', type: 'string', desc: '无障碍名称' }]`,
    demos: [
      {
        title: '色调',
        code: `<StatusDot tone="ok" />
<StatusDot tone="warn" />
<StatusDot tone="bad" />
<StatusDot tone="info" />
<StatusDot tone="neutral" />`,
        jsx: `<div className="showcase-row"><StatusDot tone="ok" /><StatusDot tone="warn" /><StatusDot tone="bad" /><StatusDot tone="info" /><StatusDot tone="neutral" /></div>`,
      },
      {
        title: '快捷 ok',
        code: `<StatusDot ok />
<StatusDot ok={false} />`,
        jsx: `<div className="showcase-row"><StatusDot ok /><StatusDot ok={false} /></div>`,
      },
    ],
  },

  avatar: {
    imports: `import { Avatar, AvatarGroup } from '@/components/ui'`,
    props: `[{ name: 'name', type: 'string', desc: '缩写来源' }, { name: 'src', type: 'string', desc: '图片' }, { name: 'size', type: "'sm'|'md'|'lg'", default: "'md'", desc: '尺寸' }]`,
    demos: [
      {
        title: '尺寸',
        code: `<Avatar name="Ada" size="sm" />
<Avatar name="Ada Lovelace" />
<Avatar name="Ada" size="lg" />`,
        jsx: `<div className="showcase-row"><Avatar name="Ada" size="sm" /><Avatar name="Ada Lovelace" /><Avatar name="Ada" size="lg" /></div>`,
      },
      {
        title: '组合',
        code: `<AvatarGroup>
  <Avatar name="Ada" />
  <Avatar name="Grace" />
  <Avatar name="Alan" />
</AvatarGroup>`,
        jsx: `<AvatarGroup><Avatar name="Ada" /><Avatar name="Grace" /><Avatar name="Alan" /></AvatarGroup>`,
      },
    ],
  },

  skeleton: {
    imports: `import { Skeleton, SkeletonCard, SkeletonTable } from '@/components/ui'`,
    props: `[{ name: 'Skeleton', type: 'div', desc: '单条占位' }, { name: 'SkeletonTable', type: '{ rows?, cols? }', desc: '表格行骨架' }, { name: 'SkeletonCard', type: 'component', desc: '卡片骨架' }]`,
    demos: [
      {
        title: '基础',
        code: `<Skeleton />
<Skeleton style={{ width: '60%', height: 12 }} />`,
        jsx: `<div className="stack"><Skeleton /><Skeleton style={{ width: '60%', height: 12 }} /></div>`,
      },
      {
        title: '表格 / 卡片',
        code: `<SkeletonTable rows={3} />
<SkeletonCard />`,
        jsx: `<div className="stack"><SkeletonTable rows={3} /><SkeletonCard /></div>`,
      },
    ],
  },

  'empty-state': {
    imports: `import { Button, EmptyState } from '@/components/ui'`,
    props: `[{ name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'description', type: 'ReactNode', desc: '说明' }, { name: 'action', type: 'ReactNode', desc: '操作' }]`,
    demos: [
      {
        title: '基础',
        code: `<EmptyState title="还没有数据" description="创建第一条记录开始。" />`,
        jsx: `<EmptyState title="还没有数据" description="创建第一条记录开始。" />`,
      },
      {
        title: '带操作',
        code: `<EmptyState
  title="还没有数据"
  description="创建第一条记录开始。"
  action={<Button variant="primary">创建</Button>}
/>`,
        jsx: `<EmptyState title="还没有数据" description="创建第一条记录开始。" action={<Button variant="primary">创建</Button>} />`,
      },
    ],
  },

  card: {
    imports: `import { Badge, Button, Card, Heading, StatusBar, Text } from '@/components/ui'`,
    props: `[{ name: 'padded', type: 'boolean', default: 'false', desc: '内边距（card-pad）' }, { name: 'children', type: 'ReactNode', desc: '内容' }, { name: 'StatusBar', type: 'left / right', desc: '同文件导出的底栏' }]`,
    demos: [
      {
        title: '内容卡片',
        desc: 'padded 交给卡片统一留白；内用 Heading + Text 建立层级。',
        code: `<Card padded>
  <Heading level="card">部署摘要</Heading>
  <Text variant="muted" as="p">
    最近一次发布已完成，流量已切到绿色组。
  </Text>
</Card>`,
        jsx: `<Card padded className="stack"><Heading level="card">部署摘要</Heading><Text variant="muted" as="p">最近一次发布已完成，流量已切到绿色组。</Text></Card>`,
      },
      {
        title: '自管间距',
        desc: '默认无 padded，适合表格 / 列表等顶满边缘的内容。',
        code: `<Card>
  <div style={{ padding: 12 }}>自定义内边距</div>
</Card>`,
        jsx: `<Card><div style={{ padding: '12px 14px' }}><Text size="sm">未 padded：内容自己控制留白（常见于表格外框）。</Text></div></Card>`,
      },
      {
        title: 'StatusBar',
        desc: '卡片底栏：左侧状态、右侧操作。',
        code: `<Card>
  <div style={{ padding: 14 }}>主体内容</div>
  <StatusBar
    left={<Badge tone="success" size="sm">Healthy</Badge>}
    right={<Button size="sm">详情</Button>}
  />
</Card>`,
        jsx: `<Card><div style={{ padding: 14 }}><Text>主体内容区</Text></div><StatusBar left={<Badge tone="success" size="sm">Healthy</Badge>} right={<Button size="sm">详情</Button>} /></Card>`,
      },
    ],
  },

  'section-card': {
    imports: `import { Button, DescriptionList, SectionCard, Text } from '@/components/ui'`,
    props: `[{ name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'subtitle', type: 'ReactNode', desc: '副标题' }, { name: 'actions', type: 'ReactNode', desc: '右侧操作' }, { name: 'children', type: 'ReactNode', desc: '内容' }]`,
    demos: [
      {
        title: '设置分区',
        desc: '设置页、详情页的标准分区壳。',
        code: `<SectionCard title="基本信息" subtitle="只读" actions={<Button size="sm">编辑</Button>}>
  <DescriptionList items={[
    { label: '名称', value: 'api-gateway' },
    { label: '环境', value: 'production' },
  ]} />
</SectionCard>`,
        jsx: `<SectionCard title="基本信息" subtitle="只读" actions={<Button size="sm">编辑</Button>}><DescriptionList items={[{ label: '名称', value: 'api-gateway' }, { label: '环境', value: 'production' }, { label: '区域', value: 'cn-east' }]} /></SectionCard>`,
        wide: true,
      },
      {
        title: '说明文案',
        code: `<SectionCard title="通知偏好">
  <Text as="p">开启后将向绑定邮箱发送变更摘要。</Text>
  <Text variant="hint" as="p">可随时在个人资料中关闭。</Text>
</SectionCard>`,
        jsx: `<SectionCard title="通知偏好"><Text as="p">开启后将向绑定邮箱发送变更摘要。</Text><Text variant="hint" as="p">可随时在个人资料中关闭。</Text></SectionCard>`,
      },
    ],
  },

  tabs: {
    imports: `import { useState } from 'react'\nimport { Tabs } from '@/components/ui'`,
    hooks: `  const [tab, setTab] = useState('one')\n`,
    props: `[{ name: 'items', type: 'TabItem[]', desc: '面板' }, { name: 'value', type: 'string', desc: '当前 id' }, { name: 'onChange', type: '(id: string) => void', desc: '切换' }]`,
    demos: [
      {
        title: '基础',
        code: `<Tabs
  value={tab}
  onChange={setTab}
  items={[
    { id: 'one', label: '基本信息', content: <p className="muted">Tab 面板一</p> },
    { id: 'two', label: '高级', content: <p className="muted">Tab 面板二</p> },
    { id: 'three', label: '事件', content: <p className="muted">Tab 面板三</p> },
  ]}
/>`,
        jsx: `<Tabs value={tab} onChange={setTab} items={[{ id: 'one', label: '基本信息', content: <p className="muted">Tab 面板一</p> }, { id: 'two', label: '高级', content: <p className="muted">Tab 面板二</p> }, { id: 'three', label: '事件', content: <p className="muted">Tab 面板三</p> }]} />`,
      },
    ],
  },

  segmented: {
    imports: `import { useState } from 'react'\nimport { Segmented } from '@/components/ui'`,
    hooks: `  const [value, setValue] = useState('overview')\n`,
    props: `[{ name: 'options', type: 'SegmentedOption[]', desc: '选项' }, { name: 'value', type: 'string', desc: '当前值' }, { name: 'onChange', type: '(v: string) => void', desc: '切换' }]`,
    demos: [
      {
        title: '基础',
        code: `<Segmented
  value={value}
  onChange={setValue}
  options={[
    { value: 'overview', label: '概览' },
    { value: 'workloads', label: '工作负载' },
    { value: 'meta', label: '元数据' },
  ]}
/>`,
        jsx: `<Segmented value={value} onChange={setValue} options={[{ value: 'overview', label: '概览' }, { value: 'workloads', label: '工作负载' }, { value: 'meta', label: '元数据' }]} />`,
      },
    ],
  },

  steps: {
    imports: `import { useState } from 'react'\nimport { Button, Steps } from '@/components/ui'`,
    hooks: `  const [step, setStep] = useState(1)\n`,
    props: `[{ name: 'items', type: 'StepItem[]', desc: '步骤' }, { name: 'current', type: 'number', desc: '当前索引' }, { name: 'size', type: "'sm'|'md'", default: "'md'", desc: '尺寸' }]`,
    demos: [
      {
        title: '基础',
        code: `<Steps
  current={step}
  items={[
    { id: '1', label: '命名' },
    { id: '2', label: '配置' },
    { id: '3', label: '确认' },
  ]}
/>
<div className="actions">
  <Button disabled={step <= 0} onClick={() => setStep((s) => s - 1)}>
    上一步
  </Button>
  <Button
    variant="primary"
    disabled={step >= 2}
    onClick={() => setStep((s) => s + 1)}
  >
    下一步
  </Button>
</div>`,
        jsx: `<div className="stack"><Steps current={step} items={[{ id: '1', label: '命名' }, { id: '2', label: '配置' }, { id: '3', label: '确认' }]} /><div className="actions"><Button disabled={step <= 0} onClick={() => setStep((s) => s - 1)}>上一步</Button><Button variant="primary" disabled={step >= 2} onClick={() => setStep((s) => s + 1)}>下一步</Button></div></div>`,
      },
      {
        title: '尺寸',
        code: `<Steps
  size="sm"
  current={1}
  items={[
    { id: '1', label: '命名' },
    { id: '2', label: '配置' },
    { id: '3', label: '确认' },
  ]}
/>`,
        jsx: `<Steps size="sm" current={1} items={[{ id: '1', label: '命名' }, { id: '2', label: '配置' }, { id: '3', label: '确认' }]} />`,
      },
    ],
  },

  pagination: {
    imports: `import { useState } from 'react'\nimport { Pagination } from '@/components/ui'`,
    hooks: `  const [page, setPage] = useState(2)\n`,
    props: `[{ name: 'page', type: 'number', desc: '当前页' }, { name: 'pageCount', type: 'number', desc: '总页数' }, { name: 'onChange', type: '(p:number)=>void', desc: '翻页' }]`,
    demos: [
      {
        title: '基础',
        code: `<Pagination page={page} pageCount={8} onChange={setPage} />`,
        jsx: `<Pagination page={page} pageCount={8} onChange={setPage} />`,
      },
      {
        title: '多页省略',
        code: `<Pagination page={12} pageCount={40} onChange={setPage} />`,
        jsx: `<Pagination page={page > 40 ? 12 : page} pageCount={40} onChange={setPage} />`,
      },
    ],
  },

  tooltip: {
    imports: `import { Button, Tooltip } from '@/components/ui'`,
    props: `[{ name: 'content', type: 'ReactNode', desc: '提示内容' }, { name: 'side', type: "'top'|'right'|'bottom'|'left'", default: "'top'", desc: '方向' }, { name: 'disabled', type: 'boolean', desc: '禁用' }]`,
    demos: [
      {
        title: '方向',
        code: `<Tooltip content="上" side="top"><Button>上</Button></Tooltip>
<Tooltip content="右" side="right"><Button>右</Button></Tooltip>
<Tooltip content="下" side="bottom"><Button>下</Button></Tooltip>
<Tooltip content="左" side="left"><Button>左</Button></Tooltip>`,
        jsx: `<div className="showcase-row"><Tooltip content="上" side="top"><Button variant="ghost">上</Button></Tooltip><Tooltip content="右" side="right"><Button variant="ghost">右</Button></Tooltip><Tooltip content="下" side="bottom"><Button variant="ghost">下</Button></Tooltip><Tooltip content="左" side="left"><Button variant="ghost">左</Button></Tooltip></div>`,
      },
      {
        title: '禁用',
        code: `<Tooltip content="不会出现" disabled>
  <Button>禁用提示</Button>
</Tooltip>`,
        jsx: `<Tooltip content="不会出现" disabled><Button variant="ghost">禁用提示</Button></Tooltip>`,
      },
    ],
  },

  popover: {
    imports: `import { Button, Popover } from '@/components/ui'`,
    props: `[{ name: 'trigger', type: 'ReactNode', desc: '触发器' }, { name: 'children', type: 'ReactNode', desc: '内容' }, { name: 'align', type: "'start'|'center'|'end'", default: "'start'", desc: '对齐' }]`,
    demos: [
      {
        title: '基础',
        code: `<Popover trigger={<Button>Popover</Button>}>
  <p>锚点浮层内容</p>
</Popover>`,
        jsx: `<Popover trigger={<Button variant="secondary">Popover</Button>}><p style={{ margin: 0, fontSize: 13 }}>锚点浮层内容。</p></Popover>`,
      },
      {
        title: '对齐',
        code: `<Popover
  align="start"
  trigger={<Button size="sm">start</Button>}
>
  <p style={{ margin: 0, fontSize: 13 }}>align=start</p>
</Popover>
<Popover
  align="center"
  trigger={<Button size="sm">center</Button>}
>
  <p style={{ margin: 0, fontSize: 13 }}>align=center</p>
</Popover>
<Popover
  align="end"
  trigger={<Button size="sm">end</Button>}
>
  <p style={{ margin: 0, fontSize: 13 }}>align=end</p>
</Popover>`,
        jsx: `<div className="showcase-row"><Popover align="start" trigger={<Button size="sm">start</Button>}><p style={{ margin: 0, fontSize: 13 }}>align=start</p></Popover><Popover align="center" trigger={<Button size="sm">center</Button>}><p style={{ margin: 0, fontSize: 13 }}>align=center</p></Popover><Popover align="end" trigger={<Button size="sm">end</Button>}><p style={{ margin: 0, fontSize: 13 }}>align=end</p></Popover></div>`,
      },
    ],
  },

  modal: {
    imports: `import { useState } from 'react'\nimport { Button, Modal } from '@/components/ui'`,
    hooks: `  const [open, setOpen] = useState(false)\n  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md')\n`,
    props: `[{ name: 'open', type: 'boolean', desc: '是否打开' }, { name: 'onClose', type: '() => void', desc: '关闭' }, { name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'footer', type: 'ReactNode', desc: '底部' }, { name: 'size', type: "'sm'|'md'|'lg'", default: "'md'", desc: '尺寸' }]`,
    demos: [
      {
        title: '基础',
        code: `<Button onClick={() => { setSize('md'); setOpen(true) }}>
  打开 Modal
</Button>
<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="示例弹窗"
  size={size}
  footer={
    <div className="actions">
      <Button onClick={() => setOpen(false)}>取消</Button>
      <Button variant="primary" onClick={() => setOpen(false)}>
        确定
      </Button>
    </div>
  }
>
  <p style={{ margin: 0, fontSize: 13 }}>
    Centered dialog content (size={size}).
  </p>
</Modal>`,
        jsx: `<><Button onClick={() => { setSize('md'); setOpen(true) }}>{d('Open Modal', '打开 Modal')}</Button><Modal open={open} onClose={() => setOpen(false)} title={d('Example dialog', '示例弹窗')} size={size} footer={<div className="actions"><Button onClick={() => setOpen(false)}>{d('Cancel', '取消')}</Button><Button variant="primary" onClick={() => setOpen(false)}>{d('OK', '确定')}</Button></div>}><p style={{ margin: 0, fontSize: 13 }}>{d('Centered dialog content (size=', '居中对话框内容（size=')}{size}{d(').', '）。')}</p></Modal></>`,
      },
      {
        title: '尺寸',
        code: `<Button onClick={() => openSm()}>sm</Button>
<Button onClick={() => openLg()}>lg</Button>`,
        jsx: `<div className="showcase-row"><Button size="sm" onClick={() => { setSize('sm'); setOpen(true) }}>sm</Button><Button size="sm" onClick={() => { setSize('md'); setOpen(true) }}>md</Button><Button size="sm" onClick={() => { setSize('lg'); setOpen(true) }}>lg</Button></div>`,
      },
    ],
  },

  drawer: {
    imports: `import { useState } from 'react'\nimport { Button, Drawer } from '@/components/ui'`,
    hooks: `  const [open, setOpen] = useState(false)\n  const [side, setSide] = useState<'right' | 'left'>('right')\n  const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('lg')\n`,
    props: `[{ name: 'open', type: 'boolean', desc: '是否打开' }, { name: 'onClose', type: 'fn', desc: '关闭' }, { name: 'side', type: "'right'|'left'", default: "'right'", desc: '方向' }, { name: 'size', type: "'sm'|'md'|'lg'|'xl'", default: "'lg'", desc: '宽度' }]`,
    demos: [
      {
        title: '基础',
        code: `<Button onClick={() => { setSide('right'); setSize('lg'); setOpen(true) }}>
  打开 Drawer
</Button>
<Drawer
  open={open}
  onClose={() => setOpen(false)}
  title="详情"
  side={side}
  size={size}
  footer={<Button onClick={() => setOpen(false)}>关闭</Button>}
>
  <p className="muted" style={{ margin: 0 }}>
    Slide-in drawer (side={side}, size={size}).
  </p>
</Drawer>`,
        jsx: `<><Button onClick={() => { setSide('right'); setSize('lg'); setOpen(true) }}>{d('Open Drawer', '打开 Drawer')}</Button><Drawer open={open} onClose={() => setOpen(false)} title={d('Details', '详情')} side={side} size={size} footer={<Button onClick={() => setOpen(false)}>{d('Close', '关闭')}</Button>}><p className="muted" style={{ margin: 0 }}>{d('Slide-in drawer (side=', '侧滑抽屉（side=')}{side}{d(', size=', ' · size=')}{size}{d(').', '）。')}</p></Drawer></>`,
      },
      {
        title: '方向 / 尺寸',
        code: `<Button
  size="sm"
  onClick={() => { setSide('left'); setSize('sm'); setOpen(true) }}
>
  左侧 sm
</Button>
<Button
  size="sm"
  onClick={() => { setSide('right'); setSize('xl'); setOpen(true) }}
>
  右侧 xl
</Button>`,
        jsx: `<div className="showcase-row"><Button size="sm" onClick={() => { setSide('left'); setSize('sm'); setOpen(true) }}>左侧 sm</Button><Button size="sm" onClick={() => { setSide('right'); setSize('xl'); setOpen(true) }}>右侧 xl</Button></div>`,
      },
    ],
  },

  sheet: {
    imports: `import { useState } from 'react'\nimport { Button, Sheet } from '@/components/ui'`,
    hooks: `  const [open, setOpen] = useState(false)\n  const [side, setSide] = useState<'bottom' | 'top'>('bottom')\n`,
    props: `[{ name: 'open', type: 'boolean', desc: '打开' }, { name: 'side', type: "'bottom'|'top'", default: "'bottom'", desc: '方向' }, { name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'footer', type: 'ReactNode', desc: '底部' }]`,
    demos: [
      {
        title: '基础',
        code: `<Button onClick={() => { setSide('bottom'); setOpen(true) }}>
  打开 Sheet
</Button>
<Sheet
  open={open}
  onClose={() => setOpen(false)}
  title="面板"
  side={side}
  footer={<Button onClick={() => setOpen(false)}>关闭</Button>}
>
  <p className="muted" style={{ margin: 0 }}>
    Sheet content (side={side}).
  </p>
</Sheet>`,
        jsx: `<><Button onClick={() => { setSide('bottom'); setOpen(true) }}>{d('Open Sheet', '打开 Sheet')}</Button><Sheet open={open} onClose={() => setOpen(false)} title={d('Panel', '面板')} side={side} footer={<Button onClick={() => setOpen(false)}>{d('Close', '关闭')}</Button>}><p className="muted" style={{ margin: 0 }}>{d('Sheet content (side=', '薄板内容（side=')}{side}{d(').', '）。')}</p></Sheet></>`,
      },
      {
        title: '方向',
        code: `<Button size="sm" onClick={() => { setSide('top'); setOpen(true) }}>
  顶部
</Button>
<Button size="sm" onClick={() => { setSide('bottom'); setOpen(true) }}>
  底部
</Button>`,
        jsx: `<div className="showcase-row"><Button size="sm" onClick={() => { setSide('top'); setOpen(true) }}>顶部</Button><Button size="sm" onClick={() => { setSide('bottom'); setOpen(true) }}>底部</Button></div>`,
      },
    ],
  },

  toast: {
    imports: `import { Button, useToast } from '@/components/ui'`,
    hooks: `  const { toast } = useToast()\n`,
    props: `[{ name: 'toast(msg, tone?)', type: 'fn', desc: '需 ToastProvider；tone: info|success|warn|error|danger' }]`,
    demos: [
      {
        title: '色调',
        code: `toast('提示', 'info')
toast('已保存', 'success')
toast('注意', 'warn')
toast('出错了', 'error')`,
        jsx: `<div className="showcase-row"><Button onClick={() => toast('提示信息', 'info')}>info</Button><Button onClick={() => toast('已保存', 'success')}>success</Button><Button onClick={() => toast('请注意', 'warn')}>warn</Button><Button onClick={() => toast('出错了', 'error')}>error</Button><Button onClick={() => toast('危险操作', 'danger')}>danger</Button></div>`,
      },
    ],
  },

  confirm: {
    imports: `import { Button, confirm, useToast } from '@/components/ui'`,
    hooks: `  const { toast } = useToast()\n`,
    props: `[{ name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'description', type: 'ReactNode', desc: '说明' }, { name: 'danger', type: 'boolean', desc: '危险样式' }, { name: 'resourceName', type: 'string', desc: '需输入确认的资源名' }]`,
    demos: [
      {
        title: '基础',
        desc: '需 ConfirmProvider。',
        code: `await confirm({ title: '继续？', description: '普通确认' })`,
        jsx: `<Button onClick={() => { void confirm({ title: '继续？', description: '普通确认' }).then((ok) => { if (ok) toast('已确认', 'success') }) }}>confirm()</Button>`,
      },
      {
        title: '危险',
        code: `await confirm({ title: '删除？', description: '不可恢复', danger: true })`,
        jsx: `<Button variant="danger" onClick={() => { void confirm({ title: '删除？', description: '不可恢复', danger: true }).then((ok) => { if (ok) toast('已删除', 'success') }) }}>危险确认</Button>`,
      },
    ],
  },

  heading: {
    imports: `import { Card, Heading, Text } from '@/components/ui'`,
    props: `[{ name: 'level', type: "'page'|'section'|'card'|'sub'", default: "'card'", desc: '语义层级（映射 h1–h4）' }, { name: 'as', type: 'ElementType', desc: '覆盖标签' }]`,
    demos: [
      {
        title: '层级',
        desc: 'page → section → card → sub，对应页面主标题到步骤小标题。',
        code: `<Heading level="page">工作负载</Heading>
<Heading level="section">运行概况</Heading>
<Heading level="card">副本集</Heading>
<Heading level="sub">健康检查</Heading>`,
        jsx: `<div className="stack"><Heading level="page">工作负载</Heading><Heading level="section">运行概况</Heading><Heading level="card">副本集</Heading><Heading level="sub">健康检查</Heading></div>`,
      },
      {
        title: '标题 + 说明',
        desc: '区块标题下接 muted 正文，是详情/设置最常见的排版。',
        code: `<Heading level="section">访问控制</Heading>
<Text variant="muted" as="p">
  定义谁可以读取与变更此资源。更改将写入审计日志。
</Text>`,
        jsx: `<Card padded className="stack"><Heading level="section">访问控制</Heading><Text variant="muted" as="p">定义谁可以读取与变更此资源。更改将写入审计日志。</Text><Heading level="card">成员</Heading><Text as="p">当前 3 位管理员、12 位只读成员。</Text></Card>`,
      },
    ],
  },

  text: {
    imports: `import { Card, Mono, Muted, Text } from '@/components/ui'`,
    props: `[{ name: 'variant', type: "'body'|'muted'|'faint'|'strong'|'mono'|'label'|'hint'|'caption'", default: "'body'", desc: '角色（颜色 / 字重）' }, { name: 'size', type: "'xs'|'sm'|'md'|'base'|'lg'|'xl'", desc: '字号阶梯' }, { name: 'as', type: 'ElementType', desc: '渲染标签，默认 span（hint/caption 为 p）' }]`,
    demos: [
      {
        title: '角色',
        desc: '按信息权重选 variant，而不是手写颜色。',
        code: `<Text>正文说明当前状态与下一步操作。</Text>
<Text variant="muted">次要说明、时间、归属。</Text>
<Text variant="faint">占位或分隔性文案。</Text>
<Text variant="strong">需要扫读的关键数字或名称。</Text>
<Text variant="mono">ns/default/api-gateway</Text>
<Text variant="label">字段标签</Text>
<Text variant="hint">输入提示，放在控件下方。</Text>
<Text variant="caption">脚注、版权或补充说明。</Text>`,
        jsx: `<div className="stack"><Text>正文说明当前状态与下一步操作。</Text><Text variant="muted">次要说明、时间、归属。</Text><Text variant="faint">占位或分隔性文案。</Text><Text variant="strong">需要扫读的关键数字或名称。</Text><Text variant="mono">ns/default/api-gateway</Text><Text variant="label">字段标签</Text><Text variant="hint">输入提示，放在控件下方。</Text><Text variant="caption">脚注、版权或补充说明。</Text></div>`,
      },
      {
        title: '字号',
        desc: '对应 --fs-xs … --fs-xl；业务文案优先用 size，少写 inline fontSize。',
        code: `<Text size="xs">xs · 辅助标注</Text>
<Text size="sm">sm · 提示 / 次要</Text>
<Text size="md">md · 表头邻近密度</Text>
<Text size="base">base · 正文默认</Text>
<Text size="lg">lg · 小标题感</Text>
<Text size="xl">xl · 卡片强调</Text>`,
        jsx: `<div className="stack"><Text size="xs">xs · 辅助标注 / Badge 邻近</Text><Text size="sm">sm · 提示、次要文案</Text><Text size="md">md · 表头、KV 密度</Text><Text size="base">base · 正文默认（14px）</Text><Text size="lg">lg · 略强调的正文</Text><Text size="xl">xl · 卡片内强调句</Text></div>`,
      },
      {
        title: '段落组合',
        desc: 'strong 标题句 + muted 说明 + mono 标识。',
        code: `<Text variant="strong" as="p">api-gateway</Text>
<Text variant="muted" as="p">生产环境 · cn-east</Text>
<Mono>deploy/2026-10-28-a1</Mono>`,
        jsx: `<Card padded className="stack"><Text variant="strong" as="p">api-gateway</Text><Text variant="muted" as="p">生产环境 · cn-east · 最近同步 2 分钟前</Text><Mono>deploy/2026-10-28-a1</Mono><Muted as="p">Muted / Mono 是常用快捷封装。</Muted></Card>`,
      },
    ],
  },

  divider: {
    imports: `import { Card, Divider, Stack, Text, TextLink } from '@/components/ui'`,
    props: `[{ name: 'label', type: 'ReactNode', desc: '中间文案' }, { name: 'vertical', type: 'boolean', desc: '竖向分隔' }]`,
    demos: [
      {
        title: '区块分隔',
        desc: '同一卡片内切开上下内容。',
        code: `<Stack>
  <Text>上方：概要信息</Text>
  <Divider />
  <Text variant="muted">下方：补充说明</Text>
</Stack>`,
        jsx: `<Card padded><Stack><Text>上方：概要信息</Text><Divider /><Text variant="muted">下方：补充说明或次要操作区。</Text></Stack></Card>`,
      },
      {
        title: '带标签',
        desc: '登录 / 注册中间的「或者」。',
        code: `<Divider label="或者" />`,
        jsx: `<Stack gap="sm"><Text size="sm">使用账号密码继续</Text><Divider label="或者" /><TextLink href="/examples/login">使用 SSO 登录</TextLink></Stack>`,
      },
      {
        title: '竖向',
        desc: '行内元信息分隔。',
        code: `<Text>生产</Text>
<Divider vertical />
<Text variant="muted">cn-east</Text>`,
        jsx: `<div className="showcase-row" style={{ alignItems: 'center', height: 32 }}><Text>生产</Text><Divider vertical /><Text variant="muted">cn-east</Text><Divider vertical /><Text variant="muted">v1.2.0</Text></div>`,
      },
    ],
  },

  stack: {
    imports: `import { CatalogGroup, CatalogTile, Field, FormGrid, Input, Stack, Text } from '@/components/ui'`,
    props: `[{ name: 'gap', type: "'sm'|'md'|'lg'", default: "'md'", desc: 'Stack 垂直间距' }, { name: 'FormGrid', type: 'children', desc: '表单单列/双列栅格（同文件导出）' }, { name: 'CatalogGroup / CatalogTile', type: '…', desc: '索引瓷砖布局' }]`,
    demos: [
      {
        title: '垂直间距',
        desc: 'sm / md / lg 三档，替代随意 margin。',
        code: `<Stack gap="sm">…</Stack>
<Stack gap="md">…</Stack>
<Stack gap="lg">…</Stack>`,
        jsx: `<div className="grid-2"><Stack gap="sm"><Text variant="strong" size="sm">gap=sm</Text><Text variant="muted" size="sm">紧凑列表、提示与控件。</Text><Text variant="muted" size="sm">第二行</Text></Stack><Stack gap="lg"><Text variant="strong" size="sm">gap=lg</Text><Text variant="muted" size="sm">大区块之间的呼吸感。</Text><Text variant="muted" size="sm">第二行</Text></Stack></div>`,
        wide: true,
      },
      {
        title: 'FormGrid',
        desc: '表单字段栅格，与 Field 搭配。',
        code: `<FormGrid>
  <Field label="名称" htmlFor="n"><Input id="n" /></Field>
  <Field label="区域" htmlFor="r"><Input id="r" /></Field>
</FormGrid>`,
        jsx: `<FormGrid><Field label="名称" htmlFor="doc-stack-n"><Input id="doc-stack-n" placeholder="api-gateway" /></Field><Field label="区域" htmlFor="doc-stack-r"><Input id="doc-stack-r" placeholder="cn-east" /></Field></FormGrid>`,
        wide: true,
      },
      {
        title: 'Catalog',
        desc: '组件索引式瓷砖：CatalogGroup + CatalogTile。',
        code: `<CatalogGroup title="布局">
  <CatalogTile label="Stack" description="垂直间距" href="/components/stack" />
  <CatalogTile label="Card" description="表面容器" href="/components/card" />
</CatalogGroup>`,
        jsx: `<CatalogGroup title="布局"><CatalogTile label="Stack" description="垂直间距" href="#stack" /><CatalogTile label="Card" description="表面容器" href="#card" /><CatalogTile label="Divider" description="分隔" href="#divider" /></CatalogGroup>`,
        wide: true,
      },
    ],
  },

  kbd: {
    imports: `import { Kbd, Text } from '@/components/ui'`,
    props: `[{ name: 'children', type: 'ReactNode', desc: '按键文案' }]`,
    demos: [
      {
        title: '快捷键提示',
        desc: '嵌在说明文案里，而不是孤立摆放。',
        code: `<Text variant="muted" size="sm">
  按 <Kbd>⌘</Kbd> <Kbd>K</Kbd> 打开命令面板
</Text>`,
        jsx: `<Text variant="muted" size="sm">按 <Kbd>⌘</Kbd> <Kbd>K</Kbd> 打开命令面板，或 <Kbd>?</Kbd> 查看快捷键。</Text>`,
      },
      {
        title: '组合键',
        code: `<Kbd>Ctrl</Kbd> + <Kbd>Shift</Kbd> + <Kbd>P</Kbd>`,
        jsx: `<div className="showcase-row" style={{ alignItems: 'center' }}><Kbd>Ctrl</Kbd><span className="muted">+</span><Kbd>Shift</Kbd><span className="muted">+</span><Kbd>P</Kbd></div>`,
      },
    ],
  },

  'copy-button': {
    imports: `import { CopyButton } from '@/components/ui'`,
    props: `[{ name: 'value', type: 'string', desc: '复制内容' }, { name: 'variant', type: 'ButtonVariant', desc: '按钮变体' }, { name: 'size', type: 'ButtonSize', desc: '尺寸' }, { name: 'label', type: 'string', desc: '文案' }]`,
    demos: [
      {
        title: '基础',
        code: `<CopyButton value="npm install @shidudu2022/x-ui" />`,
        jsx: `<CopyButton value="npm install @shidudu2022/x-ui" />`,
      },
      {
        title: '变体 / 尺寸',
        code: `<CopyButton value="x" variant="secondary" size="md" label="复制密钥" />`,
        jsx: `<div className="showcase-row"><CopyButton value="secret" variant="secondary" size="md" label="复制密钥" /><CopyButton value="x" variant="ghost" size="sm" /></div>`,
      },
    ],
  },

  'search-input': {
    imports: `import { useState } from 'react'\nimport { SearchInput } from '@/components/ui'`,
    hooks: `  const [q, setQ] = useState('api')\n`,
    props: `[{ name: 'value', type: 'string', desc: '受控值' }, { name: 'size', type: "'sm'|'md'|'lg'", desc: '尺寸' }, { name: 'allowClear', type: 'boolean', default: 'true', desc: '清除按钮' }, { name: 'loading', type: 'boolean', desc: '加载' }, { name: 'invalid', type: 'boolean', desc: '校验失败' }]`,
    demos: [
      {
        title: '基础',
        code: `<SearchInput
  value={q}
  onChange={(e) => setQ(e.target.value)}
  onClear={() => setQ('')}
  placeholder="名称 / 标签…"
/>`,
        jsx: `<SearchInput value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ('')} placeholder="名称 / 标签…" />`,
      },
      {
        title: '尺寸',
        code: `<SearchInput
  size="sm"
  value={q}
  onChange={(e) => setQ(e.target.value)}
  onClear={() => setQ('')}
  placeholder="sm"
/>
<SearchInput
  size="lg"
  value={q}
  onChange={(e) => setQ(e.target.value)}
  onClear={() => setQ('')}
  placeholder="lg"
/>`,
        jsx: `<div className="stack" style={{ maxWidth: 320 }}><SearchInput size="sm" value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ('')} placeholder="sm" /><SearchInput size="lg" value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ('')} placeholder="lg" /></div>`,
      },
      {
        title: '加载 / 校验',
        code: `<SearchInput
  loading
  value={q}
  onChange={(e) => setQ(e.target.value)}
  onClear={() => setQ('')}
  placeholder="搜索中…"
/>
<SearchInput
  invalid
  value={q}
  onChange={(e) => setQ(e.target.value)}
  onClear={() => setQ('')}
  placeholder="invalid"
/>`,
        jsx: `<div className="stack" style={{ maxWidth: 320 }}><SearchInput loading value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ('')} placeholder="搜索中…" /><SearchInput invalid value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ('')} placeholder="invalid" /></div>`,
      },
    ],
  },

  'number-stepper': {
    imports: `import { useState } from 'react'\nimport { NumberStepper } from '@/components/ui'`,
    hooks: `  const [n, setN] = useState(3)\n`,
    props: `[{ name: 'value', type: 'number', desc: '值' }, { name: 'min', type: 'number', desc: '最小' }, { name: 'max', type: 'number', desc: '最大' }, { name: 'step', type: 'number', desc: '步进' }]`,
    demos: [
      {
        title: '基础',
        code: `<NumberStepper value={n} onChange={setN} min={0} max={10} />`,
        jsx: `<NumberStepper value={n} onChange={setN} min={0} max={10} />`,
      },
      {
        title: '步进',
        code: `<NumberStepper value={n} onChange={setN} min={0} max={100} step={5} />`,
        jsx: `<NumberStepper value={n} onChange={setN} min={0} max={100} step={5} />`,
      },
    ],
  },

  'pin-input': {
    imports: `import { useState } from 'react'\nimport { PinInput } from '@/components/ui'`,
    hooks: `  const [pin, setPin] = useState('')\n`,
    props: `[{ name: 'length', type: 'number', default: '6', desc: '位数' }, { name: 'masked', type: 'boolean', desc: '掩码' }, { name: 'invalid', type: 'boolean', desc: '校验失败' }, { name: 'disabled', type: 'boolean', desc: '禁用' }]`,
    demos: [
      {
        title: '基础',
        code: `<PinInput value={pin} onChange={setPin} />`,
        jsx: `<PinInput value={pin} onChange={setPin} />`,
      },
      {
        title: '长度 / 掩码',
        code: `<PinInput length={4} masked value={pin} onChange={setPin} />`,
        jsx: `<PinInput length={4} masked value={pin} onChange={setPin} />`,
      },
      {
        title: '增强',
        code: `<PinInput invalid value={pin} onChange={setPin} />
<PinInput disabled value="123456" />`,
        jsx: `<div className="stack"><PinInput invalid value={pin} onChange={setPin} /><PinInput disabled value="123456" /></div>`,
      },
    ],
  },

  'tags-input': {
    imports: `import { useState } from 'react'\nimport { TagsInput } from '@/components/ui'`,
    hooks: `  const [tags, setTags] = useState(['prod', 'edge'])\n  const [empty, setEmpty] = useState<string[]>([])\n`,
    props: `[{ name: 'value', type: 'string[]', desc: '标签' }, { name: 'onChange', type: 'fn', desc: '变更' }, { name: 'placeholder', type: 'string', desc: '占位' }]`,
    demos: [
      {
        title: '基础',
        code: `<TagsInput value={tags} onChange={setTags} />`,
        jsx: `<TagsInput value={tags} onChange={setTags} />`,
      },
      {
        title: '空态',
        code: `<TagsInput value={[]} onChange={setEmpty} placeholder="添加标签后回车" />`,
        jsx: `<TagsInput value={empty} onChange={setEmpty} placeholder="添加标签后回车" />`,
      },
    ],
  },

  'choice-card': {
    imports: `import { ChoiceCard, ChoiceCardGrid } from '@/components/ui'`,
    props: `[{ name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'recommended', type: 'boolean', desc: '推荐徽标' }, { name: 'disabled', type: 'boolean', desc: '禁用' }]`,
    demos: [
      {
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
      },
      {
        title: '禁用',
        code: `<ChoiceCard title="不可用" description="维护中" disabled />`,
        jsx: `<ChoiceCardGrid><ChoiceCard title="不可用" description="维护中" disabled /><ChoiceCard title="可选" description="正常" onClick={() => undefined} /></ChoiceCardGrid>`,
      },
    ],
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

  'form-errors': {
    imports: `import { FormErrors } from '@/components/ui'`,
    props: `[{ name: 'errors', type: 'ReactNode[]', desc: '错误列表' }, { name: 'title', type: 'ReactNode', desc: '标题' }]`,
    demos: [
      {
        title: '基础',
        code: `<FormErrors errors={['请输入用户名', '密码至少 6 位']} />`,
        jsx: `<FormErrors errors={['请输入用户名', '密码至少 6 位']} />`,
      },
      {
        title: '自定义标题',
        code: `<FormErrors title="提交失败" errors={['网络超时']} />`,
        jsx: `<FormErrors title="提交失败" errors={['网络超时']} />`,
      },
    ],
  },

  'description-list': {
    imports: `import { Badge, Card, DescriptionList, Heading, Mono, SectionCard } from '@/components/ui'`,
    props: `[{ name: 'items', type: 'DescriptionItem[]', desc: 'label / value 列表（渲染为 dl.kv）' }]`,
    demos: [
      {
        title: '详情键值',
        desc: '详情页只读属性的默认排版。',
        code: `<DescriptionList items={[
  { label: '名称', value: 'api-gateway' },
  { label: '环境', value: 'production' },
  { label: '镜像', value: <Mono>registry/app:1.2.0</Mono> },
  { label: '状态', value: <Badge tone="success" size="sm">Running</Badge> },
]} />`,
        jsx: `<SectionCard title="属性"><DescriptionList items={[{ label: '名称', value: 'api-gateway' }, { label: '环境', value: 'production' }, { label: '镜像', value: <Mono>registry/app:1.2.0</Mono> }, { label: '状态', value: <Badge tone="success" size="sm">Running</Badge> }]} /></SectionCard>`,
        wide: true,
      },
      {
        title: '紧凑卡片',
        code: `<Card padded>
  <Heading level="card">连接信息</Heading>
  <DescriptionList items={[
    { label: 'Endpoint', value: <Mono>https://api.example.com</Mono> },
    { label: 'Region', value: 'cn-east' },
  ]} />
</Card>`,
        jsx: `<Card padded className="stack"><Heading level="card">连接信息</Heading><DescriptionList items={[{ label: 'Endpoint', value: <Mono>https://api.example.com</Mono> }, { label: 'Region', value: 'cn-east' }]} /></Card>`,
      },
    ],
  },

  timeline: {
    imports: `import { Timeline } from '@/components/ui'`,
    props: `[{ name: 'items', type: 'TimelineItemData[]', desc: '事件；可含 content' }]`,
    demos: [
      {
        title: '基础',
        code: `<Timeline items={[
  { id: 'a', title: '创建资源', meta: '2 分钟前' },
  { id: 'b', title: '健康检查通过', meta: '刚刚' },
]} />`,
        jsx: `<Timeline items={[{ id: 'a', title: '创建资源', meta: '2 分钟前' }, { id: 'b', title: '健康检查通过', meta: '刚刚' }]} />`,
      },
      {
        title: '带内容',
        code: `<Timeline items={[
  { id: 'a', title: '部署', meta: '刚刚', content: <p className="muted">镜像 v1.2.0</p> },
]} />`,
        jsx: `<Timeline items={[{ id: 'a', title: '部署', meta: '刚刚', content: <p className="muted" style={{ margin: 0 }}>镜像 v1.2.0</p> }, { id: 'b', title: '探测通过', meta: '1 分钟前' }]} />`,
      },
    ],
  },

  accordion: {
    imports: `import { Accordion } from '@/components/ui'`,
    props: `[{ name: 'items', type: 'AccordionItemData[]', desc: '面板项' }, { name: 'defaultOpenId', type: 'string', desc: '默认展开' }]`,
    demos: [
      {
        title: '基础',
        desc: '点击标题展开 / 折叠。',
        code: `<Accordion
  defaultOpenId="1"
  items={[
    { id: '1', title: '什么是 x-ui？', content: '一套管理端组件与布局。' },
    { id: '2', title: '如何接入？', content: 'npm install @shidudu2022/x-ui' },
  ]}
/>`,
        jsx: `<Accordion defaultOpenId="1" items={[{ id: '1', title: '什么是 x-ui？', content: '一套管理端组件与布局。' }, { id: '2', title: '如何接入？', content: 'npm install @shidudu2022/x-ui' }, { id: '3', title: '主题？', content: 'AppearanceProvider + ThemeDrawer。' }]} />`,
      },
    ],
  },

  checklist: {
    imports: `import { useState } from 'react'\nimport { Checklist } from '@/components/ui'`,
    hooks: `  const [items, setItems] = useState([
    { id: 'a', title: '配置网络', description: 'VPC / 子网', checked: true },
    { id: 'b', title: '绑定域名', checked: false },
    { id: 'c', title: '开启 TLS', checked: false, disabled: true },
  ])\n`,
    props: `[{ name: 'items', type: 'ChecklistItem[]', desc: '项；可含 description / disabled' }, { name: 'onChange', type: '(id, checked) => void', desc: '变更' }]`,
    demos: [
      {
        title: '基础 / 禁用项',
        desc: '含 description 与 disabled 项。',
        code: `<Checklist
  items={items}
  onChange={(id, checked) =>
    setItems((list) =>
      list.map((it) => (it.id === id ? { ...it, checked } : it)),
    )
  }
/>`,
        jsx: `<Checklist items={items} onChange={(id, checked) => setItems((list) => list.map((it) => (it.id === id ? { ...it, checked } : it)))} />`,
      },
    ],
  },

  'json-viewer': {
    imports: `import { JsonViewer } from '@/components/ui'`,
    props: `[{ name: 'value', type: 'unknown', desc: 'JSON 数据' }, { name: 'collapsed', type: 'boolean', desc: '默认折叠' }, { name: 'maxHeight', type: 'number', desc: '最大高度' }]`,
    demos: [
      {
        title: '基础',
        code: `<JsonViewer value={{ cluster: 'demo', replicas: 3 }} />`,
        jsx: `<JsonViewer value={{ cluster: 'demo', replicas: 3, labels: { env: 'prod' } }} />`,
      },
      {
        title: '默认折叠',
        code: `<JsonViewer collapsed value={{ a: 1 }} />`,
        jsx: `<JsonViewer collapsed value={{ cluster: 'demo', replicas: 3 }} />`,
      },
    ],
  },

  'code-block': {
    imports: `import { CodeBlock } from '@/components/ui'`,
    props: `[{ name: 'code', type: 'string', desc: '代码' }, { name: 'language', type: 'string', desc: '语言标签' }, { name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'compact', type: 'boolean', desc: '紧凑' }]`,
    demos: [
      {
        title: '基础',
        code: `<CodeBlock language="ts" code="export const x = 1" />`,
        jsx: `<CodeBlock language="ts" code={"export const version = '1.0.0'\\n"} />`,
      },
      {
        title: '紧凑',
        code: `<CodeBlock language="bash" compact code="npm install @shidudu2022/x-ui" />`,
        jsx: `<CodeBlock language="bash" compact code="npm install @shidudu2022/x-ui" />`,
      },
      {
        title: '自定义标题',
        code: `<CodeBlock
  title="install.sh"
  compact
  code="curl -fsSL https://example.com/install.sh | sh"
/>`,
        jsx: `<CodeBlock title="install.sh" compact code="curl -fsSL https://example.com/install.sh | sh" />`,
      },
    ],
  },

  'notification-list': {
    imports: `import { NotificationList } from '@/components/ui'`,
    props: `[{ name: 'items', type: 'NotificationItem[]', desc: '通知；tone / unread' }, { name: 'empty', type: 'ReactNode', desc: '空文案' }]`,
    demos: [
      {
        title: '色调 / 未读',
        code: `<NotificationList items={[
  { id: '1', title: '部署完成', tone: 'success', unread: true, time: '刚刚' },
  { id: '2', title: '证书将过期', tone: 'warn', time: '1 小时前' },
]} />`,
        jsx: `<NotificationList items={[{ id: '1', title: '部署完成', description: 'prod 已就绪', time: '刚刚', unread: true, tone: 'success' }, { id: '2', title: '证书将过期', description: '还有 7 天', time: '1 小时前', unread: false, tone: 'warn' }, { id: '3', title: '同步失败', description: '重试中', time: '昨天', unread: true, tone: 'danger' }]} />`,
      },
      {
        title: '空态',
        code: `<NotificationList items={[]} />`,
        jsx: `<NotificationList items={[]} />`,
      },
    ],
  },

  transfer: {
    imports: `import { useState } from 'react'\nimport { Transfer } from '@/components/ui'`,
    hooks: `  const [keys, setKeys] = useState(['b'])\n`,
    props: `[{ name: 'data', type: 'TransferItem[]', desc: '全部项；可 disabled' }, { name: 'targetKeys', type: 'string[]', desc: '右侧选中' }, { name: 'titles', type: '[string, string]', desc: '两侧标题' }, { name: 'searchable', type: 'boolean', default: 'true', desc: '搜索' }]`,
    demos: [
      {
        title: '基础',
        code: `<Transfer
  data={[
    { key: 'a', label: '节点 A' },
    { key: 'b', label: '节点 B' },
    { key: 'c', label: '节点 C' },
    { key: 'd', label: '维护中', disabled: true },
  ]}
  targetKeys={keys}
  onChange={setKeys}
  titles={['可选节点', '已选']}
/>`,
        jsx: `<Transfer data={[{ key: 'a', label: '节点 A' }, { key: 'b', label: '节点 B' }, { key: 'c', label: '节点 C' }, { key: 'd', label: '维护中', disabled: true }]} targetKeys={keys} onChange={setKeys} titles={['可选节点', '已选']} />`,
      },
      {
        title: '无搜索',
        code: `<Transfer
  searchable={false}
  data={[
    { key: 'a', label: 'A' },
    { key: 'b', label: 'B' },
  ]}
  targetKeys={keys}
  onChange={setKeys}
/>`,
        jsx: `<Transfer searchable={false} data={[{ key: 'a', label: 'A' }, { key: 'b', label: 'B' }]} targetKeys={keys} onChange={setKeys} />`,
      },
    ],
  },

  cascader: {
    imports: `import { useState } from 'react'\nimport { Cascader } from '@/components/ui'`,
    hooks: `  const [v, setV] = useState(['cn', 'sh'])\n`,
    props: `[{ name: 'options', type: 'CascaderOption[]', desc: '树选项；单项可 disabled' }, { name: 'value', type: 'string[]', desc: '路径值' }, { name: 'placeholder', type: 'string', desc: '占位' }]`,
    demos: [
      {
        title: '基础',
        code: `<Cascader
  value={v}
  onChange={setV}
  options={[
    {
      value: 'cn',
      label: '中国',
      children: [
        { value: 'sh', label: '上海' },
        { value: 'bj', label: '北京' },
      ],
    },
    {
      value: 'us',
      label: '美国',
      children: [{ value: 'sf', label: '旧金山' }],
    },
  ]}
/>`,
        jsx: `<Cascader value={v} onChange={setV} options={[{ value: 'cn', label: '中国', children: [{ value: 'sh', label: '上海' }, { value: 'bj', label: '北京' }] }, { value: 'us', label: '美国', children: [{ value: 'sf', label: '旧金山' }] }]} />`,
      },
      {
        title: '禁用项',
        code: `<Cascader options={[{ value: 'cn', label: '中国', children: [{ value: 'hk', label: '香港', disabled: true }] }]} />`,
        jsx: `<Cascader value={[]} onChange={setV} options={[{ value: 'cn', label: '中国', children: [{ value: 'sh', label: '上海' }, { value: 'hk', label: '香港', disabled: true }] }]} />`,
      },
    ],
  },

  combobox: {
    imports: `import { useState } from 'react'\nimport { Combobox } from '@/components/ui'`,
    hooks: `  const [v, setV] = useState('sh')\n`,
    props: `[{ name: 'options', type: 'SelectOption[]', desc: '选项' }, { name: 'disabled', type: 'boolean', desc: '禁用' }, { name: 'invalid', type: 'boolean', desc: '校验失败' }]`,
    demos: [
      {
        title: '基础',
        code: `<Combobox
  value={v}
  onChange={setV}
  options={[
    { value: 'sh', label: '上海' },
    { value: 'bj', label: '北京' },
    { value: 'gz', label: '广州' },
  ]}
/>`,
        jsx: `<Combobox value={v} onChange={setV} options={[{ value: 'sh', label: '上海' }, { value: 'bj', label: '北京' }, { value: 'gz', label: '广州' }]} />`,
      },
      {
        title: '增强',
        code: `<Combobox
  disabled
  value={v}
  onChange={setV}
  options={[{ value: 'sh', label: '上海' }]}
/>
<Combobox
  invalid
  value={v}
  onChange={setV}
  options={[
    { value: 'sh', label: '上海' },
    { value: 'bj', label: '北京' },
  ]}
/>`,
        jsx: `<div className="stack" style={{ maxWidth: 280 }}><Combobox disabled value={v} onChange={setV} options={[{ value: 'sh', label: '上海' }]} /><Combobox invalid value={v} onChange={setV} options={[{ value: 'sh', label: '上海' }, { value: 'bj', label: '北京' }]} /></div>`,
      },
    ],
  },

  'date-picker': {
    imports: `import { useState } from 'react'\nimport { DatePicker } from '@/components/ui'`,
    hooks: `  const [date, setDate] = useState('2026-10-25')\n  const [dt, setDt] = useState('2026-10-25T09:30')\n`,
    props: `[{ name: 'mode', type: "'date'|'datetime'", desc: '模式' }, { name: 'value', type: 'string', desc: '值' }, { name: 'inline', type: 'boolean', desc: '内联面板' }, { name: 'disabled', type: 'boolean', desc: '禁用' }, { name: 'invalid', type: 'boolean', desc: '校验失败' }]`,
    demos: [
      {
        title: '日期',
        code: `<DatePicker mode="date" value={date} onChange={setDate} />`,
        jsx: `<DatePicker mode="date" value={date} onChange={setDate} />`,
      },
      {
        title: '日期时间',
        code: `<DatePicker mode="datetime" value={dt} onChange={setDt} minuteStep={5} />`,
        jsx: `<DatePicker mode="datetime" value={dt} onChange={setDt} minuteStep={5} />`,
      },
      {
        title: '增强',
        code: `<DatePicker disabled value={date} />
<DatePicker invalid value={date} onChange={setDate} />`,
        jsx: `<div className="stack" style={{ maxWidth: 280 }}><DatePicker disabled value={date} onChange={setDate} /><DatePicker invalid value={date} onChange={setDate} /></div>`,
      },
    ],
  },

  'time-picker': {
    imports: `import { useState } from 'react'\nimport { TimePicker } from '@/components/ui'`,
    hooks: `  const [time, setTime] = useState('09:30')\n`,
    props: `[{ name: 'value', type: 'string', desc: 'HH:mm' }, { name: 'minuteStep', type: 'number', desc: '分钟步进' }, { name: 'disabled', type: 'boolean', desc: '禁用' }, { name: 'invalid', type: 'boolean', desc: '校验失败' }]`,
    demos: [
      {
        title: '基础',
        code: `<TimePicker value={time} onChange={setTime} minuteStep={5} />`,
        jsx: `<TimePicker value={time} onChange={setTime} minuteStep={5} />`,
      },
      {
        title: '增强',
        code: `<TimePicker disabled value={time} />
<TimePicker invalid value={time} onChange={setTime} />`,
        jsx: `<div className="stack" style={{ maxWidth: 200 }}><TimePicker disabled value={time} onChange={setTime} /><TimePicker invalid value={time} onChange={setTime} /></div>`,
      },
    ],
  },

  'date-range-picker': {
    imports: `import { useState } from 'react'\nimport { DateRangePicker } from '@/components/ui'`,
    hooks: `  const [range, setRange] = useState({ start: '2026-10-01', end: '2026-10-12' })\n  const [dtRange, setDtRange] = useState({ start: '2026-10-01T09:00', end: '2026-10-12T18:00' })\n`,
    props: `[{ name: 'mode', type: "'date'|'datetime'", desc: '模式' }, { name: 'start/end', type: 'string', desc: '范围' }]`,
    demos: [
      {
        title: '日期范围',
        code: `<DateRangePicker mode="date" start={range.start} end={range.end} onChange={setRange} />`,
        jsx: `<DateRangePicker mode="date" start={range.start} end={range.end} onChange={setRange} />`,
      },
      {
        title: '日期时间范围',
        code: `<DateRangePicker mode="datetime" start={dtRange.start} end={dtRange.end} onChange={setDtRange} />`,
        jsx: `<DateRangePicker mode="datetime" start={dtRange.start} end={dtRange.end} onChange={setDtRange} />`,
      },
    ],
  },

  calendar: {
    imports: `import { Calendar } from '@/components/ui'`,
    props: `[{ name: 'events', type: 'CalendarEvent[]', desc: { en: 'Events; optional tone: primary, success, warn, danger', zh: '事件点；tone: primary|success|warn|danger' } }]`,
    demos: [
      {
        title: '事件色调',
        desc: {
          en: 'The Today button in the bottom-right jumps to the current date.',
          zh: '右下角「今天」按钮可快速回到当天。',
        },
        code: `<Calendar events={[
  { date: '2026-10-25', label: 'Ship', tone: 'primary' },
  { date: '2026-10-27', label: 'Done', tone: 'success' },
  { date: '2026-10-28', label: 'Maint', tone: 'warn' },
  { date: '2026-10-30', label: 'Due', tone: 'danger' },
]} />`,
        jsx: `<Calendar events={[{ date: '2026-10-25', label: d('Ship', '发布'), tone: 'primary' }, { date: '2026-10-27', label: d('Done', '完成'), tone: 'success' }, { date: '2026-10-28', label: d('Maint', '维护'), tone: 'warn' }, { date: '2026-10-30', label: d('Due', '截止'), tone: 'danger' }]} />`,
      },
    ],
  },

  'color-input': {
    imports: `import { useState } from 'react'\nimport { ColorInput } from '@/components/ui'`,
    hooks: `  const [color, setColor] = useState('#3b82f6')\n`,
    props: `[{ name: 'value', type: 'string', desc: 'hex' }, { name: 'disabled', type: 'boolean', desc: '禁用' }, { name: 'invalid', type: 'boolean', desc: '校验失败' }]`,
    demos: [
      {
        title: '基础',
        code: `<ColorInput value={color} onChange={setColor} />`,
        jsx: `<ColorInput value={color} onChange={setColor} />`,
      },
      {
        title: '增强',
        code: `<ColorInput disabled value={color} />
<ColorInput invalid value={color} onChange={setColor} />`,
        jsx: `<div className="stack" style={{ maxWidth: 240 }}><ColorInput disabled value={color} onChange={setColor} /><ColorInput invalid value={color} onChange={setColor} /></div>`,
      },
    ],
  },

  'color-field': {
    imports: `import { useState } from 'react'\nimport { ColorField } from '@/components/ui'`,
    hooks: `  const [color, setColor] = useState('#3b82f6')\n`,
    props: `[{ name: 'label', type: 'string', desc: '标签' }, { name: 'disabled', type: 'boolean', desc: '禁用' }, { name: 'invalid', type: 'boolean', desc: '校验失败' }]`,
    demos: [
      {
        title: '基础',
        code: `<ColorField label="品牌色" value={color} onChange={setColor} />`,
        jsx: `<ColorField label="品牌色" value={color} onChange={setColor} />`,
      },
      {
        title: '增强',
        code: `<ColorField label="禁用" disabled value={color} />
<ColorField label="无效" invalid value={color} onChange={setColor} />`,
        jsx: `<div className="stack"><ColorField label="禁用" disabled value={color} onChange={setColor} /><ColorField label="无效" invalid value={color} onChange={setColor} /></div>`,
      },
    ],
  },

  sparkline: {
    imports: `import { Sparkline, Stat } from '@/components/ui'`,
    props: `[{ name: 'data', type: 'number[]', desc: '点列' }, { name: 'color', type: 'string', desc: '描边色' }, { name: 'height', type: 'number', desc: '高度' }]`,
    demos: [
      {
        title: '基础',
        code: `<Sparkline data={[3, 5, 4, 8, 6, 9, 7]} />`,
        jsx: `<div className="showcase-row" style={{ alignItems: 'center', gap: 24 }}><Sparkline data={[3, 5, 4, 8, 6, 9, 7]} /><Sparkline data={[9, 7, 8, 4, 5, 3, 2]} color="var(--danger)" height={36} /></div>`,
      },
      {
        title: '配合 Stat',
        code: `<Stat label="QPS" value="1.2k" data={[3, 5, 4, 8, 6, 9, 7]} />`,
        jsx: `<Stat label="QPS" value="1.2k" delta="+4%" data={[3, 5, 4, 8, 6, 9, 7]} />`,
      },
    ],
  },

  stat: {
    imports: `import { Stat } from '@/components/ui'`,
    props: `[{ name: 'label', type: 'string', desc: '标签' }, { name: 'value', type: 'string|number', desc: '数值' }, { name: 'delta', type: 'string', desc: '变化' }, { name: 'data', type: 'number[]', desc: '迷你图' }]`,
    demos: [
      {
        title: '基础',
        code: `<Stat label="QPS" value="1.2k" delta="+4%" data={[3, 5, 4, 8, 6, 9, 7]} />`,
        jsx: `<div className="showcase-row" style={{ gap: 24 }}><Stat label="QPS" value="1.2k" delta="+4%" data={[3, 5, 4, 8, 6, 9, 7]} /><Stat label="错误" value="12" delta="-2%" /></div>`,
      },
    ],
  },

  metric: {
    imports: `import { Metric, MetricGrid } from '@/components/ui'`,
    props: `[{ name: 'label', type: 'ReactNode', desc: '标签' }, { name: 'value', type: 'ReactNode', desc: '数值' }]`,
    demos: [
      {
        title: '基础',
        code: `<MetricGrid>
  <Metric label="请求" value="12.4k" />
  <Metric label="延迟" value="86ms" />
</MetricGrid>`,
        jsx: `<MetricGrid><Metric label="请求" value="12.4k" /><Metric label="延迟" value="86ms" /><Metric label="错误率" value="0.2%" /></MetricGrid>`,
      },
    ],
  },

  'resource-state': {
    imports: `import { Button, ResourceState, Text } from '@/components/ui'`,
    props: `[{ name: 'status', type: "'idle'|'loading'|'empty'|'error'|'offline'", desc: '状态' }, { name: 'loadingVariant', type: "'spinner'|'skeleton'|'table'|'card'", desc: '加载样式' }]`,
    demos: [
      {
        title: '状态',
        code: `<ResourceState
  status="empty"
  emptyTitle="还没有资源"
  emptyDescription="创建第一条开始。"
  emptyAction={<Button variant="primary">创建</Button>}
/>
<ResourceState status="error" onRetry={() => undefined} />
<ResourceState status="offline" onRetry={() => undefined} />
<ResourceState status="idle">
  <Text variant="muted" size="md">正常内容</Text>
</ResourceState>`,
        jsx: `<div className="grid-2"><ResourceState status="empty" emptyTitle="还没有资源" emptyDescription="创建第一条开始。" emptyAction={<Button variant="primary">创建</Button>} /><ResourceState status="error" onRetry={() => undefined} /><ResourceState status="offline" onRetry={() => undefined} /><ResourceState status="idle"><Text variant="muted" size="md">正常内容</Text></ResourceState></div>`,
      },
      {
        title: '加载样式',
        code: `<ResourceState status="loading" loadingVariant="spinner" />
<ResourceState status="loading" loadingVariant="table" />`,
        jsx: `<div className="grid-2"><ResourceState status="loading" loadingVariant="spinner" /><ResourceState status="loading" loadingVariant="skeleton" /><ResourceState status="loading" loadingVariant="table" /><ResourceState status="loading" loadingVariant="card" /></div>`,
      },
    ],
  },

  'cell-ellipsis': {
    imports: `import { CellEllipsis, CellStack } from '@/components/ui'`,
    props: `[{ name: 'children', type: 'ReactNode', desc: '内容' }, { name: 'title', type: 'string', desc: '原生 title 提示' }]`,
    demos: [
      {
        title: '截断',
        code: `<CellEllipsis title="很长的资源名称 api-gateway-prod-east-01">
  很长的资源名称 api-gateway-prod-east-01
</CellEllipsis>`,
        jsx: `<div style={{ width: 160 }}><CellEllipsis title="很长的资源名称 api-gateway-prod-east-01">很长的资源名称 api-gateway-prod-east-01</CellEllipsis></div>`,
      },
      {
        title: '双行',
        code: `<CellStack>
  <strong>api-gateway</strong>
  <span className="muted">cn-east / production</span>
</CellStack>`,
        jsx: `<div style={{ width: 160 }}><CellStack><strong>api-gateway</strong><span className="muted">cn-east / production</span></CellStack></div>`,
      },
    ],
  },

  'tree-table-cell': {
    imports: `import { useState } from 'react'\nimport { TreeTableCell } from '@/components/ui'`,
    hooks: `  const [open, setOpen] = useState(true)\n`,
    props: `[{ name: 'depth', type: 'number', desc: '缩进层级' }, { name: 'expandable', type: 'boolean', desc: '可展开' }, { name: 'expanded', type: 'boolean', desc: '展开态' }, { name: 'onToggle', type: '() => void', desc: '切换' }]`,
    demos: [
      {
        title: '基础',
        code: `<TreeTableCell
  depth={0}
  expandable
  expanded={open}
  onToggle={() => setOpen((v) => !v)}
>
  cluster
</TreeTableCell>
{open ? <TreeTableCell depth={1}>default</TreeTableCell> : null}
<TreeTableCell depth={1}>kube-system</TreeTableCell>`,
        jsx: `<div className="stack"><TreeTableCell depth={0} expandable expanded={open} onToggle={() => setOpen((v) => !v)}>cluster</TreeTableCell>{open ? <TreeTableCell depth={1}>default</TreeTableCell> : null}<TreeTableCell depth={1}>kube-system</TreeTableCell></div>`,
      },
    ],
  },

  table: {
    imports: `import { useState } from 'react'\nimport { Table, type TableColumn } from '@/components/ui'`,
    hooks: `  type Row = { id: string; name: string; region: string }
  const rows: Row[] = [
    { id: '1', name: 'api-gateway', region: 'cn-east' },
    { id: '2', name: 'worker', region: 'cn-north' },
    { id: '3', name: 'cache', region: 'cn-east' },
  ]
  const columns: TableColumn<Row>[] = [
    { key: 'name', header: '名称', sortable: true, render: (r) => r.name },
    { key: 'region', header: '区域', sortable: true, render: (r) => r.region },
  ]
  const [sortKey, setSortKey] = useState<string | null>('name')
  const [sortDir, setSortDir] = useState<'asc' | 'desc' | null>('asc')
  const [selected, setSelected] = useState<string[]>([])
`,
    props: `[{ name: 'columns', type: 'TableColumn<T>[]', desc: '列；sortable 开启排序' }, { name: 'selectable', type: 'boolean', desc: '多选' }, { name: 'sortKey/sortDir/onSort', type: 'controlled sort', desc: '排序' }]`,
    demos: [
      {
        title: '基础',
        code: `<Table columns={columns} rows={rows} rowKey={(r) => r.id} />`,
        jsx: `<Table columns={columns} rows={rows} rowKey={(r) => r.id} />`,
      },
      {
        title: '排序',
        code: `<Table
  columns={columns}
  rows={rows}
  rowKey={(r) => r.id}
  sortKey={sortKey}
  sortDir={sortDir}
  onSort={(key) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else {
      setSortKey(key)
      setSortDir('asc')
    }
  }}
/>`,
        jsx: `<Table columns={columns} rows={rows} rowKey={(r) => r.id} sortKey={sortKey} sortDir={sortDir} onSort={(key) => { if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc')); else { setSortKey(key); setSortDir('asc') } }} />`,
      },
      {
        title: '多选',
        code: `<Table
  columns={columns}
  rows={rows}
  rowKey={(r) => r.id}
  selectable
  selectedKeys={selected}
  onSelectedChange={setSelected}
/>`,
        jsx: `<Table columns={columns} rows={rows} rowKey={(r) => r.id} selectable selectedKeys={selected} onSelectedChange={setSelected} />`,
      },
    ],
  },

  'data-table': {
    imports: `import { useState } from 'react'\nimport { DataTable, type DataTableColumn } from '@/components/ui'`,
    hooks: `  type Row = { id: string; name: string; status: string }
  const rows: Row[] = [
    { id: '1', name: 'api-gateway', status: 'Running' },
    { id: '2', name: 'worker', status: 'Pending' },
    { id: '3', name: 'cache', status: 'Running' },
  ]
  const columns: DataTableColumn<Row>[] = [
    { key: 'name', header: '名称', sortable: true, render: (r) => r.name },
    { key: 'status', header: '状态', sortable: true, render: (r) => r.status },
  ]
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
`,
    props: `[{ name: 'columns', type: 'DataTableColumn<T>[]', desc: '列' }, { name: 'loading', type: 'boolean', desc: '骨架加载' }, { name: 'selectedKeys', type: 'string[]', desc: '多选' }, { name: 'defaultSortKey', type: 'string', desc: '默认排序' }]`,
    demos: [
      {
        title: '基础',
        desc: '内置分页与排序。完整场景见「列表」示例页。',
        code: `<DataTable columns={columns} rows={rows} rowKey={(r) => r.id} defaultSortKey="name" />`,
        jsx: `<DataTable columns={columns} rows={rows} rowKey={(r) => r.id} defaultSortKey="name" framed={false} />`,
      },
      {
        title: '多选',
        code: `<DataTable
  columns={columns}
  rows={rows}
  rowKey={(r) => r.id}
  framed={false}
  selectedKeys={selectedKeys}
  onSelectedKeysChange={setSelectedKeys}
  bulkActions={<span className="muted">Selected {selectedKeys.length}</span>}
/>`,
        jsx: `<DataTable columns={columns} rows={rows} rowKey={(r) => r.id} framed={false} selectedKeys={selectedKeys} onSelectedKeysChange={setSelectedKeys} bulkActions={<span className="muted">{d('Selected', '已选')} {selectedKeys.length}</span>} />`,
      },
      {
        title: '加载',
        code: `<button
  type="button"
  className="btn btn-sm"
  onClick={() => setLoading((v) => !v)}
>
  {loading ? '显示数据' : '显示加载'}
</button>
<DataTable
  columns={columns}
  rows={loading ? [] : rows}
  rowKey={(r) => r.id}
  loading={loading}
  framed={false}
/>`,
        jsx: `<div className="stack"><button type="button" className="btn btn-sm" onClick={() => setLoading((v) => !v)}>{loading ? '显示数据' : '显示加载'}</button><DataTable columns={columns} rows={loading ? [] : rows} rowKey={(r) => r.id} loading={loading} framed={false} /></div>`,
      },
    ],
  },

  'resource-list': {
    imports: `import { useState } from 'react'\nimport { Button, ResourceList, type ResourceColumn } from '@/components/ui'`,
    hooks: `  type Row = { id: string; name: string; region: string }
  const rows: Row[] = [
    { id: '1', name: 'prod-api', region: 'cn-east' },
    { id: '2', name: 'staging', region: 'cn-north' },
  ]
  const columns: ResourceColumn<Row>[] = [
    { key: 'name', header: '名称', render: (r) => r.name },
    { key: 'region', header: '区域', render: (r) => r.region, muted: true },
  ]
  const [loading, setLoading] = useState(false)
`,
    props: `[{ name: 'loading', type: 'boolean', desc: '骨架' }, { name: 'emptyTitle', type: 'string', desc: '空态标题' }, { name: 'filters', type: 'ResourceFilter[]', desc: '筛选' }]`,
    demos: [
      {
        title: '基础',
        desc: '筛选条 + 表格 + 行操作。',
        code: `<ResourceList
  framed={false}
  columns={columns}
  rows={rows}
  rowKey={(r) => r.id}
  filters={[
    {
      key: 'region',
      label: '区域',
      type: 'select',
      options: [
        { value: 'cn-east', label: '华东' },
        { value: 'cn-north', label: '华北' },
      ],
    },
  ]}
  filterValues={{}}
  onFilterChange={() => undefined}
  onSearch={() => undefined}
  onRefresh={() => undefined}
  page={1}
  pageSize={10}
  total={rows.length}
  onPageChange={() => undefined}
  rowActions={[{ key: 'edit', label: '编辑', onClick: () => undefined }]}
  toolbar={<Button variant="primary">新建</Button>}
/>`,
        jsx: `<ResourceList framed={false} columns={columns} rows={rows} rowKey={(r) => r.id} filters={[{ key: 'region', label: '区域', type: 'select', options: [{ value: 'cn-east', label: '华东' }, { value: 'cn-north', label: '华北' }] }]} filterValues={{}} onFilterChange={() => undefined} onSearch={() => undefined} onRefresh={() => undefined} page={1} pageSize={10} total={rows.length} onPageChange={() => undefined} rowActions={[{ key: 'edit', label: '编辑', onClick: () => undefined }]} toolbar={<Button variant="primary">新建</Button>} />`,
      },
      {
        title: '加载',
        code: `<Button size="sm" onClick={() => setLoading((v) => !v)}>
  {loading ? '显示空态' : '显示加载'}
</Button>
<ResourceList
  framed={false}
  columns={columns}
  rows={[]}
  rowKey={(r) => r.id}
  loading={loading}
  emptyTitle="暂无资源"
  emptyDesc="创建第一条开始。"
  page={1}
  pageSize={10}
  total={0}
  onPageChange={() => undefined}
  onRefresh={() => undefined}
/>`,
        jsx: `<div className="stack"><Button size="sm" onClick={() => setLoading((v) => !v)}>{loading ? '显示空态' : '显示加载'}</Button><ResourceList framed={false} columns={columns} rows={[]} rowKey={(r) => r.id} loading={loading} emptyTitle="暂无资源" emptyDesc="创建第一条开始。" page={1} pageSize={10} total={0} onPageChange={() => undefined} onRefresh={() => undefined} /></div>`,
      },
    ],
  },

  'line-chart': {
    imports: `import { ChartContainer, LineChart, CHART_STATUS } from '@/components/charts'`,
    props: `[{ name: 'data', type: 'object[]', desc: '数据' }, { name: 'series', type: 'LineSeries[]', desc: '系列' }]`,
    demos: [
      {
        title: '基础',
        code: `<ChartContainer title="请求量">
  <LineChart
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
        jsx: `<ChartContainer title="请求量"><LineChart data={[{ month: 'Jan', requests: 400 }, { month: 'Feb', requests: 520 }, { month: 'Mar', requests: 480 }]} xKey="month" series={[{ dataKey: 'requests', name: '请求', color: CHART_STATUS.primary }]} /></ChartContainer>`,
      },
    ],
  },

  'area-chart': {
    imports: `import { AreaChart, ChartContainer, CHART_STATUS } from '@/components/charts'`,
    props: `[]`,
    demos: [
      {
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
      },
    ],
  },

  'bar-chart': {
    imports: `import { BarChart, ChartContainer, CHART_STATUS } from '@/components/charts'`,
    props: `[]`,
    demos: [
      {
        title: '基础',
        code: `<ChartContainer title="服务健康">
  <BarChart
    data={[
      { name: 'API', ok: 120, fail: 8 },
      { name: 'Worker', ok: 90, fail: 12 },
    ]}
    xKey="name"
    series={[
      {
        dataKey: 'ok',
        name: '成功',
        stackId: 'a',
        color: CHART_STATUS.success,
      },
      {
        dataKey: 'fail',
        name: '失败',
        stackId: 'a',
        color: CHART_STATUS.danger,
      },
    ]}
  />
</ChartContainer>`,
        jsx: `<ChartContainer title="服务健康"><BarChart data={[{ name: 'API', ok: 120, fail: 8 }, { name: 'Worker', ok: 90, fail: 12 }]} xKey="name" series={[{ dataKey: 'ok', name: '成功', stackId: 'a', color: CHART_STATUS.success }, { dataKey: 'fail', name: '失败', stackId: 'a', color: CHART_STATUS.danger }]} /></ChartContainer>`,
      },
    ],
  },

  'pie-chart': {
    imports: `import { ChartContainer, PieChart, CHART_STATUS } from '@/components/charts'`,
    props: `[{ name: 'donut', type: 'boolean', desc: '环形' }]`,
    demos: [
      {
        title: '环形',
        code: `<ChartContainer title="分布" height={280}>
  <PieChart
    donut
    data={[
      { name: '运行中', value: 58, color: CHART_STATUS.success },
      { name: '排队', value: 22, color: CHART_STATUS.info },
      { name: '失败', value: 12, color: CHART_STATUS.danger },
    ]}
  />
</ChartContainer>`,
        jsx: `<ChartContainer title="分布" height={280}><PieChart donut data={[{ name: '运行中', value: 58, color: CHART_STATUS.success }, { name: '排队', value: 22, color: CHART_STATUS.info }, { name: '失败', value: 12, color: CHART_STATUS.danger }]} /></ChartContainer>`,
      },
      {
        title: '实心',
        code: `<ChartContainer title="实心饼图" height={280}>
  <PieChart
    data={[
      { name: '运行中', value: 58, color: CHART_STATUS.success },
      { name: '排队', value: 22, color: CHART_STATUS.info },
      { name: '失败', value: 12, color: CHART_STATUS.danger },
    ]}
  />
</ChartContainer>`,
        jsx: `<ChartContainer title="实心饼图" height={280}><PieChart data={[{ name: '运行中', value: 58, color: CHART_STATUS.success }, { name: '排队', value: 22, color: CHART_STATUS.info }, { name: '失败', value: 12, color: CHART_STATUS.danger }]} /></ChartContainer>`,
      },
    ],
  },

  'radial-progress': {
    imports: `import { ChartContainer, RadialProgress } from '@/components/charts'`,
    props: `[{ name: 'value', type: 'number', desc: '0–100' }, { name: 'label', type: 'ReactNode', desc: '中心标签' }]`,
    demos: [
      {
        title: '基础',
        code: `<RadialProgress value={76} label="本周目标" />`,
        jsx: `<ChartContainer title="完成度" height={240}><RadialProgress value={76} label="本周目标" /></ChartContainer>`,
      },
    ],
  },

  'chart-container': {
    imports: `import { ChartContainer } from '@/components/charts'\nimport { Text } from '@/components/ui'`,
    props: `[{ name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'empty', type: 'boolean', desc: '空态' }, { name: 'loading', type: 'boolean', desc: '加载' }]`,
    demos: [
      {
        title: '基础',
        code: `<ChartContainer title="标题" description="说明">{children}</ChartContainer>`,
        jsx: `<ChartContainer title="示例" description="说明"><div style={{ padding: 24 }}><Text variant="muted">图表内容区</Text></div></ChartContainer>`,
      },
      {
        title: '空态',
        code: `<ChartContainer title="空态" empty />`,
        jsx: `<ChartContainer title="空态" empty />`,
      },
      {
        title: '加载',
        code: `<ChartContainer title="加载中" loading />`,
        jsx: `<ChartContainer title="加载中" loading />`,
      },
    ],
  },

  'input-group': {
    imports: `import { Input, InputGroup } from '@/components/ui'`,
    props: `[{ name: 'prefix', type: 'ReactNode', desc: '前缀' }, { name: 'suffix', type: 'ReactNode', desc: '后缀' }, { name: 'size', type: "'sm'|'md'|'lg'", desc: '尺寸' }]`,
    demos: [
      {
        title: '前缀 / 后缀',
        code: `<InputGroup prefix="https://" suffix=".com">
  <Input placeholder="example" />
</InputGroup>`,
        jsx: `<InputGroup prefix="https://" suffix=".com"><Input placeholder="example" /></InputGroup>`,
      },
      {
        title: '尺寸',
        code: `<InputGroup size="sm" prefix="¥"><Input /></InputGroup>
<InputGroup size="lg" suffix="GB"><Input /></InputGroup>`,
        jsx: `<div className="stack" style={{ maxWidth: 280 }}><InputGroup size="sm" prefix="¥"><Input placeholder="sm" /></InputGroup><InputGroup size="lg" suffix="GB"><Input placeholder="lg" /></InputGroup></div>`,
      },
    ],
  },

  'stat-card': {
    imports: `import { Button, StatCard } from '@/components/ui'`,
    props: `[{ name: 'label', type: 'ReactNode', desc: '标签' }, { name: 'value', type: 'ReactNode', desc: '数值' }, { name: 'hint', type: 'ReactNode', desc: '辅助' }, { name: 'tone', type: "'neutral'|'success'|'warn'|'danger'|'info'", desc: '色调' }, { name: 'action', type: 'ReactNode', desc: '右上操作' }]`,
    demos: [
      {
        title: '色调',
        code: `<StatCard label="中性" value="—" tone="neutral" />
<StatCard label="成功" value="12" tone="success" />
<StatCard label="警告" value="3" tone="warn" />
<StatCard label="危险" value="1" tone="danger" />
<StatCard label="信息" value="8" tone="info" />`,
        jsx: `<div className="grid-2"><StatCard label="中性" value="—" hint="无数据" tone="neutral" /><StatCard label="成功" value="12" hint="较上周 +2" tone="success" /><StatCard label="警告" value="3" hint="需处理" tone="warn" /><StatCard label="危险" value="1" hint="立即处理" tone="danger" /><StatCard label="信息" value="8" hint="进行中" tone="info" /></div>`,
        wide: true,
      },
      {
        title: '增强',
        desc: '右上角 action。',
        code: `<StatCard label="配额" value="86%" hint="剩余 14%" tone="info" action={<Button size="sm">详情</Button>} />`,
        jsx: `<StatCard label="配额" value="86%" hint="剩余 14%" tone="info" action={<Button size="sm">详情</Button>} />`,
      },
    ],
  },

  'page-header': {
    imports: `import { Badge, Button, MetaRow, Muted, PageHeader } from '@/components/ui'`,
    props: `[{ name: 'title', type: 'ReactNode', desc: '标题（页级 h1）' }, { name: 'description', type: 'ReactNode', desc: '副文案，可混排 MetaRow' }, { name: 'actions', type: 'ReactNode', desc: '右侧自定义操作' }, { name: 'actionItems', type: 'PageHeaderActionItem[]', desc: '声明式操作（可 overflow）' }, { name: 'overflowActions', type: 'DropdownItem[]', desc: '仅菜单项' }]`,
    demos: [
      {
        title: '页头排版',
        desc: '一页一个主标题；描述保持一两句，操作靠右。',
        code: `<PageHeader
  title="工作负载"
  description="管理集群中的 Deployment 与状态。"
  actions={<Button variant="primary">创建</Button>}
/>`,
        jsx: `<PageHeader title="工作负载" description="管理集群中的 Deployment 与状态。" actions={<Button variant="primary">创建</Button>} />`,
        wide: true,
      },
      {
        title: '描述混排',
        desc: 'description 可放 MetaRow，携带状态与环境。',
        code: `<PageHeader
  title="api-gateway"
  description={
    <MetaRow>
      <Badge tone="success" size="sm">Running</Badge>
      <Muted>production</Muted>
      <Muted>cn-east</Muted>
    </MetaRow>
  }
  actionItems={[
    { id: 'edit', label: '编辑', onClick: () => {} },
    { id: 'more', label: '更多', overflow: true, onClick: () => {} },
  ]}
/>`,
        jsx: `<PageHeader title="api-gateway" description={<MetaRow><Badge tone="success" size="sm">Running</Badge><Muted>production</Muted><Muted>cn-east</Muted></MetaRow>} actionItems={[{ id: 'edit', label: '编辑', onClick: () => undefined }, { id: 'refresh', label: '刷新', onClick: () => undefined }, { id: 'more', label: '克隆', overflow: true, onClick: () => undefined }]} overflowActions={[{ id: 'del', label: '删除', danger: true, onSelect: () => undefined }]} />`,
        wide: true,
      },
    ],
  },

  'dropdown-menu': {
    imports: `import { Button, DropdownMenu } from '@/components/ui'`,
    props: `[{ name: 'trigger', type: 'ReactNode', desc: '触发器' }, { name: 'items', type: 'DropdownItem[]', desc: '菜单项（danger / disabled / separator）' }, { name: 'align', type: "'start'|'end'", default: "'end'", desc: '对齐' }]`,
    demos: [
      {
        title: '基础',
        code: `<DropdownMenu
  trigger={<Button>菜单</Button>}
  items={[
    { id: 'edit', label: '编辑', onSelect: () => {} },
    { id: 'sep', label: '', separator: true },
    { id: 'del', label: '删除', danger: true, onSelect: () => {} },
  ]}
/>`,
        jsx: `<DropdownMenu trigger={<Button>菜单</Button>} items={[{ id: 'edit', label: '编辑', onSelect: () => undefined }, { id: 'sep', label: '', separator: true }, { id: 'del', label: '删除', danger: true, onSelect: () => undefined }]} />`,
      },
      {
        title: '增强',
        desc: '禁用项与 start 对齐。',
        code: `<DropdownMenu
  align="start"
  trigger={<Button variant="ghost">更多</Button>}
  items={[
    { id: 'a', label: '查看', onSelect: () => {} },
    { id: 'b', label: '归档', disabled: true },
    { id: 'c', label: '删除', danger: true, onSelect: () => {} },
  ]}
/>`,
        jsx: `<DropdownMenu align="start" trigger={<Button variant="ghost">更多</Button>} items={[{ id: 'a', label: '查看', onSelect: () => undefined }, { id: 'b', label: '归档', disabled: true }, { id: 'sep', label: '', separator: true }, { id: 'c', label: '删除', danger: true, onSelect: () => undefined }]} />`,
      },
    ],
  },

  'text-link': {
    imports: `import { Text, TextLink } from '@/components/ui'`,
    props: `[{ name: 'href', type: 'string', desc: '链接' }, { name: 'external', type: 'boolean', desc: '外链（新窗口 + 图标）' }, { name: 'muted', type: 'boolean', desc: '弱化样式' }]`,
    demos: [
      {
        title: '句中链接',
        desc: '嵌在正文里，而不是单独一行摆按钮。',
        code: `<Text as="p">
  See the full font-size scale at{' '}
  <TextLink href="/examples/typography">Typography</TextLink>
  , design tokens at{' '}
  <TextLink href="/foundations">Foundations</TextLink>.
</Text>`,
        jsx: `<Text as="p">{d('See the full font-size scale at ', '完整字号阶梯见 ')}<TextLink href="/examples/typography">{d('Typography', '字体字号')}</TextLink>{d(', design tokens at ', '，设计令牌见 ')}<TextLink href="/foundations">{d('Foundations', '基础')}</TextLink>{d('.', '。')}</Text>`,
      },
      {
        title: '外链 / 弱化',
        code: `<TextLink href="https://example.com" external>文档站点</TextLink>
<TextLink href="/components" muted>次要入口</TextLink>`,
        jsx: `<div className="stack"><TextLink href="https://example.com" external>文档站点</TextLink><Text variant="muted" size="sm">次要操作可用 <TextLink href="/components" muted>弱化链接</TextLink>。</Text></div>`,
      },
    ],
  },

  'meta-row': {
    imports: `import { Badge, Card, Heading, MetaRow, Muted, StatusDot, Tag, Text } from '@/components/ui'`,
    props: `[{ name: 'children', type: 'ReactNode', desc: '行内混排（文字 / Badge / Tag / StatusDot）' }]`,
    demos: [
      {
        title: '资源行',
        desc: '列表主列、页头描述常用：名称 + 状态 + 环境。',
        code: `<MetaRow>
  <Text variant="strong">api-gateway</Text>
  <Badge tone="success" size="sm">Running</Badge>
  <Muted>cn-east</Muted>
</MetaRow>`,
        jsx: `<div className="stack"><MetaRow><Text variant="strong">api-gateway</Text><Badge tone="success" size="sm">Running</Badge><Muted>cn-east</Muted></MetaRow><MetaRow><Text variant="strong">worker</Text><Badge tone="warn" size="sm">Pending</Badge><Muted>cn-north</Muted></MetaRow></div>`,
      },
      {
        title: '状态点 + 版本',
        code: `<MetaRow>
  <StatusDot tone="ok" />
  <span>worker-01</span>
  <Tag tone="info" size="sm">v1.2</Tag>
</MetaRow>`,
        jsx: `<Card padded className="stack"><Heading level="card">节点</Heading><MetaRow><StatusDot tone="ok" /><span>worker-01</span><Tag tone="info" size="sm">v1.2</Tag><Badge tone="success" size="sm">Ready</Badge></MetaRow><Text variant="hint">MetaRow 只管横向间距，不负责换行策略。</Text></Card>`,
      },
    ],
  },

  brand: {
    imports: `import { Brand } from '@/components/layout'`,
    props: `[{ name: 'mark', type: 'ReactNode', default: "'X'", desc: '徽标' }, { name: 'text', type: 'ReactNode', default: "'X-UI'", desc: '文案' }, { name: 'showText', type: 'boolean', default: 'true', desc: '显示文案（侧栏折叠时常关）' }]`,
    demos: [
      {
        title: '品牌标识',
        desc: '侧栏顶部品牌；折叠时通常 showText={false}。',
        code: `<Brand />
<Brand mark="D" text="Demo" />
<Brand showText={false} />`,
        jsx: `<div className="showcase-row" style={{ gap: 24, alignItems: 'center' }}><Brand /><Brand mark="D" text="Demo" /><Brand showText={false} /></div>`,
      },
    ],
  },

  'range-slider': {
    imports: `import { useState } from 'react'\nimport { RangeSlider } from '@/components/ui'`,
    hooks: `  const [v, setV] = useState(40)\n  const [v2, setV2] = useState(2)\n`,
    props: `[{ name: 'value', type: 'number', desc: '值' }, { name: 'onChange', type: '(n: number) => void', desc: '变更' }, { name: 'min/max/step', type: 'number', desc: '范围' }, { name: 'label', type: 'string', desc: '标签' }]`,
    demos: [
      {
        title: '基础',
        code: `<RangeSlider value={v} onChange={setV} label="配额" />`,
        jsx: `<RangeSlider value={v} onChange={setV} label="配额" />`,
      },
      {
        title: '步进',
        code: `<RangeSlider min={0} max={10} step={2} value={v2} onChange={setV2} label="副本" />`,
        jsx: `<RangeSlider min={0} max={10} step={2} value={v2} onChange={setV2} label="副本" />`,
      },
    ],
  },
}
