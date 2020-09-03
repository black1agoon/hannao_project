import {request, userSYS} from '../common'
const prev = userSYS.pac
export default {
  mssUser: {
    addUser(info) {
      return request('post', prev + '/mssUser4Base/add', info)
    },
    updateUser(info) {
      return request('post', prev + '/mssUser4Base/update', info)
    },
    deleteUser(id) {
      return request('get', prev + '/mssUser4Base/del', {id})
    },
    getUser(id) {
      return request('get', prev + '/mssUser4Base/get', {id})
    },
    getUserPaged(query) {
      return request('post', prev + '/mssUser4Base/paged', query)
    },
    disable(query) {
      return request('post', prev + '/mssUser4Base/disable', query)
    },
    enable(query) {
      return request('post', prev + '/mssUser4Base/enable', query)
    },
    locked(query) {
      return request('post', prev + '/mssUser4Base/locked', query)
    },
    realseLock(query) {
      return request('post', prev + '/mssUser4Base/realseLock', query)
    },
    exchangeLogPaged(query) {  // 查询积分变化分页
      return request('post', prev + '/exchangeLog/paged', query)
    },
    mssCreditsDetailPaged(query) {  // 查询积分明细分页
      return request('post', prev + '/mssCreditsDetail/paged', query)
    },
    deliveryAddressPaged(query) {  // 收件人信息分页
      return request('post', prev + '/deliveryAddress/paged', query)
    }
  },
  mssCreditsItem: {
    addMssCreditsItem(info) {
      return request('post', prev + '/mssCreditsItem/add', info)
    },
    updateMssCreditsItem(info) {
      return request('post', prev + '/mssCreditsItem/update', info)
    },
    deleteMssCreditsItem(id) {
      return request('get', prev + '/mssCreditsItem/del', {id})
    },
    getMssCreditsItem(id) {
      return request('get', prev + '/mssCreditsItem/get', {id})
    },
    getMssCreditsItemPaged(query) {
      return request('post', prev + '/mssCreditsItem/paged', query)
    }
  },
  mssCreditGoods: {
    add(info) {
      return request('post', prev + '/creditGoods/add', info)
    },
    update(info) {
      return request('post', prev + '/creditGoods/update', info)
    },
    delete(id) {
      return request('get', prev + '/creditGoods/del', {id})
    },
    get(id) {
      return request('get', prev + '/creditGoods/get', {id})
    },
    paged(query) {
      return request('post', prev + '/creditGoods/paged', query)
    },
    allPage(query) {
      return request('post', prev + '/creditGoods/allPage', query)
    }
  }
}

