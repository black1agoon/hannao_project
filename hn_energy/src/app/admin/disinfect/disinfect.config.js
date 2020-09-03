export const DISINFECT = {
  regions: {
    north: {},
    middle: {
      center: {}
    },
    south: {
      style: {
        height: 350
      }
    }
  },
  form_info: [{
    name: '任务类型:',
    value: 'taskType',
    type: 'radio'
  }, {
    name: '开始消毒时间:',
    value: 'tasktime'
  }, {
    name: '持续消毒时间(分钟):',
    value: 'duration',
    type: 'radio'
  }],
  form_data: {
    cyclePeriod: 0, // 循环周期
    duration: 10, // 持续时间
    periodPoint: '0', // 周期起始点0,1,2,3
    periodPointList: ['0'],
    startTime: null, // 开始时间
    taskStartTime: null, // 任务开始时间
    taskType: '1', // 任务类型1,单次2,循环
    taskName: null, // 任务名称
    times: 0 // 执行次数
  },
  form_options: {
    taskType: [
      {
        label: '单次',
        value: '1'
      }, {
        label: '循环',
        value: '2'
      }
    ],
    cyclePeriod: [
      {
        label: '每日',
        value: 1
      }, {
        label: '每周',
        value: 7
      }
    ],
    duration: [
      {
        label: '10',
        value: 10
      }, {
        label: '20',
        value: 20
      }, {
        label: '30',
        value: 30
      }, {
        label: '40',
        value: 40
      }
    ],
    periodPoint: [
      {
        label: '星期一',
        value: '1'
      }, {
        label: '星期二',
        value: '2'
      }, {
        label: '星期三',
        value: '3'
      }, {
        label: '星期四',
        value: '4'
      }, {
        label: '星期五',
        value: '5'
      }, {
        label: '星期六',
        value: '6'
      }, {
        label: '星期日',
        value: '7'
      }
    ]
  },
  rules: {},
  search_options: {
    width: 500,
    fieldSearch: {
      taskStartTimeStart: {
        placeholder: '任务开始时间',
        type: 'datetime',
        sm: 12
      },
      taskStartTimeEnd: {
        placeholder: '任务结束时间',
        type: 'datetime',
        sm: 12
      }
    },
    conditionSearch: {
      taskType: {
        placeholder: '任务类型',
        type: 'select',
        options: [
          {
            label: '单次',
            value: '1'
          }, {
            label: '循环',
            value: '2'
          }
        ],
        sm: 12
      }
    }
  }
}

export const EQUIPMENT = {
  WINDOW_NAME: '设备',
  regions: {
    north: {},
    middle: {
      center: {}
    }
  },
  form_info: [{
    name: '设备名称:',
    value: 'equipmentName'
  }, {
    name: '设备类型:',
    value: 'equipmentType',
    type: 'select'
  }, {
    name: '设备编码:',
    value: 'equipmentCode'
  }, {
    name: 'ip地址:',
    value: 'ip'
  }, {
    name: '安装位置:',
    value: 'location',
    type: 'textarea',
    autosize: {
      minRows: 6,
      maxRows: 6
    }
  }],
  form_data: {
    equipmentName: null, // 设备名称
    equipmentType: '1', // 设备类型
    equipmentCode: null, // 设备编码
    ip: null,
    location: null, // 安装位置
  },
  form_options: {
    equipmentType: [
      {
        label: '臭氧检测仪',
        value: '1'
      }, {
        label: '警示灯',
        value: '2'
      }, {
        label: '臭氧发生器',
        value: '3'
      }, {
        label: '广播设备',
        value: '4'
      }, {
        label: '红外对射器',
        value: '5'
      }, {
        label: '显示器',
        value: '6'
      }
    ]
  },
  rules: {
    equipmentName: [{
      required: true, message: '请输入设备名称', trigger: ['blur', 'change']
    }],
    equipmentCode: [{
      required: true, message: '请输入设备编码', trigger: ['blur', 'change']
    }],
    ip: [{
      validator: (rule, value, callback) => {
        if (/^(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|[1-9])(\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)){3}$/.test(value) === false && value) {
          callback(new Error('请输入正确的ip地址'))
        } else {
          callback()
        }
      },
      trigger: ['blur', 'change']
    }]
  },
  search_options: {
    width: 500,
    fieldSearch: {
      equipmentName: {
        placeholder: '设备名称',
        sm: 8
      },
      equipmentCode: {
        placeholder: '设备编码',
        sm: 8
      }
    },
    conditionSearch: {
      equipmentType: {
        placeholder: '设备类型',
        type: 'select',
        options: [
          {
            label: '臭氧检测仪',
            value: '1'
          }, {
            label: '警示灯',
            value: '2'
          }, {
            label: '臭氧发生器',
            value: '3'
          }, {
            label: '广播设备',
            value: '4'
          }, {
            label: '红外对射器',
            value: '5'
          }, {
            label: '显示器',
            value: '6'
          }
        ],
        sm: 8
      }
    }
  }
}
