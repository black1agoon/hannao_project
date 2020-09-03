export const PILE = {
  REGIONS: {
    north: {},
    south: {}
  },
  FORM_INFO: [
    {
      name: '充电桩编号',
      value: 'num'
    }, {
      name: '站点',
      value: 'point'
    }, {
      name: '排序',
      value: 'seq'
    }
  ],
  RULES: {
    num: [{
      required: true, message: '请充电桩编号', trigger: ['blur', 'change']
    }],
    point: [{
      required: true, message: '请输入站点', trigger: ['blur', 'change']
    }]
  },
  FORM_DATA: {
    num: null,
    point: null,
    seq: 10
  },
  FORM_OPTIONS: {}
}

export const ONOFF = {
  REGIONS: {
    north: {},
    south: {}
  }
}