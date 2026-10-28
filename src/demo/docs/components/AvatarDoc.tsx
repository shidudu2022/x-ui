import { Avatar, AvatarGroup } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('avatar')
const props: PropDef[] = [{ name: 'name', type: 'string', desc: { en: "Source for initials", zh: "缩写来源" } }, { name: 'src', type: 'string', desc: { en: "Image", zh: "图片" } }, { name: 'size', type: "'sm'|'md'|'lg'", default: "'md'", desc: { en: "Sizes", zh: "尺寸" } }]

export function AvatarDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Sizes", "尺寸")} code={`<Avatar name="Ada" size="sm" />
<Avatar name="Ada Lovelace" />
<Avatar name="Ada" size="lg" />`}>
        <div className="showcase-row"><Avatar name="Ada" size="sm" /><Avatar name="Ada Lovelace" /><Avatar name="Ada" size="lg" /></div>
      </DocDemo>
      <DocDemo title={d("Composition", "组合")} code={`<AvatarGroup>
  <Avatar name="Ada" />
  <Avatar name="Grace" />
  <Avatar name="Alan" />
</AvatarGroup>`}>
        <AvatarGroup><Avatar name="Ada" /><Avatar name="Grace" /><Avatar name="Alan" /></AvatarGroup>
      </DocDemo>
    </ComponentDocLayout>
  )
}
