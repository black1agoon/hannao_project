export const EQUIP = {
  REGIONS: {
    north: {},
    center: {}
  },
  FORM_INFO: [
    {
      name: '设备名称',
      value: 'name'
    }, {
      name: '所属企业',
      value: 'companyName',
      readonly: true,
      suffixIcon: 'fa fa-search'
    }, {
      name: '资产条码',
      value: 'barCode'
    }, {
      name: '设备条码',
      value: 'equipmentCode'
    }, {
      name: '产品编码',
      value: 'productCode'
    }, {
      name: '安装时间',
      value: 'installedTime',
      type: 'date'
    }, {
      name: '设备分类',
      value: 'categoryIdName',
      readonly: true,
      suffixIcon: 'fa fa-search'
    }, {
      name: '保管人姓名',
      value: 'keeper'
    }, {
      name: '保管人电话',
      value: 'keeperMobile',
      type: 'number'
    }, {
      name: '运维人员',
      value: 'maintUser'
    }, {
      name: '经度',
      value: 'lon',
      type: 'number'
    }, {
      name: '纬度',
      value: 'lat',
      type: 'number'
    }, {
      name: '地理位置',
      value: 'location'
    }, {
      name: '设备型号',
      value: 'model'
    }, {
      name: '保养周期(月)',
      value: 'maintPeriod',
      type: 'number'
    }, {
      name: '下次检查时间',
      value: 'nextCheckTime',
      type: 'date'
    }, {
      name: '采购时间',
      value: 'purchaseTime',
      type: 'date'
    }, {
      name: '保质开始时间',
      value: 'warrenty',
      type: 'date'
    }, {
      name: '保质期时间(月)',
      value: 'warrentyExpired',
      type: 'number'
    }, {
      name: '生产商',
      value: 'producer'
    }, {
      name: '备注 ',
      value: 'memo',
      type: 'textarea',
      sm: 24,
      autosize: {
        minRows: 4,
        maxRows: 4
      }
    }
  ],
  RULES: {
    name: [{
      required: true, message: '请输入设备名称', trigger: ['blur', 'change']
    }],
    companyName: [{
      required: true, message: '请选择所属企业', trigger: 'change'
    }],
    categoryName: [{
      required: true, message: '请选择产品分类', trigger: 'change'
    }],
    barCode: [{
      required: true, message: '请输入资产条码', trigger: ['blur', 'change']
    }]
  },
  FORM_DATA: {
    name: null,
    companyId: null,
    companyName: null,
    categoryIdName: null,
    categoryId: null,
    barCode: null,
    equipmentCode: null,
    productCode: null,
    installedTime: null,
    keeper: null,
    keeperMobile: null,
    lat: null,
    lon: null,
    location: null,
    maintPeriod: null,
    maintUser: null,
    model: null,
    nextCheckTime: null,
    producer: null,
    purchaseTime: null,
    warrenty: null,
    warrentyExpired: null,
    memo: null
  },
  SEARCH_OPTIONS: {
    width: 500,
    fieldSearch: {
      name: {
        placeholder: '设备名称',
        sm: 8
      },
      barCode: {
        placeholder: '资产条码',
        sm: 8
      },
      equipmentCode: {
        placeholder: '设备条码',
        sm: 8
      }
    },
    conditionSearch: {
      companyName: {
        placeholder: '所属企业',
        id: 'companyId', // 为了重置清空的时候 用到的参数
        sm: 8,
        appendicon: 'fa fa-search',
        clearable: true,
        readonly: true
      }
    }
  }
}

export const CATEGORY = {
  REGIONS: {
    north: {},
    center: {}
  },
  FORM_INFO: [
    {
      name: '分类名称',
      value: 'name'
    }, {
      name: '显示状态',
      value: 'isShow',
      type: 'radio'
    }, {
      name: '排序',
      value: 'seq',
      type: 'number'
    }, {
      name: '分类描述:',
      value: 'catDesc',
      type: 'textarea',
      autosize: {
        minRows: 3,
        maxRows: 5
      }
    }
  ],
  FORM_DATA: {
    name: null,
    isShow: 1,
    seq: 10,
    catDesc: null
  },
  RULES: {
    name: [{
      required: true, message: '请输入品牌名称', trigger: ['blur', 'change']
    }],
    seq: [{
      required: true, message: '请输入排序', trigger: ['blur', 'change']
    }]
  },
  FORM_OPTIONS: {
    isShow: [{
      label: '隐藏',
      value: 0
    }, {
      label: '显示',
      value: 1
    }]
  },
  SEARCH_OPTIONS: {
    width: 250,
    fieldSearch: {
      name: {
        placeholder: '分类名称',
        sm: 24
      }
    },
    conditionSearch: {
    }
  }
}

export const ATTR = {
  REGIONS: {
    north: {
      style: {
        height: '30px'
      }
    },
    center: {}
  },
  FORM_INFO: [
    {
      name: '属性名称',
      value: 'name'
    }, {
      name: '排序',
      value: 'seq',
      type: 'number'
    }, {
      name: 'keyName',
      value: 'keyName'
    }, {
      name: '类型:',
      value: 'type',
      type: 'radio'
    }, {
      name: '分类名称',
      value: 'options',
      type: 'textarea',
      autosize: {
        minRows: 5,
        maxRows: 5
      },
      placeholder: '一行代表一个可选值',
      disabled: true
    }
  ],
  FORM_DATA: {
    name: null,
    seq: 10,
    type: null,
    options: null,
    keyName: null
  },
  FORM_OPTIONS: {
    type: [{
      value: 1,
      label: '手工录入'
    }, {
      value: 2,
      label: '列表选择'
    }]
  },
  RULES: {
    name: [{
      required: true, message: '请输入品牌名称', trigger: ['blur', 'change']
    }],
    type: [{
      required: true, message: '请选择类型', trigger: ['blur', 'change']
    }]
  }
}
