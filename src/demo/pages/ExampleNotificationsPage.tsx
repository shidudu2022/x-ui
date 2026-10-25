import { useState } from 'react'
import { Button, Card, Drawer, NotificationList, PageHeader, type NotificationItem } from '@/components/ui'

const SEED: NotificationItem[] = [
  { id: '1', title: '部署完成', description: 'prod · web', unread: true, time: '2 分钟前', tone: 'success' },
  { id: '2', title: '磁盘告警', description: 'node-a 使用率 92%', unread: true, time: '18 分钟前', tone: 'warn' },
  { id: '3', title: '邀请已接受', description: 'alice@example.com', time: '昨天' },
]

export function ExampleNotificationsPage() {
  const [open, setOpen] = useState(true)
  const [items, setItems] = useState(SEED)

  return (
    <div>
      <PageHeader
        title="通知中心"
        description="Drawer 内消息列表。"
        actions={
          <Button variant="primary" onClick={() => setOpen(true)}>
            打开通知
          </Button>
        }
      />
      <Card padded>
        <p className="muted">未读 {items.filter((i) => i.unread).length} 条</p>
      </Card>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="通知"
        footer={
          <Button
            size="sm"
            onClick={() => setItems((list) => list.map((i) => ({ ...i, unread: false })))}
          >
            全部标为已读
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
