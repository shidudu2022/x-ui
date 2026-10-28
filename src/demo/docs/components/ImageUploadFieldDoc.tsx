import { useState } from 'react'
import { ImageUploadField } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('image-upload-field')
const props: PropDef[] = [{ name: 'value', type: 'string | null', desc: '当前 URL' }, { name: 'onChange', type: '(v: string | null) => void', desc: '变更' }, { name: 'onUpload', type: '(file: File) => Promise<string>', desc: '上传并返回 URL' }, { name: 'label', type: 'ReactNode', desc: '标签' }]

export function ImageUploadFieldDoc() {
  const [url, setUrl] = useState<string | null>(null)
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`const [url, setUrl] = useState<string | null>(null)
<ImageUploadField
  value={url}
  onChange={setUrl}
  onUpload={async (file) => URL.createObjectURL(file)}
/>`}>
        <ImageUploadField value={url} onChange={setUrl} onUpload={async (file) => URL.createObjectURL(file)} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
