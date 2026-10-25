import { useState } from 'react'
import {
  Button,
  Card,
  Divider,
  Field,
  FormErrors,
  Input,
  PageHeader,
  SectionCard,
  Switch,
  Textarea,
} from '@/components/ui'

export function ExampleSettingsPage() {
  const [notify, setNotify] = useState(true)
  const [errors, setErrors] = useState<string[]>([])

  return (
    <div className="page-narrow">
      <PageHeader title="设置" description="分区表单 + 开关 + 危险操作。" />
      <FormErrors errors={errors} />
      <SectionCard title="基本信息">
        <div className="stack">
          <Field label="显示名称" htmlFor="dn">
            <Input id="dn" defaultValue="X-UI Demo" />
          </Field>
          <Field label="简介" htmlFor="bio">
            <Textarea id="bio" rows={3} defaultValue="设计系统演示环境" />
          </Field>
        </div>
      </SectionCard>
      <div style={{ marginTop: 16 }}>
        <SectionCard title="通知">
          <div className="switch-row">
            <div>
              <strong>邮件通知</strong>
              <p className="muted" style={{ margin: '4px 0 0', fontSize: 12 }}>
                构建失败与证书到期提醒
              </p>
            </div>
            <Switch checked={notify} onChange={(e) => setNotify(e.target.checked)} />
          </div>
        </SectionCard>
      </div>
      <Divider />
      <Card padded>
        <strong style={{ color: 'var(--danger)' }}>危险区域</strong>
        <p className="muted" style={{ fontSize: 13 }}>
          删除工作区不可恢复。
        </p>
        <div className="actions" style={{ marginTop: 12 }}>
          <Button
            variant="danger"
            onClick={() => setErrors(['请先输入工作区名称确认删除'])}
          >
            删除工作区
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setErrors([])
            }}
          >
            保存更改
          </Button>
        </div>
      </Card>
    </div>
  )
}
