import { MirrorCard, Text } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('mirror-card')
const props: PropDef[] = [{ name: 'title', type: 'ReactNode', desc: { en: "Title", zh: "标题" } }, { name: 'children', type: 'ReactNode', desc: { en: "Content", zh: "内容" } }]

export function MirrorCardDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<MirrorCard title="Official source">
  <Text variant="muted">https://registry.example.com</Text>
</MirrorCard>`}>
        <MirrorCard title={d("Official source", "官方源")}><Text variant="muted" size="md">https://registry.example.com</Text></MirrorCard>
      </DocDemo>
    </ComponentDocLayout>
  )
}
