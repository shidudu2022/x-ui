import { AvatarUpload } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('avatar-upload')
const props: PropDef[] = [{ name: 'name', type: 'string', default: "'用户'", desc: '缩写来源' }, { name: 'src', type: 'string', desc: '头像 URL' }, { name: 'onFile', type: '(file: File) => void', desc: '选中文件' }]

export function AvatarUploadDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<AvatarUpload name="Ada Lovelace" onFile={(f) => console.log(f.name)} />`}>
        <AvatarUpload name="Ada Lovelace" onFile={() => undefined} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
