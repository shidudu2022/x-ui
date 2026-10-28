import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BarChart, ChartContainer } from '@/components/charts'
import {
  Button,
  Card,
  Field,
  Input,
  Metric,
  MetricGrid,
  PageHeader,
  Steps,
} from '@/components/ui'
import { ShowcaseSection } from '../ShowcaseSection'

export function PatternsPage() {
  const [step, setStep] = useState(1)

  return (
    <div>
      <PageHeader
        title="组合模式"
        description={<>登录、向导、仪表盘等局部组合。整页示例见 <Link to="/templates" className="text-link">页面模板</Link>。</>}
      />

      <ShowcaseSection title="Login 卡片">
        <div className="login-screen" style={{ minHeight: 360, position: 'relative' }}>
          <div className="login-card">
            <div className="login-brand">
              <div className="brand-mark">X</div>
              <div>
                <strong>X-UI</strong>
                <p>管理员登录</p>
              </div>
            </div>
            <form className="stack" onSubmit={(e) => e.preventDefault()}>
              <Field label="用户名" htmlFor="u">
                <Input id="u" defaultValue="admin" />
              </Field>
              <Field label="密码" htmlFor="p">
                <Input id="p" type="password" defaultValue="••••••••" />
              </Field>
              <Button variant="primary" type="submit" style={{ width: '100%' }}>
                登录
              </Button>
            </form>
            <p className="login-hint muted">仅 UI 示例，无鉴权逻辑</p>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Wizard">
        <Card padded className="page-narrow stack" style={{ maxWidth: 640 }}>
          <Steps
            current={step}
            items={[
              { id: '1', label: '命名' },
              { id: '2', label: '参数' },
              { id: '3', label: '确认' },
            ]}
          />
          <Field label="名称" htmlFor="wiz">
            <Input id="wiz" placeholder="my-resource" />
          </Field>
          <div className="actions">
            <Button disabled={step <= 1} onClick={() => setStep((s) => s - 1)}>
              上一步
            </Button>
            <Button variant="primary" disabled={step >= 3} onClick={() => setStep((s) => s + 1)}>
              下一步
            </Button>
          </div>
        </Card>
      </ShowcaseSection>

      <ShowcaseSection title="Dashboard 卡片 + 图">
        <div className="grid-2">
          <Card padded>
            <MetricGrid>
              <Metric label="活跃会话" value="128" />
              <Metric label="QPS" value="4.2k" />
            </MetricGrid>
          </Card>
          <ChartContainer title="吞吐" height={200}>
            <BarChart
              data={[
                { name: '一', v: 12 },
                { name: '二', v: 18 },
                { name: '三', v: 15 },
                { name: '四', v: 22 },
              ]}
              xKey="name"
              series={[{ dataKey: 'v', name: '吞吐' }]}
              showLegend={false}
            />
          </ChartContainer>
        </div>
      </ShowcaseSection>
    </div>
  )
}
