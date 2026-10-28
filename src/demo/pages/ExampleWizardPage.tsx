import { useState } from 'react'
import {
  Badge,
  Button,
  Callout,
  Card,
  Checkbox,
  Field,
  FormPage,
  Input,
  Muted,
  Select,
  StepHeading,
  Steps,
  Text,
  Textarea,
  useToast,
} from '@/components/ui'
import { useDemoT } from '@/demo/i18n/useDemoT'

export function ExampleWizardPage() {
  const t = useDemoT()
  const { toast } = useToast()
  const [step, setStep] = useState(1)

  return (
    <FormPage
      title={t('Create cluster', '创建集群')}
      description={t('Name → Server → Agent → install options → confirm.', '命名 → Server → Agent → 安装参数 → 确认安装。')}
    >
      <Steps
        current={step}
        items={[
          { id: '1', label: t('Name', '命名') },
          { id: '2', label: 'Server' },
          { id: '3', label: 'Agent' },
          { id: '4', label: t('Options', '参数') },
          { id: '5', label: t('Confirm', '确认') },
        ]}
      />

      <Card padded className="stack" style={{ marginTop: 16 }}>
        {step === 1 ? (
          <>
            <Field
              label={t('Cluster name (unique)', '集群名（唯一）')}
              htmlFor="wiz-name"
              hint={t('Lowercase letters, digits, hyphens', '小写字母、数字、中划线')}
            >
              <Input id="wiz-name" placeholder="demo-cluster" defaultValue="demo-cluster" />
            </Field>
            <Field label={t('Display name', '显示名')} htmlFor="wiz-display">
              <Input id="wiz-display" placeholder={t('Optional', '可选')} />
            </Field>
            <Field label={t('Tags', '标签')} htmlFor="wiz-tags">
              <Input id="wiz-tags" placeholder="demo, edge" />
            </Field>
            <Field label={t('Notes', '备注')} htmlFor="wiz-notes">
              <Textarea id="wiz-notes" rows={2} />
            </Field>
          </>
        ) : null}

        {step === 2 ? (
          <>
            <StepHeading
              title={t('Select Server node', '选择 Server 节点')}
              aside={<Badge tone="danger">{t('Required · exactly 1', '必选 · 仅 1 个')}</Badge>}
            />
            <Text as="p" variant="hint" className="step-desc">
              {t(
                'The Server is the control plane; install it first to generate the node token.',
                'Server 作为控制面，安装时先装这一台并生成 node-token。',
              )}
            </Text>
            <div className="node-pick">
              <Checkbox
                className="node-option"
                defaultChecked
                label={
                  <span className="node-meta">
                    <strong>edge-01</strong>
                    <span>10.0.0.1 · cn</span>
                  </span>
                }
              />
              <Checkbox
                className="node-option"
                label={
                  <span className="node-meta">
                    <strong>edge-02</strong>
                    <span>10.0.0.2 · cn</span>
                  </span>
                }
              />
            </div>
          </>
        ) : null}

        {step === 3 ? (
          <>
            <StepHeading title={t('Select Agent nodes', '选择 Agent 节点')} aside={<Badge tone="neutral">{t('Optional', '可选')}</Badge>} />
            <Text as="p" variant="hint" className="step-desc">
              {t(
                'Skip for a single-node cluster; you can add agents later.',
                '可跳过，先做成单节点；创建后仍可编辑节点扩容。',
              )}
            </Text>
          </>
        ) : null}

        {step === 4 ? (
          <div className="form-grid">
            <Field label={t('k3s version', 'k3s 版本')} htmlFor="opt-ver">
              <Select
                block
                defaultValue="latest"
                options={[
                  { value: 'latest', label: 'latest' },
                  { value: 'v1.31.3+k3s1', label: 'v1.31.3+k3s1' },
                ]}
              />
            </Field>
            <Field label="TLS SAN" htmlFor="opt-san">
              <Input id="opt-san" placeholder="k3s.example.com" />
            </Field>
            <Field label={t('Data directory', '数据目录')} htmlFor="opt-dir" className="full">
              <Input id="opt-dir" defaultValue="/var/lib/rancher/k3s" />
            </Field>
          </div>
        ) : null}

        {step === 5 ? (
          <>
            <Callout title={t('Mirror', '镜像源')}>
              <Muted as="div" style={{ marginTop: 4 }}>
                rancher-mirror.rancher.cn · INSTALL_K3S_MIRROR=cn
              </Muted>
            </Callout>
            <Muted as="p">
              {t('Confirming starts the install job; view logs on the job detail page.', '确认后将启动安装作业；可在作业详情查看日志。')}
            </Muted>
          </>
        ) : null}

        <div className="actions">
          <Button disabled={step <= 1} onClick={() => setStep((s) => s - 1)}>
            {t('Back', '上一步')}
          </Button>
          {step < 5 ? (
            <Button variant="primary" onClick={() => setStep((s) => s + 1)}>
              {t('Next', '下一步')}
            </Button>
          ) : (
            <Button variant="primary" onClick={() => toast(t('Install started (demo)', '已开始安装（示例）'), 'success')}>
              {t('Start install', '开始安装')}
            </Button>
          )}
        </div>
      </Card>
    </FormPage>
  )
}
