export const CONTROLLER = {
  REGIONS: {
    north: {},
    center: {}
  },
  FORM_INFO: [
    {
      name: '班次名称',
      value: 'name'
    }, {
      name: '周期',
      value: 'cycle',
      placeholder: '天数',
      type: 'number'
    }, {
      name: '起始日期',
      value: 'startDate',
      type: 'date'
    }, {
      name: '是否可修改',
      value: 'change',
      type: 'select'
    }
  ],
  RULES: {
    name: [{
      required: true, message: '请输入排班名称', trigger: ['blur', 'change']
    }],
    cycle: [{
      required: true, message: '请输入周期', trigger: ['blur', 'change']
    }],
    startDate: [{
      required: true, message: '请输入起始日期', trigger: ['blur', 'change']
    }],
    change: [{
      required: true, message: '请选择是否可修改', trigger: ['blur', 'change']
    }]
  },
  FORM_DATA: {
    name: null,
    choose: [],
    cycle: null,
    startDate: null
  },
  FORM_OPTIONS: {
    change: [{
      label: '否',
      value: 0
    }, {
      label: '是',
      value: 1
    }]
  }
}

export const DETAIL = {
  REGIONS: {
    north: {},
    center: {}
  },
  FORM_INFO: [
    {
      name: '详情名称',
      value: 'name'
    }, {
      name: '排序',
      value: 'seq',
      type: 'number'
    }, {
      name: '开始时间',
      value: 'startTime',
      type: 'timepicker'
    }, {
      name: '结束时间',
      value: 'endTime',
      type: 'timepicker'
    }
  ],
  RULES: {
    name: [{
      required: true, message: '请输入排班名称', trigger: ['blur', 'change']
    }]
  },
  FORM_DATA: {
    name: null,
    seq: null,
    startTime: null,
    endTime: null
  },
  FORM_OPTIONS: {
  }
}

