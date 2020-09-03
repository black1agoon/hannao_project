export const LOADING = {
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
      name: '仓库存放情况',
      value: 'capacity',
      type: 'select'
    }, {
      name: '行位置',
      value: 'lineNumber',
      type: 'number'
    }, {
      name: '列位置',
      value: 'columnNumber',
      type: 'number'
    }, {
      name: '物料',
      value: 'goodsId',
      type: 'select'
    }, {
      name: '库位的位置',
      value: 'location'
    }, {
      name: '小车编号',
      value: 'vehicleNo'
    }, {
      name: '小车停放状态',
      value: 'status',
      type: 'select'
    }, {
      name: '排序',
      value: 'seq'
    }
  ],
  RULES: {
    name: [{
      required: true, message: '请入编号', trigger: ['blur', 'change']
    }]
  },
  FORM_DATA: {
    name: null,      // 编号
    position: null,   // 站点号
    capacity: 0,    // 仓库存放情况
    lineNumber: null, // 行位置
    columnNumber: null,   // 列位置
    goodsId: null,    // 物料
    location: null,   // 库位的位置
    status: 0,        // 仓库小车停放状态
    vehicleNo: null,  // 小车编号
    seq: 10
  },
  FORM_OPTIONS: {
    goodsId: [],
    capacity: [
      {
        label: '空的',
        value: 0
      }, {
        label: '满的',
        value: 1
      }
    ],
    status: [
      {
        label: '闲置',
        value: 0
      }, {
        label: '占用',
        value: 1
      }
    ]
  },
  SEARCH_OPTIONS: {
    width: 500,
    fieldSearch: {
      name: {
        placeholder: '编号',
        sm: 8
      },
      vehicleNo: {
        placeholder: '小车编号',
        sm: 8
      },
      position: {
        placeholder: '站点号',
        sm: 8
      },
      lineNumber: {
        placeholder: '行位置',
        sm: 8
      },
      columnNumber: {
        placeholder: '列位置',
        sm: 8
      },
      location: {
        placeholder: '仓库位置',
        sm: 8
      }
    },
    conditionSearch: {
      capacity: {
        placeholder: '仓库存放情况',
        type: 'select',
        options: [
          {
            label: '空的',
            value: 0
          }, {
            label: '满的',
            value: 1
          }
        ],
        sm: 8
      },
      status: {
        placeholder: '小车停放状态',
        type: 'select',
        options: [
          {
            label: '闲置',
            value: 0
          }, {
            label: '占用',
            value: 1
          }
        ],
        sm: 8
      },
      goodsId: {
        placeholder: '物料',
        type: 'select',
        options: [],
        sm: 8
      }
    }
  }
}

export const UNLOADING = {
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
      name: '仓库存放情况',
      value: 'capacity',
      type: 'select'
    }, {
      name: '行位置',
      value: 'lineNumber',
      type: 'number'
    }, {
      name: '列位置',
      value: 'columnNumber',
      type: 'number'
    }, {
      name: '库位的位置',
      value: 'location'
    }, {
      name: '小车编号',
      value: 'vehicleNo'
    }, {
      name: '小车停放状态',
      value: 'status',
      type: 'select'
    }, {
      name: '排序',
      value: 'seq'
    }
  ],
  RULES: {
    name: [{
      required: true, message: '请入编号', trigger: ['blur', 'change']
    }]
  },
  FORM_DATA: {
    name: null,      // 编号
    position: null,   // 站点号
    capacity: 0,    // 仓库存放情况
    lineNumber: null, // 行位置
    columnNumber: null,   // 列位置
    location: null,   // 库位的位置
    status: 0,        // 仓库小车停放状态
    vehicleNo: null,  // 小车编号
    seq: 10
  },
  FORM_OPTIONS: {
    capacity: [
      {
        label: '空的',
        value: 0
      }, {
        label: '满的',
        value: 1
      }
    ],
    status: [
      {
        label: '闲置',
        value: 0
      }, {
        label: '占用',
        value: 1
      }
    ]
  },
  SEARCH_OPTIONS: {
    width: 500,
    fieldSearch: {
      name: {
        placeholder: '编号',
        sm: 8
      },
      vehicleNo: {
        placeholder: '小车编号',
        sm: 8
      },
      position: {
        placeholder: '站点号',
        sm: 8
      },
      lineNumber: {
        placeholder: '行位置',
        sm: 8
      },
      columnNumber: {
        placeholder: '列位置',
        sm: 8
      },
      location: {
        placeholder: '仓库位置',
        sm: 8
      }
    },
    conditionSearch: {
      capacity: {
        placeholder: '仓库存放情况',
        type: 'select',
        options: [
          {
            label: '空的',
            value: 0
          }, {
            label: '满的',
            value: 1
          }
        ],
        sm: 8
      },
      status: {
        placeholder: '小车停放状态',
        type: 'select',
        options: [
          {
            label: '闲置',
            value: 0
          }, {
            label: '占用',
            value: 1
          }
        ],
        sm: 8
      }
    }
  }
}