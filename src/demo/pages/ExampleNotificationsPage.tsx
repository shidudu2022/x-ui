import { useMemo, useState } from 'react'
import { Button, Card, Drawer, NotificationList, PageHeader, type NotificationItem } from '@/components/ui'
import { useDemoT } from '@/demo/i18n/useDemoT'

export function ExampleNotificationsPage() {
  const t = useDemoT()
  const [open, setOpen] = useState(true)

  const seed = useMemo(
    (): NotificationItem[] => [
      {
        id: '1',
        title: t('Deploy complete', '部署完成'),
        description: 'prod · web',
        unread: true,
        time: t('2 min ago', '2 分钟前'),
        tone: 'success',
      },
      {
        id: '2',
        title: t('Disk alert', '磁盘告警'),
        description: t('node-a usage 92%', 'node-a 使用率 92%'),
        unread: true,
        time: t('18 min ago', '18 分钟前'),
        tone: 'warn',
      },
      {
        id: '3',
        title: t('Invite accepted', '邀请已接受'),
        description: 'alice@example.com',
        time: t('Yesterday', '昨天'),
      },
    ],
    [t],
  )

  const [items, setItems] = useState(seed)

  return (
    <div>
      <PageHeader
        title={t('Notification center', '通知中心')}
        description={t('Message list inside a drawer.', 'Drawer 内消息列表。')}
        actions={
          <Button variant="primary" onClick={() => setOpen(true)}>
            {t('Open notifications', '打开通知')}
          </Button>
        }
      />
      <Card padded>
        <p className="muted">
          {t('Unread', '未读')} {items.filter((i) => i.unread).length} {t('messages', '条')}
        </p>
      </Card>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title={t('Notifications', '通知')}
        footer={
          <Button
            size="sm"
            onClick={() => setItems((list) => list.map((i) => ({ ...i, unread: false })))}
          >
            {t('Mark all read', '全部标为已读')}
          </Button>
        }
      >
        <NotificationList
          items={items}
          onItemClick={(item) =>
            setItems((list) => list.map((i) => (i.id === item.id ? { ...i, unread: false } : i)))
          }
        />
      </Drawer>
    </div>
  )
}
