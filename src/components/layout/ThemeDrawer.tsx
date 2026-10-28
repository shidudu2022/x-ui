import { useAppearance } from '@/theme/AppearanceProvider'
import {
  AccentPicker,
  Drawer,
  Segmented,
  StepHeading,
  ThemePicker,
  WallpaperPicker,
} from '@/components/ui'
import { useLocale } from '@/i18n'

/** Appearance drawer — color mode / theme / wallpaper / accent / density */
export function ThemeDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { modePreference, setModePreference, density, setDensity, theme } = useAppearance()
  const { locale, setLocale, t } = useLocale()

  return (
    <Drawer open={open} onClose={onClose} title={t('themeDrawer.title')} size="sm">
      <div className="stack">
        <div>
          <StepHeading title={t('themeDrawer.language')} />
          <Segmented
            value={locale}
            onChange={setLocale}
            options={[
              { value: 'en', label: 'English' },
              { value: 'zh', label: '中文' },
            ]}
          />
        </div>

        <div>
          <StepHeading title={t('themeDrawer.colorMode')} />
          <Segmented
            value={modePreference}
            onChange={setModePreference}
            options={[
              { value: 'system', label: t('themeDrawer.system') },
              { value: 'light', label: t('themeDrawer.light') },
              { value: 'dark', label: t('themeDrawer.dark') },
            ]}
          />
        </div>

        <div>
          <StepHeading title={t('themeDrawer.theme')} />
          <ThemePicker />
        </div>

        {theme === 'glass' ? (
          <div>
            <StepHeading title={t('themeDrawer.wallpaper')} />
            <WallpaperPicker />
          </div>
        ) : null}

        <div>
          <StepHeading title={t('themeDrawer.accent')} />
          <AccentPicker />
        </div>

        <div>
          <StepHeading title={t('themeDrawer.density')} />
          <Segmented
            value={density}
            onChange={setDensity}
            options={[
              { value: 'comfortable', label: t('themeDrawer.comfortable') },
              { value: 'compact', label: t('themeDrawer.compact') },
            ]}
          />
        </div>
      </div>
    </Drawer>
  )
}
