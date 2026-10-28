import { useState } from 'react'
import {
  Button,
  Field,
  FormPage,
  Select,
  TagsInput,
  useToast,
} from '@/components/ui'
import { useDemoT } from '@/demo/i18n/useDemoT'

export function ExampleInvitePage() {
  const t = useDemoT()
  const { toast } = useToast()
  const [emails, setEmails] = useState<string[]>([])
  const [role, setRole] = useState('member')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!emails.length) {
      toast(t('Add at least one email', '请至少添加一个邮箱'), 'error')
      return
    }
    toast(t(`Invited ${emails.length} people (demo)`, `已邀请 ${emails.length} 人（示例）`), 'success')
    setEmails([])
  }

  return (
    <FormPage
      title={t('Invite members', '邀请成员')}
      description={t('Enter emails in bulk and assign a role; invitation emails are sent.', '批量输入邮箱并指定角色，发送邀请邮件。')}
    >
      <form className="stack" onSubmit={submit}>
        <Field label={t('Emails', '邮箱')} hint={t('Press Enter to add multiple addresses', '回车添加多个地址')}>
          <TagsInput value={emails} onChange={setEmails} placeholder="name@company.com" />
        </Field>
        <Field label={t('Role', '角色')}>
          <Select
            value={role}
            options={[
              { value: 'member', label: t('Member', '成员') },
              { value: 'admin', label: t('Admin', '管理员') },
              { value: 'viewer', label: t('Viewer', '只读') },
            ]}
            onChange={setRole}
          />
        </Field>
        <div className="actions">
          <Button type="submit" variant="primary">
            {t('Send invites', '发送邀请')}
          </Button>
        </div>
      </form>
    </FormPage>
  )
}
