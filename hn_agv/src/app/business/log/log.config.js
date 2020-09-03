export const EXCEPTION = {
  REGIONS: {
    north: {},
    south: {}
  },
  SEARCH_OPTIONS: {
    width: 500,
    fieldSearch: {
      exception: {
        placeholder: '异常信息',
        sm: 8
      },
      from: {
        placeholder: '异常来源',
        sm: 8
      },
      createTimeStart: {
        placeholder: '创建时间开始',
        type: 'datetime',
        sm: 8
      },
      createTimeEnd: {
        placeholder: '创建时间结束',
        type: 'datetime',
        sm: 8
      },
      handler: {
        placeholder: '处理器',
        sm: 8
      }
    },
    conditionSearch: {}
  }
}

export const CONNECT = {
  REGIONS: {
    north: {},
    south: {}
  },
  SEARCH_OPTIONS: {
    width: 500,
    fieldSearch: {
      vehicleNo: {
        placeholder: '充电车辆编号',
        sm: 8
      },
      position: {
        placeholder: '车辆接入时的位置',
        sm: 8
      },
      connectTimeStart: {
        placeholder: '接入时间点开始',
        type: 'datetime',
        sm: 8
      },
      connectTimeEnd: {
        placeholder: '接入时间点结束',
        type: 'datetime',
        sm: 8
      },
      batteryStart: {
        placeholder: '接入时的电量(%)',
        type: 'number',
        sm: 8
      },
      batteryEnd: {
        placeholder: '结束时的电量(%)',
        type: 'number',
        sm: 8
      }
    },
    conditionSearch: {}
  }
}
export const RECHARGING = {
  REGIONS: {
    north: {},
    south: {}
  },
  SEARCH_OPTIONS: {
    width: 500,
    fieldSearch: {
      vehicleNo: {
        placeholder: '充电车辆编号',
        sm: 8
      },
      pilePoint: {
        placeholder: '充电桩编号',
        sm: 8
      },
      rechargeTimeStart: {
        placeholder: '充电开始时间',
        type: 'datetime',
        sm: 8
      },
      rechargeTimeEnd: {
        placeholder: '充电结束时间',
        type: 'datetime',
        sm: 8
      },
      rechargingPercentStart: {
        placeholder: '开始时的百分比(%)',
        type: 'number',
        sm: 8
      },
      rechargingPercentEnd: {
        placeholder: '结束时的百分比(%)',
        type: 'number',
        sm: 8
      }
    },
    conditionSearch: {}
  }
}