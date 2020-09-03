import { AnyObject } from '@/types';

export interface BadReason {
  id: string;
  reason: string;
  stepId: string;
}

export interface Step {
  id: string;
  stepName: string;       // 工序名称
  roleId: string;         // 所属岗位
  type: number;           // 工序类型
  generalProcess: string; // 通用工艺
  stepImgs: string[];      // 工艺图片地址
  stepImgList?: AnyObject[];
  badReasons: string;     // 不良原因 多个原因使用,分割
  setBadReasons?: Array<BadReason>;
}

export const stepTypes = [
  { value: 1, label: '生产工序' },
  { value: 2, label: '质检工序' },
  { value: 0, label: '其他工序' },
];

export const stepTableButtons = [
  { id: 'btnAdd', label: '新建', icon: 'fa fa-plus', type: 'primary', authorize: false },
  { id: 'btnEdit', label: '编辑', authorize: false },
  { id: 'btnDelete', label: '删除', authorize: false },
  { id: 'btnExport', label: '导出', authorize: false },
];

export const stepTableColumns = [
  { name: 'stepName', label: '工序名称', required: 'blur', searchable: true },
  { name: 'roleId', label: '所属岗位', textField: 'roleName', type: 'select', required: 'blur' },
  { name: 'type', label: '工序类型', textField: 'typeName', type: 'select', required: 'blur', searchable: true, options: stepTypes },
  { name: 'generalProcess', label: '通用工艺', type: 'textarea' },
  { name: 'stepImgList', label: '工艺图片', type: 'image', group: 'form' },
  { name: 'badReasons', label: '不良原因', type: 'textarea', placeholder: '例如：跳针，污渍，不平整（以“，”作为区分）', group: 'form' },
];

export const badTableButtons = [
  { id: 'btnAdd', label: '新建', icon: 'fa fa-plus', type: 'primary', authorize: false },
  { id: 'btnDelete', label: '删除', authorize: false },
];

export const badTableColumns = [
  { name: 'reason', label: '不良原因' },
];
