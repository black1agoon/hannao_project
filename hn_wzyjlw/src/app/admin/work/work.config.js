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
      name: '车间编号',
      value: 'name',
      type: 'number'
    }, {
      name: '所属部门',
      value: 'departmentId',
      type: 'treeselect'
    }, {
      name: '车间主任',
      value: 'directorName',
      readonly: true,
      suffixIcon: 'fa fa-search'
    }, {
      name: '机修主任',
      value: 'maintenanceOfficerName',
      readonly: true,
      suffixIcon: 'fa fa-search'
    }, {
      name: '行 * 列',
      value: 'row_column'
    }
  ],
  RULES: {
    name: [{
      required: true, message: '请输入车间编号', trigger: ['blur', 'change']
    }],
    departmentId: [{
      required: true, message: '请选择部门', trigger: 'change'
    }],
    directorName: [{
      required: true, message: '请选择车间主任', trigger: 'change'
    }],
    maintenanceOfficerName: [{
      required: true, message: '请选择机修主任', trigger: 'change'
    }],
    row_column: []
  },
  FORM_DATA: {
    name: null,
    departmentId: null,
    directorName: null,
    director: null,
    maintenanceOfficerName: null,
    maintenanceOfficer: null,
    lineNumber: null,
    columnNumber: null
  },
  FORM_OPTIONS: {
    departmentId: []
  }
}

export const ORDER = {
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
      name: '订单编号',
      value: 'orderNumber'
    }, {
      name: '所属车间',
      value: 'workshopName',
      readonly: true,
      suffixIcon: 'fa fa-search'
    }, {
      name: '是否缝头',
      value: 'isSameExit',
      type: 'ratio'
    }, {
      name: '计划开始时间',
      value: 'startDate',
      type: 'date'
    }, {
      name: '交货日期',
      value: 'deliveryDate',
      type: 'date'
    }
  ],
  RULES: {
    orderNumber: [{
      required: true, message: '请输入订单编号', trigger: ['blur', 'change']
    }]
    // workshopName: [{
    //   required: true, message: '请选择所属车间', trigger: 'change'
    // }],
    // articleNumber: [{
    //   required: true, message: '请输入款号', trigger: 'change'
    // }],
    // startDate: [{
    //   required: true, message: '请选择预计完成时间', trigger: 'change'
    // }],
    // planDate: [{
    //   required: true, message: '请选择预计完成时间', trigger: 'change'
    // }],
    // deliveryDate: [{
    //   required: true, message: '请选择交货日期', trigger: 'change'
    // }]
  },
  FORM_DATA: {
    orderNumber: null,
    workshopName: null,
    workshopId: null,
    startDate: null,
    deliveryDate: null,
    isSameExit: 0
  },
  FORM_OPTIONS: {
    isSameExit: [{
      label: '缝头',
      value: 0
    }, {
      label: '不缝头',
      value: 1
    }]
  },
  SEARCH_INFO: [
    {
      label: '订单编号',
      value: 'orderNumber'
    }, {
      label: '所属车间',
      value: 'workshopName',
      appendicon: 'fa fa-search',
      clearable: true,
      readonly: true
    }, {
      label: '订单状态',
      value: 'state',
      type: 'select'
    }],
  SEARCH_DATA: {
    orderNumber: null,
    workshopId: null,
    workshopName: null,
    state: null
  },
  SEARCH_OPTIONS: {
    state: [{
      label: '创建',
      value: 0
    }, {
      label: '生成',
      value: 1
    }, {
      label: '完成',
      value: 2
    }, {
      label: '取消',
      value: 3
    }]
  },
  SEARCH_FUNS: (val, method, _this) => {
    let funs = {
      workshopName: {
        open: () => {
          _this.$emit('openWorkshopChose')
        }
      }
    }
    funs[val][method].call(this)
  }
}

export const LIST = {
  DETAIL: {
    TABLE_INFO: [{
      label: '明细编号',
      width: 120,
      value: 'detailNumber',
      uneditable: true
    }, {
      label: '货号',
      width: 100,
      value: 'itemNumber'
    }, {
      label: '款号',
      width: 100,
      value: 'articleNumber'
    }, {
      label: '花型',
      width: 80,
      value: 'pattern'
    }, {
      label: '颜色',
      width: 150,
      value: 'color'
    }, {
      label: '主色',
      width: 80,
      value: 'essentialColour'
    }, {
      label: '尺寸',
      width: 80,
      value: 'size'
    }, {
      label: '单双针',
      width: 80,
      value: 'needleCode'
    }, {
      label: '针数',
      width: 80,
      value: 'needleNumber'
    }, {
      label: '采购数(双)',
      width: 80,
      value: 'shipmentNumber'
    }, {
      label: '计划生产(双)',
      width: 100,
      value: 'prospectusNumber'
    }, {
      label: '已分配(双)',
      minWidth: 100,
      value: 'distributionNumber',
      uneditable: true
    }, {
      label: '已生产(双)',
      width: 100,
      value: 'productionNumber',
      uneditable: true
    }, {
      label: '克重',
      width: 80,
      value: 'gramWeight'
    }, {
      label: '产品类型',
      width: 80,
      value: 'productType'
    }, {
      label: '缝合方式',
      width: 80,
      value: 'stitchingMethod'
    }, {
      label: '测量法',
      width: 80,
      value: 'measurement'
    }, {
      label: '适用袜型',
      width: 80,
      value: 'stockingsCode'
    }],
    FORM_DATA: {
      color: null,
      essentialColour: null,
      measurement: null,
      needle: null,
      needleNumber: 0,
      pattern: null,
      productType: null,
      prospectusNumber: 0,
      shipmentNumber: 0,
      size: null,
      gramWeight: null,
      stitchingMethod: null,
      stockings: null,
      workshopOrderId: null
    }
  },
  MATERIAL: {
    TABLE_INFO: [{
      label: '名称',
      width: 200,
      value: 'name'
    }, {
      label: '用料',
      minWidth: 200,
      value: 'value'
    }],
    FORM_DATA: {
      name: null,
      value: null
    }
  }
}
