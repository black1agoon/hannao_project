export const FOCUS = {
  REGIONS: {
    north: {
      style: {
        height: 40,
        border: true
      }
    },
    center: {}
  },
  FORM_INFO: [{
    name: '名称',
    value: 'name'
  }, {
    name: '关注url',
    value: 'url'
  }, {
    name: '图标',
    value: 'ico'
  }, {
    name: '排序',
    value: 'seq',
    type: 'number'
  }],
  FORM_DATA: {
    name: null,
    seq: 10,
    type: null,
    url: null,
    ico: null
  },
  FORM_OPTIONS: {
  },
  RULES: {
    name: [{
      required: true, message: '请输入服务项名称', trigger: ['change', 'blur']
    }],
    ico: [{
      required: true, message: '请上传图标', trigger: ['change', 'blur']
    }],
    url: [{required: true, message: '请输入Url', trigger: ['change', 'blur']}]
  }
}
