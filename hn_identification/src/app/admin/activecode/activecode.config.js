export const ACTIVE_CODE = {
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
  SEARCH_OPTIONS: {
    width: 500,
    fieldSearch: {
      dataServiceCode: {
        placeholder: '数据编码',
        sm: 8
      },
      name: {
        placeholder: '设备名称',
        sm: 8
      },
      code: {
        placeholder: '条码值',
        sm: 8
      },
      enterpriseName: {
        placeholder: '企业名称',
        sm: 8
      }
    },
    conditionSearch: {
      codeType: {
        placeholder: '条码类型',
        sm: 8,
        type: 'treeselect',
        options: []
      },
      activeCodeOnlineStatus: {
        placeholder: '离线状态',
        sm: 8,
        type: 'select',
        options: [{
          label: '在线',
          value: 1
        }, {
          label: '离线',
          value: 0
        }]
      }
    }
  }
}

export const TYPE = {
  WINDOW_NAME: '条码类型',
  REGIONS: {
    north: {},
    middle: {
      west: {},
      center: {}
    }
  },
  FORM_INFO: [
    {
      name: '名称',
      value: 'name'
    }, {
      name: '类型编码',
      value: 'code'
    }, {
      name: '上级',
      value: 'pid',
      type: 'treeselect'
    }, {
      name: '排序',
      value: 'seq'
    }
  ],
  FORM_DATA: {
    code: null,
    name: null,
    pid: null,
    seq: null
  },
  FORM_OPTIONS: {
    pid: []
  },
  RULES: {
    name: [{
      required: true, message: '请输入名称', trigger: ['blur', 'change']
    }],
    pid: [{
      required: true, message: '请选择上级目录', trigger: ['blur', 'change']
    }],
    code: [{
      required: true, message: '请输入类型编码', trigger: ['blur', 'change']
    }]
  }
}

export const ACTION = {
  WINDOW_NAME: '设备行为',
  REGIONS: {
    north: {},
    south: {}
  },
  FORM_INFO: [
    {
      name: '主动码动作名称',
      value: 'action'
    }, {
      name: '主动码动作编码',
      value: 'code'
    }
  ],
  FORM_DATA: {
    code: null,
    action: null
  },
  FORM_OPTIONS: {
  },
  RULES: {
    action: [{
      required: true, message: '请输入主动码动作名称', trigger: ['blur', 'change']
    }],
    code: [{
      required: true, message: '请输入主动码动作编码', trigger: ['blur', 'change']
    }]
  }
}