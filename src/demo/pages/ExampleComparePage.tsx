import { CodeBlock, PageHeader, SplitPane, Tag } from '@/components/ui'
import { useDemoT } from '@/demo/i18n/useDemoT'

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
  const t = useDemoT()

  return (
    <div>
      <PageHeader
        title={t('Compare / Diff', '对比 / Diff')}
        description={t('SplitPane two-column comparison.', 'SplitPane 双栏对照。')}
        actions={<Tag tone="warn">{t('Differs', '有差异')}</Tag>}
      />
      <SplitPane
        left={<CodeBlock title={t('Current', '当前')} language="yaml" code={left} />}
        right={<CodeBlock title={t('Target', '目标')} language="yaml" code={right} />}
      />
    </div>
  )
}
