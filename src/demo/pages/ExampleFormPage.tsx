import { useState } from 'react'
import {
  Button,
  Checkbox,
  Field,
  FormPage,
  Input,
  SectionCard,
  Select,
  Switch,
  Text,
  Textarea,
  useToast,
} from '@/components/ui'
import { useDemoT } from '@/demo/i18n/useDemoT'

export function ExampleFormPage() {
  const t = useDemoT()
  const { toast } = useToast()
  const [name, setName] = useState('demo-cluster')
  const [displayName, setDisplayName] = useState('')
  const [region, setRegion] = useState('cn')
  const [notes, setNotes] = useState('')
  const [totp, setTotp] = useState(true)
  const [inspect, setInspect] = useState(false)

  return (
    <FormPage
      title={t('System settings', '系统设置')}
      description={t(
        'Login security and platform preferences. Form pages use a fixed content width (760px) for readability.',
        '登录安全与平台偏好。表单页使用固定内容宽度（760px），便于阅读与填写。',
      )}
    >
      <div className="stack">
        <SectionCard title={t('Basic info', '基本信息')}>
          <div className="form-grid">
            <Field
              label={t('Name', '名称')}
              htmlFor="ex-name"
              hint={t('Lowercase letters, digits, hyphens', '小写字母、数字、中划线')}
            >
              <Input id="ex-name" value={name} onChange={(e) => setName(e.target.value)} />
            </Field>
            <Field label={t('Display name', '显示名')} htmlFor="ex-display">
              <Input
                id="ex-display"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder={t('Optional', '可选')}
              />
            </Field>
            <Field label={t('Region', '地区')} htmlFor="ex-region">
              <Select
                block
                value={region}
                onChange={setRegion}
                options={[
                  { value: 'cn', label: t('China mirror', '中国镜像') },
                  { value: 'global', label: 'Global' },
                ]}
              />
            </Field>
            <Field label={t('Notes', '备注')} htmlFor="ex-notes" className="full">
              <Textarea
                id="ex-notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t('Datacenter / purpose', '机房 / 用途说明')}
              />
            </Field>
          </div>
        </SectionCard>

        <SectionCard title={t('Login security', '登录安全')}>
          <Checkbox
            label={
              <span>
                <Text as="strong" variant="strong">
                  {t('Require Google Authenticator', '强制谷歌验证')}
                </Text>
                <Text as="span" variant="caption" style={{ display: 'block' }}>
                  {t('All admin sign-ins must provide TOTP', '所有管理员登录必须提供 TOTP')}
                </Text>
              </span>
            }
            checked={totp}
            onChange={(e) => setTotp(e.target.checked)}
          />
          <Switch
            label={t('Scheduled inspection', '定时巡检')}
            checked={inspect}
            onChange={(e) => setInspect(e.target.checked)}
          />
          <div className="actions">
            <Button variant="primary" onClick={() => toast(t('Settings saved (demo)', '设置已保存（示例）'), 'success')}>
              {t('Save', '保存')}
            </Button>
            <Button onClick={() => toast(t('Reset (demo)', '已重置（示例）'), 'info')}>{t('Reset', '重置')}</Button>
          </div>
        </SectionCard>

        <Text variant="caption">
          {t('Layout class:', '布局类名：')} <code>.page.page-narrow</code>
          {t(' (max-width: 760px; margin-inline: auto)', '（max-width: 760px; margin-inline: auto）')}
        </Text>
      </div>
    </FormPage>
  )
}
