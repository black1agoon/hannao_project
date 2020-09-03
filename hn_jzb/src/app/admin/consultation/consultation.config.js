export const CATEGORY = {
  REGIONS: {
    north: {},
    center: {}
  },
  FORM_INFO: [
    {
      name: '栏目名称',
      value: 'name'
    }, {
      name: '是否显示',
      value: 'isShow',
      type: 'radio'
    }, {
      name: '排序',
      value: 'seq'
    }, {
      name: '描述 ',
      value: 'catDesc',
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
      required: true, message: '请输入栏目名称', trigger: ['blur', 'change']
    }]
  },
  FORM_DATA: {
    name: null,
    seq: 10,
    isShow: 1,
    catDesc: null
  },
  FORM_OPTIONS: {
    isShow: [
      {
        label: '是',
        value: 1
      }, {
        label: '否',
        value: 0
      }
    ]
  }
}

export const NEWS = {
  REGIONS: {
    north: {},
    center: {}
  },
  FORM_INFO: [
    {
      name: '资讯名称',
      value: 'title'
    }, {
      name: '缩略图',
      value: 'thumb'
    }, {
      name: '摘要',
      value: 'description',
      type: 'textarea',
      sm: 24,
      autosize: {
        minRows: 4,
        maxRows: 4
      }
    }, {
      name: '所属栏目',
      value: 'categoryId',
      type: 'select'
    }, {
      name: '状态',
      value: 'status',
      type: 'select'
    }, {
      name: '排序',
      value: 'seq'
    }, {
      name: '内容 ',
      value: 'contents'
    }
  ],
  RULES: {
    title: [{
      required: true, message: '请输入资讯标题', trigger: ['blur', 'change']
    }],
    categoryId: [{
      required: true, message: '请选择所属栏目', trigger: ['blur', 'change']
    }],
    description: [{
      required: true, message: '请输入摘要', trigger: ['blur', 'change']
    }],
    contents: [{
      required: true, message: '请输入内容', trigger: ['blur', 'change']
    }]
  },
  FORM_DATA: {
    title: null,
    description: null,
    seq: 10,
    thumb: null,
    categoryId: null,
    contents: null
  },
  FORM_OPTIONS: {
    categoryId: [],
    status: [
      {
        label: '草稿',
        value: 0
      }, {
        label: '正式发布',
        value: 1
      }
    ]
  }
}

