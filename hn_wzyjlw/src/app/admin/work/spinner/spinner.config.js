export const CONTROLLER = {
  REGIONS: {
    north: {},
    center: {}
  },
  FORM_INFO: [
    {
      name: '工号',
      value: 'jobNumber'
    }, {
      name: '真实姓名',
      value: 'name'
    }, {
      name: '所属车间',
      value: 'workshopName'
    }, {
      name: '性别',
      value: 'sex',
      type: 'select'
    }, {
      name: '电话',
      value: 'phone'
    }, {
      name: '备注',
      value: 'memo',
      type: 'textarea',
      autosize: {
        minRows: 4,
        maxRows: 4
      }
    }
  ],
  RULES: {
    jobNumber: [{
      required: true, message: '请输入工号', trigger: ['blur', 'change']
    }, {
      min: 4, max: 20, message: '长度在4-20位', trigger: ['blur', 'change']
    }],
    name: [{
      required: true, message: '请输入挡车工姓名', trigger: ['blur', 'change']
    }],
    phone: []
  },
  FORM_DATA: {
    jobNumber: null,
    name: null,
    sex: '00010001',
    phone: null,
    memo: null,
    enabled: 1,
    workshopId: null,
    workshopName: null
  },
  FORM_OPTIONS: {
    sex: []
  }
}

// export const USER_STATION =
