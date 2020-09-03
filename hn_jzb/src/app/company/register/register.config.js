export const STEPS = ['商家注册', '公司信息认证', '完成']
export const FORM1_DATA = {
  email: null,
  verifyCode: null,
  password: null,
  rePassword: null,
  agree: false
}
export const FORM1_INFO = [
  {
    name: '邮箱地址:',
    value: 'email'
  }, {
    name: '验证码:',
    value: 'verifyCode'
  }, {
    name: '设置密码:',
    value: 'password',
    type: 'password'
  }, {
    name: '确认密码:',
    value: 'rePassword',
    type: 'password'
  }
]
export const RULES1 = {
  email: [
    {
      required: true, message: '请输入邮箱地址', trigger: ['blur', 'change']
    }, {
      type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']
    }
  ],
  verifyCode: [{
    required: true, message: '请输入验证码', trigger: ['blur', 'change']}
  ],
  agree: [{
    validator: (rule, value, callback) => {
      if (value === false) {
        callback(new Error('请先同意服务条款'))
      } else {
        callback()
      }
    },
    trigger: 'change'
  }]
}

export const FORM2_DATA = {
  cnName: null, // 企业中文名称 ,
  enName: null, // 企业英文名称 ,
  regAddress: null, // 企业注册地址 ,
  regAddressCode: null, // 企业注册地址邮编 ,
  operateAddress: null, // 企业运营地址 ,
  operateAddressCode: null, // 企业运营地址邮编 ,
  legalRepresentative: null, // 企业法人代表姓名 ,
  legalIdcard: null, // 企业法人代表身份证号码 ,
  legalIdcardPic: null, // 企业法人代表身份证照片 ,
  operator: null, // 企业运营者姓名 ,
  telephone: null, // 企业运营者联系电话 ,
  department: null, // 企业运营者所属部门 ,
  email: null, // 企业运营者电子邮箱 ,
  job: null, // 企业运营者职务 ,
  bank: null, // 对公银行名称 ,
  bankAccount: null, // 银行账号 ,
  industryId: null, // 所属行业 ,
  businessLicence: null, // 营业执照号码 ,
  purchaseQuantity: null, // 预采购数量 ,
  businessLicencePic: null, // 营业执照照片 ,
  employees: null, // 总的员工数量 ,
  applicationReason: null, // 申请理由 ,
  region: null, // 企业地址所属区域 ,
  regionList: null,
  multipleSites: 0, // 是否为多场地办公、生产,0：不是；1：是 ,
  multipleSitesAddress: null, // 多场地地址 ,
  workingLanguage: null, // 工作语言
  subjection: null, // 如隶属于某个更大的组织(如集团企业、上级机关等)，请说明该组织名称 ,
  subjectionRelation: null, // 企业隶属关系 ,
  otherPic: null, // 其他照片 ,
  otherPicList: []
}
export const FORM2_INFO = [
  {
    name: '企业中文名称:',
    value: 'cnName'
  }, {
    name: '企业英文名称:',
    value: 'enName'
  }, {
    name: '企业注册地址:',
    value: 'regAddress'
  }, {
    name: '企业注册地址邮编:',
    value: 'regAddressCode'
  }, {
    name: '企业运营地址:',
    value: 'operateAddress'
  }, {
    name: '企业运营地址邮编:',
    value: 'operateAddressCode'
  }, {
    name: '法人代表姓名:',
    value: 'legalRepresentative'
  }, {
    name: '法人代表身份证号码:',
    value: 'legalIdcard'
  }, {
    name: '法人代表身份证照片:',
    value: 'legalIdcardPic'
  }, {
    name: '企业运营者姓名:',
    value: 'operator'
  }, {
    name: '运营者联系电话:',
    value: 'telephone',
    type: 'number'
  }, {
    name: '运营者所属部门:',
    value: 'department'
  }, {
    name: '运营者电子邮箱:',
    value: 'email'
  }, {
    name: '运营者职务:',
    value: 'job'
  }, {
    name: '对公银行名称:',
    value: 'bank'
  }, {
    name: '银行账号:',
    value: 'bankAccount'
  }, {
    name: '所属行业:',
    value: 'industryId',
    type: 'select'
  }, {
    name: '营业执照号码:',
    value: 'businessLicence'
  }, {
    name: '预采购数量:',
    value: 'purchaseQuantity',
    type: 'number'
  }, {
    name: '营业执照照片:',
    value: 'businessLicencePic'
  }, {
    name: '员工总数:',
    value: 'employees',
    type: 'number'
  }, {
    name: '申请理由:',
    value: 'applicationReason',
    type: 'textarea',
    autosize: {
      minRows: 4,
      maxRows: 6
    }
  }, {
    name: '企业地址所属区域:',
    value: 'region',
    type: 'cascader'
  }, {
    name: '是否为多场地办公:',
    value: 'multipleSites',
    type: 'radio'
  }, {
    name: '多场地地址:',
    value: 'multipleSitesAddress',
    type: 'textarea',
    autosize: {
      minRows: 4,
      maxRows: 6
    },
    notic: '若不是多场地办公，此项可忽略'
  }, {
    name: '工作语言:',
    value: 'workingLanguage'
  }, {
    name: '隶属组织名称:',
    value: 'subjection',
    notic: '如隶属于某个更大的组织(如集团公司、上级机关等)，请说明该组织名称'
  }, {
    name: '隶属关系:',
    value: 'subjectionRelation'
  }, {
    name: '其他照片:',
    value: 'otherPicList'
  }
]
export const RULES2 = {
  cnName: [{
    required: true, message: '请输入企业中文名', trigger: ['blur', 'change']
  }],
  industryId: [{
    required: true, message: '请选择所属行业', trigger: ['blur', 'change']
  }],
  applicationReason: [{
    required: true, message: '请输入申请理由', trigger: ['blur', 'change']
  }],
  legalRepresentative: [{
    required: true, message: '请输入法人代表姓名', trigger: ['blur', 'change']
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
  bank: [{
    required: true, message: '请输入对公银行名称', trigger: ['blur', 'change']
  }],
  bankAccount: [{
    required: true, message: '请输入银行账号', trigger: ['blur', 'change']
  }],
  employees: [{
    required: true, message: '请输入员工总数', trigger: ['blur', 'change']
  }],
  purchaseQuantity: [{
    required: true, message: '请输入预采购数量', trigger: ['blur', 'change']
  }],
  regAddress: [{
    required: true, message: '请输入企业注册地址', trigger: ['blur', 'change']
  }],
  region: [{
    required: true, message: '请选择企业地址所属区域', trigger: ['blur', 'change']
  }],
  operateAddress: [{
    required: true, message: '请输入企业运营地址', trigger: ['blur', 'change']
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

export const FORM2_OPTIONS = {
  industryId: [],
  multipleSites: [{
    value: 0,
    label: '不是'
  }, {
    value: 1,
    label: '是'
  }]
}
