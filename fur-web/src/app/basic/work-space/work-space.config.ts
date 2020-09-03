export interface WorkSpace {
  id: string;
  workSpaceName: string;
  principal: string;
  contactsPhone: string;
  createUser: string;
  createTime: string;
}

export const tableButtons = [
  { id: 'btnAdd', label: '新建', icon: 'fa fa-plus', type: 'primary', authorize: false },
  { id: 'btnEdit', label: '编辑', select: 1, authorize: false },
  { id: 'btnDelete', label: '删除', select: 1, authorize: false },
  { id: 'btnExport', label: '导出', authorize: false },
];

export const tableColumns = [
  { name: 'workSpaceName', label: '加工点', required: true },
  { name: 'principal', label: '负责人', required: true },
  { name: 'contactsPhone', label: '联系方式', required: true },
  { name: 'unqualifiedRate', label: '合格率', group: 'table' },
  { name: 'onTimeRate', label: '准时率', group: 'table' },
  { name: 'createTime', label: '创建时间', group: 'table' },
];

export const searchFields = [
  { name: 'workSpaceName', label: '加工点' },
  { name: 'sUnqualifiedRate', label: '合格率', styles: { width: '90px' } },
  { name: 'eUnqualifiedRate', label: '-', styles: { width: '90px' }, itemStyles: { marginLeft: '-14px' } },
  { name: 'sOnTimeRate', label: '准时率', styles: { width: '90px' } },
  { name: 'eOnTimeRate', label: '-', styles: { width: '90px' }, itemStyles: { marginLeft: '-14px' } },
];
