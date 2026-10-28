import { NotificationList } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('notification-list')
const props: PropDef[] = [{ name: 'items', type: 'NotificationItem[]', desc: { en: "Notifications; tone / unread", zh: "通知；tone / unread" } }, { name: 'empty', type: 'ReactNode', desc: { en: "Empty text", zh: "空文案" } }]

export function NotificationListDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Tones & unread", "色调 / 未读")} code={`<NotificationList items={[
  { id: '1', title: 'Deployment complete', tone: 'success', unread: true, time: 'Just now' },
  { id: '2', title: 'Certificate expiring', tone: 'warn', time: '1 hour ago' },
]} />`}>
        <NotificationList items={[{ id: '1', title: d("Deployment complete", "部署完成"), description: d("prod is ready", "prod 已就绪"), time: d("Just now", "刚刚"), unread: true, tone: 'success' }, { id: '2', title: d("Certificate expiring", "证书将过期"), description: d("7 days left", "还有 7 天"), time: d("1 hour ago", "1 小时前"), unread: false, tone: 'warn' }, { id: '3', title: d("Sync failed", "同步失败"), description: d("Retrying", "重试中"), time: d("Yesterday", "昨天"), unread: true, tone: 'danger' }]} />
      </DocDemo>
      <DocDemo title={d("Empty", "空态")} code={`<NotificationList items={[]} />`}>
        <NotificationList items={[]} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
