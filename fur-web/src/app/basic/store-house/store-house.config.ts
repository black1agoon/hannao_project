import { api } from '@/api';

export interface StoreHouse {
  id: string;
  storeHouseName: string;
  isMainStore: boolean;
  principal: string;
  contactsPhone: string;
  createUser: string;
}

const radioOptions = [
  { value: true, label: '是' },
  { value: false, label: '否' },
];

export const tableButtons = [
  { id: 'btnSearch', label: '搜索', type: 'search', placeholder: '仓库名称', authorize: false },
  { id: 'btnAdd', label: '新建', icon: 'fa fa-plus', type: 'primary', authorize: false },
  { id: 'btnEdit', label: '编辑', select: 1, authorize: false },
  { id: 'btnDelete', label: '删除', select: 1, authorize: false },
  { id: 'btnExport', label: '导出', authorize: false },
];

export const tableColumns = [
  { name: 'storeHouseName', label: '仓库名称', required: true },
  { name: 'isMainStore', label: '是否公司总仓', textField: 'isMainStoreName', type: 'radio', options: radioOptions },
  { name: 'principal', label: '负责人', textField: 'principalName', type: 'select', loader: api.dropdown.operators },
  { name: 'contactsPhone', label: '联系方式' },
];
