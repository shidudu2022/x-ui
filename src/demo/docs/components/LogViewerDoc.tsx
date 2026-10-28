import { Button, LogViewer } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('log-viewer')
const props: PropDef[] = [{ name: 'toolbar', type: 'ReactNode', desc: { en: "Toolbar", zh: "工具栏" } }, { name: 'height', type: 'number | string', default: '360', desc: { en: "Height", zh: "高度" } }, { name: 'children', type: 'ReactNode', desc: { en: "Log text", zh: "日志文本" } }]

export function LogViewerDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} wide code={`<LogViewer toolbar={<Button size="sm">Refresh</Button>} height={160}>
  [12:00:01] ready
  [12:00:02] sync ok
</LogViewer>`}>
        <LogViewer toolbar={<Button size="sm">{d("Refresh", "刷新")}</Button>} height={160}>{`[12:00:01] INFO  ready\n[12:00:02] INFO  sync ok\n[12:00:03] WARN  retry #1`}</LogViewer>
      </DocDemo>
    </ComponentDocLayout>
  )
}
