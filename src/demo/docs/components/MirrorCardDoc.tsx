import { MirrorCard, Text } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('mirror-card')
const props: PropDef[] = [{ name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'children', type: 'ReactNode', desc: '内容' }]

export function MirrorCardDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<MirrorCard title="官方源">
  <Text variant="muted">https://registry.example.com</Text>
</MirrorCard>`}>
        <MirrorCard title="官方源"><Text variant="muted" size="md">https://registry.example.com</Text></MirrorCard>
      </DocDemo>
    </ComponentDocLayout>
  )
}
