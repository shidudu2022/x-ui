import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ConfirmProvider, ToastProvider } from '@/components/ui'
import { routerBasename } from '@/lib/baseUrl'
import { AppearanceProvider } from '@/theme/AppearanceProvider'
import { LocaleProvider } from '@/i18n'
import { DemoShell } from '@/demo/DemoShell'
import { OverviewPage } from '@/demo/pages/OverviewPage'
import { FoundationsPage } from '@/demo/pages/FoundationsPage'
import { ComponentIndexPage } from '@/demo/pages/ComponentIndexPage'
import { ComponentDocPage } from '@/demo/pages/ComponentDocPage'
import { PatternsPage } from '@/demo/pages/PatternsPage'
import { TemplatesIndexPage } from '@/demo/pages/TemplatesIndexPage'
import { GettingStartedPage } from '@/demo/pages/docs/GettingStartedPage'
import { ThemingPage } from '@/demo/pages/docs/ThemingPage'
import { ConventionsPage } from '@/demo/pages/docs/ConventionsPage'
import { UtilitiesPage } from '@/demo/pages/docs/UtilitiesPage'
import { ExamplePageHeaderPage } from '@/demo/pages/ExamplePageHeaderPage'
import { ExampleListPage } from '@/demo/pages/ExampleListPage'
import { ExampleFormPage } from '@/demo/pages/ExampleFormPage'
import { ExampleDetailPage } from '@/demo/pages/ExampleDetailPage'
import { ExampleWizardPage } from '@/demo/pages/ExampleWizardPage'
import { ExampleLogPage } from '@/demo/pages/ExampleLogPage'
import { ExampleLoginPage } from '@/demo/pages/ExampleLoginPage'
import { ExampleRegisterPage } from '@/demo/pages/ExampleRegisterPage'
import { ExampleVerifyEmailPage } from '@/demo/pages/ExampleVerifyEmailPage'
import { ExampleStrongConfirmPage } from '@/demo/pages/ExampleStrongConfirmPage'
import { ExampleListDetailPage } from '@/demo/pages/ExampleListDetailPage'
import { ExampleTypographyPage } from '@/demo/pages/ExampleTypographyPage'
import { ExampleDashboardPage } from '@/demo/pages/ExampleDashboardPage'
import { ExampleSettingsPage } from '@/demo/pages/ExampleSettingsPage'
import { ExampleEmptyPage } from '@/demo/pages/ExampleEmptyPage'
import { ExampleSearchPage } from '@/demo/pages/ExampleSearchPage'
import { ExampleComparePage } from '@/demo/pages/ExampleComparePage'
import { ExampleProfilePage } from '@/demo/pages/ExampleProfilePage'
import { ExampleRolesPage } from '@/demo/pages/ExampleRolesPage'
import { ExampleNotificationsPage } from '@/demo/pages/ExampleNotificationsPage'
import { ExampleSkeletonPage } from '@/demo/pages/ExampleSkeletonPage'
import { ExampleErrorsPage } from '@/demo/pages/ExampleErrorsPage'
import { ExampleAuditPage } from '@/demo/pages/ExampleAuditPage'
import { ExampleOnboardingPage } from '@/demo/pages/ExampleOnboardingPage'
import { ExampleI18nPage } from '@/demo/pages/ExampleI18nPage'
import { ExamplePermissionsPage } from '@/demo/pages/ExamplePermissionsPage'
import { ExampleChoicePage } from '@/demo/pages/ExampleChoicePage'
import { ExampleResetPasswordPage } from '@/demo/pages/ExampleResetPasswordPage'
import { ExampleInvitePage } from '@/demo/pages/ExampleInvitePage'
import { ExampleApiKeysPage } from '@/demo/pages/ExampleApiKeysPage'

const LEGACY_COMPONENT_REDIRECTS: Record<string, string> = {
  buttons: 'button',
  forms: 'field',
  data: 'data-table',
  feedback: 'alert',
  navigation: 'page-header',
  charts: 'chart-container',
  advanced: 'command-palette',
}

function LegacyComponentRedirect({ legacy }: { legacy: string }) {
  const slug = LEGACY_COMPONENT_REDIRECTS[legacy] ?? ''
  return <Navigate to={slug ? `/components/${slug}` : '/components'} replace />
}

export default function App() {
  return (
    <LocaleProvider defaultLocale="en">
      <AppearanceProvider>
        <ToastProvider>
          <ConfirmProvider>
            <BrowserRouter basename={routerBasename()}>
              <Routes>
                <Route element={<DemoShell />}>
                  <Route index element={<OverviewPage />} />
                  <Route path="docs/getting-started" element={<GettingStartedPage />} />
                  <Route path="docs/theming" element={<ThemingPage />} />
                  <Route path="docs/conventions" element={<ConventionsPage />} />
                  <Route path="docs/utilities" element={<UtilitiesPage />} />
                  <Route path="foundations" element={<FoundationsPage />} />
                  <Route path="templates" element={<TemplatesIndexPage />} />
                  <Route path="components" element={<ComponentIndexPage />} />
                  <Route path="components/buttons" element={<LegacyComponentRedirect legacy="buttons" />} />
                  <Route path="components/forms" element={<LegacyComponentRedirect legacy="forms" />} />
                  <Route path="components/data" element={<LegacyComponentRedirect legacy="data" />} />
                  <Route path="components/feedback" element={<LegacyComponentRedirect legacy="feedback" />} />
                  <Route
                    path="components/navigation"
                    element={<LegacyComponentRedirect legacy="navigation" />}
                  />
                  <Route path="components/charts" element={<LegacyComponentRedirect legacy="charts" />} />
                  <Route
                    path="components/advanced"
                    element={<LegacyComponentRedirect legacy="advanced" />}
                  />
                  <Route path="components/:slug" element={<ComponentDocPage />} />
                  <Route path="patterns" element={<PatternsPage />} />
                  <Route path="examples/page" element={<ExamplePageHeaderPage />} />
                  <Route path="examples/list" element={<ExampleListPage />} />
                  <Route path="examples/list-detail" element={<ExampleListDetailPage />} />
                  <Route path="examples/form" element={<ExampleFormPage />} />
                  <Route path="examples/detail" element={<ExampleDetailPage />} />
                  <Route path="examples/wizard" element={<ExampleWizardPage />} />
                  <Route path="examples/log" element={<ExampleLogPage />} />
                  <Route path="examples/login" element={<ExampleLoginPage />} />
                  <Route path="examples/register" element={<ExampleRegisterPage />} />
                  <Route path="examples/verify-email" element={<ExampleVerifyEmailPage />} />
                  <Route path="examples/reset-password" element={<ExampleResetPasswordPage />} />
                  <Route path="examples/invite" element={<ExampleInvitePage />} />
                  <Route path="examples/api-keys" element={<ExampleApiKeysPage />} />
                  <Route path="examples/strong-confirm" element={<ExampleStrongConfirmPage />} />
                  <Route path="examples/typography" element={<ExampleTypographyPage />} />
                  <Route path="examples/dashboard" element={<ExampleDashboardPage />} />
                  <Route path="examples/settings" element={<ExampleSettingsPage />} />
                  <Route path="examples/empty" element={<ExampleEmptyPage />} />
                  <Route path="examples/search" element={<ExampleSearchPage />} />
                  <Route path="examples/compare" element={<ExampleComparePage />} />
                  <Route path="examples/profile" element={<ExampleProfilePage />} />
                  <Route path="examples/roles" element={<ExampleRolesPage />} />
                  <Route path="examples/notifications" element={<ExampleNotificationsPage />} />
                  <Route path="examples/skeleton" element={<ExampleSkeletonPage />} />
                  <Route path="examples/errors" element={<ExampleErrorsPage />} />
                  <Route path="examples/audit" element={<ExampleAuditPage />} />
                  <Route path="examples/onboarding" element={<ExampleOnboardingPage />} />
                  <Route path="examples/i18n" element={<ExampleI18nPage />} />
                  <Route path="examples/permissions" element={<ExamplePermissionsPage />} />
                  <Route path="examples/choice" element={<ExampleChoicePage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </ConfirmProvider>
        </ToastProvider>
      </AppearanceProvider>
    </LocaleProvider>
  )
}
