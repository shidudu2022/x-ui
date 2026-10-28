import { CatalogGroup, CatalogTile, Field, FormGrid, Input, Stack, Text } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('stack')
const props: PropDef[] = [{ name: 'gap', type: "'sm'|'md'|'lg'", default: "'md'", desc: { en: "Stack vertical spacing", zh: "Stack 垂直间距" } }, { name: 'FormGrid', type: 'children', desc: { en: "Single/double-column form grid (exported from the same file)", zh: "表单单列/双列栅格（同文件导出）" } }, { name: 'CatalogGroup / CatalogTile', type: '…', desc: { en: "Index tile layout", zh: "索引瓷砖布局" } }]

export function StackDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Vertical spacing", "垂直间距")} description={d("sm / md / lg tiers instead of ad-hoc margins.", "sm / md / lg 三档，替代随意 margin。")} wide code={`<Stack gap="sm">…</Stack>
<Stack gap="md">…</Stack>
<Stack gap="lg">…</Stack>`}>
        <div className="grid-2"><Stack gap="sm"><Text variant="strong" size="sm">gap=sm</Text><Text variant="muted" size="sm">{d("Compact lists, hints, and controls.", "紧凑列表、提示与控件。")}</Text><Text variant="muted" size="sm">{d("Second line", "第二行")}</Text></Stack><Stack gap="lg"><Text variant="strong" size="sm">gap=lg</Text><Text variant="muted" size="sm">{d("Breathing room between large blocks.", "大区块之间的呼吸感。")}</Text><Text variant="muted" size="sm">{d("Second line", "第二行")}</Text></Stack></div>
      </DocDemo>
      <DocDemo title={d("FormGrid", "FormGrid")} description={d("Form field grid, pairs with Field.", "表单字段栅格，与 Field 搭配。")} wide code={`<FormGrid>
  <Field label="Name" htmlFor="n"><Input id="n" /></Field>
  <Field label="Region" htmlFor="r"><Input id="r" /></Field>
</FormGrid>`}>
        <FormGrid><Field label={d("Name", "名称")} htmlFor="doc-stack-n"><Input id="doc-stack-n" placeholder="api-gateway" /></Field><Field label={d("Region", "区域")} htmlFor="doc-stack-r"><Input id="doc-stack-r" placeholder="cn-east" /></Field></FormGrid>
      </DocDemo>
      <DocDemo title={d("Catalog", "Catalog")} description={d("Catalog-style tiles: CatalogGroup + CatalogTile.", "组件索引式瓷砖：CatalogGroup + CatalogTile。")} wide code={`<CatalogGroup title="Layout">
  <CatalogTile label="Stack" description="Vertical spacing" href="/components/stack" />
  <CatalogTile label="Card" description="Surface container" href="/components/card" />
</CatalogGroup>`}>
        <CatalogGroup title={d("Layout", "布局")}><CatalogTile label="Stack" description={d("Vertical spacing", "垂直间距")} href="#stack" /><CatalogTile label="Card" description={d("Surface container", "表面容器")} href="#card" /><CatalogTile label="Divider" description={d("Divider", "分隔")} href="#divider" /></CatalogGroup>
      </DocDemo>
    </ComponentDocLayout>
  )
}
