import { FileUpload } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('file-upload')
const props: PropDef[] = [{ name: 'accept', type: 'string', desc: 'accept' }, { name: 'multiple', type: 'boolean', desc: { en: "Multi-select", zh: "多选" } }, { name: 'maxSizeMb', type: 'number', desc: { en: "Size limit", zh: "大小限制" } }, { name: 'onFiles', type: '(files: File[]) => void', desc: { en: "Selection callback", zh: "选中回调" } }, { name: 'files', type: 'FileUploadItem[]', desc: { en: "Controlled progress list", zh: "受控进度列表" } }]

export function FileUploadDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<FileUpload
  accept=".png,.jpg,.pdf"
  maxSizeMb={5}
  files={[{ name: 'spec.pdf', size: 120000, progress: 62 }]}
/>`}>
        <FileUpload accept=".png,.jpg,.pdf" maxSizeMb={5} files={[{ name: 'spec.pdf', size: 120000, progress: 62 }, { name: 'logo.png', size: 24000, progress: 100 }]} onFiles={() => undefined} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
