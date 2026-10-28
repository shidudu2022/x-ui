import { AvatarUpload } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('avatar-upload')
const props: PropDef[] = [{ name: 'name', type: 'string', default: "'User'", desc: { en: "Source for initials", zh: "缩写来源" } }, { name: 'src', type: 'string', desc: { en: "Avatar URL", zh: "头像 URL" } }, { name: 'onFile', type: '(file: File) => void', desc: { en: "Selected file", zh: "选中文件" } }]

export function AvatarUploadDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<AvatarUpload name="Ada Lovelace" onFile={(f) => console.log(f.name)} />`}>
        <AvatarUpload name="Ada Lovelace" onFile={() => undefined} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
