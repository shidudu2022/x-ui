import { Kbd, Text } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('kbd')
const props: PropDef[] = [{ name: 'children', type: 'ReactNode', desc: { en: "Key label text", zh: "按键文案" } }]

export function KbdDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Shortcut hints", "快捷键提示")} description={d("Embed in descriptive copy instead of standing alone.", "嵌在说明文案里，而不是孤立摆放。")} code={`<Text variant="muted" size="sm">
  Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> Open command palette
</Text>`}>
        <Text variant="muted" size="sm">{d("Press ", "按 ")}<Kbd>⌘</Kbd> <Kbd>K</Kbd>{d(" to open the command palette, or ", " 打开命令面板，或 ")}<Kbd>?</Kbd>{d(" to view shortcuts.", " 查看快捷键。")}</Text>
      </DocDemo>
      <DocDemo title={d("Key combinations", "组合键")} code={`<Kbd>Ctrl</Kbd> + <Kbd>Shift</Kbd> + <Kbd>P</Kbd>`}>
        <div className="showcase-row" style={{ alignItems: 'center' }}><Kbd>Ctrl</Kbd><span className="muted">+</span><Kbd>Shift</Kbd><span className="muted">+</span><Kbd>P</Kbd></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
