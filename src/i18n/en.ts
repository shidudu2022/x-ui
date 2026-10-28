import type { LocaleMessages } from './types'

/** English is the baseline locale for @shidudu2022/x-ui. */
export const en: LocaleMessages = {
  locale: 'en',
  weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  accents: {
    teal: 'Teal',
    blue: 'Blue',
    violet: 'Violet',
    rose: 'Rose',
    green: 'Green',
    amber: 'Amber',
    slate: 'Slate',
  },
  messages: {
    'common.close': 'Close',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.delete': 'Delete',
    'common.clear': 'Clear',
    'common.search': 'Search',
    'common.refresh': 'Refresh',
    'common.copy': 'Copy',
    'common.copied': 'Copied',
    'common.more': 'More',
    'common.open': 'Open',
    'common.add': 'Add',
    'common.expand': 'Expand',
    'common.collapse': 'Collapse',
    'common.actions': 'Actions',
    'common.empty': 'No data',
    'common.loading': 'Loading…',
    'common.selectAll': 'Select all',
    'common.selectRow': 'Select row',
    'common.filter': 'Filter…',
    'common.filterOptions': 'Filter options',
    'common.pleaseSelect': 'Please select',
    'common.query': 'Search',
    'common.upload': 'Upload',
    'common.uploading': 'Uploading…',
    'common.none': 'None',
    'common.user': 'User',
    'common.key': 'Key',
    'common.value': 'Value',
    'common.start': 'Start',
    'common.end': 'End',
    'common.hour': 'Hour',
    'common.minute': 'Minute',
    'common.resource': 'Resource',
    'common.dangerZone': 'Danger zone',

    'calendar.prevMonth': 'Previous month',
    'calendar.nextMonth': 'Next month',
    'calendar.today': 'Today',
    'calendar.yearMonth': '{year}-{month}',

    'datePicker.prevMonth': 'Previous month',
    'datePicker.nextMonth': 'Next month',
    'datePicker.pickDate': 'Select date',
    'datePicker.pickDateTime': 'Select date & time',
    'datePicker.pickRange': 'Select date range',
    'datePicker.pickTimeRange': 'Select time range',
    'datePicker.pickRangeHint': 'Select start and end dates',
    'datePicker.pickRangeContinue': 'Start {start}, then pick end date',
    'datePicker.hourAria': '{label} hour',
    'datePicker.minuteAria': '{label} minute',
    'datePicker.time': 'Time',
    'datePicker.yearMonth': '{year}-{month}',

    'timePicker.placeholder': 'Select time',

    'pagination.nav': 'Pagination',
    'pagination.prev': 'Previous page',
    'pagination.next': 'Next page',

    'sidebar.mainNav': 'Main navigation',
    'sidebar.scrollUp': 'Scroll menu up',
    'sidebar.scrollDown': 'Scroll menu down',
    'sidebar.expand': 'Expand sidebar',
    'sidebar.collapse': 'Collapse sidebar',
    'sidebar.closeNav': 'Close navigation',
    'sidebar.openNav': 'Open navigation',

    'themeDrawer.title': 'Appearance',
    'themeDrawer.colorMode': 'Color mode',
    'themeDrawer.system': 'System',
    'themeDrawer.light': 'Light',
    'themeDrawer.dark': 'Dark',
    'themeDrawer.theme': 'Theme',
    'themeDrawer.wallpaper': 'Wallpaper',
    'themeDrawer.accent': 'Accent',
    'themeDrawer.density': 'Density',
    'themeDrawer.comfortable': 'Comfortable',
    'themeDrawer.compact': 'Compact',

    'themePicker.aria': 'Theme',
    'theme.classic.label': 'Classic',
    'theme.classic.description': 'Solid surfaces for everyday consoles',
    'theme.glass.label': 'Glass',
    'theme.glass.description': 'Transparent surfaces; pairs with wallpapers',
    'accentPicker.aria': 'Accent color',
    'wallpaperPicker.aria': 'Wallpaper',
    'wallpaper.none.label': 'None',
    'wallpaper.none.description': 'Solid color, no background image',
    'wallpaper.aurora.label': 'Aurora',
    'wallpaper.aurora.description': 'Blue–violet–pink abstract layers',
    'wallpaper.ocean.label': 'Ocean',
    'wallpaper.ocean.description': 'Teal sea surface, clean and sharp',
    'wallpaper.dusk.label': 'Dusk',
    'wallpaper.dusk.description': 'Peach and lavender, softer feel',

    'status.ok': 'Healthy',
    'status.bad': 'Error',
    'status.warn': 'Warning',
    'status.neutral': 'Unknown',
    'status.info': 'Info',

    'copy.label': 'Copy',
    'copy.copied': 'Copied',

    'search.placeholder': 'Search…',
    'search.clear': 'Clear',

    'select.placeholder': 'Please select',
    'select.filter': 'Filter…',
    'select.filterAria': 'Filter options',
    'select.empty': 'No matches',

    'combobox.placeholder': 'Search or select…',
    'combobox.empty': 'No matches',

    'cascader.placeholder': 'Please select…',

    'tagsInput.placeholder': 'Press Enter to add',
    'tagsInput.remove': 'Remove {tag}',

    'keyValue.key': 'Key',
    'keyValue.value': 'Value',
    'keyValue.add': 'Add',
    'keyValue.keyAria': 'Key {n}',
    'keyValue.valueAria': 'Value {n}',
    'keyValue.removeRow': 'Remove row',

    'transfer.available': 'Available',
    'transfer.selected': 'Selected',
    'transfer.search': 'Search…',
    'transfer.searchAria': 'Search {title}',

    'tree.search': 'Search nodes…',
    'tree.expand': 'Expand',
    'tree.collapse': 'Collapse',
    'tree.noMatch': 'No matching nodes',

    'table.empty': 'No data',
    'table.selectAll': 'Select all',
    'table.selectRow': 'Select row',

    'dataTable.empty': 'No data',
    'dataTable.unit': 'items',
    'dataTable.selectPage': 'Select all on this page',
    'dataTable.selectRow': 'Select row',
    'dataTable.columns': 'Columns',
    'dataTable.selectedCount': '{count} {unit} selected',
    'dataTable.totalSummary': '{total} {unit} total',
    'dataTable.showingRange': 'Showing {from}–{to}',
    'dataTable.pageOf': 'Page {page} / {totalPages}',
    'dataTable.perPage': 'Per page',
    'dataTable.firstPage': 'First page',
    'dataTable.lastPage': 'Last page',

    'resourceList.search': 'Search',
    'resourceList.refresh': 'Refresh',
    'resourceList.empty': 'No data',
    'resourceList.actions': 'Actions',
    'resourceList.totalSummary': '{total} {unit} total',
    'resourceList.perPage': 'Per page',

    'resourceState.emptyTitle': 'No data',
    'resourceState.errorTitle': 'Failed to load',
    'resourceState.errorDescription': 'Please try again later.',
    'resourceState.offlineTitle': 'You are offline',
    'resourceState.offlineDescription': 'Check your connection and try again.',
    'resourceState.retry': 'Retry',

    'fileUpload.title': 'Click or drag files here',
    'fileUpload.hint': 'Documents and images are supported',
    'fileUpload.tooLarge': '{name} exceeds {max}MB',

    'imageUpload.label': 'Image',
    'imageUpload.hint': 'PNG / JPEG / WebP / GIF',
    'imageUpload.empty': 'None',
    'imageUpload.upload': 'Upload image',
    'imageUpload.clear': 'Clear',
    'imageUpload.urlPlaceholder': 'Or paste an image URL',
    'imageUpload.uploading': 'Uploading…',

    'avatarUpload.label': 'Upload avatar',

    'imagePreview.preview': 'Preview image',
    'imagePreview.dialog': 'Image preview',
    'imagePreview.close': 'Close',
    'imagePreview.loadFailed': 'Failed to load',

    'maskedSecret.show': 'Show secret',
    'maskedSecret.hide': 'Hide secret',

    'facePhoto.pickAria': 'Choose face photo',
    'facePhoto.changeAria': 'Change face photo',
    'facePhoto.previewAlt': 'Face preview',
    'facePhoto.emptyTitle': 'Click to choose a photo',
    'facePhoto.emptyHint': 'JPEG recommended',
    'facePhoto.guide':
      'Place your face inside the oval. Eyes, nose, and mouth must be clear — no mask or sunglasses.',
    'facePhoto.confirm': 'I confirm the photo shows a clear, unobstructed face that matches me',

    'pdfPreview.preview': 'Preview PDF',
    'pdfPreview.dialog': 'PDF preview',
    'pdfPreview.close': 'Close',
    'pdfPreview.download': 'Download',
    'pdfPreview.openTab': 'Open in new tab',

    'mermaid.missingPeer':
      'Install the optional peer dependency "mermaid" to render diagrams.',
    'mermaid.renderFailed': 'Diagram render failed',

    'confirm.irreversible': 'This action cannot be undone',
    'confirm.deleteWarning': 'Deleted data cannot be recovered. Please confirm carefully.',
    'confirm.resource': 'Resource: ',
    'confirm.typeToConfirm': 'Type {value} to confirm',
    'confirm.confirm': 'Confirm',
    'confirm.cancel': 'Cancel',
    'confirm.delete': 'Delete',

    'strongConfirm.irreversible': 'This action cannot be undone',
    'strongConfirm.deleteWarning': 'Deleted data cannot be recovered. Please confirm carefully.',
    'strongConfirm.delete': 'Delete',
    'strongConfirm.cancel': 'Cancel',

    'command.placeholder': 'Search…',
    'command.title': 'Search',
    'command.recent': 'Recent',
    'command.results': 'Results',
    'command.noResults': 'No matching results',

    'pageHeader.more': 'More',

    'json.expand': 'Expand',
    'json.collapse': 'Collapse',
    'json.copy': 'Copy JSON',

    'color.sv': 'Saturation and brightness',
    'color.hue': 'Hue',
    'color.open': 'Open color picker',
    'color.dialog': 'Color picker',
    'color.presets': 'Presets',

    'meter.aria': 'Utilization',

    'numberStepper.dec': 'Decrease',
    'numberStepper.inc': 'Increase',

    'pin.aria': 'Verification code',
    'pin.digit': '{label} digit {n}',

    'totp.title': 'Bind authenticator',
    'totp.description':
      'Scan with Google Authenticator / 1Password, or enter the secret manually.',
    'totp.done': 'I have completed binding',
    'totp.qrAlt': 'Authenticator binding QR code',

    'login.title': 'Admin sign in',

    'maintenance.default': 'System maintenance — some features are temporarily unavailable.',

    'notification.empty': 'No notifications',

    'searchResult.empty': 'Try a different filter',

    'formErrors.title': 'Please fix the following',

    'listFilter.search': 'Search…',
    'listFilter.summary': 'Search “{query}” · {matched} / {total} {unit}',

    'themeDrawer.language': 'Language',

    'settingsRow.danger': 'Danger zone',

    'alert.close': 'Close',

    'modal.close': 'Close',
    'drawer.close': 'Close',
    'sheet.close': 'Close',

    'breadcrumbs.aria': 'Breadcrumb',
    'breadcrumbNav.aria': 'Breadcrumb',

    'steps.prev': 'Previous steps',
    'steps.next': 'Next steps',

    'chart.completion': 'Completion',

    'treeTable.expand': 'Expand',
    'treeTable.collapse': 'Collapse',
  },
}
