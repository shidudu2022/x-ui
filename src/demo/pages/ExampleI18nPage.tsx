import { useAppearance } from '@/theme/AppearanceProvider'
import {
  Button,
  Card,
  Field,
  Input,
  PageHeader,
  Segmented,
  Textarea,
} from '@/components/ui'

const LONG =
  'This is a deliberately long label that should wrap gracefully without breaking the control layout or overflowing the page-narrow column on both LTR and simulated dense copy.'

export function ExampleI18nPage() {
  const { density, setDensity } = useAppearance()

  return (
    <div className="page-narrow">
      <PageHeader
        title="文案与密度"
        description="长文案换行、密度切换；方向可用浏览器开发工具模拟 RTL。"
        actions={
          <Segmented
            value={density}
            onChange={(v) => setDensity(v as 'comfortable' | 'compact')}
            options={[
              { value: 'comfortable', label: '舒适' },
              { value: 'compact', label: '紧凑' },
            ]}
          />
        }
      />
      <Card padded className="stack">
        <Field label={LONG} htmlFor="i18n-a" hint="hint also wraps when needed across locales">
          <Input id="i18n-a" placeholder="Placeholder that can be quite long in some languages" />
        </Field>
        <Field
          label="Beschreibung / Description / 説明"
          htmlFor="i18n-b"
          hint="Mixed scripts in one field"
        >
          <Textarea id="i18n-b" rows={3} defaultValue="مرحبا · Hello · こんにちは · Здравствуйте" />
        </Field>
        <p className="muted">
          切换密度应只压缩间距与控件高度，不改变 `--control-fs`（固定 13px）。
        </p>
        <div className="actions">
          <Button variant="primary">Speichern / Save / 保存</Button>
          <Button variant="ghost">Abbrechen</Button>
        </div>
      </Card>
    </div>
  )
}
