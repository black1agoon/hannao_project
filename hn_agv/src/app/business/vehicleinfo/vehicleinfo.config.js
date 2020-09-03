export const VEHICLE = {
  REGIONS: {
    north: {},
    middle: {
      center: {
      }
    }
  },
  FORM_INFO: [
    {
      name: '车辆编号',
      value: 'vehicleNo'
    }, {
      name: '别名',
      value: 'name'
    }, {
      name: '上次维护时间',
      value: 'lastMaintenance',
      type: 'datetime'
    }, {
      name: '上次充电时间',
      value: 'lastRechargeTime',
      type: 'datetime'
    }
  ],
  RULES: {
    vehicleNo : [{
      required: true, message: '请输入车辆编号', trigger: ['blur', 'change']
    }]
  },
  FORM_DATA: {
    name: null,
    vehicleNo: null,
    lastMaintenance: null,
    lastRechargeTime: null
  },
  FORM_OPTIONS: {}
}

