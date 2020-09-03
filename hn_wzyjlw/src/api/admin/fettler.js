import {request, userSYS} from '../common'
const prev = userSYS.jlw
export default {
  fettler: {
    add(info) {
      return request('post', prev + '/fettler/add', info)
    },
    update(info) {
      return request('post', prev + '/fettler/update', info)
    },
    delete(id) {
      return request('get', prev + '/fettler/del', {id})
    },
    get(id) {
      return request('get', prev + '/fettler/get', {id})
    },
    paged(query) {
      return request('post', prev + '/fettler/paged', query)
    },
    addBatch(info) {
      return request('post', prev + '/fettler/addBatch', info)
    }
  }
}

