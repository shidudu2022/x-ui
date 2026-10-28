import { Tag, TagGroup } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('tag')
const props: PropDef[] = [{ name: 'tone', type: "'neutral'|'primary'|'info'|'success'|'warn'|'danger'", default: "'neutral'", desc: { en: "Tones", zh: "色调" } }, { name: 'size', type: "'sm'|'md'", default: "'md'", desc: { en: "Sizes", zh: "尺寸" } }]

export function TagDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Tones", "色调")} code={`<TagGroup>
  <Tag>neutral</Tag>
  <Tag tone="primary">primary</Tag>
  <Tag tone="info">info</Tag>
  <Tag tone="success">success</Tag>
  <Tag tone="warn">warn</Tag>
  <Tag tone="danger">danger</Tag>
</TagGroup>`}>
        <TagGroup><Tag>neutral</Tag><Tag tone="primary">primary</Tag><Tag tone="info">info</Tag><Tag tone="success">success</Tag><Tag tone="warn">warn</Tag><Tag tone="danger">danger</Tag></TagGroup>
      </DocDemo>
      <DocDemo title={d("Sizes", "尺寸")} code={`<Tag size="sm">sm</Tag>
<Tag size="md">md</Tag>`}>
        <div className="showcase-row"><Tag size="sm" tone="primary">sm</Tag><Tag size="md" tone="primary">md</Tag></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
