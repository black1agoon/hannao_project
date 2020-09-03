export interface Size {
  id: string;
  type: string;
  size: string;
  allSize?: string;
  createUser: string;
}

export const sizeTableButtons = [
  { id: 'btnAdd', label: '新建', icon: 'fa fa-plus', type: 'primary', authorize: false },
  { id: 'btnEdit', label: '编辑', select: 1, authorize: false },
  { id: 'btnDelete', label: '删除', select: 1, authorize: false },
  { id: 'btnExport', label: '导出', authorize: false },
];

export const sizeTableColumns = [
  { name: 'type', label: '类型' },
  { name: 'allSize', label: '尺码明细' },
];

export const sizeFormFields = [
  { name: 'type', label: '类型', required: true },
  { name: 'size', label: '尺码明细', placeholder: '示例：S, M, L', required: true },
];

export const sizeEditFormFields = [
  { name: 'type', label: '类型', readonly: true },
  { name: 'size', label: '尺码' },
];
