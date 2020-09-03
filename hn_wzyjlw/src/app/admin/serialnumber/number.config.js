export const NUMBER = {
  REGIONS: {
    north: {},
    center: {}
  },
  FORM_INFO: [
    {
      name: '编码',
      value: 'code'
    }, {
      name: '前缀',
      value: 'prefix'
    }, {
      name: '名称',
      value: 'name'
    }, {
      name: '当前数值',
      value: 'serialCurrentNum',
      type: 'number'
    }, {
      name: '序列号位数',
      value: 'serialNumFormat',
      type: 'number'
    }, {
      name: '重置类型',
      value: 'resetType',
      type: 'select'
    }, {
      name: '日期格式',
      value: 'dateFormat',
      type: 'select'
    }, {
      name: '启用公司识别码',
      value: 'compIdentifyFlag',
      type: 'ratio'
    }, {
      name: '公司识别码',
      value: 'compIdentifyCode'
    }
  ],
  RULES: {
    code: [{
      required: true, message: '请输入编码', trigger: ['blur', 'change']
    }],
    prefix: [{
      required: true, message: '请输入前缀', trigger: ['blur', 'change']
    }],
    name: [{
      required: true, message: '请输入名称', trigger: ['blur', 'change']
    }],
    serialCurrentNum: [{
      required: true, message: '请输入当前数值', trigger: ['blur', 'change']
    }],
    serialNumFormat: [{
      required: true, message: '请输入序列号位数', trigger: ['blur', 'change']
    }],
    resetType: [{
      required: true, message: '请选择重置类型', trigger: ['blur', 'change']
    }]
  },
  FORM_DATA: {
    code: null,         // 编码
    prefix: null,       // 前缀
    name: null,         // 名称
    serialCurrentNum: 0,  // 当前数值
    serialNumFormat: null,  // 序列号位数
    resetType: null,     // 重置类型 1按日, 2按月， 3按年
    dateFormat: null,  // 日期格式
    compIdentifyFlag: 1, // 公司识别码 0 禁用 1 启用
    compIdentifyCode: null, // 公司识别码
    suffixFlag: 0,   // 是否启用后缀 0 禁用 1 启用
    suffix: null,   // 后缀
    suffixType: null  // 后缀类型
  },
  FORM_OPTIONS: {
    resetType: [{
      label: '按日',
      value: 1
    }, {
      label: '按月',
      value: 2
    }, {
      label: '按年',
      value: 3
    }],
    compIdentifyFlag: [{
      label: '禁用',
      value: 0
    }, {
      label: '启用',
      value: 1
    }],
    suffixFlag: [{
      label: '禁用',
      value: 0
    }, {
      label: '启用',
      value: 1
    }],
    dateFormat: [{
      value: 'yy',
      label: 'yy'
    }, {
      value: 'yyyy',
      label: 'yyyy'
    }, {
      value: 'yyMM',
      label: 'yyMM'
    }, {
      value: 'yyyyMM',
      label: 'yyyyMM'
    }, {
      value: 'yyMMdd',
      label: 'yyMMdd'
    }, {
      value: 'yyyyMMdd',
      label: 'yyyyMMdd'
    }]
  }
}
