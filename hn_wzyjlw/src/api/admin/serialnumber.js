import {request, userSYS} from '../common'

const prev = userSYS.jlw
export default {
  serialNumber: {
    add(info) {
      return request('post', prev + '/serialNumber/add', info)
    },
    update(info) {
      return request('post', prev + '/serialNumber/update', info)
    },
    delete(id) {
      return request('get', prev + '/serialNumber/del', {id})
    },
    get(id) {
      return request('get', prev + '/serialNumber/get', {id})
    },
    paged(query) {
      return request('post', prev + '/serialNumber/paged', query)
    }
  }
}
