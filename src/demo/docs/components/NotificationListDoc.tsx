import { NotificationList } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('notification-list')
const props: PropDef[] = [{ name: 'items', type: 'NotificationItem[]', desc: '通知；tone / unread' }, { name: 'empty', type: 'ReactNode', desc: '空文案' }]

export function NotificationListDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="色调 / 未读" code={`<NotificationList items={[
  { id: '1', title: '部署完成', tone: 'success', unread: true, time: '刚刚' },
  { id: '2', title: '证书将过期', tone: 'warn', time: '1 小时前' },
]} />`}>
        <NotificationList items={[{ id: '1', title: '部署完成', description: 'prod 已就绪', time: '刚刚', unread: true, tone: 'success' }, { id: '2', title: '证书将过期', description: '还有 7 天', time: '1 小时前', unread: false, tone: 'warn' }, { id: '3', title: '同步失败', description: '重试中', time: '昨天', unread: true, tone: 'danger' }]} />
      </DocDemo>
      <DocDemo title="空态" code={`<NotificationList items={[]} />`}>
        <NotificationList items={[]} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
