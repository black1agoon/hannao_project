export const DASHBOARD = {
  REGIONS: {
    north: {},
    center: {}
  },
  FORM_INFO: [
    {
      name: '名称',
      value: 'name'
    }, {
      name: '路径',
      value: 'template'
    }, {
      name: '排序',
      value: 'seq',
      type: 'number'
    }, {
      name: '是否默认',
      value: 'isDefault',
      type: 'ratio'
    }
  ],
  FORM_DATA: {
    name: null,
    template: null,
    seq: null,
    isDefault: 0
  },
  FORM_OPTIONS: {
    isDefault: [{
      label: '不默认',
      value: 0
    }, {
      label: '默认',
      value: 1
    }]
  },
  RULES: {
    name: [{
      required: true, message: '请输入名称', trigger: ['blur', 'change']
    }],
    template: [{
      required: true, message: '请输入路径', trigger: ['blur', 'change']
    }]
  }
}
export const APPVERSION = {
  REGIONS: {
    north: {},
    center: {}
  },
  FORM_INFO: [
    {
      name: '文件',
      value: 'file'
    }, {
      name: '是否强制下载',
      value: 'forceInstall',
      type: 'ratio'
    }, {
      name: '更新日志',
      value: 'updatelog',
      type: 'textarea',
      autosize: {
        minRows: 6,
        maxRows: 6
      }
    }
  ],
  FORM_DATA: {
    filename: null,
    file: null,
    forceInstall: 1,
    updatelog: null
  },
  FORM_OPTIONS: {
    forceInstall: [{
      label: '否',
      value: 0
    }, {
      label: '是',
      value: 1
    }]
  },
  RULES: {
  }
}
