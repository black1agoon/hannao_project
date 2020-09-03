export interface Customer {
  id: string;
  customerName: string;
  principal: string;
  contactsPhone: string;
  address: string;
  createUser: string;
  createTime: string;
}

export const tableButtons = [
  { id: 'btnSearch', label: '搜索', type: 'search', placeholder: '客户名称', authorize: false },
  { id: 'btnAdd', label: '新建', icon: 'fa fa-plus', type: 'primary', authorize: false },
  { id: 'btnEdit', label: '编辑', select: 1, authorize: false },
  { id: 'btnDelete', label: '删除', select: 1, authorize: false },
  { id: 'btnExport', label: '导出', authorize: false },
];

export const tableColumns = [
  { name: 'customerName', label: '客户名称', required: true },
  { name: 'principal', label: '负责人', required: true },
  { name: 'contactsPhone', label: '联系方式', required: true },
  { name: 'address', label: '地址' },
  { name: 'createTime', label: '创建时间', group: 'table' },
];
