export const PLAN = {
  region: {
    north: {},
    middle: {
      center: {}
    },
    south: {
      style: {
        height: '40%'
      }
    }
  },
  buttons: [
    { name: '新增', btnKey: 'btnAdd', icon: 'fa-plus', seq: 1 },
    { name: '编辑', btnKey: 'btnEdit', icon: 'fa-pencil', seq: 2 },
    { name: '删除', btnKey: 'btnDelete', icon: 'fa-trash', seq: 3 },
    { name: '批量导入', btnKey: 'btnImport', icon: 'fa-arrow-circle-o-down', seq: 4 },
    { name: '导出', btnKey: 'btnExport', icon: 'fa-arrow-circle-o-up', seq: 5 },
    { name: '任务单打印', btnKey: 'btnOrderPrint', icon: 'fa-print', seq: 6 },
    { name: '条码打印', btnKey: 'btnBarCodePrint', icon: 'fa-print', seq: 7 }
  ],
  formInfo: [
    {
      name: '生产任务单号',
      value: 'code',
      disabled: true,
      placeholder: '自动生成'
    }, {
      name: '品名',
      value: 'styleID',
      type: 'select'
    }, {
      name: '颜色',
      value: 'colorID',
      type: 'select'
    }, {
      name: '客户',
      value: 'cusGuid',
      type: 'select'
    }, {
      name: '数量',
      value: 'number',
      disabled: true
    }, {
      name: '交期',
      value: 'deliverDate',
      type: 'date'
    }, {
      name: '客户要求',
      value: 'cusRequire',
      type: 'textarea',
      autosize: {
        minRows: 4,
        maxRows: 4
      },
      sm: 24
    }
  ],
  rules: {
    styleID: [{
      required: true, message: '请选择款号', trigger: ['blur', 'change']
    }],
    colorID: [{
      required: true, message: '请选择颜色', trigger: ['blur', 'change']
    }],
    cusGuid: [{
      required: true, message: '请选择客户', trigger: ['blur', 'change']
    }],
    number: [{
      required: true, message: '请输入数量', trigger: ['blur', 'change']
    }],
    deliverDate: [{
      required: true, message: '请选择交期', trigger: ['blur', 'change']
    }]
  },
  formData: {
    parID: null,
    code: null,  // 生产任务单号
    colorID: null,
    styleID: null, // 款号
    cusGuid: null, // 客户
    number: 0, // 数量
    deliverDate: null, // 交期
    cusRequire: null, // 客户要求
    sizeDetailList: []
  },
  formOptions: {
    cusGuid: [],
    styleID: [],
    colorID: []
  }
}

export const REPORT = {
  formInfo: [
    {
      title: '员工信息',
      items: [
        {
          name: '员工工号',
          value: 'reportUserCode',
        }, {
          name: '员工姓名',
          value: 'reportUserName',
          disabled: true
        }, {
          name: '报工工序',
          value: 'processId',
          type: 'select'
        }, {
          value: 'badReason'
        }
      ]
    }, {
      title: '成衣信息',
      items: [
        {
          name: '成衣条码',
          value: 'barCode',
          placeholder: '请输入成衣条码'
        }, {
          name: '款号',
          value: 'styleCode',
          disabled: true
        }, {
          name: '品名',
          value: 'styleName',
          offset: 6,
          pull: 6,
          disabled: true
        }, {
          name: '图片',
          value: 'styleImg',
          disabled: true
        }, {
          name: '订单编号',
          value: 'code',
          disabled: true
        }, {
          name: '客户',
          value: 'cusName',
          disabled: true
        }, {
          name: '交期',
          value: 'deliverDate',
          offset: 6,
          pull: 6,
          disabled: true
        }, {
          name: '颜色',
          value: 'colorName',
          disabled: true
        }, {
          name: '尺码',
          value: 'size',
          disabled: true
        }
      ]
    },
    {
      title: '工艺要求',
      items: [
        {
          name: '客户要求',
          value: 'cusRequire',
          type: 'textarea',
          autosize: {
            minRows: 4,
            maxRows: 4
          },
          sm: 18,
          disabled: true
        }, {
          name: '款号工艺',
          value: 'styleRequire',
          type: 'textarea',
          autosize: {
            minRows: 4,
            maxRows: 4
          },
          sm: 18,
          disabled: true
        }, {
          name: '标准工艺',
          value: 'generalProcess',
          type: 'textarea',
          autosize: {
            minRows: 4,
            maxRows: 4
          },
          sm: 18,
          disabled: true
        }
      ]
    }
  ],
  rules: {
    reportUserCode: [{
      required: true, message: '请输入员工工号', trigger: ['blur', 'change']
    }],
    processId: [{
      required: true, message: '请选择报工工序', trigger: ['blur', 'change']
    }]
  },
  formData: {
    processName: null,
    processId: null,
    barCode: null,
    code: null,
    styleID: null,
    reportUserCode: null,
    reportUserName: null,
    size: null,
    styleName: null,
    colorID: null,
    colorName: null,
    cusName: null,
    cusRequire: null, // 客户要求
    deliverDate: null, // 交期
    generalProcess: null, // 标准工艺
    generalProcessPicList: [], // tupian
    process: null,
    styleImg: null,
    isRework: false,
    qcdetailOutput: null,
    styleCode: null,
    styleProcessPicList: [],
    styleRequire: null,
    badReasonIds: []
  },
  formOptions: {
    processId: []
  }
}

export const TRANSFER = {
  region: {
    north: {},
    middle: {
      center: {}
    },
    south: {
      style: {
        height: '30%'
      }
    }
  },
  formData: {
    reportWorkId: null, // 报工ID
    barCode: null, // 衣服条码
    reportUserId: null, // 报工员工工号
    reportUserName: null, // 报工员工名字
    receiveReportUserId: null, // 接收人工号
    receiveReportUserName: null, // 接收员工名字
    processName: null // 工序名称
  },
  rules: {
    receiveReportUserCode: [{
      required: true, message: '请输入接受人工号', trigger: ['blur', 'change']
    }],
    receiveReportUserName: [{
      required: true, message: '请输入正确的工号,以获取姓名', trigger: ['blur', 'change']
    }]
  },
  formInfo: [
    { name: '接收人工号', value: 'receiveReportUserCode'},
    { name: '请输入接受人姓名', value: 'receiveReportUserName', disabled: true}
  ]
}

export const OUTSOURCE = {
  region: {
    north: {},
    middle: {
      center: {}
    }
  },
  buttons: [
    { name: '新增', btnKey: 'btnAdd', icon: 'fa-plus', seq: 1 },
    { name: '导出', btnKey: 'btnExport', icon: 'fa-arrow-circle-o-up', seq: 2 },
    { name: '打印委外单', btnKey: 'btnPrint', icon: 'fa-print', seq: 3 },
    { name: '委外回收', btnKey: 'btnReturn', icon: 'fa-reply', seq: 4 }
  ],
  formInfo: [
    {
      name: '生产任务单号',
      value: 'code',
      disabled: true,
      placeholder: '自动生成'
    }, {
      name: '款号',
      value: 'styleID',
      type: 'select'
    }, {
      name: '客户',
      value: 'cusGuid',
      type: 'select'
    }, {
      name: '数量',
      value: 'number',
      type: 'number'
    }, {
      name: '交期',
      value: 'deliverDate',
      type: 'date'
    }, {
      name: '客户要求',
      value: 'cusRequire',
      type: 'textarea',
      autosize: {
        minRows: 4,
        maxRows: 4
      },
      sm: 24
    }
  ],
  rules: {
    styleID: [{
      required: true, message: '请选择款号', trigger: ['blur', 'change']
    }],
    cusGuid: [{
      required: true, message: '请选择客户', trigger: ['blur', 'change']
    }],
    number: [{
      required: true, message: '请输入数量', trigger: ['blur', 'change']
    }],
    deliverDate: [{
      required: true, message: '请选择交期', trigger: ['blur', 'change']
    }]
  },
  formData: {
    parID: null,
    code: null,  // 生产任务单号
    colorID: null,
    styleID: null, // 款号
    cusGuid: null, // 客户
    number: null, // 数量
    deliverDate: null, // 交期
    cusRequire: null, // 客户要求
    sizeDetailList: []
  },
  formOptions: {
    cusGuid: [],
    styleID: []
  }
}

export const OUTSOURCE_ADD = {
  region: {
    middle: {
      center: {}
    },
    south: {
      style: {
        height: '50%'
      }
    }
  },
  buttons: [
    { name: '保存', btnKey: 'btnSave', type: 'primary', icon: 'fa-check', seq: 1 },
    { name: '返回', btnKey: 'btnReturn', icon: 'fa-reply', seq: 2}
  ],
  formInfo: [
    {
      name: '加工点',
      value: 'processPointName'
    }, {
      name: '联系人',
      value: 'contactsName',
      disabled: true
    }, {
      name: '联系方式',
      value: 'contactsPhone',
      disabled: true
    }, {
      name: '委外工序',
      value: 'stepID',
      type: 'select',
      multiple: true
    }, {
      name: '交期',
      value: 'deliverTime',
      type: 'date',
      pull: 8,
      offset: 8
    }, {
      name: '合格率',
      value: 'passRate'
    }, {
      name: '准时率',
      value: 'onTimeRate',
      pull: 8,
      offset: 8
    }, {
      name: '条码',
      value: 'code',
      placeholder: '请输入条码'
    }
  ],
  rules: {
    deliverTime: [{
      required: true, message: '请选择交期', trigger: ['blur', 'change']
    }]
  },
  formData: {
    code: null,
    parGuid: null,
    processPointName: null,
    processPointID: null,
    deliverTime: null,
    contactsPhone: null,
    contactsName: null,
    passRate: null,
    onTimeRate: null,
    stepID: null,
    barCodes: []
  },
  formOptions: {
    stepID: []
  }
}

export const OUTSOURCE_RETURN = {
  region: {
    north: {
      style: {
        height: 150
      }
    },
    middle: {
      center: {
      }
    }
  },
  buttons: [
    { name: '确定回收', btnKey: 'btnReturn', type: 'primary', icon: 'fa-check', seq: 1 },
    { name: '返回', btnKey: 'btnBack', icon: 'fa-reply', seq: 2}
  ]
}