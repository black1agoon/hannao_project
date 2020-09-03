export const HOME = {
  REGIONS: {
    north: {
      style: {
        height: 40,
        border: true
      }
    },
    middle: {
      style: {
        height: 160
      },
      center: {}
    },
    south: {
      style: {
        flex: 1
      }
    }
  },
  FORM_INFO: [
    {
      title: '基本信息',
      open: true,
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
      open: true,
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
      open: true,
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
      open: true,
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