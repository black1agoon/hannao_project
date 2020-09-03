export const TYPE = {
  REGIONS: {
    north: {},
    center: {}
  },
  FORM_INFO: [
    {
      name: '类型名称',
      value: 'name'
    }, {
      name: '是否默认',
      value: 'pretermission',
      type: 'ratio'
    }
  ],
  RULES: {
    name: [{
      required: true, message: '请输入类型名称', trigger: ['blur', 'change']
    }]
  },
  FORM_DATA: {
    name: null,
    pretermission: 0
  },
  FORM_OPTIONS: {
    pretermission: [{
      label: '是',
      value: 1
    }, {
      label: '否',
      value: 0
    }]
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
  FORM_INFO: [
    {
      name: '机台名称',
      value: 'stationName'
    }, {
      name: '机台编码',
      value: 'stationCode'
    }, {
      name: '所属车间',
      value: 'workshopName',
      readonly: true,
      suffixIcon: 'fa fa-search'
    }, {
      name: '机台类型',
      value: 'stationTypeName',
      readonly: true,
      suffixIcon: 'fa fa-search'
    }, {
      name: '模型名称',
      value: 'modelNameName',
      readonly: true,
      suffixIcon: 'fa fa-search'
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
    }, {
      name: '条形码',
      value: 'barCode',
      readonly: true,
      suffixIcon: 'fa fa-search'
    }
  ],
  RULES: {
    workshopName: [{
      required: true, message: '请选择所属车间', trigger: ['blur', 'change']
    }],
    modelNameName: [{
      required: true, message: '请选择模型名称', trigger: ['blur', 'change']
    }],
    stationTypeName: [{
      required: true, message: '请选择机台类型', trigger: ['blur', 'change']
    }]
    // stockingsCode: [{
    //   required: true, message: '请选择使用袜型', trigger: ['blur', 'change']
    // }],
    // needleNumber: [{
    //   required: true,
    //   validator: (rule, value, callback) => {
    //     if (value === '' || value === null) {
    //       callback(new Error('请输入针数!'))
    //     } else {
    //       let list = value.split(',')
    //       if (list.length > 0 && list.find(d => d === '') !== undefined) {
    //         callback(new Error('请输入正确的格式，多个针数间请用"，"隔开。'))
    //       }
    //       callback()
    //     }
    //   },
    //   trigger: ['change', 'blur']
    // }],
    // needleCode: [{
    //   required: true, message: '请选择单双针', trigger: ['blur', 'change']
    // }]
  },
  FORM_DATA: {
    stationCode: null,
    stationName: null,
    workshopId: null,
    workshopName: null,
    barCode: null,
    stationTypeId: null,
    stationTypeName: null,
    modelNameId: null,
    modelNameName: null,
    stockingsCode: null,
    needleNumber: null,
    needleCode: null
  },
  FORM_OPTIONS: {
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
  STATION_INFO: [{
    label: '车间',
    value: 'chej'
  }, {
    label: '列',
    value: 'lie'
  }, {
    label: '位',
    value: 'wei'
  }],
  STATION_DATA: {
    chej: null,
    lie: null,
    wei: null
  },
  STATION_RULES: {
    chej: [{
      validator: (rule, value, callback) => {
        if (value.length > 2) {
          callback(new Error('最多只能输入2位!'))
        } else {
          callback()
        }
      },
      trigger: ['change', 'blur']
    }],
    lie: [{
      validator: (rule, value, callback) => {
        if (value.length > 2) {
          callback(new Error('最多只能输入2位!'))
        } else {
          callback()
        }
      },
      trigger: ['change', 'blur']
    }],
    wei: [{
      validator: (rule, value, callback) => {
        if (value.length > 2) {
          callback(new Error('最多只能输入2位!'))
        } else {
          callback()
        }
      },
      trigger: ['change', 'blur']
    }]
  },
  SEARCH_INFO: [
    {
      label: '机台编码',
      value: 'stationCode'
    }, {
      label: '机台名称',
      value: 'stationName'
    }, {
      label: '机台类型',
      value: 'stationTypeName',
      appendicon: 'fa fa-search',
      clearable: true,
      readonly: true
    }, {
      label: '所属车间',
      value: 'workshopName',
      appendicon: 'fa fa-search',
      clearable: true,
      readonly: true
    }, {
      label: '模型名称',
      value: 'modelNameName',
      appendicon: 'fa fa-search',
      clearable: true,
      readonly: true
    }, {
      label: '条码',
      value: 'barCode',
      appendicon: 'fa fa-search',
      clearable: true,
      readonly: true
    }],
  SEARCH_DATA: {
    stationCode: null,
    stationName: null,
    stationTypeName: null,
    stationTypeId: null,
    modelNameName: null,
    modelNameId: null,
    barCode: null,
    workshopName: null,
    workshopId: null
  },
  SEARCH_OPTIONS: {},
  SEARCH_FUNS: (val, method, _this) => {
    let funs = {
      barCode: {
        open: () => {
          _this.$emit('openBarCodeChose')
        }
      },
      stationTypeName: {
        open: () => {
          _this.$emit('openStationTypeChose')
        }
      },
      modelNameName: {
        open: () => {
          _this.$emit('openModelNameChose')
        }
      },
      workshopName: {
        open: () => {
          _this.$emit('openWorkshopChose')
        }
      }
    }
    funs[val][method].call(this)
  }
}

export const RECORD = {
  REGIONS: {
    north: {},
    center: {}
  },
  SEARCH_INFO: [
    {
      label: '订单编号',
      value: 'orderNumber'
    },
    {
      label: '机台名称',
      value: 'stationName'
    },
    {
      label: '机台编码',
      value: 'stationCode'
    }, {
      label: '状态',
      value: 'state',
      type: 'select'
    }, {
      label: '开始时间',
      value: 'startTime',
      type: 'datetime'
    }, {
      label: '结束时间',
      value: 'endTime',
      type: 'datetime'
    }, {
      label: '挡车工',
      value: 'spinnerName',
      appendicon: 'fa fa-search',
      clearable: true,
      readonly: true
    }],
  SEARCH_DATA: {
    orderNumber: null,
    state: null,
    stationCode: null,
    stationName: null,
    startTime: null,
    endTime: null,
    spinnerName: null,
    spinnerId: null
  },
  SEARCH_OPTIONS: {
    state: [{
      label: '机台计数',
      value: 0
    }, {
      label: '组长修正',
      value: 1
    }, {
      label: '报工修正',
      value: 2
    }, {
      label: '袜机报错',
      value: 3
    }, {
      label: '其他数据',
      value: 4
    }]
  },
  SEARCH_FUNS: (val, method, _this) => {
    let funs = {
      spinnerName: {
        open: () => {
          _this.$emit('openSpinnerChose')
        }
      }
    }
    funs[val][method].call(this)
  }
}

export const ERROR = {
  REGIONS: {
    north: {},
    center: {}
  },
  SEARCH_INFO: [
    {
      label: '订单编号',
      value: 'orderNumber'
    },
    {
      label: '机台名称',
      value: 'stationName'
    },
    {
      label: '机台编码',
      value: 'stationCode'
    }, {
      label: '挡车工',
      value: 'spinnerName',
      appendicon: 'fa fa-search',
      clearable: true,
      readonly: true
    }, {
      label: '开始时间',
      value: 'startTime',
      type: 'datetime'
    }, {
      label: '结束时间',
      value: 'endTime',
      type: 'datetime'
    }],
  SEARCH_DATA: {
    stationCode: null,
    stationName: null,
    startTime: null,
    endTime: null,
    spinnerName: null,
    spinnerId: null,
    orderNumber: null
  },
  SEARCH_OPTIONS: {
  },
  SEARCH_FUNS: (val, method, _this) => {
    let funs = {
      spinnerName: {
        open: () => {
          _this.$emit('openSpinnerChose')
        }
      }
    }
    funs[val][method].call(this)
  }
}

export const REPORT = {
  REGIONS: {
    north: {},
    center: {}
  }
}
