import { Link } from 'react-router-dom'
import {
  AccentPicker,
  Callout,
  Card,
  CodeBlock,
  Segmented,
  Stack,
  Text,
  ThemePicker,
  WallpaperPicker,
} from '@/components/ui'
import { useLocale } from '@/i18n'
import { ACCENTS, ACCENT_COLORS } from '@/theme/accents'
import { THEMES } from '@/theme/themes'
import { useAppearance } from '@/theme/AppearanceProvider'
import { pickL10n, type L10n } from '@/demo/i18n/types'
import { useDemoT } from '@/demo/i18n/useDemoT'
import { DocPage } from '@/demo/docs/DocPage'
import { ShowcaseSection } from '@/demo/ShowcaseSection'

const DIMENSIONS: Array<[name: string, values: L10n | string, attr: string, key: string]> = [
  ['mode', 'system · light · dark', 'body[data-mode]', 'xui-mode'],
  ['theme', THEMES.map((t) => t.id).join(' · '), 'body[data-theme]', 'xui-theme'],
  ['accent', ACCENTS.join(' · '), 'body[data-accent]', 'xui-accent'],
  ['density', 'comfortable · compact', 'body[data-density]', 'xui-density'],
  ['wallpaper', { en: 'Only applies to the glass theme', zh: '仅 glass 主题生效' }, 'body[data-wallpaper]', 'xui-wallpaper'],
]

const HOOK = `import { useAppearance } from '@shidudu2022/x-ui'

function Toolbar() {
  const {
    mode, modePreference, setModePreference, // resolved light/dark + user preference (system|light|dark)
    theme, setTheme,                         // 'classic' | 'glass'
    accent, setAccent,                       // 'teal' | 'blue' | ...
    density, setDensity,                     // 'comfortable' | 'compact'
    toggleMode,
  } = useAppearance()
  // ...
}`

const BRAND = `/* app.css — place after the x-ui styles; unlayered styles naturally win over rules inside @layer */
body[data-mode='light'] {
  --primary: #4f46e5;
  --primary-hover: #4338ca;
  --primary-soft: rgba(79, 70, 229, 0.1);
  --primary-ink: #ffffff;
  --sidebar-active: rgba(79, 70, 229, 0.1);
}

body[data-mode='dark'] {
  --primary: #818cf8;
  --primary-hover: #a5b4fc;
  --primary-soft: rgba(129, 140, 248, 0.14);
  --primary-ink: #1e1b4b;
  --sidebar-active: rgba(129, 140, 248, 0.12);
}`

export function ThemingPage() {
  const { locale } = useLocale()
  const t = useDemoT()
  const { modePreference, setModePreference, density, setDensity, theme } = useAppearance()

  return (
    <DocPage
      eyebrow={t('Start', '开始')}
      title={t('Theming', '主题与外观')}
      description={t(
        'x-ui drives appearance with data-* attributes on body + CSS variables: switching needs no re-render, and you can customize your brand by overriding tokens alone.',
        'x-ui 用 body 上的 data-* 属性 + CSS 变量驱动外观：切换无需重新渲染组件，也可以只覆盖令牌来定制品牌。',
      )}
    >
      <ShowcaseSection
        title={t('Appearance dimensions', '外观维度')}
        description={t(
          'Five independent dimensions, written onto body by AppearanceProvider and persisted to localStorage.',
          '五个互相独立的维度，由 AppearanceProvider 写入 body 并持久化到 localStorage。',
        )}
      >
        <div className="guide-table-wrap">
          <table className="guide-table">
            <thead>
              <tr>
                <th>{t('Dimension', '维度')}</th>
                <th>{t('Values', '取值')}</th>
                <th>{t('Lands on', '落点')}</th>
                <th>{t('Storage key', '存储键')}</th>
              </tr>
            </thead>
            <tbody>
              {DIMENSIONS.map(([name, values, attr, key]) => (
                <tr key={name}>
                  <td>
                    <code>{name}</code>
                  </td>
                  <td>{pickL10n(locale, values)}</td>
                  <td>
                    <code>{attr}</code>
                  </td>
                  <td>
                    <code>{key}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title={t('Try it live', '在线试用')}
        description={t('Changes apply to the whole documentation site immediately — use it to check any component page.', '修改后立即作用于整个文档站，可以顺便检查任意组件页。')}
      >
        <Card padded className="appearance-demo-card">
          <Stack>
            <Text variant="strong">{t('Light / dark', '深浅色')}</Text>
            <Segmented
              value={modePreference}
              onChange={setModePreference}
              options={[
                { value: 'system', label: t('Follow system', '跟随系统') },
                { value: 'light', label: t('Light', '浅色') },
                { value: 'dark', label: t('Dark', '深色') },
              ]}
            />
            <Text variant="strong">{t('Theme', '主题')}</Text>
            <ThemePicker />
            {theme === 'glass' ? (
              <>
                <Text variant="strong">{t('Wallpaper', '壁纸')}</Text>
                <WallpaperPicker />
              </>
            ) : null}
            <Text variant="strong">{t('Accent color', '强调色')}</Text>
            <AccentPicker />
            <Text variant="strong">{t('Density', '密度')}</Text>
            <Segmented
              value={density}
              onChange={setDensity}
              options={[
                { value: 'comfortable', label: t('Comfortable', '舒适') },
                { value: 'compact', label: t('Compact', '紧凑') },
              ]}
            />
          </Stack>
        </Card>
      </ShowcaseSection>

      <ShowcaseSection title="useAppearance" description={t('Read or switch appearance from business code.', '在业务代码里读取或切换外观。')}>
        <CodeBlock className="guide-code" code={HOOK} language="tsx" title="tsx" />
      </ShowcaseSection>

      <ShowcaseSection
        title={t('Customize brand color', '自定义品牌色')}
        description={t(
          'Just override the --primary token family — don’t touch component styles. Provide both a light and a dark set.',
          '覆盖 --primary 系列令牌即可，不要改组件样式。需要同时提供浅色与深色两套。',
        )}
      >
        <CodeBlock className="guide-code" code={BRAND} language="css" title="css" />
        <div style={{ marginTop: 12, maxWidth: 720 }}>
          <Callout variant="info" title={t('Why do unlayered styles win?', '为什么未分层样式能覆盖？')}>
            {t(
              'All of x-ui’s styles live inside @layer (order: tokens → reset → layout → components → charts → responsive → density). CSS specifies that unlayered styles always win over anything inside a layer, regardless of selector specificity — so your app.css never needs higher specificity or !important.',
              'x-ui 的样式都在 @layer 中（顺序：tokens → reset → layout → components → charts → responsive → density）。CSS 规定未分层样式优先于任何分层样式，与选择器权重无关，所以你的 app.css 无需提高权重或使用 !important。',
            )}
          </Callout>
        </div>
        <div style={{ marginTop: 16 }}>
          <Text variant="muted" size="md" as="p" style={{ margin: '0 0 8px' }}>
            {t('Preview values of the built-in accent colors (actual lightness varies by light/dark mode):', '内置强调色的预览色值（实际按深浅色取不同明度）：')}
          </Text>
          <div className="showcase-row">
            {ACCENTS.map((a) => (
              <span key={a} className="pill">
                <span className="pill-dot" style={{ background: ACCENT_COLORS[a] }} />
                {a}
              </span>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title={t('Available tokens', '可用令牌')}>
        <Text as="p" variant="muted" size="md">
          {t('The full list of colors, type scale, radius, spacing, and chart palette is in ', '颜色、字号、圆角、间距、图表色板的完整清单见 ')}
          <Link to="/foundations" className="text-link">
            {t('Design tokens', '设计令牌')}
          </Link>
          {t('. Components only reference these variables internally, so overriding a variable applies globally.', '。组件内部只引用这些变量，所以覆盖变量即可全局生效。')}
        </Text>
      </ShowcaseSection>
    </DocPage>
  )
}
