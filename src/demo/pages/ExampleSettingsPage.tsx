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
import { useDemoT } from '@/demo/i18n/useDemoT'

export function ExampleSettingsPage() {
  const t = useDemoT()
  const [notify, setNotify] = useState(true)
  const [errors, setErrors] = useState<string[]>([])

  return (
    <div className="page-narrow">
      <PageHeader
        title={t('Settings', '设置')}
        description={t('Sectioned form, toggles, and danger zone.', '分区表单 + 开关 + 危险操作。')}
      />
      <FormErrors errors={errors} />
      <SectionCard title={t('Basic info', '基本信息')} subtitle={t('Display name and timezone', '显示名称与时区')}>
        <div className="stack">
          <Field label={t('Display name', '显示名称')} htmlFor="dn">
            <Input id="dn" defaultValue="X-UI Demo" />
          </Field>
          <Field label={t('Bio', '简介')} htmlFor="bio">
            <Textarea id="bio" rows={3} defaultValue={t('Design system demo environment', '设计系统演示环境')} />
          </Field>
        </div>
      </SectionCard>
      <div style={{ marginTop: 16 }}>
        <SectionCard title={t('Notifications', '通知')}>
          <SettingsRow
            title={t('Email notifications', '邮件通知')}
            description={t('Build failures and certificate expiry reminders', '构建失败与证书到期提醒')}
            control={<Switch checked={notify} onChange={(e) => setNotify(e.target.checked)} />}
          />
        </SectionCard>
      </div>
      <div style={{ marginTop: 16 }}>
        <DangerZone description={t('Deleting the workspace cannot be undone.', '删除工作区不可恢复。')}>
          <Button
            variant="danger"
            onClick={() => setErrors([t('Enter the workspace name to confirm deletion', '请先输入工作区名称确认删除')])}
          >
            {t('Delete workspace', '删除工作区')}
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setErrors([])
            }}
          >
            {t('Save changes', '保存更改')}
          </Button>
        </DangerZone>
      </div>
    </div>
  )
}
