import { api } from '@/api';
import { AnyObject } from '@/types';

export const treeButtons = [
  { id: 'btnAddSort', label: '新建', icon: 'fa fa-plus', authorize: false },
  { id: 'btnEditSort', label: '编辑', icon: 'fa fa-pencil', authorize: false },
  { id: 'btnDeleteSort', label: '删除', icon: 'fa fa-trash', authorize: false },
];

const pidProps = {
  value: 'id',
  label: 'name',
  children: 'styleSortSon',
};
const sortLoader = api.styleSort.getTree;
export const sortFields = [
  { name: 'pid', label: '上级分类', type: 'tree-select', loader: sortLoader, props: pidProps },
  { name: 'seq', label: '排序' },
  { name: 'name', label: '分类名称' },
  { name: 'memo', label: '描述' },
];

export const tableButtons = [
  { id: 'btnAdd', label: '新建', icon: 'fa fa-plus', type: 'primary', authorize: false },
  { id: 'btnEdit', label: '编辑', select: 1, authorize: false },
  { id: 'btnDelete', label: '删除', select: 1, authorize: false },
  { id: 'btnExport', label: '导出', authorize: false },
];

export const tableColumns = [
  { name: 'styleCode', label: '款式编号', searchable: true, required: true },
  { name: 'styleName', label: '品名', searchable: true, required: true },
  {
    name: 'styleSortId',
    label: '所属分类',
    textField: 'styleSortName',
    type: 'tree-select',
    loader: sortLoader,
    props: pidProps,
    required: true,
  },
  { name: 'styleStatus', label: '状态', textField: 'styleStatusName', group: 'table' },
  { name: 'marketYear', label: '上市年份' },
  { name: 'memo', label: '描述' },
  { name: 'createUser', label: '制作人', textField: 'createUserName', group: 'table' },
];

export const sizeTableColumns = [
  { name: 'colorName', label: '颜色', required: true },
  { name: 'type', label: '类型', group: 'table' },
  { name: 'sizeId', label: '尺码', type: 'select', required: true, textField: 'size', loader: api.dropdown.allSizes },
];

export const processTableButtons = [
  { id: 'btnAddProcess', label: '新增', type: 'primary', authorize: false },
  { id: 'btnEditProcess', label: '编辑', authorize: false },
  { id: 'btnRemoveProcess', label: '移除', authorize: false },
  { id: 'btnImportProcess', label: '批量导入', authorize: false },
  { id: 'btnExportProcess', label: '导出工艺单', authorize: false },
  { id: 'btnTemplateProcess', label: '模板下载', authorize: false },
];

const handler = function(r: AnyObject, file: AnyObject, fileList: AnyObject[], data: AnyObject) {
  data.processImgList = fileList;
  return Promise.resolve(fileList.map((file) => file.response ? file.response?.filePath : file.url));
};

export const processTableColumns = [
  { name: 'stepId', label: '工序', type: 'select', textField: 'stepName', required: true, loader: api.dropdown.step },
  { name: 'seq', label: '顺序', type: 'number' },
  { name: 'stylePrice', label: '款式工价(元)', type: 'number' },
  { name: 'process', label: '款式工艺', type: 'textarea', rows: 5, style: { flex: '1 0 100%' } },
  {
    name: 'processImgs',
    label: '工艺图片',
    type: 'image',
    fileList: 'processImgList',
    listType: 'picture-card',
    action: '/api/Style/UploadImg',
    handler,
    data: { type: 34 },
  },
];
