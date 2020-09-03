export const GOODS = {
  REGIONS: {
    north: {},
    south: {}
  },
  FORM_INFO: [
    {
      name: '名称',
      value: 'name'
    }, {
      name: '颜色',
      value: 'color'
    }, {
      name: '材料',
      value: 'material'
    }, {
      name: '排序',
      value: 'seq'
    }
  ],
  RULES: {
    name: [{
      required: true, message: '请入名称', trigger: ['blur', 'change']
    }]
  },
  FORM_DATA: {
    name: null,
    color: null,
    material: null,
    seq: 10
  },
  FORM_OPTIONS: {},
  SEARCH_OPTIONS: {
    width: 500,
    fieldSearch: {
      name: {
        placeholder: '名称',
        sm: 12
      },
      // material: {
      //   placeholder: '材料',
      //   sm: 8
      // },
      color: {
        placeholder: '颜色',
        sm: 12
      }
    },
    conditionSearch: {}
  }
}