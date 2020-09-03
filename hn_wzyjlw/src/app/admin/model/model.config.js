export const NAME = {
  REGIONS: {
    north: {},
    center: {}
  },
  FORM_INFO: [
    {
      name: '模型名称',
      value: 'modelName'
    }, {
      name: '模型编码',
      value: 'modelCode'
    }, {
      name: '是否默认',
      value: 'pretermission',
      type: 'ratio'
    }, {
      name: '适用袜型',
      value: 'stockingsCode',
      type: 'select',
      multiple: true
    }, {
      name: '针数',
      value: 'needleNumber',
      placeholder: '多个针数间请用"，"隔开'
    }, {
      name: '单双针',
      value: 'needleCode',
      type: 'select',
      multiple: true
    }
  ],
  RULES: {
    modelName: [{
      required: true, message: '请输入模型名称', trigger: ['blur', 'change']
    }]
  },
  FORM_DATA: {
    modelName: null,
    modelCode: 250,
    pretermission: 1,
    stockingsCode: null,
    needleNumber: null,
    needleCode: null
  },
  FORM_OPTIONS: {
    pretermission: [{
      label: '是',
      value: 1
    }, {
      label: '否',
      value: 0
    }],
    needleCode: [{
      label: '单',
      value: '单'
    }, {
      label: '双',
      value: '双'
    }],
    stockingsCode: [{
      label: '平板',
      value: '平板'
    }, {
      label: '毛圈',
      value: '毛圈'
    }, {
      label: '五指袜',
      value: '五指袜'
    }]
  },
  SEARCH_INFO: [
    {
      label: '模型名称:',
      value: 'modelName'
    }, {
      label: '模型编码',
      value: 'modelCode'
    }, {
      label: '是否默认',
      value: 'pretermission',
      type: 'select'
    }],
  SEARCH_DATA: {
    modelName: null,
    modelCode: null,
    pretermission: null
  },
  SEARCH_OPTIONS: {
    pretermission: [{
      label: '是',
      value: 1
    }, {
      label: '否',
      value: 0
    }]
  },
  SEARCH_FUNS: (val, method, _this) => {
  }
}

export const DATA = {
  REGIONS: {
    north: {},
    center: {}
  },
  FORM_INFO: [
    {
      name: '数据名称',
      value: 'message'
    }, {
      name: '模型名称',
      value: 'modelName',
      disabled: true
    }, {
      name: '下标',
      value: 'msgIndex',
      type: 'number'
    }, {
      name: '是否可远程',
      value: 'change',
      type: 'ratio'
    }, {
      name: '数据类型',
      value: 'msgType',
      type: 'ratio'
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
    message: [{
      required: true, message: '请输入数据名称', trigger: ['blur', 'change']
    }],
    modelName: [{
      required: true, message: '请选择模型名称', trigger: ['blur', 'change']
    }],
    msgIndex: [{
      required: true, message: '请输入下标', trigger: ['blur', 'change']
    }]
  },
  FORM_DATA: {
    message: null,
    modelId: null,
    modelName: null,
    msgIndex: null,
    change: 0,
    msgType: 0,
    memo: null
  },
  FORM_OPTIONS: {
    change: [{
      label: '否',
      value: 0
    }, {
      label: '是',
      value: 1
    }],
    msgType: [{
      label: '值',
      value: 0
    }, {
      label: '功能码',
      value: 1
    }],
    modelId: []
  },
  SEARCH_INFO: [
    {
      label: '数据名称:',
      value: 'message'
    }, {
      label: '是否可远程',
      value: 'change',
      type: 'select'
    }, {
      label: '模型名称',
      value: 'modelName',
      appendicon: 'fa fa-search',
      clearable: true,
      readonly: true
    }, {
      label: '下标',
      value: 'msgIndex'
    }, {
      label: '数据类型',
      value: 'msgType',
      type: 'select'
    }],
  SEARCH_DATA: {
    change: null,
    message: null,
    modelId: null,
    modelName: null,
    msgIndex: null,
    msgType: null
  },
  SEARCH_OPTIONS: {
    change: [{
      label: '否',
      value: 0
    }, {
      label: '是',
      value: 1
    }],
    modelId: [],
    msgType: [{
      label: '值',
      value: 0
    }, {
      label: '功能码',
      value: 1
    }]
  },
  SEARCH_FUNS: (val, method, _this) => {
    let funs = {
      modelName: {
        open: () => {
          _this.$emit('openModelNameChose')
        }
      }
    }
    funs[val][method].call(this)
  }
}

export const DETAIL = {
  REGIONS: {
    north: {},
    center: {}
  },
  FORM_INFO: [
    {
      name: '模型数据',
      value: 'modelDataName',
      disabled: true
    }, {
      name: '值',
      value: 'value',
      type: 'number'
    }, {
      name: '解释',
      value: 'mean'
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
    value: [{
      required: true, message: '请输入对应值', trigger: ['blur', 'change']
    }],
    mean: [{
      required: true, message: '请输入解释', trigger: ['blur', 'change']
    }],
    modelDataId: [{
      required: true, message: '请选择模型数据', trigger: ['blur', 'change']
    }]
  },
  FORM_DATA: {
    mean: null,
    modelDataId: null,
    modelDataName: null,
    memo: null,
    value: null
  },
  FORM_OPTIONS: {
  }
}

export const CONTROLLER = {
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
  REGIONS2: {
    west: {
      style: {
        flex: 1,
        border: '1px solid #eee'
      }
    },
    center: {
      style: {
        flex: 1
      }
    }
  },
  FORM_INFO: [
    {
      name: '模型名称',
      value: 'modelName'
    }, {
      name: '模型编码',
      value: 'modelCode',
      type: 'number'
    }, {
      name: '是否默认',
      value: 'pretermission',
      type: 'ratio'
    }, {
      name: '适用袜型',
      value: 'stockingsCode',
      type: 'select',
      multiple: true
    }, {
      name: '针数',
      value: 'needleNumber',
      placeholder: '多个针数间请用"，"隔开'
    }, {
      name: '单双针',
      value: 'needleCode',
      type: 'select',
      multiple: true
    }
  ],
  RULES: {
    modelName: [{
      required: true, message: '请输入模型名称', trigger: ['blur', 'change']
    }],
    modelCode: [{
      required: true, message: '请输入模型编码', trigger: ['blur', 'change']
    }]
  },
  FORM_DATA: {
    modelName: null,
    modelCode: 250,
    pretermission: 1,
    stockingsCode: null,
    needleNumber: null,
    needleCode: null
  },
  FORM_OPTIONS: {
    pretermission: [{
      label: '是',
      value: 1
    }, {
      label: '否',
      value: 0
    }],
    needleCode: [{
      label: '单',
      value: '单'
    }, {
      label: '双',
      value: '双'
    }],
    stockingsCode: [{
      label: '平板',
      value: '平板'
    }, {
      label: '毛圈',
      value: '毛圈'
    }, {
      label: '五指袜',
      value: '五指袜'
    }]
  },
  SEARCH_INFO: [
    {
      label: '模型名称:',
      value: 'modelName'
    }, {
      label: '模型编码',
      value: 'modelCode'
    }, {
      label: '是否默认',
      value: 'pretermission',
      type: 'select'
    }],
  SEARCH_DATA: {
    modelName: null,
    modelCode: null,
    pretermission: null
  },
  SEARCH_OPTIONS: {
    pretermission: [{
      label: '是',
      value: 1
    }, {
      label: '否',
      value: 0
    }]
  },
  SEARCH_FUNS: (val, method, _this) => {
  }
}
