export const CONTROLLER = {
  REGIONS: {
    north: {},
    center: {
      style: {
        flex: 1
      }
    },
    south: {
      style: {
        flex: 1
      }
    }
  },
  FORM_INFO: [
    {
      name: '组名',
      value: 'groupName'
    }, {
      name: '车间',
      value: 'workshopName',
      readonly: true,
      suffixIcon: 'fa fa-search'
    }
  ],
  RULES: {
    groupName: [{
      required: true, message: '请输入组名', trigger: ['blur', 'change']
    }],
    workshopName: [{
      required: true, message: '请选择关联车间', trigger: ['blur', 'change']
    }]
  },
  FORM_DATA: {
    groupName: null,
    workshopName: null,
    workshopId: null
  },
  FORM_OPTIONS: {
  },
  SEARCH_INFO: [
    {
      label: '组名',
      value: 'groupName'
    }, {
      label: '关联车间',
      value: 'workshopName',
      appendicon: 'fa fa-search',
      clearable: true,
      readonly: true
    }],
  SEARCH_DATA: {
    groupName: null,
    workshopName: null,
    workshopId: null
  },
  SEARCH_OPTIONS: {
  },
  SEARCH_FUNS: (val, method, _this) => {
    let funs = {
      workshopName: {
        open: () => {
          _this.$emit('openWorkshopChose')
        }
      }
    }
    funs[val][method].call(this)
  }
}

