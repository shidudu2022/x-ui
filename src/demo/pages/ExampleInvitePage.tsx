import { useState } from 'react'
import {
  Button,
  Field,
  FormPage,
  Select,
  TagsInput,
  useToast,
} from '@/components/ui'

export function ExampleInvitePage() {
  const { toast } = useToast()
  const [emails, setEmails] = useState<string[]>([])
  const [role, setRole] = useState('member')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!emails.length) {
      toast('请至少添加一个邮箱', 'error')
      return
    }
    toast(`已邀请 ${emails.length} 人（示例）`, 'success')
    setEmails([])
  }

  return (
    <FormPage
      title="邀请成员"
      description="批量输入邮箱并指定角色，发送邀请邮件。"
    >
      <form className="stack" onSubmit={submit}>
        <Field label="邮箱" hint="回车添加多个地址">
          <TagsInput value={emails} onChange={setEmails} placeholder="name@company.com" />
        </Field>
        <Field label="角色">
          <Select
            value={role}
            options={[
              { value: 'member', label: '成员' },
              { value: 'admin', label: '管理员' },
              { value: 'viewer', label: '只读' },
            ]}
            onChange={setRole}
          />
        </Field>
        <div className="actions">
          <Button type="submit" variant="primary">
            发送邀请
          </Button>
        </div>
      </form>
    </FormPage>
  )
}
