import { useState } from 'react'
import {
  AvatarUpload,
  BreadcrumbNav,
  Button,
  Calendar,
  Cascader,
  Checklist,
  CodeBlock,
  Combobox,
  CopyButton,
  DatePicker,
  DateRangePicker,
  Divider,
  Field,
  FormErrors,
  MaintenanceBanner,
  MirrorCard,
  NodePicker,
  NotificationList,
  PageHeader,
  Sheet,
  Sparkline,
  Stat,
  TextLink,
  Transfer,
} from '@/components/ui'
import { ShowcaseSection } from '../ShowcaseSection'

export function AdvancedPage() {
  const [date, setDate] = useState('2026-10-25')
  const [range, setRange] = useState({ start: '2026-10-01', end: '2026-10-12' })
  const [combo, setCombo] = useState('sh')
  const [sheetOpen, setSheetOpen] = useState(false)
  const [cascade, setCascade] = useState<string[]>(['cn', 'sh'])
  const [transfer, setTransfer] = useState(['b'])
  const [checks, setChecks] = useState({ a: true, b: false, c: false })

  return (
    <div>
      <PageHeader title="进阶组件" description="日期、级联、穿梭、Sheet、通知等。" />

      <ShowcaseSection title="Date / Combobox / Cascader">
        <div className="grid-2">
          <Field label="日期">
            <DatePicker value={date} onChange={setDate} />
          </Field>
          <Field label="日期范围">
            <DateRangePicker start={range.start} end={range.end} onChange={setRange} />
          </Field>
          <Field label="可搜索选择">
            <Combobox
              value={combo}
              onChange={setCombo}
              options={[
                { value: 'sh', label: '上海' },
                { value: 'bj', label: '北京' },
                { value: 'gz', label: '广州' },
                { value: 'sz', label: '深圳' },
              ]}
            />
          </Field>
          <Field label="级联">
            <Cascader
              value={cascade}
              onChange={setCascade}
              options={[
                {
                  value: 'cn',
                  label: '中国',
                  children: [
                    { value: 'sh', label: '上海' },
                    { value: 'bj', label: '北京' },
                  ],
                },
                { value: 'jp', label: '日本', children: [{ value: 'tyo', label: '东京' }] },
              ]}
            />
          </Field>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Transfer / Sheet / Link">
        <Transfer
          data={[
            { key: 'a', label: 'API' },
            { key: 'b', label: 'Worker' },
            { key: 'c', label: 'Cache' },
            { key: 'd', label: 'Queue' },
          ]}
          targetKeys={transfer}
          onChange={setTransfer}
        />
        <div className="showcase-row" style={{ marginTop: 16 }}>
          <Button variant="primary" onClick={() => setSheetOpen(true)}>
            打开 Bottom Sheet
          </Button>
          <TextLink href="https://example.com">外链示例</TextLink>
          <CopyButton value="pnpm add x-ui" />
        </div>
        <Sheet
          open={sheetOpen}
          onClose={() => setSheetOpen(false)}
          title="快捷操作"
          footer={
            <Button variant="primary" onClick={() => setSheetOpen(false)}>
              完成
            </Button>
          }
        >
          <p className="muted">适合移动端或窄屏的底部面板。</p>
        </Sheet>
      </ShowcaseSection>

      <ShowcaseSection title="Stat / Calendar / Code">
        <div className="grid-2">
          <Stat label="请求量" value="12.4k" delta="+8.2%" data={[4, 6, 5, 9, 8, 12, 11]} />
          <div className="stat">
            <div className="label">Sparkline</div>
            <Sparkline data={[2, 4, 3, 7, 6, 9, 8, 10]} height={36} />
          </div>
        </div>
        <div style={{ marginTop: 16 }}>
          <Calendar
            events={[
              { date: '2026-10-25', label: '发布', tone: 'primary' },
              { date: '2026-10-28', label: '维护', tone: 'warn' },
            ]}
          />
        </div>
        <div style={{ marginTop: 16 }}>
          <CodeBlock language="bash" code={`npm create vite@latest\npnpm add lucide-react recharts`} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Checklist / Banner / Node / Mirror">
        <MaintenanceBanner />
        <Divider label="其它" />
        <Checklist
          items={[
            { id: 'a', title: '开启 TLS', description: '强制 HTTPS', checked: checks.a },
            { id: 'b', title: '备份策略', checked: checks.b },
            { id: 'c', title: '告警通道', checked: checks.c },
          ]}
          onChange={(id, checked) => setChecks((s) => ({ ...s, [id]: checked }))}
        />
        <div className="grid-2" style={{ marginTop: 16 }}>
          <NodePicker
            value="n1"
            options={[
              { id: 'n1', title: 'node-a', meta: 'ready' },
              { id: 'n2', title: 'node-b', meta: 'busy' },
            ]}
          />
          <MirrorCard title="镜像源">registry.example.com/x-ui</MirrorCard>
        </div>
        <div style={{ marginTop: 16 }}>
          <AvatarUpload name="Admin" />
        </div>
        <FormErrors errors={['用户名不能为空', '密码至少 8 位']} />
        <BreadcrumbNav
          items={[
            { label: '组件', to: '/components/buttons' },
            { label: '进阶', to: '/components/advanced' },
            { label: '当前' },
          ]}
        />
        <NotificationList
          items={[
            { id: '1', title: '构建成功', description: 'main · 2m', unread: true, time: '刚刚' },
            { id: '2', title: '证书将过期', description: '还剩 7 天', tone: 'warn', time: '1h' },
          ]}
        />
      </ShowcaseSection>
    </div>
  )
}
