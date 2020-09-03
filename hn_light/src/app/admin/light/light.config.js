export const LIGHT = {
  REGIONS: {
    north: {
    },
    middle: {
      center: {}
    }
  },
  FORM_INFO: [{
    name: '路灯名称',
    value: 'name'
  }, {
    name: '条码',
    value: 'code'
  }, {
    name: '关联组',
    value: 'groupId',
    type: 'select'
  }, {
    name: '大灯开关',
    value: 'bigStatus',
    type: 'radio'
  }, {
    name: '大灯亮度',
    value: 'bigIntensity',
    type: 'Number',
    unit: '%'
  }, {
    name: '小灯开关',
    value: 'smallStatus',
    type: 'radio'
  }, {
    name: '小灯亮度',
    value: 'smallIntensity',
    type: 'Number',
    unit: '%'
  }],
  FORM_DATA: {
    name: null,
    code: null,
    groupId: null,
    bigStatus: null,
    bigIntensity: null,
    smallStatus: null,
    smallIntensity: null,
    periodStatus: 0
  },
  FORM_OPTIONS: {
    bigStatus: [{
      label: '开',
      value: '0'
    }, {
      label: '关',
      value: '1'
    }],
    smallStatus: [{
      label: '开',
      value: '0'
    }, {
      label: '关',
      value: '1'
    }],
    groupId: []
  },
  RULES: {
    name: [{
      required: true, message: '请输入路灯名称', trigger: ['change', 'blur']
    }],
    groupId: [{
      required: true, message: '请选择所属组', trigger: ['change', 'blur']
    }],
    code: [{
      required: true, message: '请输入设备条码', trigger: ['change', 'blur']
    }],
    bigIntensity: [{
      validator: (rule, value, callback) => {
        if (Number(value) > 100) {
          callback(new Error('大灯亮度不能大于100%'))
        } else {
          callback()
        }
      }
    }],
    smallIntensity: [{
      validator: (rule, value, callback) => {
        if (Number(value) > 100) {
          callback(new Error('小灯亮度不能大于100%'))
        } else {
          callback()
        }
      }
    }]
  },
  inputOptions: {
    select: [{
      label: '全选',
      value: 1
    }, {
      label: '全不选',
      value: 2
    }, {
      label: '全部大灯',
      value: 3
    }, {
      label: '全部小灯',
      value: 4
    }],
    groupId: [{
      label: '全部',
      value: ''
    }]
  }
}

export const GROUP = {
  REGIONS: {
    north: {
      style: {
        height: 40,
        border: true
      }
    },
    middle: {
      style: {
        flex: 1
      },
      center: {}
    }
  },
  FORM_INFO: [{
    name: '分组名称',
    value: 'name'
  }],
  FORM_DATA: {
    name: null
  },
  FORM_OPTIONS: {

  },
  RULES: {
    name: [{
      required: true, message: '请输入路灯分组名称', trigger: ['change', 'blur']
    }]
  }
}

export const PERIOD = {
  REGIONS: {
    north: {
    },
    middle: {
      center: {}
    }
  }
}

export const MUSIC = {
  REGIONS: {
    north: {
      style: {
        height: 40,
        border: true
      }
    },
    middle: {
      style: {
        flex: 1
      },
      center: {}
    }
  },
  FORM_INFO: [{
    name: '设备名',
    value: 'name'
  }, {
    name: '条码',
    value: 'code'
  }, {
    name: '音量',
    value: 'volume',
    type: 'number',
    unit: '%'
  }, {
    name: '是否播放',
    value: 'musicStatus',
    type: 'radio'
  }],
  FORM_DATA: {
    name: null,
    code: null,
    volume: 0,
    musicStatus: null
  },
  FORM_OPTIONS: {
    musicStatus: [{
      label: '是',
      value: 1
    }, {
      label: '否',
      value: 0
    }]
  },
  RULES: {
    name: [{
      required: true, message: '请输入文件名', trigger: ['change', 'blur']
    }],
    volume: [{
      validator: (rule, value, callback) => {
        if (Number(value) > 100) {
          callback(new Error('音量不能大于100%'))
        } else {
          callback()
        }
      }
    }],
  }
}

export const SONG = {
  REGIONS: {
    north: {
      style: {
        height: 40,
        border: true
      }
    },
    middle: {
      style: {
        flex: 1
      },
      center: {}
    }
  }
}

export const MUSICPERIOD = {
  REGIONS: {
    north: {
      style: {
        height: 40,
        border: true
      }
    },
    middle: {
      style: {
        flex: 1
      },
      west: {
        style: {
          flex: 1,
          border: true,
          padding: 0
        }
      },
      center: {
        style: {
          flex: 1
        }
      }
    }
  }
}

export const MAP = {
  REGIONS: {
    middle: {
      style: {
        flex: 1
      },
      center: {},
      west: {
        style: {
          width: 200
        }
      }
    }
  }
}

export const PERIOD_TYPE = {
  REGIONS: {
    north: {
      style: {
        height: 40,
        border: true
      }
    },
    middle: {
      style: {
        flex: 1
      },
      center: {}
    }
  },
  FORM_INFO: [{
    name: '类型名称',
    value: 'name'
  }],
  FORM_DATA: {
    name: null
  },
  FORM_OPTIONS: {

  },
  RULES: {
    name: [{
      required: true, message: '请输入类型名称', trigger: ['change', 'blur']
    }]
  }
}