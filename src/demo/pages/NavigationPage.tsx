import { useState } from 'react'
import { Boxes, Cable, RadioTower } from 'lucide-react'
import {
  Button,
  Card,
  ChoiceCard,
  ChoiceCardGrid,
  DropdownMenu,
  PageHeader,
  Segmented,
  SplitPane,
  Steps,
  Tabs,
  useToast,
} from '@/components/ui'
import { Breadcrumbs } from '@/components/layout'
import { ShowcaseSection } from '../ShowcaseSection'

export function NavigationPage() {
  const { toast } = useToast()
  const [tab, setTab] = useState('one')
  const [step, setStep] = useState(2)
  const [seg, setSeg] = useState('overview')

  return (
    <div>
      <PageHeader
        title="导航与布局"
        description="Tabs、Steps、Breadcrumbs、Dropdown、SplitPane、ChoiceCard。"
      />

      <ShowcaseSection
        title="ChoiceCard"
        description="大卡片路径选择（与小链 CatalogTile 不同）。完整页面见侧栏「路径选择」或 /examples/choice。"
      >
        <ChoiceCardGrid>
          <ChoiceCard
            recommended
            recommendedLabel="推荐"
            icon={<RadioTower />}
            title="方式 A"
            description="推荐仅用 Badge；卡片描边与底色保持对等。"
            meta="meta 可选"
            onClick={() => toast('选择了方式 A', 'success')}
          />
          <ChoiceCard
            icon={<Cable />}
            title="方式 B"
            description="hover / focus 才出现强调，避免看起来像默认选中。"
            onClick={() => toast('选择了方式 B', 'info')}
          />
        </ChoiceCardGrid>
      </ShowcaseSection>

      <ShowcaseSection title="Breadcrumbs" description="与顶栏同款：单行 flex 对齐图标 / 链接 / 分隔符 / 当前页。">
        <div className="stack">
          <div className="breadcrumbs-demo">
            <Breadcrumbs current="概览" currentIcon={<Boxes size={15} />} />
          </div>
          <div className="breadcrumbs-demo">
            <Breadcrumbs
              parent={{ label: '集群', to: '/examples/list', icon: <Boxes size={15} /> }}
              current="demo-cluster"
            />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Dropdown / Segmented">
        <div className="showcase-row">
          <DropdownMenu
            trigger={<Button>菜单</Button>}
            items={[
              { id: 'edit', label: '编辑', onSelect: () => undefined },
              { id: 'sep', label: '', separator: true },
              { id: 'del', label: '删除', danger: true, onSelect: () => undefined },
            ]}
          />
          <Segmented
            value={seg}
            onChange={setSeg}
            options={[
              { value: 'overview', label: '概览' },
              { value: 'workloads', label: '工作负载' },
              { value: 'meta', label: '元数据' },
            ]}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Tabs / Steps">
        <div className="stack">
          <Tabs
            value={tab}
            onChange={setTab}
            items={[
              { id: 'one', label: '基本信息', content: <p className="muted">Tab 面板一</p> },
              { id: 'two', label: '高级', content: <p className="muted">Tab 面板二</p> },
            ]}
          />
          <Card padded className="stack">
            <Steps
              current={step}
              items={[
                { id: '1', label: '命名' },
                { id: '2', label: '配置' },
                { id: '3', label: '确认' },
              ]}
            />
            <Steps
              size="sm"
              current={step}
              items={[
                { id: '1', label: '命名' },
                { id: '2', label: '配置' },
                { id: '3', label: '确认' },
              ]}
            />
            <div className="actions">
              <Button disabled={step <= 1} onClick={() => setStep((s) => s - 1)}>
                上一步
              </Button>
              <Button variant="primary" disabled={step >= 3} onClick={() => setStep((s) => s + 1)}>
                下一步
              </Button>
            </div>
          </Card>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="SplitPane">
        <SplitPane
          left={<div className="muted">左侧面板</div>}
          right={<div className="muted">右侧内容区，拖拽中间分隔条调整宽度。</div>}
        />
      </ShowcaseSection>
    </div>
  )
}
