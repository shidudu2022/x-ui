import { useState } from 'react'
import { TagsInput } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('tags-input')
const props: PropDef[] = [{ name: 'value', type: 'string[]', desc: '标签' }, { name: 'onChange', type: 'fn', desc: '变更' }, { name: 'placeholder', type: 'string', desc: '占位' }]

export function TagsInputDoc() {
  const [tags, setTags] = useState(['prod', 'edge'])
  const [empty, setEmpty] = useState<string[]>([])
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<TagsInput value={tags} onChange={setTags} />`}>
        <TagsInput value={tags} onChange={setTags} />
      </DocDemo>
      <DocDemo title="空态" code={`<TagsInput value={[]} onChange={setEmpty} placeholder="添加标签后回车" />`}>
        <TagsInput value={empty} onChange={setEmpty} placeholder="添加标签后回车" />
      </DocDemo>
    </ComponentDocLayout>
  )
}
