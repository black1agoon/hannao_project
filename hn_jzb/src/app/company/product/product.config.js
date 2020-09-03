export const BRAND = {
  REGIONS: {
    north: {},
    center: {}
  },
  FORM_INFO: [
    {
      name: 'logo上传:',
      value: 'logo'
    }, {
      name: '品牌名称',
      value: 'name'
    }, {
      name: '品牌地址',
      value: 'url'
    }, {
      name: '排序',
      value: 'seq',
      type: 'number'
    }, {
      name: '备注:',
      value: 'memo',
      type: 'textarea',
      autosize: {
        minRows: 3,
        maxRows: 5
      }
    }
  ],
  RULES: {
    name: [{
      required: true, message: '请输入品牌名称', trigger: ['blur', 'change']
    }],
    seq: [{
      required: true, message: '请输入排序', trigger: ['blur', 'change']
    }],
    url: [{
      validator: (rule, value, callback) => {
        if (!/^((http(s)?:\/\/))[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]$/.test(value) && value !== null && value !== '') {
          callback(new Error('请输入正确格式的网址,例http://www.baidu.com'))
        } else {
          callback()
        }
      },
      trigger: ['blur', 'change']
    }]
  },
  FORM_DATA: {
    name: null,
    logo: null,
    seq: null,
    memo: null,
    status: 0,
    url: null
  },
  SEARCH_OPTIONS: {
    width: 250,
    fieldSearch: {
      name: {
        placeholder: '品牌名称',
        sm: 24
      }
    },
    conditionSearch: {
      status: {
        placeholder: '状态',
        type: 'select',
        options: [{
          label: '审核通过',
          value: 1
        }, {
          label: '待审核',
          value: 0
        }],
        sm: 24
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
      name: '模板',
      value: 'template',
      type: 'select',
      clearable: true
    }, {
      name: '分类描述',
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
    isShow: null,
    seq: null,
    template: null,
    catDesc: null
  },
  RULES: {
    name: [{
      required: true, message: '请输入品牌名称', trigger: ['blur', 'change']
    }],
    status: [{
      required: true, message: '请选择审核状态', trigger: 'change'
    }],
    seq: [{
      required: true, message: '请输入排序', trigger: ['blur', 'change']
    }],
    isShow: [{
      required: true, message: '请选择是否显示', trigger: 'change'
    }]
  },
  SEARCH_INFO: [
    {
      label: '分类名称',
      value: 'name'
    }],
  SEARCH_DATA: {
    name: null,
    status: null,
    idShow: null
  },
  SEARCH_OPTIONS: {
    status: [{
      label: '待审核',
      value: 0
    }, {
      label: '审核通过',
      value: 1
    }, {
      label: '审核不通过',
      value: 2
    }],
    isShow: [{
      label: '显示',
      value: 1
    }, {
      label: '隐藏',
      value: 0
    }]
  },
  SEARCH_FUNS: (val, method, _this) => {
    let funs = {
    }
    funs[val][method].call(this)
  }
}

export const ATTR = {
  REGIONS: {
    north: {
      style: {
        height: 80
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
    seq: null,
    type: null,
    options: null
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

export const PRODUCT = {
  FORM_INFO: {
    form1: [{
      name: '产品名称',
      value: 'name'
    }, {
      name: '产品产地',
      value: 'origin'
    }, {
      name: '价格',
      value: 'price',
      type: 'number',
      unit: '元'
    }, {
      name: '规格',
      value: 'modelNo'
    }, {
      name: '计量单位',
      value: 'unit'
    }, {
      name: '产品品牌',
      value: 'brandName',
      readonly: true,
      suffixIcon: 'fa fa-search'
    }, {
      name: '产品购买链接',
      value: 'buyUrl',
      notic: '鉴真宝中产品跳转到购买页的链接'
    }, {
      name: '产品条码',
      value: 'idNo',
      notic: 'SN'
    }, {
      name: '显示信息',
      value: 'showInfo',
      notic: '手机端商品详情页，代替价格显示的字段。推荐10个字段以下，不然手机端排版会有问题。'
    }, {
      name: '排序',
      value: 'seq',
      type: 'number'
    }, {
      name: '图文详情',
      value: 'memo'
    }],
    form2: [{
      name: '分类名称',
      value: 'catId',
      type: 'select'
    }],
    form3: [{
      name: '上传视频:',
      value: 'videoUrl'
    }, {
      name: '轮播图:',
      value: 'banner',
      notic: '(点击图片，设置主图)'
    }, {
      name: '质检报告:',
      value: 'reports'
    }, {
      name: '产品缩略图:',
      value: 'thumb',
      notic: '点击上传和替换图片'
    }]
  },
  FORM_DATA: {
    name: null,
    origin: null,
    price: null,
    modelNo: null,
    unit: null,
    typeId: null,
    typeList: null,
    brandId: null,
    brandName: null,
    buyUrl: null,
    productNo: null,
    seq: null,
    memo: null,
    catId: null,
    videoUrl: null,
    videoPic: null,
    banner: [],
    thumb: null,
    reports: [],
    productCategoryAttrValueDtoList: [],
    viewtimes: null
  },
  FORM_OPTIONS: {
    typeId: [],
    catId: []
  },
  RULES: {
    rules1: {
      name: [{
        required: true, message: '请输入产品名称', trigger: ['blur', 'change']
      }],
      seq: [{
        required: true, message: '请输入排序', trigger: ['blur', 'change']
      }],
      unit: [{
        required: true, message: '请输入计量单位', trigger: ['blur', 'change']
      }],
      typeId: [{
        required: true, message: '请选择产品类型', trigger: ['blur', 'change']
      }],
      buyUrl: [{
        validator: (rule, value, callback) => {
          if (!/^((http(s)?:\/\/))[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]$/.test(value) && value !== null && value !== '') {
            callback(new Error('请输入正确格式的网址,例http://www.baidu.com'))
          } else {
            callback()
          }
        },
        trigger: ['blur', 'change']
      }],
      memo: [{
        required: true, message: '请输入商品详情', trigger: ['blur', 'change']
      }]
    },
    rules2: {
      catId: [{
        required: true, message: '请选择分类名称', trigger: 'change'
      }]
    },
    rules3: {
      thumb: [{
        required: true, message: '请上传产品缩略图', trigger: 'change'
      }]
    }
  },
  SEARCH_OPTIONS: {
    width: 400,
    fieldSearch: {
      name: {
        placeholder: '产品名称',
        sm: 12
      }
    },
    conditionSearch: {
      status: {
        placeholder: '状态',
        type: 'select',
        options: [{
          label: '上架',
          value: 1
        }, {
          label: '下架',
          value: 0
        }, {
          label: '强制下架',
          value: 99
        }],
        sm: 12
      },
      brandName: {
        placeholder: '产品品牌',
        id: 'brandId', // 为了重置清空的时候 用到的参数
        sm: 12,
        appendicon: 'fa fa-search',
        clearable: true,
        readonly: true
      }
    }
  }
}
