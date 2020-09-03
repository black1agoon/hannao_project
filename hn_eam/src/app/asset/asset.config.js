export const CONTROLLER = {
  REGIONS: {
    north: {},
    center: {},
    middle: {
    },
    south: {
      style: {
        flex: 1
      }
    }
  },
  FORM_INFO: [
    {
      name: '资产编码',
      value: 'assetCode',
      placeholder: '请输入资产编码'
    }, {
      name: '资产名称',
      value: 'assetName',
      placeholder: '请输入资产名称'
    }, {
      name: '资产类别',
      value: 'typeid',
      placeholder: '请选择资产类别',
      type: 'treeselect',
      add: true
    }, {
      name: '入库时间',
      value: 'addTime',
      placeholder: '请选择入库时间',
      type: 'date'
    }, {
      name: '型号',
      value: 'model',
      placeholder: '请输入型号'
    }, {
      name: '计量单位',
      value: 'unit',
      placeholder: '计量单位由资产类别带出',
      disabled: true
    }, {
      name: '来源',
      value: 'assetSource',
      placeholder: '请选择来源',
      type: 'select'
    }, {
      name: '渠道',
      value: 'place',
      placeholder: '请输入渠道'
    }, {
      name: '金额',
      value: 'amount',
      placeholder: '请输入金额',
      type: 'number',
      unit: '元'
    }, {
      name: '品牌',
      value: 'brand',
      placeholder: '请输入品牌'
    }, {
      name: '购入时间',
      value: 'buyTime',
      placeholder: '选择购入时间',
      type: 'date'
    }, {
      name: '使用期限',
      value: 'usetime',
      placeholder: '使用期限由资产类别带出',
      unit: '月'
    }, {
      name: 'SN号',
      value: 'snnumber',
      placeholder: '请输入SN号',
      explain: '不同产品SN号在不同位置查看,联想设备在 输入SN号后,百应会自动读取设备配置信息'
    }, {
      name: '保修起始',
      value: 'warrantyStart',
      placeholder: '请选择保修起始时间',
      type: 'date'
    }, {
      name: '过保时间',
      value: 'warrantyEnd',
      placeholder: '请选择保修过保时间',
      type: 'date'
    }, {
      name: '预计净残值',
      value: 'netSalvage',
      placeholder: '请输入预计净残值',
      type: 'number',
      unit: '元'
    }, {
      name: '备注',
      value: 'remark',
      placeholder: '请输入备注',
      type: 'textarea',
      autosize: {
        minRows: 4,
        maxRows: 4
      },
      sm: 16
    }, {
      name: '图片',
      value: 'pictures',
      sm: 8
    }
  ],
  FORM_DATA: {
    addTime: null,
    agencyId: 1,
    amount: null,
    assetCode: null,
    assetName: null,
    assetSource: null,
    // assetSourceName: null,
    assetStatus: null,
    // assetStatusName: null,
    brand: null,
    buyTime: null,
    cleanId: null,  // 清理id?
    department: null,
    departmentName: null,
    maintainId: null,  // 维修单id ?
    model: null,
    pictures: null,
    place: null,
    positionId: null,
    netSalvage: null,
    // positionName: null,
    receiveTime: null,
    remark: null,
    snnumber: null,
    typeid: null,
    // typename: null,
    unit: null,
    username: null,
    userid: null,
    usetime: null,
    warrantyEnd: null,
    warrantyStart: null
  },
  FORM_OPTIONS: {
    userid: [],
    assetSource: [{
      label: '自购',
      value: '1'
    }, {
      label: '租赁',
      value: '2'
    }, {
      label: '借用',
      value: '3'
    }, {
      label: '其他',
      value: '4'
    }, {
      label: '自产',
      value: '5'
    }, {
      label: '赠送',
      value: '6'
    }],
    addTime: {
      disabledDate(time) {
        return time.getTime() > Date.now()
      }
    },
    receiveTime: {
      disabledDate(time) {
        return time.getTime() > Date.now()
      }
    },
    buyTime: {
      disabledDate(time) {
        return time.getTime() > Date.now()
      }
    }
  },
  RULES: {
    assetCode: [{
      required: true, message: '请输入资产编码', trigger: ['blur', 'change']
    }],
    assetName: [{
      required: true, message: '请输入资产名称', trigger: ['blur', 'change']
    }],
    typeid: [{
      required: true, message: '请选择资产类别', trigger: ['blur', 'change']
    }],
    addTime: [{
      required: true, message: '请选择入库时间', trigger: ['blur', 'change']
    }],
    assetSource: [{
      required: true, message: '请输入来源', trigger: ['blur', 'change']
    }],
    amount: [{
      required: true, message: '请输入金额', trigger: ['blur', 'change']
    }],
    netSalvage: [{
      required: true, message: '请输入预计净残值', trigger: ['blur', 'change']
    }],
    usetime: [{
      required: true, message: '请输入使用期限', trigger: ['blur', 'change']
    }],
    buyTime: [{
      required: true, message: '请输入购入时间', trigger: ['blur', 'change']
    }]
  }
}

export const RECEIVE = {
  REGIONS: {
    north: {},
    center: {},
    middle: {
    },
    south: {
      style: {
        flex: 1
      }
    }
  },
  FORM_INFO: [
    {
      name: '领用后使用部门',
      value: 'department',
      type: 'treeselect',
      placeholder: '请选择领用后使用部门'
    }, {
      name: '领用时间',
      value: 'receiveTime',
      placeholder: '请选择领用时间',
      type: 'date'
    }, {
      name: '领用后使用人',
      value: 'userid',
      type: 'select',
      placeholder: '请选择领用后使用人',
      explain: '需要先选择使用部门才能选择使用人'
    }, {
      name: '领用后使用地',
      value: 'positionId',
      placeholder: '请选择领用后使用地',
      type: 'select',
      add: true
    }, {
      name: '领用后使用工位',
      value: 'station',
      placeholder: '请输入领用后使用工位'
    }, {
      name: '领用处理人',
      value: 'disposeUserName',
      explain: '默认提单管理员不可修改'
    }, {
      name: '领用备注',
      value: 'remark',
      type: 'textarea',
      placeholder: '请输入领用备注',
      autosize: {
        minRows: 2,
        maxRows: 3
      },
      sm: 24
    }
  ],
  FORM_DATA: {
    agencyId: null,
    assetIds: [],
    department: null,
    departmentName: null,
    disposeUser: null,
    disposeUserName: null,
    positionId: null,
    positionName: null,
    receiveCode: null,
    receiveTime: null,
    remark: null,
    station: null,
    userid: null,
    username: null
  },
  FORM_OPTIONS: {
    userid: [],
    receiveTime: {
      disabledDate(time) {
        return time.getTime() > Date.now()
      }
    },
  },
  RULES: {
    department: [{
      required: true, message: '请选择领用后使用部门', trigger: 'change'
    }],
    receiveTime: [{
      required: true, message: '请选择领用时间', trigger: 'change'
    }],
    userid: [{
      required: true, message: '请选择领用后使用人', trigger: 'change'
    }],
    positionId: [{
      required: true, message: '请选择领用后使用地', trigger: 'change'
    }]
  }
}

export const TRANSFER = {
  REGIONS: {
    north: {},
    center: {},
    middle: {
    },
    south: {
      style: {
        flex: 1
      }
    }
  },
  FORM_INFO: [
    {
      name: '转移后使用部门',
      value: 'department',
      type: 'treeselect',
      placeholder: '请选择转移后使用部门'
    }, {
      name: '转移时间',
      value: 'transferTime',
      placeholder: '请选择转移时间',
      type: 'date'
    }, {
      name: '转移后使用人',
      value: 'userid',
      type: 'select',
      placeholder: '请选择转移后使用人',
      explain: '需要先选择使用部门才能选择使用人'
    }, {
      name: '转移后使用地',
      value: 'positionId',
      placeholder: '请选择转移后使用地',
      type: 'select',
      add: true
    }, {
      name: '转移后使用工位',
      value: 'station',
      placeholder: '请输入转移后使用工位'
    }, {
      name: '转移处理人',
      value: 'disposeUserName',
      explain: '默认提单管理员不可修改'
    }, {
      name: '转移备注',
      value: 'remark',
      type: 'textarea',
      placeholder: '请输入转移备注',
      autosize: {
        minRows: 2,
        maxRows: 3
      },
      sm: 24
    }
  ],
  FORM_DATA: {
    agencyId: null,
    assetIds: [],
    department: null,
    departmentName: null,
    disposeUser: null,
    disposeUserName: null,
    positionId: null,
    positionName: null,
    transferCode: null,
    transferTime: null,
    remark: null,
    station: null,
    userid: null,
    username: null
  },
  FORM_OPTIONS: {
    userid: [],
    transferTime: {
      disabledDate(time) {
        return time.getTime() > Date.now()
      }
    }
  },
  RULES: {
    department: [{
      required: true, message: '请选择转移后使用部门', trigger: 'change'
    }],
    transferTime: [{
      required: true, message: '请选择转移时间', trigger: 'change'
    }],
    userid: [{
      required: true, message: '请选择转移后使用人', trigger: 'change'
    }],
    positionId: [{
      required: true, message: '请选择转移后使用地', trigger: 'change'
    }]
  }
}

export const RETURN = {
  REGIONS: {
    north: {},
    center: {},
    middle: {
    },
    south: {
      style: {
        flex: 1
      }
    }
  },
  FORM_INFO: [
    {
      name: '退库存放地',
      value: 'positionId',
      type: 'select',
      placeholder: '请选择退库存放地',
      add: true
    }, {
      name: '退库时间',
      value: 'returnTime',
      placeholder: '请选择退库时间',
      type: 'date'
    }, {
      name: '退库处理人',
      value: 'disposeUserName',
      explain: '默认提单管理员不可修改'
    }, {
      name: '退库备注',
      value: 'remark',
      type: 'textarea',
      placeholder: '请输入退库备注',
      autosize: {
        minRows: 2,
        maxRows: 3
      },
      sm: 24
    }
  ],
  FORM_DATA: {
    agencyId: null,
    assetIds: [],
    disposeUser: null,
    disposeUserName: null,
    positionId: null,
    returnCode: null,
    returnTime: null,
    remark: null
  },
  FORM_OPTIONS: {
    returnTime: {
      disabledDate(time) {
        return time.getTime() > Date.now()
      }
    }
  },
  RULES: {
    returnTime: [{
      required: true, message: '请选择退库时间', trigger: 'change'
    }],
    positionId: [{
      required: true, message: '请选择退库存放地', trigger: 'change'
    }]
  }
}

export const MAINTAIN = {
  REGIONS: {
    north: {},
    center: {},
    middle: {
    },
    south: {
      style: {
        flex: 1
      }
    }
  },
  FORM_INFO: [
    {
      name: '报修部门',
      value: 'department',
      type: 'treeselect',
      placeholder: '请选择报修部门'
    }, {
      name: '报修人',
      value: 'maintainUser',
      type: 'select',
      placeholder: '请选择报修人',
      explain: '需要先选择使用部门才能选择报修人'
    }, {
      name: '报修时间',
      value: 'maintainTime',
      placeholder: '请选择报修时间',
      type: 'date'
    }, {
      name: '报修原因',
      value: 'maintainReason',
      placeholder: '请输入报修原因'
    }, {
      name: '维修内容',
      value: 'details',
      placeholder: '请输入维修内容'
    }, {
      name: '维修花费',
      value: 'expenditure',
      type: 'number',
      placeholder: '请输入维修花费'
    }, {
      name: '维修状态',
      value: 'maintainStatus',
      type: 'select',
      placeholder: '请输入维修状态'
    }, {
      name: '维修处理人',
      value: 'disposeUserName',
      explain: '默认提单管理员不可修改'
    }, {
      name: '维修备注',
      value: 'remark',
      type: 'textarea',
      placeholder: '请输入维修备注',
      autosize: {
        minRows: 2,
        maxRows: 3
      },
      sm: 24
    }
  ],
  FORM_DATA: {
    agencyId: null,
    assetDtoList: [],
    department: null,    // 部门
    departmentName: null,
    details: null,
    disposeUser: null,   // 维修处理人
    disposeUserName: null,
    expenditure: null,      // 维修花费
    maintainCode: null,
    maintainReason: null, // 维修原因
    maintainStatus: null,   // 维修状态
    maintainTime: null,    // 维修时间
    maintainTimeStr: null,
    maintainUser: null,    // 报修人
    remark: null,          // 维修备注
    updateUser: null,
    username: null
  },
  FORM_OPTIONS: {
    maintainStatus: [],
    maintainTime: {
      disabledDate(time) {
        return time.getTime() > Date.now()
      }
    }
  },
  RULES: {
    department: [{
      required: true, message: '请选择报修部门', trigger: 'change'
    }],
    maintainUser: [{
      required: true, message: '请选择转移后使用人', trigger: 'change'
    }],
    maintainTime: [{
      required: true, message: '请选择报修时间', trigger: 'change'
    }],
    maintainStatus: [{
      required: true, message: '请选择维修状态', trigger: 'change'
    }]
  }
}

export const CLEAN = {
  REGIONS: {
    north: {},
    center: {},
    middle: {
    },
    south: {
      style: {
        flex: 1
      }
    }
  },
  FORM_INFO: [
    {
      name: '清理处理人',
      value: 'cleanUserName',
      explain: '默认提单管理员不可修改'
    }, {
      name: '清理时间',
      value: 'cleanTime',
      placeholder: '请选择清理时间',
      type: 'date'
    }, {
      name: '清理原因',
      value: 'cleanReason',
      placeholder: '请输入清理原因'
    }, {
      name: '清理备注',
      value: 'remark',
      type: 'textarea',
      placeholder: '请输入清理备注',
      autosize: {
        minRows: 2,
        maxRows: 3
      },
      sm: 24
    }
  ],
  FORM_DATA: {
    agencyId: null,
    assetIds: [],
    cleanCode: null,
    cleanReason: null,
    cleanTime: null,
    cleanUser: null,
    cleanUserName: null,
    remark: null
  },
  FORM_OPTIONS: {
    cleanTime: {
      disabledDate(time) {
        return time.getTime() > Date.now()
      }
    }
  },
  RULES: {
    cleanTime: [{
      required: true, message: '请选择清理时间', trigger: 'change'
    }],
    cleanReason: [{
      required: true, message: '请输入清理原因', trigger: ['blur', 'change']
    }]
  }
}

export const CHECK = {
  REGIONS: {
    north: {},
    center: {},
    middle: {
    },
    south: {
      style: {
        flex: 1
      }
    }
  },
  FORM_INFO: [
    {
      name: '盘点任务名称',
      value: 'taskName',
      placeholder: '请输入盘点任务名称'
    }, {
      name: '盘点发起人',
      value: 'checkUser',
      type: 'select',
      placeholder: '请选择盘点发起人'
    }, {
      name: '盘点开始时间',
      value: 'startTime',
      placeholder: '请选择盘点开始时间',
      type: 'date'
    }, {
      name: '盘点结束时间',
      value: 'endTime',
      placeholder: '请选择盘点结束时间',
      type: 'date'
    }, {
      name: '盘点备注',
      value: 'remark',
      placeholder: '请输入盘点备注',
      type: 'textarea',
      autosize: {
        minRows: 2,
        maxRows: 3
      },
      sm: 24
    }
  ],
  FORM_DATA: {
    agencyId: null,
    assetIds: [],
    checkStatus: null, // 盘点状态
    checkStatusName: null, // 盘点状态名字
    checkType: '1', // 盘点类型
    checkUser: null,  // 盘点人
    percentage: null, // 百分比
    endTime: null,
    endTimeStr: null,
    remark: null,
    startTime: null,
    startTimeStr: null,
    taskCode: null,
    taskName: null,
    department: [],
    departmentList: [],
    assetType: [], // 资产类别
    assetTypeList: [],
    assetStatus: [],
    assetStatusList: [],
    assetSource: [],
    assetSourceList: []
  },
  FORM_OPTIONS: {
    checkUser: [],
    departmentList: [],
    assetTypeList: [],
    assetSourceList: [{
      label: '自购',
      value: '1'
    }, {
      label: '租赁',
      value: '2'
    }, {
      label: '借用',
      value: '3'
    }, {
      label: '其他',
      value: '4'
    }, {
      label: '自产',
      value: '5'
    }, {
      label: '赠送',
      value: '6'
    }],
    assetStatusList: [{
      label: '闲置',
      value: '1'
    }, {
      label: '在用',
      value: '2'
    }, {
      label: '维修',
      value: '3'
    }, {
      label: '报废',
      value: '5'
    }, {
      label: '全部',
      value: '8'
    }],
    startTime: {
      disabledDate(time) {
        return time.getTime() > Date.now()
      }
    }
  },
  RULES: {
    taskName: [{
      required: true, message: '请输入盘点任务名称', trigger: ['blur', 'change']
    }],
    checkUser: [{
      required: true, message: '请选择盘点人', trigger: ['blur', 'change']
    }],
    startTime: [{
      required: true, message: '请选择开始时间', trigger: ['blur', 'change']
    }],
    endTime: [{
      required: true, message: '请选择结束时间', trigger: ['blur', 'change']
    }],
    percentage: [{
      validator: (rule, value, callback) => {
        if (Number(value) > 100) {
          callback(new Error('比例不能大于100%'))
        } else {
          callback()
        }
      }
    }]
  }
}

export const DOCHECK = {
  FORM_INFO: [
    {
      name: '盘点结果',
      value: 'checkResult',
      type: 'select',
      placeholder: '请选择盘点结果'
    }, {
      name: '盘点执行人',
      value: 'checkUserName',
      disabled: true
    }, {
      name: '盘点图片',
      value: 'checkPictures',
      sm: 24
    }, {
      name: '盘点备注',
      value: 'remark',
      placeholder: '请输入盘点备注',
      type: 'textarea',
      autosize: {
        minRows: 2,
        maxRows: 3
      },
      sm: 24
    }
  ],
  FORM_DATA: {
    agencyId: null,
    assetIds: [],
    checkResult: null,
    checkUser: null,
    checkUserName: null,
    idList: [],
    remark: null,
    taskIdList: [],
    checkPictures: null
  },
  FORM_OPTIONS: {
    checkResult: [{
      label: '盘点中',
      value: '0'
    }, {
      label: '正常',
      value: '1'
    }, {
      label: '信息不符',
      value: '2'
    }, {
      label: '损坏',
      value: '3'
    }, {
      label: '遗失',
      value: '4'
    }, {
      label: '其他',
      value: '5'
    }]
  },
  RULES: {
    checkResult: [{
      required: true, message: '请选择盘点结果', trigger: 'change'
    }]
  }
}

export const CHECK_COPY = {
  REGIONS: {
    north: {},
    center: {},
    middle: {
    },
    south: {
      style: {
        flex: 1
      }
    }
  },
  FORM_INFO: [
    {
      name: '盘点任务名称',
      value: 'taskName',
      placeholder: '请输入盘点任务名称'
    }, {
      name: '盘点人发起人',
      value: 'checkUser',
      type: 'select',
      placeholder: '请选择盘点人'
    }, {
      name: '盘点开始时间',
      value: 'startTime',
      placeholder: '请选择盘点开始时间',
      type: 'date'
    }, {
      name: '盘点结束时间',
      value: 'endTime',
      placeholder: '请选择盘点结束时间',
      type: 'date'
    }, {
      name: '盘点备注',
      value: 'remark',
      placeholder: '请输入盘点备注',
      type: 'textarea',
      autosize: {
        minRows: 2,
        maxRows: 3
      },
      sm: 24
    }
  ],
  FORM_DATA: {
    agencyId: null,
    checkType: 6, // 盘点类型
    checkUser: null,  // 盘点人
    percentage: 100, // 百分比
    endTime: null,
    remark: null,
    startTime: null,
    taskName: null
  },
  FORM_OPTIONS: {
    checkUser: []
  },
  RULES: {
    taskName: [{
      required: true, message: '请输入盘点任务名称', trigger: ['blur', 'change']
    }],
    checkUser: [{
      required: true, message: '请选择盘点人', trigger: ['blur', 'change']
    }],
    startTime: [{
      required: true, message: '请选择开始时间', trigger: ['blur', 'change']
    }],
    endTime: [{
      required: true, message: '请选择结束时间', trigger: ['blur', 'change']
    }],
    percentage: [{
      validator: (rule, value, callback) => {
        if (Number(value) > 100) {
          callback(new Error('比例不能大于100%'))
        } else {
          callback()
        }
      }
    }]
  }
}
