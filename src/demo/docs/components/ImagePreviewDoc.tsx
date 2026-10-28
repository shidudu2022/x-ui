import { ImagePreview } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('image-preview')
const props: PropDef[] = [{ name: 'src', type: 'string', desc: '大图 URL' }, { name: 'alt', type: 'string', desc: '替代文本' }, { name: 'thumbSrc', type: 'string', desc: '缩略图' }]

export function ImagePreviewDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" description="点击缩略图打开灯箱。" code={`<ImagePreview src="/demo.png" alt="示例" />`}>
        <ImagePreview src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='100'%3E%3Crect fill='%233b82f6' width='160' height='100'/%3E%3Ctext x='50%25' y='55%25' fill='white' font-size='14' text-anchor='middle' font-family='sans-serif'%3Ex-ui%3C/text%3E%3C/svg%3E" alt="示例图" />
      </DocDemo>
    </ComponentDocLayout>
  )
}
