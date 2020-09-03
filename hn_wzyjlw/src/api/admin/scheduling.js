import {request, userSYS} from '../common'
const prev = userSYS.jlw
export default {
  scheduling: {
    add(info) {
      return request('post', prev + '/scheduling/add', info)
    },
    update(info) {
      return request('post', prev + '/scheduling/update', info)
    },
    delete(id) {
      return request('get', prev + '/scheduling/del', {id})
    },
    get(id) {
      return request('get', prev + '/scheduling/get', {id})
    },
    paged(query) {
      return request('post', prev + '/scheduling/paged', query)
    }
  },
  schedulingDetail: {
    add(info) {
      return request('post', prev + '/schedulingDetail/add', info)
    },
    update(info) {
      return request('post', prev + '/schedulingDetail/update', info)
    },
    delete(id) {
      return request('get', prev + '/schedulingDetail/del', {id})
    },
    get(id) {
      return request('get', prev + '/schedulingDetail/get', {id})
    },
    paged(query) {
      return request('post', prev + '/schedulingDetail/paged', query)
    }
  }
}

