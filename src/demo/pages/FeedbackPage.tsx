import { useState } from 'react'
import {
  Alert,
  Banner,
  Button,
  ConfirmModal,
  Drawer,
  MeterBar,
  meterToneFromPct,
  Modal,
  PageHeader,
  Popover,
  Progress,
  StatusDot,
  StrongConfirm,
  Tooltip,
  confirm,
  useToast,
} from '@/components/ui'
import { ShowcaseSection } from '../ShowcaseSection'

export function FeedbackPage() {
  const { toast } = useToast()
  const [modal, setModal] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [strong, setStrong] = useState(false)

  return (
    <div>
      <PageHeader title="反馈" description="Alert、Toast、Modal、Drawer、强确认、Tooltip、Progress。" />

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
          <Alert tone="danger" title="错误">
            请求失败，请重试。
          </Alert>
          <Banner>维护模式进行中，危险操作已锁定。</Banner>
          <Progress label="上传" value={62} />
          <Progress label="告警水位" value={82} tone="warn" />
          <Progress label="处理中" indeterminate />
          <div className="showcase-row" style={{ alignItems: 'center', gap: 16 }}>
            <div style={{ width: 120 }}>
              <MeterBar value={32} tone={meterToneFromPct(32)} aria-label="CPU" />
            </div>
            <div style={{ width: 120 }}>
              <MeterBar value={78} tone={meterToneFromPct(78)} aria-label="内存" />
            </div>
            <div style={{ width: 120 }}>
              <MeterBar value={94} tone={meterToneFromPct(94)} aria-label="磁盘" />
            </div>
            <StatusDot ok />
            <StatusDot ok={false} />
            <StatusDot tone="warn" />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Toast / Overlay / Tooltip">
        <div className="showcase-row">
          <Button onClick={() => toast('已保存', 'success')}>Toast 成功</Button>
          <Button onClick={() => toast('出错了', 'error')}>Toast 错误</Button>
          <Button onClick={() => setModal(true)}>打开 Modal</Button>
          <Button onClick={() => setDrawer(true)}>打开 Drawer</Button>
          <Button variant="danger" onClick={() => setConfirmOpen(true)}>
            普通确认
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              void confirm({
                title: '删除节点？',
                description: '命令式 confirm()，需 ConfirmProvider。',
                danger: true,
                confirmText: '删除',
              }).then((ok) => {
                if (ok) toast('已确认删除', 'success')
              })
            }}
          >
            confirm()
          </Button>
          <Button variant="danger" onClick={() => setStrong(true)}>
            强确认删除
          </Button>
          <Tooltip content="快捷说明">
            <Button variant="ghost">悬停我</Button>
          </Tooltip>
          <Popover trigger={<Button variant="secondary">Popover</Button>}>
            <p style={{ margin: 0, fontSize: 13 }}>锚点浮层内容，不同于全屏 Drawer。</p>
          </Popover>
        </div>
        <p className="muted" style={{ margin: '10px 0 0', fontSize: 12 }}>
          删除等不可逆操作请用 <code>StrongConfirm</code> / <code>ConfirmModal</code> /{' '}
          <code>confirm()</code>
          （居中 Modal），不要用 Drawer。
        </p>
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
        <p className="muted">右侧抽屉适合表单、列表、搜索；不适合强确认删除。</p>
      </Drawer>

      <ConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="确认操作"
        onConfirm={() => toast('已确认', 'info')}
      >
        <p className="muted" style={{ margin: 0 }}>
          无需输入名称的普通确认。
        </p>
      </ConfirmModal>

      <StrongConfirm
        open={strong}
        onClose={() => setStrong(false)}
        title="删除集群"
        resourceName="cluster-01"
        onConfirm={() => toast('已删除 cluster-01', 'success')}
      >
        将永久删除该集群及其节点、作业记录。
      </StrongConfirm>
    </div>
  )
}
