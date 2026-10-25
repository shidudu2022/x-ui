import { useState } from 'react'
import {
  Alert,
  Banner,
  Button,
  ConfirmModal,
  Drawer,
  Modal,
  PageHeader,
  Popover,
  Progress,
  Tooltip,
  useToast,
} from '@/components/ui'
import { ShowcaseSection } from '../ShowcaseSection'

export function FeedbackPage() {
  const { toast } = useToast()
  const [modal, setModal] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const [confirm, setConfirm] = useState(false)

  return (
    <div>
      <PageHeader title="反馈" description="Alert、Toast、Modal、Drawer、Tooltip、Progress。" />

      <ShowcaseSection title="Alert / Banner / Progress">
        <div className="stack">
          <Alert tone="info" title="提示" dismissible>
            可关闭的信息条。
          </Alert>
          <Alert tone="success" title="成功">
            操作已完成。
          </Alert>
          <Alert tone="warn" title="警告">
            资源即将耗尽。
          </Alert>
          <Alert tone="error" title="错误">
            请求失败，请重试。
          </Alert>
          <Banner>维护模式进行中，危险操作已锁定。</Banner>
          <Progress label="上传" value={62} />
          <Progress label="处理中" indeterminate />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Toast / Overlay / Tooltip">
        <div className="showcase-row">
          <Button onClick={() => toast('已保存', 'success')}>Toast 成功</Button>
          <Button onClick={() => toast('出错了', 'error')}>Toast 错误</Button>
          <Button onClick={() => setModal(true)}>打开 Modal</Button>
          <Button onClick={() => setDrawer(true)}>打开 Drawer</Button>
          <Button variant="danger" onClick={() => setConfirm(true)}>
            确认删除
          </Button>
          <Tooltip content="快捷说明">
            <Button variant="ghost">悬停我</Button>
          </Tooltip>
          <Popover trigger={<Button variant="secondary">Popover</Button>}>
            <p style={{ margin: 0, fontSize: 13 }}>锚点浮层内容，不同于全屏 Drawer。</p>
          </Popover>
        </div>
      </ShowcaseSection>

      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title="示例弹窗"
        footer={
          <div className="actions">
            <Button onClick={() => setModal(false)}>取消</Button>
            <Button variant="primary" onClick={() => setModal(false)}>
              确定
            </Button>
          </div>
        }
      >
        <p className="muted" style={{ margin: 0 }}>
          支持 sm / md / lg 尺寸。
        </p>
      </Modal>

      <Drawer
        open={drawer}
        onClose={() => setDrawer(false)}
        title="示例抽屉"
        footer={
          <Button variant="primary" onClick={() => setDrawer(false)}>
            完成
          </Button>
        }
      >
        <p className="muted">右侧抽屉；也可设置 side=&quot;left&quot;。</p>
      </Drawer>

      <ConfirmModal
        open={confirm}
        onClose={() => setConfirm(false)}
        title="删除资源"
        danger
        confirmValue="delete-me"
        confirmText="删除"
        onConfirm={() => toast('已删除', 'success')}
      >
        <p className="muted" style={{ margin: 0 }}>
          此操作不可恢复。
        </p>
      </ConfirmModal>
    </div>
  )
}
