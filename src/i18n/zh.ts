import type { LocaleMessages } from './types'

export const zh: LocaleMessages = {
  locale: 'zh',
  weekdays: ['日', '一', '二', '三', '四', '五', '六'],
  accents: {
    teal: '青绿',
    blue: '蓝色',
    violet: '紫色',
    rose: '玫红',
    green: '绿色',
    amber: '琥珀',
    slate: '石板',
  },
  messages: {
    'common.close': '关闭',
    'common.cancel': '取消',
    'common.confirm': '确认',
    'common.delete': '删除',
    'common.clear': '清除',
    'common.search': '搜索',
    'common.refresh': '刷新',
    'common.copy': '复制',
    'common.copied': '已复制',
    'common.more': '更多',
    'common.open': '打开',
    'common.add': '添加',
    'common.expand': '展开',
    'common.collapse': '折叠',
    'common.actions': '操作',
    'common.empty': '暂无数据',
    'common.loading': '加载中…',
    'common.selectAll': '全选',
    'common.selectRow': '选择行',
    'common.filter': '筛选…',
    'common.filterOptions': '筛选选项',
    'common.pleaseSelect': '请选择',
    'common.query': '查询',
    'common.upload': '上传',
    'common.uploading': '上传中…',
    'common.none': '暂无',
    'common.user': '用户',
    'common.key': '键',
    'common.value': '值',
    'common.start': '开始',
    'common.end': '结束',
    'common.hour': '小时',
    'common.minute': '分钟',
    'common.resource': '资源',
    'common.dangerZone': '危险区域',

    'calendar.prevMonth': '上一月',
    'calendar.nextMonth': '下一月',
    'calendar.today': '今日',
    'calendar.yearMonth': '{year} 年 {month} 月',

    'datePicker.prevMonth': '上一月',
    'datePicker.nextMonth': '下一月',
    'datePicker.pickDate': '选择日期',
    'datePicker.pickDateTime': '选择日期时间',
    'datePicker.pickRange': '选择日期范围',
    'datePicker.pickTimeRange': '选择时间范围',
    'datePicker.pickRangeHint': '选择起止日期',
    'datePicker.pickRangeContinue': '起始 {start}，再选结束日',
    'datePicker.hourAria': '{label}小时',
    'datePicker.minuteAria': '{label}分钟',
    'datePicker.time': '时间',
    'datePicker.yearMonth': '{year} 年 {month} 月',

    'timePicker.placeholder': '选择时间',

    'pagination.nav': '分页',
    'pagination.prev': '上一页',
    'pagination.next': '下一页',

    'sidebar.mainNav': '主导航',
    'sidebar.scrollUp': '向上滚动菜单',
    'sidebar.scrollDown': '向下滚动菜单',
    'sidebar.expand': '展开侧栏',
    'sidebar.collapse': '收起侧栏',
    'sidebar.closeNav': '关闭导航',
    'sidebar.openNav': '打开导航',

    'themeDrawer.title': '外观',
    'themeDrawer.colorMode': '深浅色',
    'themeDrawer.system': '跟随系统',
    'themeDrawer.light': '浅色',
    'themeDrawer.dark': '深色',
    'themeDrawer.theme': '主题',
    'themeDrawer.wallpaper': '壁纸',
    'themeDrawer.accent': '强调色',
    'themeDrawer.density': '密度',
    'themeDrawer.comfortable': '舒适',
    'themeDrawer.compact': '紧凑',

    'themePicker.aria': '主题',
    'theme.classic.label': '经典',
    'theme.classic.description': '清晰实色表面，适合日常控制台',
    'theme.glass.label': '透明',
    'theme.glass.description': '表面透明，可配壁纸',
    'accentPicker.aria': '强调色',
    'wallpaperPicker.aria': '壁纸',
    'wallpaper.none.label': '无壁纸',
    'wallpaper.none.description': '纯色底，不加背景图',
    'wallpaper.aurora.label': '极光',
    'wallpaper.aurora.description': '蓝紫粉抽象，层次清晰',
    'wallpaper.ocean.label': '海洋',
    'wallpaper.ocean.description': '青蓝海面，干净利落',
    'wallpaper.dusk.label': '暮色',
    'wallpaper.dusk.description': '桃粉薰衣草，偏柔和',

    'status.ok': '正常',
    'status.bad': '异常',
    'status.warn': '警告',
    'status.neutral': '未知',
    'status.info': '信息',

    'copy.label': '复制',
    'copy.copied': '已复制',

    'search.placeholder': '搜索…',
    'search.clear': '清除',

    'select.placeholder': '请选择',
    'select.filter': '筛选…',
    'select.filterAria': '筛选选项',
    'select.empty': '无匹配项',

    'combobox.placeholder': '搜索或选择…',
    'combobox.empty': '无匹配项',

    'cascader.placeholder': '请选择…',

    'tagsInput.placeholder': '输入后回车添加',
    'tagsInput.remove': '移除 {tag}',

    'keyValue.key': '键',
    'keyValue.value': '值',
    'keyValue.add': '添加',
    'keyValue.keyAria': '键 {n}',
    'keyValue.valueAria': '值 {n}',
    'keyValue.removeRow': '删除行',

    'transfer.available': '可选',
    'transfer.selected': '已选',
    'transfer.search': '搜索…',
    'transfer.searchAria': '{title}搜索',

    'tree.search': '搜索节点…',
    'tree.expand': '展开',
    'tree.collapse': '折叠',
    'tree.noMatch': '无匹配节点',

    'table.empty': '暂无数据',
    'table.selectAll': '全选',
    'table.selectRow': '选择行',

    'dataTable.empty': '暂无数据',
    'dataTable.unit': '条',
    'dataTable.selectPage': '全选本页',
    'dataTable.selectRow': '选择行',
    'dataTable.columns': '列',
    'dataTable.selectedCount': '已选 {count} {unit}',
    'dataTable.totalSummary': '共 {total} {unit}',
    'dataTable.showingRange': '显示 {from}–{to}',
    'dataTable.pageOf': '第 {page} / {totalPages} 页',
    'dataTable.perPage': '每页',
    'dataTable.firstPage': '首页',
    'dataTable.lastPage': '末页',

    'resourceList.search': '查询',
    'resourceList.refresh': '刷新',
    'resourceList.empty': '暂无数据',
    'resourceList.actions': '操作',
    'resourceList.totalSummary': '共 {total} {unit}',
    'resourceList.perPage': '每页',

    'resourceState.emptyTitle': '暂无数据',
    'resourceState.errorTitle': '加载失败',
    'resourceState.errorDescription': '请稍后重试。',
    'resourceState.offlineTitle': '网络不可用',
    'resourceState.offlineDescription': '检查连接后重试。',
    'resourceState.retry': '重试',

    'fileUpload.title': '点击或拖拽文件到此处',
    'fileUpload.hint': '支持常见文档与图片',
    'fileUpload.tooLarge': '{name} 超过 {max}MB',

    'imageUpload.label': '图片',
    'imageUpload.hint': '支持 PNG / JPEG / WebP / GIF',
    'imageUpload.empty': '暂无',
    'imageUpload.upload': '上传图片',
    'imageUpload.clear': '清除',
    'imageUpload.urlPlaceholder': '或粘贴图片 URL',
    'imageUpload.uploading': '上传中…',

    'avatarUpload.label': '上传头像',

    'imagePreview.preview': '预览图片',
    'imagePreview.dialog': '图片预览',
    'imagePreview.close': '关闭',
    'imagePreview.loadFailed': '无法加载',

    'maskedSecret.show': '显示密钥',
    'maskedSecret.hide': '隐藏密钥',

    'facePhoto.label': '人脸照片',
    'facePhoto.pickAria': '选择人脸照片',
    'facePhoto.changeAria': '更换人脸照片',
    'facePhoto.previewAlt': '人脸预览',
    'facePhoto.emptyTitle': '暂无照片',
    'facePhoto.emptyHint': '建议 JPEG',
    'facePhoto.upload': '选择照片',
    'facePhoto.change': '更换照片',
    'facePhoto.clear': '清除',
    'facePhoto.guide':
      '请将正脸置于椭圆框内，确保双眼、鼻子、嘴巴清晰可见，无口罩或墨镜遮挡。',
    'facePhoto.confirm': '我已确认照片中人脸清晰、正脸无遮挡，与本人一致',

    'pdfPreview.preview': '预览 PDF',
    'pdfPreview.dialog': 'PDF 预览',
    'pdfPreview.close': '关闭',
    'pdfPreview.download': '下载',
    'pdfPreview.openTab': '新标签页打开',

    'mermaid.missingPeer': '请安装可选 peer 依赖 mermaid 以渲染流程图。',
    'mermaid.renderFailed': '流程图渲染失败',

    'confirm.irreversible': '此操作不可撤销',
    'confirm.deleteWarning': '删除后数据无法恢复，请谨慎确认。',
    'confirm.resource': '资源：',
    'confirm.typeToConfirm': '请输入 {value} 以确认',
    'confirm.confirm': '确认',
    'confirm.cancel': '取消',
    'confirm.delete': '删除',

    'strongConfirm.irreversible': '此操作不可撤销',
    'strongConfirm.deleteWarning': '删除后数据无法恢复，请谨慎确认。',
    'strongConfirm.delete': '删除',
    'strongConfirm.cancel': '取消',

    'command.placeholder': '搜索…',
    'command.title': '搜索',
    'command.recent': '最近使用',
    'command.results': '结果',
    'command.noResults': '无匹配结果',

    'pageHeader.more': '更多',

    'json.expand': '展开',
    'json.collapse': '折叠',
    'json.copy': '复制 JSON',

    'color.sv': '饱和度与亮度',
    'color.hue': '色相',
    'color.open': '打开取色器',
    'color.dialog': '取色器',
    'color.presets': '预设颜色',

    'meter.aria': '利用率',

    'numberStepper.dec': '减少',
    'numberStepper.inc': '增加',

    'pin.aria': '验证码',
    'pin.digit': '{label} 第 {n} 位',

    'totp.title': '绑定谷歌验证器',
    'totp.description': '使用 Google Authenticator / 1Password 等扫码，或手动输入密钥。',
    'totp.done': '我已完成绑定',
    'totp.qrAlt': '谷歌验证器绑定二维码',

    'login.title': '管理员登录',

    'maintenance.default': '系统维护中，部分功能暂不可用。',

    'notification.empty': '暂无通知',

    'searchResult.empty': '换个筛选条件再试试',

    'formErrors.title': '请修正以下问题',

    'listFilter.search': '搜索…',
    'listFilter.summary': '搜索「{query}」· 显示 {matched} / {total} {unit}',

    'listSearch.title': '筛选',
    'listSearch.trigger': '搜索',
    'listSearch.clear': '清空',
    'listSearch.apply': '查询',

    'topbar.appearance': '外观',

    'themeDrawer.language': '语言',

    'settingsRow.danger': '危险区域',

    'alert.close': '关闭',

    'modal.close': '关闭',
    'drawer.close': '关闭',
    'sheet.close': '关闭',

    'breadcrumbs.aria': '面包屑',
    'breadcrumbNav.aria': '面包屑',

    'steps.prev': '查看前面的步骤',
    'steps.next': '查看后面的步骤',

    'chart.completion': '完成度',

    'treeTable.expand': '展开',
    'treeTable.collapse': '折叠',
  },
}
