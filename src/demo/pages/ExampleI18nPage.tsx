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
import { useDemoT } from '@/demo/i18n/useDemoT'

const LONG =
  'This is a deliberately long label that should wrap gracefully without breaking the control layout or overflowing the page-narrow column on both LTR and simulated dense copy.'

export function ExampleI18nPage() {
  const t = useDemoT()
  const { density, setDensity } = useAppearance()

  return (
    <div className="page-narrow">
      <PageHeader
        title={t('Copy and density', '文案与密度')}
        description={t(
          'Long label wrapping and density toggle; use devtools to simulate RTL direction.',
          '长文案换行、密度切换；方向可用浏览器开发工具模拟 RTL。',
        )}
        actions={
          <Segmented
            value={density}
            onChange={(v) => setDensity(v as 'comfortable' | 'compact')}
            options={[
              { value: 'comfortable', label: t('Comfortable', '舒适') },
              { value: 'compact', label: t('Compact', '紧凑') },
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
          {t(
            'Density should only tighten spacing and control height, not change --control-fs (fixed 13px).',
            '切换密度应只压缩间距与控件高度，不改变 `--control-fs`（固定 13px）。',
          )}
        </p>
        <div className="actions">
          <Button variant="primary">Speichern / Save / {t('Save', '保存')}</Button>
          <Button variant="ghost">Abbrechen</Button>
        </div>
      </Card>
    </div>
  )
}
