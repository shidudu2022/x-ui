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
import { useDemoT } from '@/demo/i18n/useDemoT'

type Method = 'agent' | 'ssh' | null

/**
 * Large card path selection: import / onboarding entry points.
 * Business pages should mirror this structure (FormPage + ChoiceCardGrid).
 */
export function ExampleChoicePage() {
  const t = useDemoT()
  const { toast } = useToast()
  const [method, setMethod] = useState<Method>(null)

  if (method) {
    return (
      <FormPage
        title={method === 'agent' ? t('Connect via Agent', '通过 Agent 接入') : t('Connect via SSH', '通过 SSH 接入')}
        description={t(
          'Example: after choosing a method, continue the wizard (back navigation only here).',
          '示例：选定方式后进入后续向导（此处仅演示回退）。',
        )}
        actions={<Button onClick={() => setMethod(null)}>{t('Change method', '更换方式')}</Button>}
      >
        <Card padded className="stack">
          <Alert tone="info" title={t('Connection method selected', '已选择接入方式')}>
            {method === 'agent'
              ? t('Next: naming and install command steps.', '接下来应展示命名与安装命令步骤。')
              : t('Next: server selection and preflight steps.', '接下来应展示服务器勾选与预检步骤。')}
          </Alert>
          <div className="actions">
            <Button onClick={() => setMethod(null)}>{t('Back to choices', '返回选择')}</Button>
            <Button
              variant="primary"
              onClick={() => toast(t('Demo ends · real flow continues here', '示例结束 · 真实业务在此进入下一步'), 'success')}
            >
              {t('Continue (demo)', '继续（示例）')}
            </Button>
          </div>
        </Card>
      </FormPage>
    )
  }

  return (
    <FormPage
      title={t('Choose connection method', '选择接入方式')}
      description={t(
        'Two equal cards; use Badge for “recommended” only—do not fake a selected border.',
        '两张大卡片对等展示；推荐仅用 Badge，不改变描边/底色以免像已选中。',
      )}
    >
      <ChoiceCardGrid>
        <ChoiceCard
          recommended
          recommendedLabel={t('Recommended', '推荐')}
          icon={<RadioTower />}
          title="Connect Agent"
          description="No host inventory. Deploy an Agent on the cluster; it connects out via WebSocket."
          meta={t('Prefer when hosts are not registered', '主机未登记时优先')}
          onClick={() => setMethod('agent')}
        />
        <ChoiceCard
          icon={<Cable />}
          title={t('Via SSH', '通过 SSH')}
          description={t(
            'Pick registered hosts; SSH reads credentials and matches nodes.',
            '从已登记主机勾选节点，经 SSH 读取凭证并匹配。',
          )}
          meta={t('Requires server list and SSH', '需要服务器清单与 SSH')}
          onClick={() => setMethod('ssh')}
        />
      </ChoiceCardGrid>

      <Card padded className="stack" style={{ marginTop: 24 }}>
        <strong>{t('More variants', '更多变体')}</strong>
        <ChoiceCardGrid>
          <ChoiceCard
            icon={<CloudUpload />}
            title={t('Upload config', '上传配置')}
            description={t('Paste or upload kubeconfig (disabled demo).', '粘贴或上传 kubeconfig（演示禁用态）。')}
            meta={t('Demo · disabled', '示例 · disabled')}
            disabled
          />
          <ChoiceCard
            icon={<Server />}
            title={t('No icon is fine', '无图标也可')}
            description={t('Icon optional; wrap another grid for three columns.', 'icon 可选；三列时可再包一层 grid。')}
            meta={t('Text only', '仅文案')}
            onClick={() => toast(t('Clicked card without recommended badge', '点击了无推荐标记的卡片'), 'info')}
          />
        </ChoiceCardGrid>
      </Card>
    </FormPage>
  )
}
