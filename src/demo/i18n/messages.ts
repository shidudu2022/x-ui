import type { L10n } from './types'

/**
 * Demo/docs site chrome strings — navigation, doc layout, search, etc.
 * Component/page *content* (catalog, usage, templates, guide copy) lives
 * next to its data instead of here; this file only holds reusable chrome.
 */
export const DEMO_MESSAGES = {
  // Nav section labels
  'nav.start': { en: 'Start', zh: '开始' },
  'nav.components': { en: 'Components', zh: '组件' },
  'nav.templates': { en: 'Templates', zh: '页面模板' },

  // Nav items under "Start"
  'nav.overview': { en: 'Overview', zh: '概览' },
  'nav.gettingStarted': { en: 'Getting started', zh: '快速开始' },
  'nav.designTokens': { en: 'Design tokens', zh: '设计令牌' },
  'nav.theming': { en: 'Theming', zh: '主题与外观' },
  'nav.conventions': { en: 'Conventions', zh: '开发约定' },
  'nav.utilities': { en: 'Utilities & token API', zh: '工具与令牌 API' },

  // Nav items under "Components" / "Templates"
  'nav.allComponents': { en: 'All components', zh: '全部组件' },
  'nav.templatesOverview': { en: 'Templates overview', zh: '模板总览' },
  'nav.patterns': { en: 'Patterns', zh: '组合模式' },

  // Page titles (route → title), used by the topbar + breadcrumb + <title>
  'page.overview': { en: 'Overview', zh: '概览' },
  'page.gettingStarted': { en: 'Getting started', zh: '快速开始' },
  'page.theming': { en: 'Theming', zh: '主题与外观' },
  'page.conventions': { en: 'Conventions', zh: '开发约定' },
  'page.utilities': { en: 'Utilities & token API', zh: '工具与令牌 API' },
  'page.designTokens': { en: 'Design tokens', zh: '设计令牌' },
  'page.templates': { en: 'Templates', zh: '页面模板' },
  'page.patterns': { en: 'Patterns', zh: '组合模式' },
  'page.allComponents': { en: 'All components', zh: '全部组件' },

  // Doc chrome (ComponentDocLayout / DocDemo / DocPage)
  'doc.import': { en: 'Import', zh: '引入' },
  'doc.whenToUse': { en: 'When to use', zh: '何时使用' },
  'doc.suitableFor': { en: 'Suitable for', zh: '适用场景' },
  'doc.avoidUseInstead': { en: 'Avoid / use instead', zh: '不适用 / 请换用' },
  'doc.tips': { en: 'Tips', zh: '使用要点' },
  'doc.api': { en: 'API', zh: 'API' },
  'doc.apiDescription': {
    en: 'Commonly used props; see the exported .d.ts for the full type.',
    zh: '常用属性；完整类型见包内导出的 .d.ts。',
  },
  'doc.apiFallback': {
    en: 'See the exported types; this page focuses on interactive examples.',
    zh: '见包内类型导出；本页以交互示例为主。',
  },
  'doc.related': { en: 'Related components', zh: '相关组件' },
  'doc.previous': { en: 'Previous', zh: '上一个' },
  'doc.next': { en: 'Next', zh: '下一个' },
  'doc.exampleSource': { en: 'Example source', zh: '示例源码' },
  'doc.components': { en: 'Components', zh: '组件' },
  'doc.pagerNavLabel': { en: '{category} navigation', zh: '{category}内导航' },
  'doc.toc': { en: 'On this page', zh: '本页目录' },
  'prop.name': { en: 'Prop', zh: '属性' },
  'prop.type': { en: 'Type', zh: '类型' },
  'prop.default': { en: 'Default', zh: '默认' },
  'prop.desc': { en: 'Description', zh: '说明' },

  // Search / command palette
  'search.quickJump': { en: 'Quick jump', zh: '快速跳转' },
  'search.searchPages': { en: 'Search pages…', zh: '搜索页面…' },
  'search.components': { en: 'Components', zh: '组件' },
  'search.templates': { en: 'Templates', zh: '模板' },
  'search.docs': { en: 'Docs', zh: '文档' },
  'search.pages': { en: 'Pages', zh: '页面' },
  'search.searchComponentsOrDocs': { en: 'Search components / docs…', zh: '搜索组件 / 文档…' },
  'search.searchClusters': { en: 'Search clusters…', zh: '搜索集群…' },

  // List search drawer
  'listSearch.title': { en: 'Search · clusters', zh: '搜索 · 集群' },
  'listSearch.clear': { en: 'Clear', zh: '清除' },
  'listSearch.viewInList': { en: 'View in list', zh: '在列表中查看' },
  'listSearch.placeholder': { en: 'Name / tag / status…', zh: '名称 / 标签 / 状态…' },
  'listSearch.hint': {
    en: 'The search term is written to ?q= in the URL and filters the list below.',
    zh: '搜索结果会写入地址栏 ?q=，并过滤下方列表。',
  },
  'listSearch.emptyTitle': { en: 'Start searching', zh: '开始搜索' },
  'listSearch.emptyDesc': {
    en: 'Type a keyword to filter the cluster list',
    zh: '输入关键字筛选集群列表',
  },

  // Topbar / user menu / appearance
  'chrome.appearance': { en: 'Appearance', zh: '外观' },
  'chrome.appearanceSettings': { en: 'Appearance settings', zh: '外观设置' },
  'chrome.docs': { en: 'Docs', zh: '文档' },
  'chrome.demoUser': { en: 'Demo', zh: 'Demo' },
  'chrome.designer': { en: 'designer', zh: 'designer' },

  // Component index page
  'componentIndex.filterPlaceholder': {
    en: 'Filter by name or purpose, e.g. table / modal',
    zh: '按名称或用途过滤，例如 表格 / modal',
  },
  'componentIndex.filterAriaLabel': { en: 'Filter components', zh: '过滤组件' },
  'componentIndex.categories': { en: 'Categories', zh: '分类' },
  'componentIndex.emptyTitle': { en: 'No matching components', zh: '没有匹配的组件' },
  'componentIndex.emptyDesc': {
    en: 'Try a different keyword, or clear the filter.',
    zh: '换个关键词试试，或清除过滤。',
  },
} satisfies Record<string, L10n>

export type DemoMessageKey = keyof typeof DEMO_MESSAGES
