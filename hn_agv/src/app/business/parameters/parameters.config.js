export const PARAM = {
  REGIONS: {
    north: {},
    south: {}
  },
  FORM_INFO: [
    {
      name: '键',
      value: 'code'
    }, {
      name: '值',
      value: 'valuez'
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
    code: [{
      required: true, message: '请输入键', trigger: ['blur', 'change']
    }],
    valuez: [{
      required: true, message: '请输入值', trigger: ['blur', 'change']
    }]
  },
  FORM_DATA: {
    code: null,
    memo : null,
    valuez: null
  },
  FORM_OPTIONS: {}
}
