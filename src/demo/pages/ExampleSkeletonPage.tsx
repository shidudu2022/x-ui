import { Card, PageHeader, Skeleton, SkeletonCard, SkeletonTable } from '@/components/ui'

export function ExampleSkeletonPage() {
  return (
    <div>
      <PageHeader title="加载骨架" description="列表 / 详情整页骨架。" />
      <div className="grid-2">
        <Card padded>
          <div className="stack">
            <Skeleton style={{ width: '40%', height: 22 }} />
            <Skeleton style={{ width: '70%', height: 14 }} />
            <Skeleton style={{ width: '100%', height: 120, borderRadius: 12 }} />
          </div>
        </Card>
        <SkeletonCard />
      </div>
      <div style={{ marginTop: 16 }}>
        <SkeletonTable rows={8} />
      </div>
    </div>
  )
}
