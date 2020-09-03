import {request} from './common'
import demand from './demand'
import application from './application'
export default {
  getNavMenu: () => {  // 获取菜单
    return request('get', '/api.php', {
      a: 'navMenu'
    })
  },
  getContentByPosid: id => {   // 获取一般页 内容
    return request('get', '/api.php', {
      posid: id
    })
  },
  getContentDetailBy2Id: (catid, id) => {    // 获取一般页 详细内容
    return request('get', '/api.php', {
      a: 'detail',
      id,
      catid
    })
  },
  getAllProductDetail: () => {    // 获取产品页内容
    return request('get', '/api.php', {
      a: 'position4detail',
      posid: 1
    })
  },
  submitApply: (data) => {    // 提交申请
    return request('post', '/index.php', {
      g: 'Formguide',
      a: 'postAjax'
    }, data)
  },
  getPlatformCat: (catid, pageNo) => {   // 获取平台咨讯分页
    return request('get', '/api.php', {
      a: 'cclist',
      catid,
      pageNo
    })
  },
  getServiceCenterStatus: (memberId) => {
    return request('get', '/api.php', {
      m: 'member',
      a: 'modules',
      memberId
    })
  },
  login: (data) => {
    return request('post', '/api.php', {
      m: 'member',
      a: 'login',
    }, data)
  },
  register: (data) => {
    return request('post', '/api.php', {
      m: 'member',
      a: 'register',
    }, data)
  },
  apply: (memberId, moduleId) => {
    return request('post', '/api.php', {
      m: 'member',
      a: 'apply',
      memberId
    }, {
      memberId,
      moduleId
    })
  },
  ...demand,
  ...application
}