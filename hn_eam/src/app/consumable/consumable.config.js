export const TYPE = {
  REGIONS: {
    north: {},
    middle: {
      style: {
        flex: 1
      }
    },
    west: {},
    center: {}
  },
  FORM_INFO: [
    {
      name: '分类编号',
      value: 'typeCode',
      placeholder: '请填写分类编号'
    }, {
      name: '分类名称',
      value: 'typename',
      placeholder: '请填写分类名称'
    }, {
      name: '上级分类',
      value: 'parentId',
      placeholder: '请选择资产类别',
      type: 'treeselect'
    }, {
      name: '排序',
      value: 'seq',
      placeholder: '排序',
      type: 'number'
    }, {
      name: '是否工具',
      value: 'istool',
      type: 'radio'
    }
  ],
  FORM_DATA: {
    agencyId: null,
    parentId: null,
    parentTypename: null,
    seq: null,
    typeCode: null,
    typename: null,
    istool: null
  },
  rules: {
    typeCode: [{
      required: true, message: '请输入分类编号', trigger: ['blur', 'change']
    }],
    typename: [{
      required: true, message: '请输入分类名称', trigger: ['blur', 'change']
    }],
    parentId: [{
      required: true, message: '请选择上级分类', trigger: 'change'
    }],
    istool: [{
      required: true, message: '请选择是否为工具', trigger: 'change'
    }]
  }
}

export const CONTROLLER = {
  REGIONS: {
    north: {},
    middle: {
      style: {
        flex: 1
      }
    },
    center: {
    }
  },
  FORM_INFO: [
    {
      name: '物料编码',
      value: 'consumableCode',
      placeholder: '请输入物料编码'
    },  {
      name: '物料名称',
      value: 'consumableName',
      placeholder: '请输入物料名称'
    },  {
      name: '物料分类',
      value: 'consumableType',
      type: 'treeselect',
      placeholder: '请选择上级分类'
    },  {
      name: '品牌',
      value: 'brand',
      placeholder: '请输入品牌'
    },  {
      name: '规格型号',
      value: 'model',
      placeholder: '请输入规格型号'
    },  {
      name: '单位',
      value: 'unit',
      placeholder: '请输入单位'
    },  {
      name: '物料条码',
      value: 'barCode',
      placeholder: '请输入物料条码'
    },  {
      name: '采购员',
      value: 'buyer',
      placeholder: '请输入采购员'
    },  {
      name: '供应商',
      value: 'supplier',
      placeholder: '请输入供应商'
    },  {
      name: '成本计算方法',
      value: 'computingMethod',
      placeholder: '平均加权',
      disabled: true
    }, {
      name: '安全库存上限',
      value: 'upperLimit',
      placeholder: '请输入安全库存上限'
    }, {
      name: '安全库存下限',
      value: 'lowerLimit',
      placeholder: '请输入安全库存下限'
    }, {
      name: '图片',
      value: 'pictures'
    }
  ],
  FORM_DATA: {
    agencyId: null,
    barCode: null,
    brand: null,
    buyer: null,
    computingMethod: null,
    consumableCode: null,
    consumableName: null,
    consumableType: null,
    lowerLimit: null,
    model: null,
    pictures: null,
    supplier: null,
    unit: null,
    upperLimit: null
  },
  FORM_OPTIONS: {
  },
  rules: {
    consumableCode: [{
      required: true, message: '请输入物料编码', trigger: ['blur', 'change']
    }],
    consumableName: [{
      required: true, message: '请输入物料名称', trigger: ['blur', 'change']
    }],
    consumableType: [{
      required: true, message: '请选择物料分类', trigger: 'change'
    }]
  }
}

export const WAREHOUSE = {
  REGIONS: {
    north: {},
    middle: {
      style: {
        flex: 1
      }
    },
    center: {}
  },
  FORM_INFO: [
    {
      name: '仓库编码',
      value: 'warehouseCode',
      placeholder: '请输入仓库编码'
    },  {
      name: '仓库名称',
      value: 'warehouseName',
      placeholder: '请输入仓库名称'
    }, {
      name: '排序',
      value: 'seq',
      type: 'number',
      placeholder: '排序'
    }, {
      name: '备注',
      value: 'remark',
      placeholder: '请输入备注',
      type: 'textarea',
      autosize: {
        minRows: 2,
        maxRows: 2
      },
      sm: 16
    }
  ],
  FORM_DATA: {
    agencyId: null,
    warehouseCode: null,
    warehouseName: null,
    seq: null,
    remark: null
  },
  FORM_OPTIONS: {
  },
  rules: {
    warehouseCode: [{
      required: true, message: '请输入仓库编码', trigger: ['blur', 'change']
    }],
    warehouseName: [{
      required: true, message: '请输入仓库名称', trigger: ['blur', 'change']
    }],
    consumableType: [{
      required: true, message: '请选择物料分类', trigger: 'change'
    }]
  }
}

export const STOCKIN = {
  REGIONS: {
    north: {},
    middle: {
      style: {
        flex: 1
      }
    },
    center: {}
  },
  FORM_INFO: [
    {
      name: '入库单号',
      value: 'stockinCode',
      placeholder: '入库单号由系统自动生成',
      disabled: true
    },  {
      name: '单据日期',
      value: 'createTime',
      placeholder: '单据日期以操作日期为准',
      disabled: true
    }, {
      name: '单据状态',
      value: 'stockinStatusExplain',
      placeholder: '系统匹配不可修改',
      disabled: true
    }, {
      name: '入库仓库',
      value: 'warehouseId',
      placeholder: '请选择入库仓库',
      type: 'select'
    },  {
      name: '经办人',
      value: 'createUserName',
      placeholder: '经办人由系统自动生成',
      disabled: true
    }, {
      name: '入库日期',
      value: 'stockinTime',
      placeholder: '请选择入库日期',
      type: 'date'
    }, {
      name: '备注',
      value: 'remark',
      placeholder: '请输入备注',
      type: 'textarea',
      autosize: {
        minRows: 2,
        maxRows: 2
      },
      sm: 16
    }, {
      name: '金额合计',
      value: 'amount',
      placeholder: '0.00',
      type: 'number',
      disabled: true
    }
  ],
  FORM_DATA: {
    agencyId: null,
    amount: null,
    createTime: null,
    createUser: null,
    inventoryDtoList: [],
    remark: null,
    stockinCode: null,
    stockinStatus: null,
    stockinTime: null,
    updateTime: null,
    updateUser: null,
    warehouseId: null
  },
  FORM_OPTIONS: {
    stockinTime: {
      disabledDate(time) {
        return time.getTime() > Date.now()
      }
    }
  },
  RULES: {
    warehouseId: [{
      required: true, message: '请选择入库仓库', trigger: 'change'
    }],
    stockinTime: [{
      required: true, message: '请选择入库时间', trigger: ['change', 'blur']
    }]
  }
}

export const STOCKOUT = {
  REGIONS: {
    north: {},
    middle: {
      style: {
        flex: 1
      }
    },
    center: {}
  },
  FORM_INFO: [
    {
      name: '出库单号',
      value: 'stockoutCode',
      placeholder: '出库单号由系统自动生成',
      disabled: true
    },  {
      name: '单据日期',
      value: 'createTime',
      placeholder: '单据日期以操作日期为准',
      disabled: true
    }, {
      name: '单据状态',
      value: 'stockoutStatus',
      placeholder: '系统匹配不可修改',
      disabled: true
    }, {
      name: '领用部门',
      value: 'department',
      type: 'treeselect',
      placeholder: '请选择领用部门'
    }, {
      name: '领用人',
      value: 'userid',
      placeholder: '请选择领用人',
      type: 'select'
    }, {
      name: '经办人',
      value: 'createUserName',
      placeholder: '经办人由系统自动生成',
      disabled: true
    }, {
      name: '仓库',
      value: 'warehouseId',
      placeholder: '请选择出库仓库',
      type: 'select'
    }, {
      name: '出库日期',
      value: 'stockoutTime',
      placeholder: '请选择出库日期',
      type: 'date'
    }, {
      name: '备注',
      value: 'remark',
      placeholder: '请输入备注',
      type: 'textarea',
      autosize: {
        minRows: 2,
        maxRows: 2
      },
      sm: 24
    }
  ],
  FORM_DATA: {
    agencyId: null,
    company: null,
    createTime: null,
    createTimeStr: null,
    createUser: null,
    createUserName: null,
    department: null,
    remark: null,
    stockoutCode: null,
    stockoutStatus: null,
    stockoutStatusExplain: null,
    stockoutTime: null,
    stockoutTimeStr: null,
    updateTime: null,
    updateUser: null,
    usedDtoList: [],
    userid: null,
    warehouseId: null,
    warehouseName: null
},
  FORM_OPTIONS: {
    stockoutTime: {
      disabledDate(time) {
        return time.getTime() > Date.now()
      }
    }
  },
  RULES: {
    warehouseId: [{
      required: true, message: '请选择入库仓库', trigger: 'change'
    }],
    stockoutTime: [{
      required: true, message: '请选择出库日期', trigger: 'change'
    }]
  }
}

export const INVENTORY = {
  REGIONS: {
    north: {},
    middle: {
      style: {
        flex: 1
      }
    },
    center: {}
  }
}
export const USED = {
  REGIONS: {
    north: {},
    middle: {
      style: {
        flex: 1
      }
    },
    center: {}
  }
}