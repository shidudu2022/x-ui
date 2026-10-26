import { useState } from 'react'
import {
  Card,
  Checkbox,
  DatePicker,
  DateRangePicker,
  Field,
  FileUpload,
  Input,
  InputGroup,
  NumberStepper,
  PageHeader,
  PinInput,
  Radio,
  RadioGroup,
  RangeSlider,
  SearchInput,
  Segmented,
  Select,
  Switch,
  TagsInput,
  Textarea,
} from '@/components/ui'
import { ShowcaseSection } from '../ShowcaseSection'

export function FormsPage() {
  const [tags, setTags] = useState(['prod', 'edge'])
  const [count, setCount] = useState(3)
  const [range, setRange] = useState(40)
  const [auth, setAuth] = useState<'password' | 'key'>('password')
  const [multi, setMulti] = useState<string[]>(['a'])
  const [otp, setOtp] = useState('')
  const [pin4, setPin4] = useState('')
  const [search, setSearch] = useState('')
  const [searchSm, setSearchSm] = useState('edge')
  const [date, setDate] = useState('2026-10-25')
  const [datetime, setDatetime] = useState('2026-10-25T14:30')
  const [dateRange, setDateRange] = useState({ start: '2026-10-01', end: '2026-10-12' })
  const [dateTimeRange, setDateTimeRange] = useState({
    start: '2026-10-01T09:00',
    end: '2026-10-12T18:00',
  })

  return (
    <div>
      <PageHeader title="表单" description="字段、选择器、开关、标签输入与上传。" />

      <ShowcaseSection title="基础字段">
        <Card padded>
          <div className="form-grid">
            <Field label="名称" htmlFor="name" hint="用于展示">
              <Input id="name" placeholder="demo" />
            </Field>
            <Field label="小尺寸" htmlFor="name-sm">
              <Input id="name-sm" size="sm" placeholder="size=sm" />
            </Field>
            <Field label="校验失败" htmlFor="bad" error="必填项">
              <Input id="bad" invalid defaultValue="" placeholder="请输入" />
            </Field>
            <Field label="禁用" htmlFor="dis">
              <Input id="dis" disabled defaultValue="readonly value" />
            </Field>
            <Field label="前缀后缀" htmlFor="url" className="full">
              <InputGroup prefix="https://" suffix=".com">
                <Input id="url" placeholder="example" />
              </InputGroup>
            </Field>
            <Field label="搜索" htmlFor="search-demo" hint="SearchInput · 图标 + 清除">
              <SearchInput
                id="search-demo"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="名称 / 标签…"
              />
            </Field>
            <Field label="搜索 sm" htmlFor="search-sm" hint="size=sm">
              <SearchInput
                id="search-sm"
                size="sm"
                value={searchSm}
                onChange={(e) => setSearchSm(e.target.value)}
                onClear={() => setSearchSm('')}
              />
            </Field>
            <Field label="多行" htmlFor="notes" className="full">
              <Textarea id="notes" rows={3} placeholder="备注" />
            </Field>
          </div>
        </Card>
      </ShowcaseSection>

      <ShowcaseSection title="日期 / 时间">
        <Card padded>
          <div className="form-grid">
            <Field label="日期" hint="mode=&quot;date&quot;">
              <DatePicker value={date} onChange={setDate} mode="date" />
            </Field>
            <Field label="日期时间" hint="mode=&quot;datetime&quot;">
              <DatePicker value={datetime} onChange={setDatetime} mode="datetime" />
            </Field>
            <Field label="日期范围" hint="DateRangePicker · date" className="full">
              <DateRangePicker
                mode="date"
                start={dateRange.start}
                end={dateRange.end}
                onChange={setDateRange}
              />
            </Field>
            <Field label="日期时间范围" hint="DateRangePicker · datetime" className="full">
              <DateRangePicker
                mode="datetime"
                start={dateTimeRange.start}
                end={dateTimeRange.end}
                onChange={setDateTimeRange}
              />
            </Field>
          </div>
        </Card>
      </ShowcaseSection>

      <ShowcaseSection title="选择与开关">
        <Card padded className="stack">
          <Field label="Select">
            <Select
              block
              options={[
                { value: 'a', label: 'Alpha' },
                { value: 'b', label: 'Beta' },
                { value: 'c', label: 'Gamma' },
              ]}
              defaultValue="a"
            />
          </Field>
          <Field label="多选">
            <Select
              multiple
              values={multi}
              onValuesChange={setMulti}
              options={[
                { value: 'a', label: 'Alpha' },
                { value: 'b', label: 'Beta' },
                { value: 'c', label: 'Gamma' },
              ]}
            />
          </Field>
          <Segmented
            value={auth}
            onChange={setAuth}
            options={[
              { value: 'password', label: '密码' },
              { value: 'key', label: '密钥' },
            ]}
          />
          <Checkbox label="同意条款" defaultChecked />
          <RadioGroup>
            <Radio name="plan" label="标准" defaultChecked />
            <Radio name="plan" label="专业" />
          </RadioGroup>
          <Switch label="启用通知" defaultChecked />
        </Card>
      </ShowcaseSection>

      <ShowcaseSection title="验证码（PinInput）">
        <Card padded className="stack">
          <div className="pin-demo pin-demo-6">
            <Field label="6 位验证码" hint="length=6">
              <PinInput length={6} value={otp} onChange={setOtp} aria-label="6 位验证码" />
            </Field>
          </div>
          <div className="pin-demo pin-demo-4">
            <Field label="4 位 PIN" hint="length=4 · masked">
              <PinInput length={4} value={pin4} onChange={setPin4} masked aria-label="4 位 PIN" />
            </Field>
          </div>
        </Card>
      </ShowcaseSection>

      <ShowcaseSection title="标签 / 数值 / 上传">
        <Card padded className="stack">
          <Field label="标签">
            <TagsInput value={tags} onChange={setTags} />
          </Field>
          <NumberStepper value={count} onChange={setCount} min={0} max={10} />
          <RangeSlider label="容量" value={range} onChange={setRange} />
          <FileUpload onFiles={() => undefined} />
        </Card>
      </ShowcaseSection>
    </div>
  )
}
