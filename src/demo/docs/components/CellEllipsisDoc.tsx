import { CellEllipsis, CellStack } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('cell-ellipsis')
const props: PropDef[] = [{ name: 'children', type: 'ReactNode', desc: { en: "Content", zh: "内容" } }, { name: 'title', type: 'string', desc: { en: "Native title tooltip", zh: "原生 title 提示" } }]

export function CellEllipsisDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Truncation", "截断")} code={`<CellEllipsis title="A very long resource name api-gateway-prod-east-01">
  A very long resource name api-gateway-prod-east-01
</CellEllipsis>`}>
        <div style={{ width: 160 }}><CellEllipsis title={d("A very long resource name api-gateway-prod-east-01", "很长的资源名称 api-gateway-prod-east-01")}>{d("A very long resource name api-gateway-prod-east-01", "很长的资源名称 api-gateway-prod-east-01")}</CellEllipsis></div>
      </DocDemo>
      <DocDemo title={d("Two lines", "双行")} code={`<CellStack>
  <strong>api-gateway</strong>
  <span className="muted">cn-east / production</span>
</CellStack>`}>
        <div style={{ width: 160 }}><CellStack><strong>api-gateway</strong><span className="muted">cn-east / production</span></CellStack></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
