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
import { useDemoT } from '@/demo/i18n/useDemoT'
import { ShowcaseSection } from '../ShowcaseSection'

export function PatternsPage() {
  const [step, setStep] = useState(1)
  const t = useDemoT()

  return (
    <div>
      <PageHeader
        title={t('Patterns', '组合模式')}
        description={
          <>
            {t('Smaller compositions like login, wizard, and dashboard. Full-page examples are in ', '登录、向导、仪表盘等局部组合。整页示例见 ')}
            <Link to="/templates" className="text-link">
              {t('Templates', '页面模板')}
            </Link>
            {t('.', '。')}
          </>
        }
      />

      <ShowcaseSection title={t('Login card', 'Login 卡片')}>
        <div className="login-screen" style={{ minHeight: 360, position: 'relative' }}>
          <div className="login-card">
            <div className="login-brand">
              <div className="brand-mark">X</div>
              <div>
                <strong>X-UI</strong>
                <p>{t('Admin login', '管理员登录')}</p>
              </div>
            </div>
            <form className="stack" onSubmit={(e) => e.preventDefault()}>
              <Field label={t('Username', '用户名')} htmlFor="u">
                <Input id="u" defaultValue="admin" />
              </Field>
              <Field label={t('Password', '密码')} htmlFor="p">
                <Input id="p" type="password" defaultValue="••••••••" />
              </Field>
              <Button variant="primary" type="submit" style={{ width: '100%' }}>
                {t('Log in', '登录')}
              </Button>
            </form>
            <p className="login-hint muted">{t('UI example only, no auth logic', '仅 UI 示例，无鉴权逻辑')}</p>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Wizard">
        <Card padded className="page-narrow stack" style={{ maxWidth: 640 }}>
          <Steps
            current={step}
            items={[
              { id: '1', label: t('Name', '命名') },
              { id: '2', label: t('Parameters', '参数') },
              { id: '3', label: t('Confirm', '确认') },
            ]}
          />
          <Field label={t('Name', '名称')} htmlFor="wiz">
            <Input id="wiz" placeholder="my-resource" />
          </Field>
          <div className="actions">
            <Button disabled={step <= 1} onClick={() => setStep((s) => s - 1)}>
              {t('Previous step', '上一步')}
            </Button>
            <Button variant="primary" disabled={step >= 3} onClick={() => setStep((s) => s + 1)}>
              {t('Next step', '下一步')}
            </Button>
          </div>
        </Card>
      </ShowcaseSection>

      <ShowcaseSection title={t('Dashboard cards + chart', 'Dashboard 卡片 + 图')}>
        <div className="grid-2">
          <Card padded>
            <MetricGrid>
              <Metric label={t('Active sessions', '活跃会话')} value="128" />
              <Metric label="QPS" value="4.2k" />
            </MetricGrid>
          </Card>
          <ChartContainer title={t('Throughput', '吞吐')} height={200}>
            <BarChart
              data={[
                { name: t('Mon', '一'), v: 12 },
                { name: t('Tue', '二'), v: 18 },
                { name: t('Wed', '三'), v: 15 },
                { name: t('Thu', '四'), v: 22 },
              ]}
              xKey="name"
              series={[{ dataKey: 'v', name: t('Throughput', '吞吐') }]}
              showLegend={false}
            />
          </ChartContainer>
        </div>
      </ShowcaseSection>
    </div>
  )
}
