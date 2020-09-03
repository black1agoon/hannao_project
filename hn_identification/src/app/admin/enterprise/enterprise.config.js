export const ENTERPRISE = {
  REGIONS: {
    north: {},
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
  FORM_INFO: [
    {
      name: '企业名称',
      value: 'name'
    },{
      name: '企业法人',
      value: 'legalPerson'
    },{
      name: '法人代表身份证',
      value: 'legalIdcard'
    },{
      name: '法人代表身份证照片',
      value: 'legalIdcardPic'
    },{
      name: '企业对公银行',
      value: 'bank'
    },{
      name: '企业营业执照照片',
      value: 'businessLicencePic'
    }, {
      name: '所属行业',
      value: 'industryId',
      type: 'select'
    }, {
      name: '企业所属区域',
      value: 'area'
    }, {
      name: '具体地址',
      value: 'address',
      type: 'textarea',
      autosize: {
        minRows: 6,
        maxRows: 6
      }
    },{
      name: '联系人',
      value: 'contacts'
    },{
      name: '联系电话',
      value: 'mobile',
      type: 'number'
    },{
      name: '企业坐标(高德)',
      value: 'coordinate'
    },{
      name: '设备数量',
      value: 'equipment',
      type: 'number'
    },{
      name: '工人数量',
      value: 'worker',
      type: 'number'
    }
  ],
  COMPANY_FORM: [
    {
      title: '企业基本信息',
      forms: [{
        name: '企业中文名',
        value: 'name'
      }, {
        name: '所属行业',
        value: 'industryId',
        type: 'select'
      }, {
        name: '企业注册地址',
        value: 'regAddress'
      }, {
        name: '企业注册地址邮编',
        value: 'regAddressCode'
      }, {
        name: '运营地址',
        value: 'operateAddress'
      }, {
        name: '企业运营地址邮编',
        value: 'operateAddressCode'
      }, {
        name: '联系人姓名',
        value: 'contacts'
      }, {
        name: '企业联系电话',
        value: 'contactNumber'
      }, {
        name: '企业法人',
        value: 'legalPerson'
      }, {
        name: '法人代表',
        value: 'legalRepresentative'
      }, {
        name: '法人代表身份证',
        value: 'legalIdcard'
      }, {
        name: '法人代表身份证照片',
        value: 'legalIdcardPic',
        notic: '点击上传和替换图片'
      }, {
        name: '营业执照号码',
        value: 'businessLicence'
      }, {
        name: '营业执照照片',
        value: 'businessLicencePic',
        notic: '点击上传和替换图片'
      }, {
        name: '合同期限(年)',
        value: 'contractPeriod',
        type: 'number',
        notic: '合同期限, 如1,2年'
      }, {
        name: '员工总数',
        value: 'worker',
        type: 'number'
      }, {
        name: '对公银行',
        value: 'bank'
      }, {
        name: '银行账号',
        value: 'bankAccount'
      }, {
        name: '地址所属区域',
        value: 'area',
      }, {
        name: '具体地址',
        value: 'address',
        type: 'textarea',
        autosize: {
          minRows: 6,
          maxRows: 6
        }
      }, {
        name: '是否为多场地办公',
        value: 'multipleSites',
        type: 'radio'
      }, {
        name: '多场地地址',
        value: 'multipleSitesAddress',
        type: 'textarea',
        autosize: {
          minRows: 4,
          maxRows: 6
        },
        notic: '若非是多场地办公，此项可忽略'
      }]
    }, {
      title: '公司运营者信息',
      forms: [
        {
          name: '公司运营者',
          value: 'operator'
        }, {
          name: '联系电话',
          value: 'mobile',
          type: 'number'
        }, {
          name: '职务',
          value: 'job'
        }, {
          name: '所属部门',
          value: 'department'
        }, {
          name: '电子邮箱',
          value: 'email'
        }
      ]
    }, {
      title: '其他',
      forms: [{
        name: '条码数量',
        value: 'barCodeCount',
        type: 'number'
      }, {
        name: '条码功能',
        value: 'barCodeEnable',
        type: 'radio'
      }, {
        name: '芯片功能',
        value: 'icChipEnable',
        type: 'radio'
      }, {
        name: '采购数量',
        value: 'purchaseQuantity',
        type: 'number'
      }, {
        name: '申请理由',
        value: 'applicationReason',
        type: 'textarea',
        autosize: {
          minRows: 4,
          maxRows: 6
        }
      }, {
        name: '状态',
        value: 'status',
        type: 'select'
      }, {
        name: '隶属关系',
        value: 'subjectionRelation'
      }, {
        name: '隶属组织名称',
        value: 'subjection',
        notic: '如隶属于某个更大的组织(如集团公司、上级机关等)，请说明该组织名称'
      }, {
        name: '工作语言',
        value: 'workingLanguage'
      }, {
        name: '其他照片',
        value: 'otherPic'
      }]
    }
  ],
  COMPANY_INFO: {
    name: null, // 企业中文名
    industryId: null, // 所属行业
    regAddress: null, // 企业注册地址
    regAddressCode: null, // 企业注册地址邮编
    operateAddress: null, // 运营地址
    operateAddressCode: null, // 企业运营地址邮编
    contacts: null, // 联系人姓名
    contactNumber: null, // 联系人电话
    legalPerson: null, // 企业法人
    legalRepresentative: null, // 法人代表
    legalIdcard: null, // 法人代表身份证
    legalIdcardPic: null, // 法人代表身份证照片
    businessLicence: null, // 营业执照号码
    businessLicencePic: null, // 营业执照照片
    contractPeriod: null, // 合同期限
    worker: null, // 员工总数
    bank: null, // 对公银行
    bankAccount: null, // 银行账号
    area: null, // 区域
    address: null, // 具体地址
    multipleSites: null, // 是否为多场地办公
    multipleSitesAddress: null, // 多场地地址
    operator: null, // 公司运营者
    mobile: null, // 联系电话
    job: null, // 职务
    department: null, // 所属部门
    email: null, // 电子邮箱
    barCodeCount: null, // 条码数量
    barCodeEnable: 1,  // 条码功能
    icChipEnable: 0, // 芯片功能
    purchaseQuantity: null,  // 采购数量
    applicationReason: null,  // 申请理由
    subjectionRelation: null, // 隶属关系
    subjection: null, // 隶属组织名称
    workingLanguage: null, // 工作语言
    otherPic: null, // 其他照片
    otherPicList: [],
    status: 0
  },
  COMPANY_RULES: {
    name: [{
      required: true, message: '请输入企业中文名', trigger: ['blur', 'change']
    }],
    industryId: [{
      required: true, message: '请选择所属行业', trigger: ['blur', 'change']
    }],
    barCodeCount: [{
      required: true, message: '请输入条码数量', trigger: ['blur', 'change']
    }],
    barCodeEnable: [{
      required: true, message: '请选择条码功能', trigger: ['blur', 'change']
    }],
    icChipEnable: [{
      required: true, message: '请选择芯片功能', trigger: ['blur', 'change']
    }],
    applicationReason: [{
      required: true, message: '请输入申请理由', trigger: ['blur', 'change']
    }],
    legalRepresentative: [{
      required: true, message: '请输入法人代表', trigger: ['blur', 'change']
    }],
    legalIdcard: [{
      required: true, message: '请输入法人代表身份证', trigger: ['blur', 'change']
    }, {
      validator: (rule, value, callback) => {
        if (/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/.test(value) === false && value) {
          callback(new Error('请输入正确的身份证号码'))
        } else {
          callback()
        }
      },
      trigger: ['blur', 'change']
    }],
    legalIdcardPic: [{
      required: true, message: '请上传法人代表身份证照片', trigger: ['blur', 'change']
    }],
    operator: [{
      required: true, message: '请输入公司运营者', trigger: ['blur', 'change']
    }],
    mobile: [{
      required: true, message: '请输入联系电话', trigger: ['blur', 'change']
    }],
    department: [{
      required: true, message: '请输入所属部门', trigger: ['blur', 'change']
    }],
    email: [{
      required: true, message: '请输入电子邮箱', trigger: ['blur', 'change']
    }, {
      type: 'email', message: '请输入正确的电子邮箱', trigger: ['blur', 'change']
    }],
    businessLicence: [{
      required: true, message: '请输入营业执照号码', trigger: ['blur', 'change']
    }],
    businessLicencePic: [{
      required: true, message: '请上传营业执照照片', trigger: ['blur', 'change']
    }],
    job: [{
      required: true, message: '请输入公司运营者职务', trigger: ['blur', 'change']
    }]
  },
  RULES: {
    name: [{
      required: true, message: '请输入企业名称', trigger: ['blur', 'change']
    }],
    legalIdcard: [{
      validator: (rule, value, callback) => {
        if (/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/.test(value) === false && value) {
          callback(new Error('请输入正确的身份证号码'))
        } else {
          callback()
        }
      },
      trigger: ['blur', 'change']
    }]
  },
  FORM_DATA: {
    name: null,
    industryId: null,
    legalPerson: null, // 企业法人
    legalIdcard: null, // 法人代表身份证
    legalIdcardPic: null, // 法人代表身份证照片
    bank: null, // 企业对公银行
    businessLicencePic: null, // 企业营业执照照片
    area: null, // 企业所属区域
    areaName: null, // 区域名称
    address: null, // 具体地址
    contacts: null, // 联系人姓名
    mobile: null, // 联系电话
    coordinate: null, // 企业坐标，高德
    equipment: null, // 设备数量
    worker: null // 工人数量
  },
  FORM_OPTIONS: {
    industryId: [],
    barCodeEnable: [{
      value: 0,
      label: '不启用'
    }, {
      value: 1,
      label: '启用'
    }],
    icChipEnable: [{
      value: 0,
      label: '不启用'
    }, {
      value: 1,
      label: '启用'
    }],
    multipleSites: [{
      value: 0,
      label: '不是'
    }, {
      value: 1,
      label: '是'
    }],
    status: [{
      value: 0,
      label: '初始化资料'
    }, {
      value: 1,
      label: '申请中'
    }, {
      value: 2,
      label: '通过申请'
    }, {
      value: 3,
      label: '拒绝申请'
    }, {
      value: 4,
      label: '禁用'
    }]
  },
  searchInfo: [
    {
      label: '编码',
      value: 'dataServiceCode'
    }, {
      label: '社会统一信用代码',
      value: 'unifiedSocialCreditCode'
    }, {
      label: '企业名称',
      value: 'name'
    }
  ]
}
