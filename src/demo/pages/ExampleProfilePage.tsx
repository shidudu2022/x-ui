import { useState } from 'react'
import {
  AvatarUpload,
  Button,
  DescriptionList,
  Drawer,
  Field,
  Input,
  PageHeader,
  SectionCard,
} from '@/components/ui'
import { useDemoT } from '@/demo/i18n/useDemoT'

export function ExampleProfilePage() {
  const t = useDemoT()
  const [open, setOpen] = useState(false)
  return (
    <div className="page-narrow">
      <PageHeader
        title={t('Profile', '个人资料')}
        description={t('Avatar, description list, and edit drawer.', 'Avatar + 描述列表 + 编辑抽屉。')}
        actions={
          <Button variant="primary" onClick={() => setOpen(true)}>
            {t('Edit', '编辑')}
          </Button>
        }
      />
      <SectionCard title={t('Account', '账号')}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16 }}>
          <AvatarUpload name="Mars Chen" />
          <div>
            <strong>Mars Chen</strong>
            <p className="muted" style={{ margin: '4px 0 0', fontSize: 13 }}>
              admin@example.com
            </p>
          </div>
        </div>
        <DescriptionList
          items={[
            { label: t('Role', '角色'), value: 'Owner' },
            { label: t('Timezone', '时区'), value: 'Asia/Shanghai' },
            { label: t('Joined', '加入时间'), value: '2026-01-12' },
          ]}
        />
      </SectionCard>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title={t('Edit profile', '编辑资料')}
        footer={
          <Button variant="primary" onClick={() => setOpen(false)}>
            {t('Save', '保存')}
          </Button>
        }
      >
        <div className="stack">
          <Field label={t('Name', '姓名')} htmlFor="name">
            <Input id="name" defaultValue="Mars Chen" />
          </Field>
          <Field label={t('Email', '邮箱')} htmlFor="email">
            <Input id="email" defaultValue="admin@example.com" />
          </Field>
        </div>
      </Drawer>
    </div>
  )
}
