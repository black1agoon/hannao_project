export const POSITION = {
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
      name: '位置名称',
      value: 'positionName',
      placeholder: '请输入位置名称'
    }, {
      name: '备注',
      value: 'remark',
      type: 'textarea',
      placeholder: '请填写备注信息',
      autosize: {
        minRows: 4,
        maxRows: 4
      }
    }
  ],
  FORM_DATA: {
    positionName: null,
    remark: null
  },
  rules: {
    positionName: [{
      required: true, message: '请输入位置名称', trigger: ['blur', 'change']
    }]
  }
}

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
      name: '使用年限',
      value: 'usetime',
      placeholder: '请填写使用年限(月)',
      unit: '月',
      type: 'number'
    }, {
      name: '预计净残值',
      value: 'netSalvage',
      placeholder: '请填预计净残值',
      type: 'number'
    }, {
      name: '品牌',
      value: 'brand',
      placeholder: '请填写品牌'
    }, {
      name: '型号',
      value: 'model',
      placeholder: '请填写型号'
    }, {
      name: '价格',
      value: 'amount',
      placeholder: '请填写价格'
    }, {
      name: '计量单位',
      value: 'unit',
      placeholder: '请填写计量单位(例:台)'
    }
  ],
  FORM_DATA: {
    typeCode: null,
    typename: null,
    parentId: null,
    usetime: null,
    unit: null,
    netSalvage: null,
    totalWorkload: null,
    brand: null,
    model: null,
    amount: null
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
    }]
  }
}

export const LOG = {
  REGIONS: {
    // north: {},
    middle: {
      style: {
        flex: 1
      }
    },
    center: {}
  }
}

