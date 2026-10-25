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
  NativeSelect,
  StepHeading,
  Steps,
  Text,
  Textarea,
  useToast,
} from '@/components/ui'

export function ExampleWizardPage() {
  const { toast } = useToast()
  const [step, setStep] = useState(1)

  return (
    <FormPage title="创建集群" description="命名 → Server → Agent → 安装参数 → 确认安装。">
      <Steps
        current={step}
        items={[
          { id: '1', label: '命名' },
          { id: '2', label: 'Server' },
          { id: '3', label: 'Agent' },
          { id: '4', label: '参数' },
          { id: '5', label: '确认' },
        ]}
      />

      <Card padded className="stack" style={{ marginTop: 16 }}>
        {step === 1 ? (
          <>
            <Field label="集群名（唯一）" htmlFor="wiz-name" hint="小写字母、数字、中划线">
              <Input id="wiz-name" placeholder="demo-cluster" defaultValue="demo-cluster" />
            </Field>
            <Field label="显示名" htmlFor="wiz-display">
              <Input id="wiz-display" placeholder="可选" />
            </Field>
            <Field label="标签" htmlFor="wiz-tags">
              <Input id="wiz-tags" placeholder="demo, edge" />
            </Field>
            <Field label="备注" htmlFor="wiz-notes">
              <Textarea id="wiz-notes" rows={2} />
            </Field>
          </>
        ) : null}

        {step === 2 ? (
          <>
            <StepHeading title="选择 Server 节点" aside={<Badge tone="danger">必选 · 仅 1 个</Badge>} />
            <Text as="p" variant="hint" className="step-desc">
              Server 作为控制面，安装时先装这一台并生成 node-token。
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
            <StepHeading title="选择 Agent 节点" aside={<Badge tone="neutral">可选</Badge>} />
            <Text as="p" variant="hint" className="step-desc">
              可跳过，先做成单节点；创建后仍可编辑节点扩容。
            </Text>
          </>
        ) : null}

        {step === 4 ? (
          <div className="form-grid">
            <Field label="k3s 版本" htmlFor="opt-ver">
              <NativeSelect id="opt-ver" defaultValue="latest">
                <option value="latest">latest</option>
                <option value="v1.31.3+k3s1">v1.31.3+k3s1</option>
              </NativeSelect>
            </Field>
            <Field label="TLS SAN" htmlFor="opt-san">
              <Input id="opt-san" placeholder="k3s.example.com" />
            </Field>
            <Field label="数据目录" htmlFor="opt-dir" className="full">
              <Input id="opt-dir" defaultValue="/var/lib/rancher/k3s" />
            </Field>
          </div>
        ) : null}

        {step === 5 ? (
          <>
            <Callout title="镜像源">
              <Muted as="div" style={{ marginTop: 4 }}>
                rancher-mirror.rancher.cn · INSTALL_K3S_MIRROR=cn
              </Muted>
            </Callout>
            <Muted as="p">确认后将启动安装作业；可在作业详情查看日志。</Muted>
          </>
        ) : null}

        <div className="actions">
          <Button disabled={step <= 1} onClick={() => setStep((s) => s - 1)}>
            上一步
          </Button>
          {step < 5 ? (
            <Button variant="primary" onClick={() => setStep((s) => s + 1)}>
              下一步
            </Button>
          ) : (
            <Button variant="primary" onClick={() => toast('已开始安装（示例）', 'success')}>
              开始安装
            </Button>
          )}
        </div>
      </Card>
    </FormPage>
  )
}
