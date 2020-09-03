export const FLOOR = {
  REGIONS: {
    north: {
      style: {
        height: 40,
        border: true
      }
    },
    middle: {
      center: {
        style: {
          flex: 1
        }
      }
    },
    south: {
      style: {
        flex: 1
      }
    }
  },
  FORM_INFO: [{
    name: '楼层名称',
    value: 'name'
  }, {
    name: '楼层编号',
    value: 'floorNumber',
    type: 'number'
  }, {
    name: '楼层图片',
    value: 'picture'
  }],
  FORM_DATA: {
    floorNumber: null,  //
    picture: null, //
    name: null   //
  },
  FORM_OPTIONS: {
  },
  RULES: {
    name: [{
      required: true, message: '请输入楼层名称', trigger: ['change', 'blur']
    }]
  }
}

export const SETNUM = {
  FORM_INFO: [{
    name: '表名:',
    value: 'name'
  }, {
    name: '序号:',
    value: 'number',
    type: 'number'
  }],
  FORM_DATA: {
    number: null,  //
    floorNumber: null, //
    name: null,   //
    type: null,
    tableId: null
  },
  FORM_OPTIONS: {
  },
  RULES: {
    number: [{
      required: true, message: '请输入序号', trigger: ['change', 'blur']
    }]
  }
}