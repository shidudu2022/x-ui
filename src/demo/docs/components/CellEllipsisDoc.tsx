import { CellEllipsis, CellStack } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('cell-ellipsis')
const props: PropDef[] = [{ name: 'children', type: 'ReactNode', desc: '内容' }, { name: 'title', type: 'string', desc: '原生 title 提示' }]

export function CellEllipsisDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="截断" code={`<CellEllipsis title="很长的资源名称 api-gateway-prod-east-01">
  很长的资源名称 api-gateway-prod-east-01
</CellEllipsis>`}>
        <div style={{ width: 160 }}><CellEllipsis title="很长的资源名称 api-gateway-prod-east-01">很长的资源名称 api-gateway-prod-east-01</CellEllipsis></div>
      </DocDemo>
      <DocDemo title="双行" code={`<CellStack>
  <strong>api-gateway</strong>
  <span className="muted">cn-east / production</span>
</CellStack>`}>
        <div style={{ width: 160 }}><CellStack><strong>api-gateway</strong><span className="muted">cn-east / production</span></CellStack></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
