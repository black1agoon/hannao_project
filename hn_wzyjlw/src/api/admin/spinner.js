import {request, userSYS} from '../common'
const prev = userSYS.jlw
export default {
  spinner: {
    add(info) {
      return request('post', prev + '/spinner/add', info)
    },
    update(info) {
      return request('post', prev + '/spinner/update', info)
    },
    delete(id) {
      return request('get', prev + '/spinner/del', {id})
    },
    get(id) {
      return request('get', prev + '/spinner/get', {id})
    },
    paged(query) {
      return request('post', prev + '/spinner/paged', query)
    },
    addBatch(info) {
      return request('post', prev + '/spinner/addBatch', info)
    }
  }
}

