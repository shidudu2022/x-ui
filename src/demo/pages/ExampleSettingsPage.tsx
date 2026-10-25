import { useState } from 'react'
import {
  Button,
  DangerZone,
  Field,
  FormErrors,
  Input,
  PageHeader,
  SectionCard,
  SettingsRow,
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
          <SettingsRow
            title="邮件通知"
            description="构建失败与证书到期提醒"
            control={<Switch checked={notify} onChange={(e) => setNotify(e.target.checked)} />}
          />
        </SectionCard>
      </div>
      <div style={{ marginTop: 16 }}>
        <DangerZone description="删除工作区不可恢复。">
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
        </DangerZone>
      </div>
    </div>
  )
}
