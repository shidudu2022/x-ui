import { CatalogGroup, CatalogTile, Field, FormGrid, Input, Stack, Text } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('stack')
const props: PropDef[] = [{ name: 'gap', type: "'sm'|'md'|'lg'", default: "'md'", desc: 'Stack 垂直间距' }, { name: 'FormGrid', type: 'children', desc: '表单单列/双列栅格（同文件导出）' }, { name: 'CatalogGroup / CatalogTile', type: '…', desc: '索引瓷砖布局' }]

export function StackDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="垂直间距" description="sm / md / lg 三档，替代随意 margin。" wide code={`<Stack gap="sm">…</Stack>
<Stack gap="md">…</Stack>
<Stack gap="lg">…</Stack>`}>
        <div className="grid-2"><Stack gap="sm"><Text variant="strong" size="sm">gap=sm</Text><Text variant="muted" size="sm">紧凑列表、提示与控件。</Text><Text variant="muted" size="sm">第二行</Text></Stack><Stack gap="lg"><Text variant="strong" size="sm">gap=lg</Text><Text variant="muted" size="sm">大区块之间的呼吸感。</Text><Text variant="muted" size="sm">第二行</Text></Stack></div>
      </DocDemo>
      <DocDemo title="FormGrid" description="表单字段栅格，与 Field 搭配。" wide code={`<FormGrid>
  <Field label="名称" htmlFor="n"><Input id="n" /></Field>
  <Field label="区域" htmlFor="r"><Input id="r" /></Field>
</FormGrid>`}>
        <FormGrid><Field label="名称" htmlFor="doc-stack-n"><Input id="doc-stack-n" placeholder="api-gateway" /></Field><Field label="区域" htmlFor="doc-stack-r"><Input id="doc-stack-r" placeholder="cn-east" /></Field></FormGrid>
      </DocDemo>
      <DocDemo title="Catalog" description="组件索引式瓷砖：CatalogGroup + CatalogTile。" wide code={`<CatalogGroup title="布局">
  <CatalogTile label="Stack" description="垂直间距" href="/components/stack" />
  <CatalogTile label="Card" description="表面容器" href="/components/card" />
</CatalogGroup>`}>
        <CatalogGroup title="布局"><CatalogTile label="Stack" description="垂直间距" href="#stack" /><CatalogTile label="Card" description="表面容器" href="#card" /><CatalogTile label="Divider" description="分隔" href="#divider" /></CatalogGroup>
      </DocDemo>
    </ComponentDocLayout>
  )
}
