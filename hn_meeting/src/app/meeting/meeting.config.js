export const CALENDAR = {
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
      center: {},
      east: {
        style: {
          width: 240
        }
      }
    }
  },
  FORM_INFO: [
    {
      title: '基本信息',
      form: [{
        name: '会议类型',
        value: 'type',
        type: 'select'
      }, {
        name: '会议名称',
        value: 'theme'
      }, {
        name: '发起人',
        value: 'promoterName',
        readonly: true
      }, {
        name: '会议室',
        value: 'roomId'
      }, {
        name: '会议内容',
        value: 'content',
        type: 'textarea',
        placeholder: '',
        autosize: {
          minRows: 2,
          maxRows: 3
        }
      }]
    }, {
      title: '会议时间',
      form: [{
        name: '开始时间',
        value: 'orderStartTime',
        type: 'datetime'
      }, {
        name: '结束时间',
        value: 'orderEndTime',
        type: 'datetime'
      }, {
        name: '提醒方式',
        value: 'remind',
        type: 'select',
        multiple: true
      }]
    }, {
      title: '参会者',
      form: [{
        name: '参会人员',
        value: 'attendeeNames',
        type: 'textarea',
        readonly: true,
        autosize: {
          minRows: 2,
          maxRows: 4
        }
      }, {
        name: '参会客户',
        value: 'customer'
      }]
    }, {
      title: '其他信息',
      form: [{
        name: '相关附件',
        value: 'files'
      }]
    }],
  FORM_DATA: {
    attendeeIds: [], // 参会员工id--
    attendeeNames: null,
    content: null,   // 会议内容--
    customer: null,  // 参会客户--
    files: null,     // 会议文件的路径--
    fileNames: null,
    orderEndTime: null,  // 会议结束时间--
    orderStartTime: null,  // 会议开始时间--
    // promoterId: null,     // 发起人id--
    promoterName: null,   // 发起人姓名--
    remind: null,         // 提醒方式--
    remindValue: null,    // --
    roomId: null,         // 会议室id--
    theme: null,          // 主题--
    type: null,          // 会议类型--
    typeName: null       // 会议类型名称--
  },
  FORM_OPTIONS: {
    type: [{
      label: '部门会议',
      value: '0'
    }, {
      label: '公司会议',
      value: '1'
    }, {
      label: '项目会议',
      value: '2'
    }, {
      label: '其他会议',
      value: '3'
    }],
    remind: [{
      label: '应用内通知',
      value: '0'
    }, {
      label: '短信',
      value: '1'
    }, {
      label: '邮件',
      value: '2'
    }],
    roomId: []
  },
  RULES: {
    type: [{
      required: true, message: '请选择会议类型', trigger: ['change', 'blur']
    }],
    theme: [{
      required: true, message: '请输入会议名称', trigger: ['change', 'blur']
    }],
    promoterName: [{
      required: true, message: '请选择发起人', trigger: ['change', 'blur']
    }],
    roomId: [{
      required: true, message: '请选择会议室', trigger: ['change', 'blur']
    }],
    orderStartTime: [{
      required: true, message: '请选择会议开始时间', trigger: ['change', 'blur']
    }],
    orderEndTime: [{
      required: true, message: '请选择会议结束时间', trigger: ['change', 'blur']
    }]
  }
}

export const MYMEETING = {
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
  SEARCH_OPTIONS: {
    width: 500,
      fieldSearch: {
      theme: {
        placeholder: '会议主题',
        sm: 8
      },
      startDate: {
        placeholder: '开始时间',
        type: 'date',
        sm: 8
      },
      endDate: {
        placeholder: '结束时间',
        type: 'date',
        sm: 8
      }
    },
    conditionSearch: {
      status: {
        placeholder: '会议状态',
          type: 'select',
          options: [{
            label: '未完成',
            value: 0
          }, {
            label: '进行中',
            value: 1
          }, {
            label: '完成',
            value: 2
          }, {
            label: '过期',
            value: 4
          }],
          sm: 8
      }
    }
  }
}

export const EMPMEETING = {
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
  SEARCH_OPTIONS: {
    width: 500,
    fieldSearch: {
      theme: {
        placeholder: '会议主题',
        sm: 8
      },
      startDate: {
        placeholder: '开始时间',
        type: 'date',
        sm: 8
      },
      endDate: {
        placeholder: '结束时间',
        type: 'date',
        sm: 8
      }
    },
    conditionSearch: {
      status: {
        placeholder: '会议状态',
        type: 'select',
        options: [{
          label: '未完成',
          value: 0
        }, {
          label: '进行中',
          value: 1
        }, {
          label: '完成',
          value: 2
        }, {
          label: '过期',
          value: 4
        }],
        sm: 8
      },
      empName: {
        placeholder: '请选择员工',
        id: 'empId', // 为了重置清空的时候 用到的参数
        sm: 8,
        appendicon: 'fa fa-search',
        clearable: true,
        readonly: true
      }
    }
  }
}

export const ROOM = {
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
    name: '会议室名称',
    value: 'name'
  }, {
    name: '可容纳人数',
    value: 'capacity',
    type: 'number'
  }, {
    name: '是否有投影',
    value: 'projection',
    type: 'radio'
  }, {
    name: '设备条码',
    value: 'barCode'
  }],
  FORM_DATA: {
    capacity: null,  // 可容纳人数
    barCode: null, // 会议室门口设备
    name: null,   // 会议室名称
    projection: 0   // 是否有投影
  },
  FORM_OPTIONS: {
    projection: [{
      label: '无',
      value: 0
    }, {
      label: '有',
      value: 1
    }]
  },
  RULES: {
    name: [{
      required: true, message: '请输入会议室名称', trigger: ['change', 'blur']
    }],
    capacity: [{
      required: true, message: '请输入可容纳人数', trigger: ['change', 'blur']
    }],
    barCode: [{
      required: true, message: '请输入会议室设备条码', trigger: ['change', 'blur']
    }]
  }
}

export const PERIOD = {
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
      center: {},
      east: {
        style: {
          width: 240
        }
      }
    }
  },
  FORM_INFO: [
    {
      title: '基本信息',
      form: [{
        name: '会议类型',
        value: 'type',
        type: 'select'
      }, {
        name: '会议名称',
        value: 'theme'
      }, {
        name: '发起人',
        value: 'promoterName'
      }, {
        name: '会议室',
        value: 'roomId',
        type: 'select'
      }, {
        name: '会议内容',
        value: 'content',
        type: 'textarea',
        placeholder: '',
        autosize: {
          minRows: 2,
          maxRows: 3
        }
      }]
    }, {
      title: '会议时间',
      form: [{
        name: '会议模式',
        value: 'meetingPattern',
        type: 'select'
      }, {
        name: '间隔',
        value: 'interval'
      }, {
        name: '会议策略',
        value: 'meetingPolicy',
        type: 'select'
      }, {
        name: '重复开始日期',
        value: 'startDate',
        type: 'date'
      }, {
        name: '重复结束日期',
        value: 'endDate',
        type: 'date'
      }, {
        name: '开始时间',
        value: 'startTime',
        type: 'timepicker'
      }, {
        name: '结束时间',
        value: 'endTime',
        type: 'timepicker'
      }, {
        name: '提醒方式',
        value: 'remind',
        type: 'select',
        multiple: true
      }]
    }, {
      title: '参会者',
      form: [{
        name: '参会人员',
        value: 'attendeeNames',
        type: 'textarea',
        readonly: true,
        autosize: {
          minRows: 2,
          maxRows: 4
        }
      }]
    }, {
      title: '其他信息',
      form: [{
        name: '相关附件',
        value: 'files'
      }]
    }],
  FORM_DATA: {
    attendeeIds: [], // 参会员工id--
    attendeeNames: null,
    content: null,   // 会议内容--
    files: null,     // 会议文件的路径--
    fileNames: null,
    endTime: null,
    endDate: null,
    startTime: null,  // 会议开始时间--
    startDate: null,  // 会议开始时间--
    // promoterId: null,     // 发起人id--
    promoterName: null,   // 发起人姓名--
    remind: null,         // 提醒方式--
    remindValue: null,    // --
    roomId: null,         // 会议室id--
    theme: null,          // 主题--
    type: null,          // 会议类型--
    typeName: null,       // 会议类型名称--
    meetingPattern: '0', // 会议模式
    meetingPolicy: '0', // 会议策略
    interval1: null,
    interval2: null
  },
  FORM_OPTIONS: {
    type: [{
      label: '部门会议',
      value: '0'
    }, {
      label: '公司会议',
      value: '1'
    }, {
      label: '项目会议',
      value: '2'
    }, {
      label: '其他会议',
      value: '3'
    }],
    remind: [{
      label: '应用内通知',
      value: '0'
    }, {
      label: '短信',
      value: '1'
    }, {
      label: '邮件',
      value: '2'
    }],
    roomId: [],
    meetingPattern: [{
      label: '每日重复',
      value: '0'
    }, {
      label: '每周重复',
      value: '1'
    }, {
      label: '每月重复',
      value: '2'
    }],
    meetingPolicy: [{
      label: '非工作日:取消',
      value: '0'
    }, {
      label: '非工作日:推迟到下一工作日',
      value: '1'
    }, {
      label: '非工作日:日期不变',
      value: '2'
    }],
    interval2: [{
      label: '周一',
      value: '1'
    }, {
      label: '周二',
      value: '2'
    }, {
      label: '周三',
      value: '3'
    }, {
      label: '周四',
      value: '4'
    }, {
      label: '周五',
      value: '5'
    }, {
      label: '周六',
      value: '6'
    }, {
      label: '周日',
      value: '7'
    }]
  },
  RULES: {
    type: [{
      required: true, message: '请选择会议类型', trigger: ['change', 'blur']
    }],
    theme: [{
      required: true, message: '请输入会议名称', trigger: ['change', 'blur']
    }],
    // promoterName: [{
    //   required: true, message: '请选择发起人', trigger: ['change', 'blur']
    // }],
    roomId: [{
      required: true, message: '请选择会议室', trigger: ['change', 'blur']
    }],
    startDate: [{
      required: true, message: '请选择重复开始时间', trigger: ['change', 'blur']
    }],
    endDate: [{
      required: true, message: '请选择重复结束时间', trigger: ['change', 'blur']
    }],
    startTime: [{
      required: true, message: '请选择开始时间', trigger: ['change', 'blur']
    }],
    endTime: [{
      required: true, message: '请选择结束时间', trigger: ['change', 'blur']
    }]
  }
}
