export const POINT = {
  REGIONS: {
    north: {},
    south: {}
  },
  FORM_INFO: [
    {
      name: '编号',
      value: 'name'
    }, {
      name: '站点号',
      value: 'position'
    }, {
      name: '呼叫点',
      value: 'callSite',
      type: 'number'
    }, {
      name: '行位置',
      value: 'lineNumber',
      type: 'number'
    }, {
      name: '列位置',
      value: 'columnNumber',
      type: 'number'
    }, {
      name: '排序',
      value: 'seq'
    }
  ],
  RULES: {
    name: [{
      required: true, message: '请入编号', trigger: ['blur', 'change']
    }],
    position: [{
      required: true, message: '请入站点号', trigger: ['blur', 'change']
    }],
    callSite: [{
      required: true, message: '请入呼叫点', trigger: ['blur', 'change']
    }],
    lineNumber: [{
      required: true, message: '请入行位置', trigger: ['blur', 'change']
    }],
    columnNumber: [{
      required: true, message: '请入列位置', trigger: ['blur', 'change']
    }]
  },
  FORM_DATA: {
    name: null,       // 编号
    position: null,   // 站点号
    callSite: null, // 呼叫点
    lineNumber: null, // 行位置
    columnNumber: null, // 列位置
    capacity: null,  // 先不用
    seq: 10,          // 排序
    status: null      // 先不用
  },
  FORM_OPTIONS: {},
  SEARCH_OPTIONS: {
    width: 500,
    fieldSearch: {
      name: {
        placeholder: '编号',
        sm: 8
      },
      position: {
        placeholder: '站点号',
        sm: 8
      },
      callSite: {
        placeholder: '呼叫点',
        sm: 8
      },
      lineNumber: {
        placeholder: '行位置',
        sm: 8
      },
      columnNumber: {
        placeholder: '列位置',
        sm: 8
      }
    },
    conditionSearch: {
    }
  }
}