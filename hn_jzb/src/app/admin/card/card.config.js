export const TYPE = {
  REGIONS: {
    north: {},
    center: {}
  },
  FORM_INFO: [
    {
      name: '名称',
      value: 'name'
    }, {
      name: '编码',
      value: 'code'
    }, {
      name: '容量',
      value: 'capacity',
      type: 'number'
    }, {
      name: '是否显示',
      value: 'isShow',
      type: 'radio'
    }, {
      name: '是否可销售',
      value: 'onSale',
      type: 'radio'
    }, {
      name: '描述',
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
    capacity: [{
      required: true, message: '请输入容量', trigger: ['blur', 'change']
    }],
    code: [{
      required: true, message: '请输入编码', trigger: ['blur', 'change']
    }]
  },
  FORM_DATA: {
    name: null,
    capacity: null,
    code: null,
    isShow: 1,
    onSale: 1,
    memo: null
  },
  FORM_OPTIONS: {
    isShow: [{
      value: 0,
      label: '不显示'
    }, {
      value: 1,
      label: '显示'
    }],
    onSale: [{
      value: 0,
      label: '不可销售'
    }, {
      value: 1,
      label: '可销售'
    }]
  },
  SEARCH_OPTIONS: {
    width: 500,
    fieldSearch: {
      idNo: {
        placeholder: '标签编号',
        sm: 8
      },
      batchId: {
        placeholder: '导入批号',
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

export const BATCHDETAILS = {
  SEARCH_INFO: [
    {
      label: '导入批号',
      value: 'batchId'
    }, {
      label: '所属企业',
      value: 'companyName',
      appendicon: 'fa fa-search',
      clearable: true,
      readonly: true
    }],
  SEARCH_DATA: {
    batchId: null,
    companyId: null,
    companyName: null
  },
  SEARCH_OPTIONS: {},
  SEARCH_FUNS: (val, method, _this) => {
    let funs = {
      companyName: {
        open: () => {
          _this.$emit('openCompanyChose')
        },
        clear: () => {
        }
      }
    }
    funs[val][method].call(this)
  }
}
