export const searchItems = [
  { value: 'time', name: '报工时间'},
  { value: 'userNo', name: '员工工号'},
  { value: 'realName', name: '员工姓名'},
];

export const tableColumns = [
  { name: 'userNo', label: '工号', minWidth: 120 },
  { name: 'realName', label: '姓名', minWidth: 120 },
  { name: 'reportTime', label: '上报时间', minWidth: 150 },
  { name: 'barCode', label: '条码', minWidth: 150 },
  { name: 'styleCode', label: '款号', minWidth: 120 },
  { name: 'colorName', label: '颜色', minWidth: 100 },
  { name: 'size', label: '尺码', minWidth: 100 },
  { name: 'qcState', label: '是否合格', minWidth: 80, format: (row) => {
    return row.qcState ? '是': '否'
  }},
  { name: 'reason', label: '不良原因', minWidth: 200},
];