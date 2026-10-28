import { useState } from 'react'
import { FacePhotoPicker } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('face-photo-picker')
const props: PropDef[] = [
  { name: 'label', type: 'ReactNode', desc: { en: 'Field label', zh: '字段标签' } },
  { name: 'previewUrl', type: 'string | null', desc: { en: 'Object URL / image src', zh: '预览 URL' } },
  { name: 'onFileSelect', type: '(file: File | null) => void', desc: { en: 'File picked or cleared', zh: '选择或清除文件' } },
  { name: 'confirmed', type: 'boolean', desc: { en: 'Confirm checkbox', zh: '确认勾选' } },
  { name: 'onConfirmedChange', type: '(v: boolean) => void', desc: { en: 'Confirm change', zh: '确认变更' } },
]

export function FacePhotoPickerDoc() {
  const d = useDemoT()
  const [url, setUrl] = useState<string | null>(null)
  const [name, setName] = useState<string | null>(null)
  const [ok, setOk] = useState(false)

  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo
        title={d('Oval guide', '椭圆引导')}
        description={d(
          'Same layout as ImageUploadField: compact preview + actions; oval uses accent color.',
          '布局对齐 ImageUploadField：紧凑预览 + 操作按钮；椭圆描边用强调色。',
        )}
        code={`const [url, setUrl] = useState<string | null>(null)
const [ok, setOk] = useState(false)
<FacePhotoPicker
  previewUrl={url}
  confirmed={ok}
  onConfirmedChange={setOk}
  onFileSelect={(file) => {
    if (url) URL.revokeObjectURL(url)
    setUrl(file ? URL.createObjectURL(file) : null)
  }}
/>`}
      >
        <FacePhotoPicker
          previewUrl={url}
          fileName={name}
          confirmed={ok}
          onConfirmedChange={setOk}
          onFileSelect={(file) => {
            if (url) URL.revokeObjectURL(url)
            setOk(false)
            setName(file?.name ?? null)
            setUrl(file ? URL.createObjectURL(file) : null)
          }}
        />
      </DocDemo>
    </ComponentDocLayout>
  )
}
