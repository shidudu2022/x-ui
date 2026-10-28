import { useState } from 'react'
import { TagsInput } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('tags-input')
const props: PropDef[] = [{ name: 'value', type: 'string[]', desc: { en: "Label", zh: "标签" } }, { name: 'onChange', type: 'fn', desc: { en: "Change", zh: "变更" } }, { name: 'placeholder', type: 'string', desc: { en: "Placeholder", zh: "占位" } }]

export function TagsInputDoc() {
  const d = useDemoT()
  const [tags, setTags] = useState(['prod', 'edge'])
  const [empty, setEmpty] = useState<string[]>([])
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<TagsInput value={tags} onChange={setTags} />`}>
        <TagsInput value={tags} onChange={setTags} />
      </DocDemo>
      <DocDemo title={d("Empty", "空态")} code={`<TagsInput value={[]} onChange={setEmpty} placeholder="Add a tag and press Enter" />`}>
        <TagsInput value={empty} onChange={setEmpty} placeholder={d("Add a tag and press Enter", "添加标签后回车")} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
