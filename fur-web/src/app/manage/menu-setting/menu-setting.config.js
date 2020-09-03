export const featureButtons = [
  { id: 'btnAdd', name: 'add', icon: 'el-icon-plus', group: 1 },
  { id: 'btnEdit', name: 'edit', icon: 'el-icon-edit', hidden: true, group: 1 },
  { id: 'btnDel', name: 'delete', icon: 'el-icon-delete', group: 1 },
  { id: 'btnUp', name: 'moveUp', group: 2 },
  { id: 'btnDown', name: 'moveDown', group: 2 },
  { id: 'btnAddF', name: 'add', icon: 'el-icon-plus', group: 3 },
  { id: 'btnEditF', name: 'edit', icon: 'el-icon-edit', group: 3 },
  { id: 'btnDelF', name: 'delete', icon: 'el-icon-delete', group: 3 },
]

export const menuProps = [
  { name: 'parentName', readonly: true },
  { name: 'title' },
  { name: 'url', readonly: true },
  { name: 'memo' },
  { name: 'picUrl' },
]

export const tableColumns = [
  { name: 'title', label: '名称' },
  { name: 'dom', label: 'DOM 索引' },
  { name: 'attrCode', label: '特征码' },
  { name: 'url', label: '路由地址' },
]

export const formRules = {
  title: [{ required: true, trigger: 'blur' }],
}
