import { FileUpload } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('file-upload')
const props: PropDef[] = [{ name: 'accept', type: 'string', desc: 'accept' }, { name: 'multiple', type: 'boolean', desc: '多选' }, { name: 'maxSizeMb', type: 'number', desc: '大小限制' }, { name: 'onFiles', type: '(files: File[]) => void', desc: '选中回调' }, { name: 'files', type: 'FileUploadItem[]', desc: '受控进度列表' }]

export function FileUploadDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<FileUpload
  accept=".png,.jpg,.pdf"
  maxSizeMb={5}
  files={[{ name: 'spec.pdf', size: 120000, progress: 62 }]}
/>`}>
        <FileUpload accept=".png,.jpg,.pdf" maxSizeMb={5} files={[{ name: 'spec.pdf', size: 120000, progress: 62 }, { name: 'logo.png', size: 24000, progress: 100 }]} onFiles={() => undefined} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
