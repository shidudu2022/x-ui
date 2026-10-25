import { CodeBlock, PageHeader, SplitPane, Tag } from '@/components/ui'

const left = `apiVersion: v1
kind: ConfigMap
metadata:
  name: x-ui
data:
  theme: light`

const right = `apiVersion: v1
kind: ConfigMap
metadata:
  name: x-ui
data:
  theme: dark
  accent: blue`

export function ExampleComparePage() {
  return (
    <div>
      <PageHeader
        title="对比 / Diff"
        description="SplitPane 双栏对照。"
        actions={<Tag tone="warn">有差异</Tag>}
      />
      <SplitPane
        left={<CodeBlock title="当前" language="yaml" code={left} />}
        right={<CodeBlock title="目标" language="yaml" code={right} />}
      />
    </div>
  )
}
