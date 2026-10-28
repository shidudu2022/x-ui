import { Tag, TagGroup } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('tag')
const props: PropDef[] = [{ name: 'tone', type: "'neutral'|'primary'|'info'|'success'|'warn'|'danger'", default: "'neutral'", desc: '色调' }, { name: 'size', type: "'sm'|'md'", default: "'md'", desc: '尺寸' }]

export function TagDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="色调" code={`<TagGroup>
  <Tag>neutral</Tag>
  <Tag tone="primary">primary</Tag>
  <Tag tone="info">info</Tag>
  <Tag tone="success">success</Tag>
  <Tag tone="warn">warn</Tag>
  <Tag tone="danger">danger</Tag>
</TagGroup>`}>
        <TagGroup><Tag>neutral</Tag><Tag tone="primary">primary</Tag><Tag tone="info">info</Tag><Tag tone="success">success</Tag><Tag tone="warn">warn</Tag><Tag tone="danger">danger</Tag></TagGroup>
      </DocDemo>
      <DocDemo title="尺寸" code={`<Tag size="sm">sm</Tag>
<Tag size="md">md</Tag>`}>
        <div className="showcase-row"><Tag size="sm" tone="primary">sm</Tag><Tag size="md" tone="primary">md</Tag></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
