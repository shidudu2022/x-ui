import { useState } from 'react'
import { FacePhotoPicker } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('face-photo-picker')
const props: PropDef[] = [
  { name: 'previewUrl', type: 'string | null', desc: { en: 'Object URL / image src', zh: '预览 URL' } },
  { name: 'onFileSelect', type: '(file: File | null) => void', desc: { en: 'File picked', zh: '选择文件' } },
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
          '3:4 frame with face oval; confirm checkbox after pick.',
          '3:4 取景框 + 人脸椭圆；选图后可勾选确认。',
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
