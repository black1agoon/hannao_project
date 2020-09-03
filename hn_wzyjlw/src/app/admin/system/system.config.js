export const PARAMS = {
  REGIONS: {
    north: {},
    center: {}
  },
  FORM_INFO: [
    {
      name: '编码',
      value: 'code'
    }, {
      name: '值',
      value: 'valuez'
    }, {
      name: '备注',
      value: 'memo',
      type: 'textarea',
      autosize: {
        minRows: 5,
        maxRows: 5
      }
    }
  ],
  RULES: {
    code: [{
      required: true, message: '请输入编码', trigger: ['blur', 'change']
    }],
    valuez: [{
      required: true, message: '请输入值', trigger: ['blur', 'change']
    }]
  },
  FORM_DATA: {
    code: null,
    valuez: null,
    memo: null
  },
  FORM_OPTIONS: {
  }
}
