export const searchItems = [
  { value: 'createTime', name: '制单时间'},
  { value: 'deliverDate', name: '交期'},
  { value: 'code', name: '任务单号'},
  { value: 'proState', name: '状态'},
];

export const tableButtons = [
  { id: 'btnSearch', name: '搜索', icon: 'el-icon-search', hidden: true },
  { id: 'btnAdd', name: '新增', icon: 'el-icon-plus', type: 'success' },
  { id: 'btnEdit', name: '编辑', icon: 'el-icon-edit', hidden: true },
  { id: 'btnDel', name: '删除', icon: 'el-icon-delete', type: 'danger' },
  { id: 'btnImport', name: '批量导入', icon: 'el-icon-download' },
  { id: 'btnPrintTask', name: '任务单打印', icon: 'el-icon-download' },
  { id: 'btnPrintBarCode', name: '条码打印', icon: 'el-icon-download' },
  { id: 'btnExport', name: '导出', icon: 'el-icon-download' },
];

export const tableColumns = [
  { name: 'code', label: '生产任务单号', minWidth: 180 },
  { name: 'styleCode', label: '款号', minWidth: 100 },
  { name: 'colorName', label: '颜色', minWidth: 100 },
  { name: 'customerName', label: '客户', minWidth: 150 },
  { name: 'number', label: '数量', minWidth: 100 },
  { name: 'completeCount', label: '已完成数', minWidth: 100 },
  { name: 'proState', label: '状态', minWidth: 100 },
  { name: 'deliverDate', label: '交期', minWidth: 120 },
  { name: 'userName', label: '制单人', minWidth: 120 },
  { name: 'createTime', label: '制单时间', minWidth: 120 },
];


export const detailColumns = [
  { name: 'styleCode', label: '款号', minWidth: 100},
  { name: 'color', label: '颜色', minWidth: 100},
  { name: 'number', label: '计划数', minWidth: 100},
]

export const detailButtons = [
  { id: 'btnSubmit', name: '保存并提交', type: 'primary'},
  { id: 'btnSave', name: '暂存'},
  { id: 'btnCancel', name: '返回'},
];

export const formInfo = [
  { value: 'code', name: '款号编号', span: 6 },
  { value: 'name', name: '款式品名', span: 6 },
  { value: 'type', name: '所属分类', type: 'select', span: 6 },
  { value: 'year', name: '上市年份', type: 'year', span: 6 },
  { value: 'type', name: '描述', type: 'textarea', rows: 3, span: 24 },
]
