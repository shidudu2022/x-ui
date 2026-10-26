import { useAppearance } from '@/theme/AppearanceProvider'
import {
  AccentPicker,
  Drawer,
  Segmented,
  StepHeading,
  ThemePicker,
  WallpaperPicker,
} from '@/components/ui'

/** Appearance drawer — 深浅色 / 主题 / 壁纸 / 强调色 / 密度 */
export function ThemeDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { modePreference, setModePreference, density, setDensity, theme } = useAppearance()

  return (
    <Drawer open={open} onClose={onClose} title="外观" size="sm">
      <div className="stack">
        <div>
          <StepHeading title="深浅色" />
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
          <StepHeading title="主题" />
          <ThemePicker />
        </div>

        {theme === 'glass' ? (
          <div>
            <StepHeading title="壁纸" />
            <WallpaperPicker />
          </div>
        ) : null}

        <div>
          <StepHeading title="强调色" />
          <AccentPicker />
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
      </div>
    </Drawer>
  )
}
