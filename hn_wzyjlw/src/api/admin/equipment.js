import {request, userSYS} from '../common'
const prev = userSYS.jlw
export default {
  equipment: {
    add(info) {
      return request('post', prev + '/equipment/add', info)
    },
    update(info) {
      return request('post', prev + '/equipment/update', info)
    },
    delete(id) {
      return request('get', prev + '/equipment/del', {id})
    },
    get(id) {
      return request('get', prev + '/equipment/get', {id})
    },
    paged(query) {
      return request('post', prev + '/equipment/paged', query)
    }
  }
}

