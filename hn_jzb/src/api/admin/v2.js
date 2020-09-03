import {request, userSYS} from '../common'
const prev = userSYS.pac
export default {
  thirdPartyServices: {
    add(info) {
      return request('post', prev + '/v2/thirdPartyServices/add', info)
    },
    update(info) {
      return request('post', prev + '/v2/thirdPartyServices/update', info)
    },
    delete(idList) {
      return request('post', prev + '/v2/thirdPartyServices/del', {idList})
    },
    get(id) {
      return request('get', prev + '/v2/thirdPartyServices/get', {id})
    },
    paged(query) {
      return request('post', prev + '/v2/thirdPartyServices/paged', query)
    }
  },
  focusStore: {
    add(info) {
      return request('post', prev + '/v2/focusStore/add', info)
    },
    update(info) {
      return request('post', prev + '/v2/focusStore/update', info)
    },
    delete(idList) {
      return request('post', prev + '/v2/focusStore/del', {idList})
    },
    get(id) {
      return request('get', prev + '/v2/focusStore/get', {id})
    },
    paged(query) {
      return request('post', prev + '/v2/focusStore/paged', query)
    }
  },
  activities: {
    add(info) {
      return request('post', prev + '/v2/activities/add', info)
    },
    update(info) {
      return request('post', prev + '/v2/activities/update', info)
    },
    delete(idList) {
      return request('post', prev + '/v2/activities/del', {idList})
    },
    get(id) {
      return request('get', prev + '/v2/activities/get', {id})
    },
    paged(query) {
      return request('post', prev + '/v2/activities/paged', query)
    }
  }
}

