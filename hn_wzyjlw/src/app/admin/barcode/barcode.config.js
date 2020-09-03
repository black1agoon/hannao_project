export const BARCODE = {
  REGIONS: {
    north: {},
    center: {}
  },
  FORM_INFO: [
    {
      name: '条码名称',
      value: 'barCode'
    }
  ],
  RULES: {
    barCode: [{
      required: true, message: '请输入条码名称', trigger: ['blur', 'change']
    }]
  },
  FORM_DATA: {
    barCode: null
  },
  FORM_OPTIONS: {},
  SEARCH_INFO: [{
    label: '条码名称',
    value: 'barCode'
  }, {
    label: '导入批号',
    value: 'batch'
  }],
  SEARCH_DATA: {
    batch: null,
    barCode: null
  },
  SEARCH_OPTIONS: {}
}

export const BATCHDETAILS = {
  SEARCH_INFO: [{
    label: '导入批号',
    value: 'batch'
  }],
  SEARCH_DATA: {
    batch: null
  },
  SEARCH_OPTIONS: {}
}
