import { ACCENTS, ACCENT_COLORS } from '@/theme/accents'
import { useAppearance } from '@/theme/AppearanceProvider'
import { Button, Drawer, Segmented, StepHeading } from '@/components/ui'

/** Appearance drawer — matches k3s-start/web topbar「外观」panel */
export function ThemeDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { modePreference, setModePreference, accent, setAccent, density, setDensity } =
    useAppearance()

  return (
    <Drawer open={open} onClose={onClose} title="外观">
      <div className="stack">
        <div>
          <StepHeading title="主题" />
          <Segmented
            value={modePreference}
            onChange={setModePreference}
            options={[
              { value: 'system', label: '跟随系统' },
              { value: 'light', label: '浅色' },
              { value: 'dark', label: '深色' },
            ]}
          />
        </div>

        <div>
          <StepHeading title="配色" />
          <div className="accent-grid">
            {ACCENTS.map((a) => (
              <button
                key={a}
                type="button"
                className={`accent-swatch${accent === a ? ' active' : ''}`}
                onClick={() => setAccent(a)}
              >
                <span
                  className="accent-dot"
                  data-accent={a}
                  style={{ background: ACCENT_COLORS[a] }}
                />
                <span className="accent-meta">
                  <strong>{a}</strong>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <StepHeading title="密度" />
          <Segmented
            value={density}
            onChange={setDensity}
            options={[
              { value: 'comfortable', label: '舒适' },
              { value: 'compact', label: '紧凑' },
            ]}
          />
        </div>

        <div className="actions">
          <Button onClick={onClose}>完成</Button>
        </div>
      </div>
    </Drawer>
  )
}
