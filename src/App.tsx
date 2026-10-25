import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ToastProvider } from '@/components/ui'
import { routerBasename } from '@/lib/baseUrl'
import { AppearanceProvider } from '@/theme/AppearanceProvider'
import { DemoShell } from '@/demo/DemoShell'
import { OverviewPage } from '@/demo/pages/OverviewPage'
import { FoundationsPage } from '@/demo/pages/FoundationsPage'
import { ButtonsPage } from '@/demo/pages/ButtonsPage'
import { FormsPage } from '@/demo/pages/FormsPage'
import { DataPage } from '@/demo/pages/DataPage'
import { FeedbackPage } from '@/demo/pages/FeedbackPage'
import { NavigationPage } from '@/demo/pages/NavigationPage'
import { ChartsPage } from '@/demo/pages/ChartsPage'
import { AdvancedPage } from '@/demo/pages/AdvancedPage'
import { PatternsPage } from '@/demo/pages/PatternsPage'
import { ExamplePageHeaderPage } from '@/demo/pages/ExamplePageHeaderPage'
import { ExampleListPage } from '@/demo/pages/ExampleListPage'
import { ExampleFormPage } from '@/demo/pages/ExampleFormPage'
import { ExampleDetailPage } from '@/demo/pages/ExampleDetailPage'
import { ExampleWizardPage } from '@/demo/pages/ExampleWizardPage'
import { ExampleLogPage } from '@/demo/pages/ExampleLogPage'
import { ExampleLoginPage } from '@/demo/pages/ExampleLoginPage'
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

export default function App() {
  return (
    <AppearanceProvider>
      <ToastProvider>
        <BrowserRouter basename={routerBasename()}>
          <Routes>
            <Route element={<DemoShell />}>
              <Route index element={<OverviewPage />} />
              <Route path="foundations" element={<FoundationsPage />} />
              <Route path="components/buttons" element={<ButtonsPage />} />
              <Route path="components/forms" element={<FormsPage />} />
              <Route path="components/data" element={<DataPage />} />
              <Route path="components/feedback" element={<FeedbackPage />} />
              <Route path="components/navigation" element={<NavigationPage />} />
              <Route path="components/charts" element={<ChartsPage />} />
              <Route path="components/advanced" element={<AdvancedPage />} />
              <Route path="patterns" element={<PatternsPage />} />
              <Route path="examples/page" element={<ExamplePageHeaderPage />} />
              <Route path="examples/list" element={<ExampleListPage />} />
              <Route path="examples/form" element={<ExampleFormPage />} />
              <Route path="examples/detail" element={<ExampleDetailPage />} />
              <Route path="examples/wizard" element={<ExampleWizardPage />} />
              <Route path="examples/log" element={<ExampleLogPage />} />
              <Route path="examples/login" element={<ExampleLoginPage />} />
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
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AppearanceProvider>
  )
}
