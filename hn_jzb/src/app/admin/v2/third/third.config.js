export const THIRD = {
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
    name: '代号',
    value: 'code'
  }, {
    name: '类型',
    value: 'type',
    type: 'select'
  }, {
    name: 'url地址',
    value: 'url'
  }, {
    name: '图标',
    value: 'ico'
  }],
  FORM_DATA: {
    name: null,
    code: null,
    type: null,
    url: null,
    ico: null
  },
  FORM_OPTIONS: {
    type: [{
      label: 'WEB',
      value: 'WEB'
    }, {
      label: 'APP',
      value: 'APP'
    }]
  },
  RULES: {
    name: [{
      required: true, message: '请输入服务项名称', trigger: ['change', 'blur']
    }],
    type: [{
      required: true, message: '请选择类型', trigger: ['change', 'blur']
    }],
    code: [{
      required: true, message: '请输入服务项代号', trigger: ['change', 'blur']
    }],
    url: [{
      validator: (rule, value, callback) => {
        if (!/^((http(s)?:\/\/))[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]$/.test(value) && value !== null && value !== '') {
          callback(new Error('请输入正确格式的网址,例http://www.baidu.com'))
        } else {
          callback()
        }
      },
      trigger: ['blur', 'change']
    }]
  }
}
