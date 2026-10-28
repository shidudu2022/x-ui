import { Kbd, Text } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('kbd')
const props: PropDef[] = [{ name: 'children', type: 'ReactNode', desc: '按键文案' }]

export function KbdDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="快捷键提示" description="嵌在说明文案里，而不是孤立摆放。" code={`<Text variant="muted" size="sm">
  按 <Kbd>⌘</Kbd> <Kbd>K</Kbd> 打开命令面板
</Text>`}>
        <Text variant="muted" size="sm">按 <Kbd>⌘</Kbd> <Kbd>K</Kbd> 打开命令面板，或 <Kbd>?</Kbd> 查看快捷键。</Text>
      </DocDemo>
      <DocDemo title="组合键" code={`<Kbd>Ctrl</Kbd> + <Kbd>Shift</Kbd> + <Kbd>P</Kbd>`}>
        <div className="showcase-row" style={{ alignItems: 'center' }}><Kbd>Ctrl</Kbd><span className="muted">+</span><Kbd>Shift</Kbd><span className="muted">+</span><Kbd>P</Kbd></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
