import { useState } from 'react'
import { MoreHorizontal, Plus } from 'lucide-react'
import { Button, PageHeader, Pill, Spinner, ToggleButton } from '@/components/ui'
import { ShowcaseSection } from '../ShowcaseSection'

export function ButtonsPage() {
  const [loading, setLoading] = useState(false)
  const [checked, setChecked] = useState(true)

  return (
    <div>
      <PageHeader title="按钮" description="Button、Toggle、Pill、Spinner。" />

      <ShowcaseSection title="变体">
        <div className="showcase-row">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="ghost">Ghost</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="块级 / 图标">
        <div className="stack" style={{ maxWidth: 280 }}>
          <Button variant="primary" block>
            全宽主按钮
          </Button>
          <div className="showcase-row">
            <Button iconOnly aria-label="添加">
              <Plus size={16} />
            </Button>
            <Button size="sm" iconOnly variant="ghost" aria-label="更多">
              <MoreHorizontal size={16} />
            </Button>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Loading">
        <div className="showcase-row">
          <Button
            variant="primary"
            loading={loading}
            onClick={() => {
              setLoading(true)
              window.setTimeout(() => setLoading(false), 1500)
            }}
          >
            提交
          </Button>
          <Spinner />
          <Spinner size="lg" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Toggle / Pill">
        <div className="showcase-row">
          <ToggleButton checked={checked} onClick={() => setChecked((v) => !v)}>
            自动刷新
          </ToggleButton>
          <Pill>状态</Pill>
          <Pill action onClick={() => undefined}>
            外观
          </Pill>
        </div>
      </ShowcaseSection>
    </div>
  )
}
