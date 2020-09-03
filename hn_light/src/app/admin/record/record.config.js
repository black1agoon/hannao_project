export const PILE = {
  REGIONS: {
    middle: {
      style: {
        flex: 1
      },
      center: {
        style: {
          flex: 1
        }
      }
    }
  }
}

export const CHARGE = {
  REGIONS: {
    north: {},
    middle: {
      style: {
        flex: 1
      },
      center: {
        style: {
          flex: 1
        }
      }
    }
  }
}

export const MONITOR = {
  REGIONS: {
    north: {},
    middle: {
      style: {
        flex: 1
      },
      center: {
        style: {
          flex: 1
        }
      }
    }
  }
}

export const EQUIP = {
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
    name: '设备名称',
    value: 'name'
  }, {
    name: '条码',
    value: 'barCode'
  }],
  FORM_DATA: {
    name: null,
    barCode: null
  },
  FORM_OPTIONS: {

  },
  RULES: {
    name: [{
      required: true, message: '请输入设备名称', trigger: ['change', 'blur']
    }],
    barCode: [{
      required: true, message: '请输入设备条码', trigger: ['change', 'blur']
    }]
  }
}