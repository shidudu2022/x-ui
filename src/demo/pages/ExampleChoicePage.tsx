import { useState } from 'react'
import { Cable, CloudUpload, RadioTower, Server } from 'lucide-react'
import {
  Alert,
  Button,
  Card,
  ChoiceCard,
  ChoiceCardGrid,
  FormPage,
  useToast,
} from '@/components/ui'

type Method = 'agent' | 'ssh' | null

/**
 * 大卡片路径选择：导入 / 开通等方式入口。
 * 业务页应对齐本结构（FormPage + ChoiceCardGrid），勿自造选中态描边。
 */
export function ExampleChoicePage() {
  const { toast } = useToast()
  const [method, setMethod] = useState<Method>(null)

  if (method) {
    return (
      <FormPage
        title={method === 'agent' ? '通过 Agent 接入' : '通过 SSH 接入'}
        description="示例：选定方式后进入后续向导（此处仅演示回退）。"
        actions={
          <Button onClick={() => setMethod(null)}>更换方式</Button>
        }
      >
        <Card padded className="stack">
          <Alert tone="info" title="已选择接入方式">
            {method === 'agent'
              ? '接下来应展示命名与安装命令步骤。'
              : '接下来应展示服务器勾选与预检步骤。'}
          </Alert>
          <div className="actions">
            <Button onClick={() => setMethod(null)}>返回选择</Button>
            <Button
              variant="primary"
              onClick={() => toast('示例结束 · 真实业务在此进入下一步', 'success')}
            >
              继续（示例）
            </Button>
          </div>
        </Card>
      </FormPage>
    )
  }

  return (
    <FormPage
      title="选择接入方式"
      description="两张大卡片对等展示；推荐仅用 Badge，不改变描边/底色以免像已选中。"
    >
      <ChoiceCardGrid>
        <ChoiceCard
          recommended
          recommendedLabel="推荐"
          icon={<RadioTower />}
          title="Connect Agent"
          description="无需主机清单。在目标集群部署 Agent，由它经 WebSocket 主动连出。"
          meta="主机未登记时优先"
          onClick={() => setMethod('agent')}
        />
        <ChoiceCard
          icon={<Cable />}
          title="通过 SSH"
          description="从已登记主机勾选节点，经 SSH 读取凭证并匹配。"
          meta="需要服务器清单与 SSH"
          onClick={() => setMethod('ssh')}
        />
      </ChoiceCardGrid>

      <Card padded className="stack" style={{ marginTop: 24 }}>
        <strong>更多变体</strong>
        <ChoiceCardGrid>
          <ChoiceCard
            icon={<CloudUpload />}
            title="上传配置"
            description="粘贴或上传 kubeconfig（演示禁用态）。"
            meta="示例 · disabled"
            disabled
          />
          <ChoiceCard
            icon={<Server />}
            title="无图标也可"
            description="icon 可选；三列时可再包一层 grid。"
            meta="仅文案"
            onClick={() => toast('点击了无推荐标记的卡片', 'info')}
          />
        </ChoiceCardGrid>
      </Card>
    </FormPage>
  )
}
