export const EMPLOYEE = {
  WINDOW_NAME: '职员信息',
  REGIONS: {
    north: {},
    middle: {
      center: {
        style: {
          flex: 1
        }
      }
    },
    south: {
      style: {
        flex: 1
      }
    }
  },
  FORM_INFO: [
    {
      name: '姓名',
      value: 'name'
    }, {
      name: '联系电话',
      value: 'mobile',
      type: 'number'
    }, {
      name: '邮箱',
      value: 'email'
    }, {
      name: '头像',
      value: 'avatar'
    }, {
      name: '区域',
      value: 'areaNumber',
      sm: 16
    }, {
      name: '详细地址',
      value: 'address',
      sm: 16,
      type: 'textarea'
    }
  ],
  RULES: {
    name: [{
      required: true, message: '请输入姓名', trigger: ['blur', 'change']
    }],
    email: [
      {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
    ],
    mobile: [
      {required: true, message: '请输入手机号码', trigger: ['blur', 'change']},
      {
        validator: (rule, value, callback) => {
          if (/^1[34578]\d{9}$/.test(value) === false && value) {
            callback(new Error('请输入正确的手机号'))
          } else {
            callback()
          }
        },
        trigger: ['blur', 'change']
      }]
  },
  FORM_DATA: {
    address: null,
    areaNumber: null,
    areaNumberList: [],
    avatar: null,
    birthday: null,
    email: null,
    idCard: null,
    mobile: null,
    name: null,
    sex: 0
  },
  FORM_OPTIONS: {
  },
  searchInfo: [
    {
      label: '编码',
      value: 'dataServiceCode'
    }, {
      label: '职员姓名',
      value: 'name'
    }, {
      label: '身份证',
      value: 'idCard'
    }
  ]
}
