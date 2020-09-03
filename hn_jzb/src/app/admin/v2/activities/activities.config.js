export const ACTIVITIES = {
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
    name: '报名活动标题',
    value: 'name'
  }, {
    name: '开始时间',
    value: 'startTime',
    type: 'datetime'
  }, {
    name: '服务项代号',
    value: 'code'
  }, {
    name: '结束时间',
    value: 'endTime',
    type: 'datetime'
  }, {
    name: '报名表单地址',
    value: 'url'
  }, {
    name: '排序',
    value: 'seq',
    type: 'number'
  }, {
    name: '是否短信通知',
    value: 'smsNotification',
    type: 'radio'
  }, {
    name: '是否邮件通知',
    value: 'emailNotification',
    type: 'radio'
  }, {
    name: '短信列表',
    value: 'smsList',
    type: 'textarea',
    placeholder: '多个号码间请用","隔开',
    autosize: {
      minRows: 3,
      maxRows: 5
    }
  }, {
    name: '邮件列表',
    value: 'emailList',
    type: 'textarea',
    placeholder: '多个邮件间请用","隔开',
    autosize: {
      minRows: 3,
      maxRows: 5
    }
  }, {
    name: '图标(316*120)',
    value: 'pic'
  }, {
    name: '描述',
    value: 'description',
    type: 'textarea',
    autosize: {
      minRows: 3,
      maxRows: 5
    }
  }],
  FORM_DATA: {
    name: null,
    code: null,
    description: null,
    emailList: null,
    smsList: null,
    emailNotification: 0,
    smsNotification: 0,
    seq: 10,
    url: null,
    pic: null,
    startTime: null,
    endTime: null
  },
  FORM_OPTIONS: {
    smsNotification: [{
      label: '是',
      value: 1
    }, {
      label: '否',
      value: 0
    }],
    emailNotification: [{
      label: '是',
      value: 1
    }, {
      label: '否',
      value: 0
    }]
  },
  RULES: {
    name: [{
      required: true, message: '请输入服务项名称', trigger: ['change', 'blur']
    }],
    startTime: [{
      required: true, message: '请选择开始时间', trigger: ['change', 'blur']
    }],
    endTime: [{
      required: true, message: '请选择结束时间', trigger: ['change', 'blur']
    }],
    code: [{
      required: true, message: '请输入服务项代号', trigger: ['change', 'blur']
    }],
    pic: [{
      required: true, message: '请上传图标', trigger: ['change', 'blur']
    }],
    url: [{
      required: true,
      validator: (rule, value, callback) => {
        if (!/^((http(s)?:\/\/))[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]$/.test(value) && value !== null && value !== '') {
          callback(new Error('请输入正确格式的网址,例http://www.baidu.com'))
        } else {
          callback()
        }
      },
      trigger: ['blur', 'change']
    }],
    smsList: [{
      validator: (rule, value, callback) => {
        if (value === '' || value === null) {
          callback()
        } else {
          let list = value.split(',')
          if (list.length > 0 && list.find(d => d === '') !== undefined) {
            callback(new Error('请输入正确的格式，多个号码间请用","隔开。'))
          }
          callback()
        }
      },
      trigger: ['change', 'blur']
    }],
    emailList: [{
      validator: (rule, value, callback) => {
        if (value === '' || value === null) {
          callback()
        } else {
          let list = value.split(',')
          if (list.length > 0 && list.find(d => d === '') !== undefined) {
            callback(new Error('请输入正确的格式，多个号码间请用","隔开。'))
          }
          callback()
        }
      },
      trigger: ['change', 'blur']
    }]
  }
}
