import { useState } from 'react'
import {
  Button,
  Checkbox,
  Field,
  FormPage,
  Input,
  NativeSelect,
  SectionCard,
  Switch,
  Text,
  Textarea,
  useToast,
} from '@/components/ui'

export function ExampleFormPage() {
  const { toast } = useToast()
  const [name, setName] = useState('demo-cluster')
  const [displayName, setDisplayName] = useState('')
  const [region, setRegion] = useState('cn')
  const [notes, setNotes] = useState('')
  const [totp, setTotp] = useState(true)
  const [inspect, setInspect] = useState(false)

  return (
    <FormPage
      title="系统设置"
      description="登录安全与平台偏好。表单页使用固定内容宽度（760px），便于阅读与填写。"
    >
      <div className="stack">
        <SectionCard title="基本信息">
          <div className="form-grid">
            <Field label="名称" htmlFor="ex-name" hint="小写字母、数字、中划线">
              <Input id="ex-name" value={name} onChange={(e) => setName(e.target.value)} />
            </Field>
            <Field label="显示名" htmlFor="ex-display">
              <Input
                id="ex-display"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="可选"
              />
            </Field>
            <Field label="地区" htmlFor="ex-region">
              <NativeSelect
                id="ex-region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option value="cn">中国镜像</option>
                <option value="global">Global</option>
              </NativeSelect>
            </Field>
            <Field label="备注" htmlFor="ex-notes" className="full">
              <Textarea
                id="ex-notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="机房 / 用途说明"
              />
            </Field>
          </div>
        </SectionCard>

        <SectionCard title="登录安全">
          <Checkbox
            label={
              <span>
                <Text as="strong" variant="strong">
                  强制谷歌验证
                </Text>
                <Text as="span" variant="caption" style={{ display: 'block' }}>
                  所有管理员登录必须提供 TOTP
                </Text>
              </span>
            }
            checked={totp}
            onChange={(e) => setTotp(e.target.checked)}
          />
          <Switch
            label="定时巡检"
            checked={inspect}
            onChange={(e) => setInspect(e.target.checked)}
          />
          <div className="actions">
            <Button variant="primary" onClick={() => toast('设置已保存（示例）', 'success')}>
              保存
            </Button>
            <Button onClick={() => toast('已重置（示例）', 'info')}>重置</Button>
          </div>
        </SectionCard>

        <Text variant="caption">
          布局类名：<code>.page.page-narrow</code>（max-width: 760px; margin-inline: auto）
        </Text>
      </div>
    </FormPage>
  )
}
