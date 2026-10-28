import { useState } from 'react'
import { Button, PdfPreview } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

/** Minimal valid PDF for demo lightbox */
const DEMO_PDF =
  'data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PC9UeXBlL0NhdGFsb2cvUGFnZXMgMiAwIFI+PgplbmRvYmoKMiAwIG9iago8PC9UeXBlL1BhZ2VzL0NvdW50IDEvS2lkc1szIDAgUl0+PgplbmRvYmoKMyAwIG9iago8PC9UeXBlL1BhZ2UvTWVkaWFCb3hbMCAwIDMwMCAxNDBdL1BhcmVudCAyIDAgUi9Db250ZW50cyA0IDAgUi9SZXNvdXJjZXM8PC9Gb250PDw+Pj4+PgplbmRvYmoKNCAwIG9iago8PC9MZW5ndGggNDQ+PnN0cmVhbQpCVAovRjEgMjQgVGYKNzAgNzAgVGQKKHgtdWkgUERGKSBUSgplVAplbmRzdHJlYW0KZW5kb2JqCnhyZWYKMCA1CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAxNSAwMDAwMCBuIAowMDAwMDAwMDc0IDAwMDAwIG4gCjAwMDAwMDAxMzMgMDAwMDAgbiAKMDAwMDAwMDI2NCAwMDAwMCBuIAp0cmFpbGVyCjw8L1NpemUgNS9Sb290IDEgMCBSPj4Kc3RhcnR4cmVmCjM1NQolJUVPRgo='

const meta = docMeta('pdf-preview')
const props: PropDef[] = [
  { name: 'src', type: 'string', desc: { en: 'PDF URL (http / blob / data)', zh: 'PDF URL（http / blob / data）' } },
  { name: 'open', type: 'boolean', desc: { en: 'Controlled open', zh: '受控打开' } },
  { name: 'onOpenChange', type: '(open: boolean) => void', desc: { en: 'Open change', zh: '打开变更' } },
  { name: 'fileName', type: 'string', desc: { en: 'Download filename', zh: '下载文件名' } },
]

export function PdfPreviewDoc() {
  const d = useDemoT()
  const [open, setOpen] = useState(false)

  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo
        title={d('Card trigger', '卡片触发')}
        code={`<PdfPreview src={pdfUrl} fileName="demo.pdf" />`}
      >
        <PdfPreview src={DEMO_PDF} fileName="demo.pdf" />
      </DocDemo>
      <DocDemo
        title={d('Controlled (post-fetch)', '受控（拉取后打开）')}
        description={d(
          'Open after your API returns a blob URL — no trigger needed.',
          '接口返回 blob URL 后再打开，可不渲染触发器。',
        )}
        code={`const [open, setOpen] = useState(false)
<>
  <Button onClick={() => setOpen(true)}>View PDF</Button>
  <PdfPreview src={pdfUrl} open={open} onOpenChange={setOpen} fileName="slip.pdf" />
</>`}
      >
        <div className="showcase-row">
          <Button type="button" variant="secondary" size="sm" onClick={() => setOpen(true)}>
            {d('View PDF', '查看 PDF')}
          </Button>
          <PdfPreview
            src={DEMO_PDF}
            open={open}
            onOpenChange={setOpen}
            fileName="slip.pdf"
            title={d('e-slip preview', 'e-slip 预览')}
          />
        </div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
