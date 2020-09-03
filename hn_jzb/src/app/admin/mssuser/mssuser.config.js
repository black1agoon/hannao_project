export const USER = {
  REGIONS: {
    north: {},
    center: {
      style: {
        flex: 1
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
      name: '用户名',
      value: 'username'
    }, {
      name: '身份证',
      value: 'icCard'
    }, {
      name: '真实姓名',
      value: 'realName'
    }, {
      name: '生日',
      value: 'birthday',
      type: 'date'
    }, {
      name: '头像',
      value: 'avatar'
    }, {
      name: '性别',
      value: 'sex',
      type: 'select'
    }, {
      name: '邮箱',
      value: 'email'
    }, {
      name: '备注',
      value: 'memo',
      type: 'textarea',
      sm: 24,
      autosize: {
        minRows: 3,
        maxRows: 5
      }
    }
  ],
  FORM_DATA: {
    username: null,
    icCard: null,
    realName: null,
    birthday: null,
    avatar: null,
    sex: null,
    email: null,
    lockTo: null,
    memo: null // 备注
  },
  FORM_OPTIONS: {
    sex: [{
      label: '男',
      value: 1
    }, {
      label: '女',
      value: 2
    }]
  },
  RULES: {
    username: [{
      required: true, message: '请输入用户名', trigger: ['blur', 'change']
    }, {
      validator: (rule, value, callback) => {
        if (/^1[34578]\d{9}$/.test(value) === false && value) {
          callback(new Error('请输入正确的用户名,格式为手机号码!'))
        } else {
          callback()
        }
      },
      trigger: ['blur', 'change']
    }],
    icCard: [{
      validator: (rule, value, callback) => {
        if (/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/.test(value) === false && value) {
          callback(new Error('请输入正确的身份证号码'))
        } else {
          callback()
        }
      },
      trigger: ['blur', 'change']
    }]
  },
  SEARCH_OPTIONS: {
    width: 500,
    fieldSearch: {
      username: {
        placeholder: '用户名',
        sm: 8
      },
      realName: {
        placeholder: '真实姓名',
        sm: 8
      },
      icCard: {
        placeholder: '身份证',
        sm: 8
      }
    },
    conditionSearch: {
      state: {
        placeholder: '状态',
        sm: 8,
        type: 'select',
        options: [{
          value: 1,
          label: '正常'
        }, {
          value: 2,
          label: '锁定'
        }, {
          value: 3,
          label: '禁用'
        }]
      }
    }
  }
}

export const GOODS = {
  REGIONS: {
    north: {},
    center: {}
  },
  FORM_INFO: [
    {
      name: '名称',
      value: 'name'
    }, {
      name: '图标',
      value: 'icon'
    }, {
      name: '需要的积分',
      value: 'credit',
      type: 'number'
    }, {
      name: '排序',
      value: 'seq',
      type: 'number'
    }, {
      name: '详情',
      value: 'content',
      type: 'textarea',
      autosize: {
        minRows: 5,
        maxRows: 10
      }
    }
  ],
  FORM_DATA: {
    name: null,
    content: null,
    credit: null,
    icon: null,
    seq: 10
  },
  FORM_OPTIONS: {
  },
  RULES: {
    name: [{
      required: true, message: '请输入名称', trigger: ['blur', 'change']
    }],
    icon: [{
      required: true, message: '请上传图标', trigger: ['blur', 'change']
    }],
    credit: [{
      required: true, message: '请输入需要积分', trigger: ['blur', 'change']
    }]
  }
}
