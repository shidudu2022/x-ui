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

export function ExampleProfilePage() {
  const [open, setOpen] = useState(false)
  return (
    <div className="page-narrow">
      <PageHeader
        title="个人资料"
        description="Avatar + 描述列表 + 编辑抽屉。"
        actions={
          <Button variant="primary" onClick={() => setOpen(true)}>
            编辑
          </Button>
        }
      />
      <SectionCard title="账号">
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
            { label: '角色', value: 'Owner' },
            { label: '时区', value: 'Asia/Shanghai' },
            { label: '加入时间', value: '2026-01-12' },
          ]}
        />
      </SectionCard>
      <Drawer open={open} onClose={() => setOpen(false)} title="编辑资料" footer={<Button variant="primary" onClick={() => setOpen(false)}>保存</Button>}>
        <div className="stack">
          <Field label="姓名" htmlFor="name">
            <Input id="name" defaultValue="Mars Chen" />
          </Field>
          <Field label="邮箱" htmlFor="email">
            <Input id="email" defaultValue="admin@example.com" />
          </Field>
        </div>
      </Drawer>
    </div>
  )
}
