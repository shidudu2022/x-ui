import type { ComponentType } from 'react'
import { AccordionDoc } from './AccordionDoc'
import { AccentPickerDoc } from './AccentPickerDoc'
import { AlertDoc } from './AlertDoc'
import { AppShellDoc } from './AppShellDoc'
import { AreaChartDoc } from './AreaChartDoc'
import { AvatarDoc } from './AvatarDoc'
import { AvatarUploadDoc } from './AvatarUploadDoc'
import { BadgeDoc } from './BadgeDoc'
import { BannerDoc } from './BannerDoc'
import { BarChartDoc } from './BarChartDoc'
import { BrandDoc } from './BrandDoc'
import { BreadcrumbNavDoc } from './BreadcrumbNavDoc'
import { BreadcrumbsDoc } from './BreadcrumbsDoc'
import { ButtonDoc } from './ButtonDoc'
import { CalendarDoc } from './CalendarDoc'
import { CalloutDoc } from './CalloutDoc'
import { CardDoc } from './CardDoc'
import { CascaderDoc } from './CascaderDoc'
import { CellEllipsisDoc } from './CellEllipsisDoc'
import { ChartContainerDoc } from './ChartContainerDoc'
import { CheckboxDoc } from './CheckboxDoc'
import { ChecklistDoc } from './ChecklistDoc'
import { ChoiceCardDoc } from './ChoiceCardDoc'
import { CodeBlockDoc } from './CodeBlockDoc'
import { ColorFieldDoc } from './ColorFieldDoc'
import { ColorInputDoc } from './ColorInputDoc'
import { ComboboxDoc } from './ComboboxDoc'
import { CommandPaletteDoc } from './CommandPaletteDoc'
import { ConfirmDoc } from './ConfirmDoc'
import { ConfirmModalDoc } from './ConfirmModalDoc'
import { CopyButtonDoc } from './CopyButtonDoc'
import { DataTableDoc } from './DataTableDoc'
import { DatePickerDoc } from './DatePickerDoc'
import { DateRangePickerDoc } from './DateRangePickerDoc'
import { DescriptionListDoc } from './DescriptionListDoc'
import { DividerDoc } from './DividerDoc'
import { DrawerDoc } from './DrawerDoc'
import { DropdownMenuDoc } from './DropdownMenuDoc'
import { EmptyStateDoc } from './EmptyStateDoc'
import { FieldDoc } from './FieldDoc'
import { FileUploadDoc } from './FileUploadDoc'
import { FilterBarDoc } from './FilterBarDoc'
import { FormErrorsDoc } from './FormErrorsDoc'
import { FormPageDoc } from './FormPageDoc'
import { HeadingDoc } from './HeadingDoc'
import { FacePhotoPickerDoc } from './FacePhotoPickerDoc'
import { ImagePreviewDoc } from './ImagePreviewDoc'
import { ImageUploadFieldDoc } from './ImageUploadFieldDoc'
import { MaskedSecretFieldDoc } from './MaskedSecretFieldDoc'
import { MermaidDiagramDoc } from './MermaidDiagramDoc'
import { PdfPreviewDoc } from './PdfPreviewDoc'
import { InputDoc } from './InputDoc'
import { InputGroupDoc } from './InputGroupDoc'
import { JsonViewerDoc } from './JsonViewerDoc'
import { KbdDoc } from './KbdDoc'
import { KeyValueEditorDoc } from './KeyValueEditorDoc'
import { LineChartDoc } from './LineChartDoc'
import { ListFilterBarDoc } from './ListFilterBarDoc'
import { ListPageDoc } from './ListPageDoc'
import { LoginCardDoc } from './LoginCardDoc'
import { LogViewerDoc } from './LogViewerDoc'
import { MaintenanceBannerDoc } from './MaintenanceBannerDoc'
import { MetaRowDoc } from './MetaRowDoc'
import { MeterBarDoc } from './MeterBarDoc'
import { MetricDoc } from './MetricDoc'
import { MirrorCardDoc } from './MirrorCardDoc'
import { ModalDoc } from './ModalDoc'
import { NavIconDoc } from './NavIconDoc'
import { NodePickerDoc } from './NodePickerDoc'
import { NotificationListDoc } from './NotificationListDoc'
import { NumberStepperDoc } from './NumberStepperDoc'
import { PageHeaderDoc } from './PageHeaderDoc'
import { PageTabsDoc } from './PageTabsDoc'
import { PaginationDoc } from './PaginationDoc'
import { PieChartDoc } from './PieChartDoc'
import { PillDoc } from './PillDoc'
import { PinInputDoc } from './PinInputDoc'
import { PopoverDoc } from './PopoverDoc'
import { ProgressDoc } from './ProgressDoc'
import { RadialProgressDoc } from './RadialProgressDoc'
import { RadioDoc } from './RadioDoc'
import { RangeSliderDoc } from './RangeSliderDoc'
import { ResourceListDoc } from './ResourceListDoc'
import { ResourceStateDoc } from './ResourceStateDoc'
import { SearchInputDoc } from './SearchInputDoc'
import { SearchResultListDoc } from './SearchResultListDoc'
import { SectionCardDoc } from './SectionCardDoc'
import { SegmentedDoc } from './SegmentedDoc'
import { SelectDoc } from './SelectDoc'
import { SettingsRowDoc } from './SettingsRowDoc'
import { SheetDoc } from './SheetDoc'
import { SidebarDoc } from './SidebarDoc'
import { SkeletonDoc } from './SkeletonDoc'
import { SparklineDoc } from './SparklineDoc'
import { SpinnerDoc } from './SpinnerDoc'
import { SplitPaneDoc } from './SplitPaneDoc'
import { StackDoc } from './StackDoc'
import { StatCardDoc } from './StatCardDoc'
import { StatusDotDoc } from './StatusDotDoc'
import { StepHeadingDoc } from './StepHeadingDoc'
import { StepsDoc } from './StepsDoc'
import { StrongConfirmDrawerDoc } from './StrongConfirmDrawerDoc'
import { SwitchDoc } from './SwitchDoc'
import { TableDoc } from './TableDoc'
import { TableCardDoc } from './TableCardDoc'
import { TabsDoc } from './TabsDoc'
import { TagDoc } from './TagDoc'
import { TagsInputDoc } from './TagsInputDoc'
import { TextDoc } from './TextDoc'
import { TextLinkDoc } from './TextLinkDoc'
import { TextareaDoc } from './TextareaDoc'
import { ThemeDrawerDoc } from './ThemeDrawerDoc'
import { ThemePickerDoc } from './ThemePickerDoc'
import { TimePickerDoc } from './TimePickerDoc'
import { TimelineDoc } from './TimelineDoc'
import { ToastDoc } from './ToastDoc'
import { ToggleButtonDoc } from './ToggleButtonDoc'
import { TooltipDoc } from './TooltipDoc'
import { TopbarDoc } from './TopbarDoc'
import { TotpBindPanelDoc } from './TotpBindPanelDoc'
import { TransferDoc } from './TransferDoc'
import { TreeDoc } from './TreeDoc'
import { TreeTableCellDoc } from './TreeTableCellDoc'
import { UserMenuDoc } from './UserMenuDoc'
import { WallpaperPickerDoc } from './WallpaperPickerDoc'
import { NativeSelectDoc } from './NativeSelectDoc'

export const DOC_PAGES: Record<string, ComponentType> = {
  'accordion': AccordionDoc,
  'accent-picker': AccentPickerDoc,
  'alert': AlertDoc,
  'app-shell': AppShellDoc,
  'area-chart': AreaChartDoc,
  'avatar': AvatarDoc,
  'avatar-upload': AvatarUploadDoc,
  'badge': BadgeDoc,
  'banner': BannerDoc,
  'bar-chart': BarChartDoc,
  'brand': BrandDoc,
  'breadcrumb-nav': BreadcrumbNavDoc,
  'breadcrumbs': BreadcrumbsDoc,
  'button': ButtonDoc,
  'calendar': CalendarDoc,
  'callout': CalloutDoc,
  'card': CardDoc,
  'cascader': CascaderDoc,
  'cell-ellipsis': CellEllipsisDoc,
  'chart-container': ChartContainerDoc,
  'checkbox': CheckboxDoc,
  'checklist': ChecklistDoc,
  'choice-card': ChoiceCardDoc,
  'code-block': CodeBlockDoc,
  'color-field': ColorFieldDoc,
  'color-input': ColorInputDoc,
  'combobox': ComboboxDoc,
  'command-palette': CommandPaletteDoc,
  'confirm': ConfirmDoc,
  'confirm-modal': ConfirmModalDoc,
  'copy-button': CopyButtonDoc,
  'data-table': DataTableDoc,
  'date-picker': DatePickerDoc,
  'date-range-picker': DateRangePickerDoc,
  'description-list': DescriptionListDoc,
  'divider': DividerDoc,
  'drawer': DrawerDoc,
  'dropdown-menu': DropdownMenuDoc,
  'empty-state': EmptyStateDoc,
  'face-photo-picker': FacePhotoPickerDoc,
  'field': FieldDoc,
  'file-upload': FileUploadDoc,
  'filter-bar': FilterBarDoc,
  'form-errors': FormErrorsDoc,
  'form-page': FormPageDoc,
  'heading': HeadingDoc,
  'image-preview': ImagePreviewDoc,
  'image-upload-field': ImageUploadFieldDoc,
  'input': InputDoc,
  'input-group': InputGroupDoc,
  'json-viewer': JsonViewerDoc,
  'kbd': KbdDoc,
  'key-value-editor': KeyValueEditorDoc,
  'line-chart': LineChartDoc,
  'list-filter-bar': ListFilterBarDoc,
  'list-page': ListPageDoc,
  'login-card': LoginCardDoc,
  'log-viewer': LogViewerDoc,
  'maintenance-banner': MaintenanceBannerDoc,
  'masked-secret-field': MaskedSecretFieldDoc,
  'mermaid-diagram': MermaidDiagramDoc,
  'meta-row': MetaRowDoc,
  'meter-bar': MeterBarDoc,
  'metric': MetricDoc,
  'mirror-card': MirrorCardDoc,
  'modal': ModalDoc,
  'nav-icon': NavIconDoc,
  'node-picker': NodePickerDoc,
  'notification-list': NotificationListDoc,
  'number-stepper': NumberStepperDoc,
  'page-header': PageHeaderDoc,
  'page-tabs': PageTabsDoc,
  'pagination': PaginationDoc,
  'pdf-preview': PdfPreviewDoc,
  'pie-chart': PieChartDoc,
  'pill': PillDoc,
  'pin-input': PinInputDoc,
  'popover': PopoverDoc,
  'progress': ProgressDoc,
  'radial-progress': RadialProgressDoc,
  'radio': RadioDoc,
  'range-slider': RangeSliderDoc,
  'resource-list': ResourceListDoc,
  'resource-state': ResourceStateDoc,
  'search-input': SearchInputDoc,
  'search-result-list': SearchResultListDoc,
  'section-card': SectionCardDoc,
  'segmented': SegmentedDoc,
  'select': SelectDoc,
  'settings-row': SettingsRowDoc,
  'sheet': SheetDoc,
  'sidebar': SidebarDoc,
  'skeleton': SkeletonDoc,
  'sparkline': SparklineDoc,
  'spinner': SpinnerDoc,
  'split-pane': SplitPaneDoc,
  'stack': StackDoc,
  'stat-card': StatCardDoc,
  'status-dot': StatusDotDoc,
  'step-heading': StepHeadingDoc,
  'steps': StepsDoc,
  'strong-confirm-drawer': StrongConfirmDrawerDoc,
  'switch': SwitchDoc,
  'table': TableDoc,
  'table-card': TableCardDoc,
  'tabs': TabsDoc,
  'tag': TagDoc,
  'tags-input': TagsInputDoc,
  'text': TextDoc,
  'text-link': TextLinkDoc,
  'textarea': TextareaDoc,
  'theme-drawer': ThemeDrawerDoc,
  'theme-picker': ThemePickerDoc,
  'time-picker': TimePickerDoc,
  'timeline': TimelineDoc,
  'toast': ToastDoc,
  'toggle-button': ToggleButtonDoc,
  'tooltip': TooltipDoc,
  'topbar': TopbarDoc,
  'totp-bind-panel': TotpBindPanelDoc,
  'transfer': TransferDoc,
  'tree': TreeDoc,
  'tree-table-cell': TreeTableCellDoc,
  'user-menu': UserMenuDoc,
  'wallpaper-picker': WallpaperPickerDoc,
  'native-select': NativeSelectDoc,
}
