import {request, userSYS} from '../common'
const prev = userSYS.jlw
export default {
  group: {
    add(info) {
      return request('post', prev + '/group/add', info)
    },
    update(info) {
      return request('post', prev + '/group/update', info)
    },
    delete(id) {
      return request('get', prev + '/group/del', {id})
    },
    get(id) {
      return request('get', prev + '/group/get', {id})
    },
    paged(query) {
      return request('post', prev + '/group/paged', query)
    }
  },
  groupRelSpinner: {
    paged(query) {
      return request('post', prev + '/groupRelSpinner/paged', query)
    },
    getUnchoosedPaged(info) {
      return request('post', prev + '/groupRelSpinner/choose', info)
    },
    change(info) {
      return request('post', prev + '/groupRelSpinner/change', info)
    },
    delete(id) {
      return request('get', prev + '/groupRelSpinner/del', {id})
    }
  },
  groupRelStation: {
    paged(query) {
      return request('post', prev + '/groupRelStation/paged', query)
    },
    getUnchoosedPaged(info) {
      return request('post', prev + '/groupRelStation/choose', info)
    },
    change(info) {
      return request('post', prev + '/groupRelStation/change', info)
    },
    delete(id) {
      return request('get', prev + '/groupRelStation/del', {id})
    }
  }
}

