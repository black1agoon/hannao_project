export const COMPANY_FORM = [
  {
    title: '企业基本信息',
    forms: [{
      name: '登录名',
      value: 'username',
      notic: '邮箱格式的登录名'
    }, {
      name: '到期时间',
      value: 'expireDate',
      type: 'datetime',
      notic: '企业登录账号的到期时间'
    }, {
      name: '代理商',
      value: 'agentId',
      type: 'select'
    }, {
      name: '企业中文名',
      value: 'cnName'
    }, {
      name: '企业英文名',
      value: 'enName'
    }, {
      name: '所属行业',
      value: 'industryId',
      type: 'select'
    }, {
      name: '企业等级',
      value: 'grade',
      clearable: true,
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
      value: 'employees',
      type: 'number'
    }, {
      name: '对公银行',
      value: 'bank'
    }, {
      name: '银行账号',
      value: 'bankAccount'
    }, {
      name: '地址所属区域',
      value: 'region',
      type: 'cascader'
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
        value: 'telephone',
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
      name: '客户服务经理',
      value: 'csmIdName',
      readonly: true,
      suffixIcon: 'fa fa-search',
      notic: '客户服务经理, 对应平台上分配的维护这个客户的人员'
    }, {
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
      name: '隶属关系',
      value: 'subjectionRelation'
    }, {
      name: '隶属组织名称',
      value: 'subjection',
      notic: '如隶属于某个更大的组织(如集团公司、上级机关等)，请说明该组织名称'
    }, {
      name: '状态',
      value: 'status',
      type: 'select'
    }, {
      name: '工作语言',
      value: 'workingLanguage'
    }, {
      name: '其他照片',
      value: 'otherPic'
    }]
  }
]

export const COMPANY_RULES = {
  agentId: [{
    required: true, message: '请选择代理商', trigger: ['blur', 'change']
  }],
  cnName: [{
    required: true, message: '请输入企业中文名', trigger: ['blur', 'change']
  }],
  username: [{
    required: true, message: '请输入登录名', trigger: ['blur', 'change']
  }, {
    type: 'email', message: '请输入正确的登录名(邮箱格式)', trigger: ['blur', 'change']
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
  telephone: [{
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
  status: [{
    required: true, message: '请选择状态', trigger: ['blur', 'change']
  }],
  businessLicence: [{
    required: true, message: '请输入营业执照号码', trigger: ['blur', 'change']
  }],
  businessLicencePic: [{
    required: true, message: '请上传营业执照照片', trigger: ['blur', 'change']
  }],
  job: [{
    required: true, message: '请输入公司运营者职务', trigger: ['blur', 'change']
  }],
  expireDate: [{
    required: true, message: '请选择到期时间', trigger: ['blur', 'change']
  }],
  grade: [{
    required: true, message: '请选择企业等级', trigger: ['blur', 'change']
  }]
}

export const COMPANY_INFO = {
  agentId: '0000000000000000', // 代理商id
  cnName: null, // 企业中文名
  enName: null, // 企业英文名
  username: null, // 登入名，为邮箱
  expireDate: null, // 到期时间
  csmId: null, // 客户服务经理
  csmIdName: null,
  industryId: null, // 所属行业
  grade: null, // 企业等级
  barCodeCount: null, // 条码数量
  barCodeEnable: 1,  // 条码功能
  icChipEnable: 0, // 芯片功能
  purchaseQuantity: null,  // 采购数量
  applicationReason: null,  // 申请理由
  legalRepresentative: null, // 法人代表
  legalIdcard: null, // 法人代表身份证
  legalIdcardPic: null, // 法人代表身份证照片
  businessLicence: null, // 营业执照号码
  businessLicencePic: null, // 营业执照照片
  contractPeriod: null, // 合同期限
  operator: null, // 公司运营者
  telephone: null, // 联系电话
  job: null, // 职务
  department: null, // 所属部门
  email: null, // 电子邮箱
  employees: null, // 员工总数
  bank: null, // 对公银行
  bankAccount: null, // 银行账号
  regAddress: null, // 企业注册地址
  regAddressCode: null, // 企业注册地址邮编
  region: null, // 地址所属区域
  regionList: [],
  multipleSites: null, // 是否为多场地办公
  multipleSitesAddress: null, // 多场地地址
  operateAddress: null, // 运营地址
  operateAddressCode: null, // 企业运营地址邮编
  subjectionRelation: null, // 隶属关系
  subjection: null, // 隶属组织名称
  status: null, // 状态
  statusReviewId: null, // 审核结果对应的信息id
  statusReview: null, //
  workingLanguage: null, // 工作语言
  otherPic: null, // 其他照片
  otherPicList: []
}

export const COMPANY_DETAIL = [
  {
    title: '企业基本信息',
    forms: [{
      name: '登录名',
      value: 'username'
    }, {
      name: '到期时间',
      value: 'expireDate'
    }, {
      name: '代理商',
      value: 'agentId'
    }, {
      name: '企业中文名',
      value: 'cnName'
    }, {
      name: '企业英文名',
      value: 'enName'
    }, {
      name: '所属行业',
      value: 'industryName'
    }, {
      name: '企业等级',
      value: 'gradeName'
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
      name: '法人代表',
      value: 'legalRepresentative'
    }, {
      name: '法人代表身份证',
      value: 'legalIdcard'
    }, {
      name: '营业执照号码',
      value: 'businessLicence'
    }, {
      name: '合同期限(年)',
      value: 'contractPeriod'
    }, {
      name: '员工总数',
      value: 'employees'
    }, {
      name: '对公银行',
      value: 'bank'
    }, {
      name: '银行账号',
      value: 'bankAccount'
    }, {
      name: '地址所属区域',
      value: 'region'
    }, {
      name: '是否为多场地办公',
      value: 'multipleSites',
      type: 'radio'
    }, {
      name: '多场地地址',
      value: 'multipleSitesAddress'
    }, {
      name: '法人代表身份证照片',
      value: 'legalIdcardPic'
    }, {
      name: '营业执照照片',
      value: 'businessLicencePic'
    }]
  }, {
    title: '公司运营者信息',
    forms: [
      {
        name: '公司运营者',
        value: 'operator'
      }, {
        name: '联系电话',
        value: 'telephone'
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
      name: '客户服务经理',
      value: 'csmIdName'
    }, {
      name: '条码数量',
      value: 'barCodeCount'
    }, {
      name: '条码功能',
      value: 'barCodeEnable'
    }, {
      name: '芯片功能',
      value: 'icChipEnable'
    }, {
      name: '采购数量',
      value: 'purchaseQuantity'
    }, {
      name: '状态',
      value: 'status'
    }, {
      name: '隶属关系',
      value: 'subjectionRelation'
    }, {
      name: '隶属组织名称',
      value: 'subjection'
    }, {
      name: '申请理由',
      value: 'applicationReason'
    }, {
      name: '审核信息',
      value: 'statusReview'
    }, {
      name: '工作语言',
      value: 'workingLanguage'
    }, {
      name: '其他照片',
      value: 'otherPic'
    }]
  }
]

export const COMPANY_COOP_FORM = [
  {
    title: '企业基本信息',
    forms: [
      {
        name: '企业中文名',
        value: 'cnName'
      }, {
        name: '企业英文名',
        value: 'enName'
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
        name: '员工总数',
        value: 'employees',
        type: 'number'
      }, {
        name: '对公银行',
        value: 'bank'
      }, {
        name: '银行账号',
        value: 'bankAccount'
      }, {
        name: '地址所属区域',
        value: 'regionName'
      }, {
        name: '是否为多场地办公',
        value: 'multipleSites',
        type: 'select'
      }, {
        name: '多场地地址',
        value: 'multipleSitesAddress',
        type: 'textarea',
        autosize: {
          minRows: 4,
          maxRows: 6
        },
        notic: '若不是多场地办公，此项可忽略'
      }]
  }, {
    title: '公司运营者信息',
    forms: [
      {
        name: '合作申请年度',
        value: 'year',
        type: 'year'
      }, {
        name: '年度合作开始时间',
        value: 'startTime',
        type: 'date'
      }, {
        name: '年度合作申请时间',
        value: 'endTime',
        type: 'date'
      }, {
        name: '公司运营者',
        value: 'operator'
      }, {
        name: '联系电话',
        value: 'telephone',
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
    forms: [
      {
        name: '采购数量',
        value: 'purchaseQuantity',
        type: 'number'
      }, {
        name: '申请理由',
        value: 'applicationReason'
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
]
export const COMPANY_COOP_INFO = {
  applicationReason: null, // 申请理由
  bank: null, // 对公银行名称
  bankAccount: null, // 银行账号 ,
  businessLicence: null, // 营业执照号码 ,
  businessLicencePic: null,  // 营业执照照片 ,
  cnName: null, // 企业中文名称 ,
  companyId: null, // 企业id ,
  companyName: null, // 企业名称 ,
  department: null, // 企业运营者所属部门 ,
  email: null, // 企业运营者电子邮箱 ,
  employees: null, // 总的员工数量 ,
  enName: null, // 企业英文名称 ,
  endTime: null, // 年度合作结束时间 ,
  id: null, // 申请id ,
  industryId: null, // 所属行业 ,
  job: null, // 企业运营者职务 ,
  legalIdcard: null, // 企业法人代表身份证号码 ,
  legalIdcardPic: null, // 企业法人代表身份证照片 ,
  legalRepresentative: null, // 企业法人代表姓名 ,
  multipleSites: null, // 是否为多场地办公、生产,0：不是；1：是 ,
  multipleSitesAddress: null, // 多场地地址 ,
  operateAddress: null, // 企业运营地址 ,
  operateAddressCode: null, // 企业运营地址邮编 ,
  operator: null, // 企业运营者姓名 ,
  otherPic: null, // 其他照片 ,
  otherPicList: [],
  purchaseQuantity: null, // 预采购数量 ,
  regAddress: null, // 企业注册地址 ,
  regAddressCode: null, // 企业注册地址邮编 ,
  region: null, // 企业地址所属区域 ,
  regionName: null, // 企业地址所属区域 ,
  review: null, // 审核结果信息 ,
  startTime: null, // 年度合作开始时间 ,
  status: null, // 状态，0：申请中；1：通过申请；2：拒绝申请 ,
  statusReviewId: null, // 审核结果关联表，如果审核不通过，包含对应的原因等信息 ,
  subjection: null, // 如隶属于某个更大的组织(如集团企业、上级机关等)，请说明该组织名称 ,
  subjectionRelation: null, // 企业隶属关系 ,
  telephone: null, // 企业运营者联系电话 ,
  workingLanguage: null, // 工作语言 ,
  year: null // 合作申请的年度，如2018,2019
}

export const COMPANY_COOP_RULES = {
  industryId: [{
    required: true, message: '请选择所属行业', trigger: ['blur', 'change']
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
  telephone: [{
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
}
export const COMPANY_COOP_RULES2 = {
  review: [{
    required: true, message: '请输入审核结果信息', trigger: ['blur', 'change']
  }]
}
