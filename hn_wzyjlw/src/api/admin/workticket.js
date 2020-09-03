import {request, userSYS} from '../common'
const prev = userSYS.jlw
export default {
  workticket: {
    add(info) {
      return request('post', prev + '/workTicket/add', info)
    },
    update(info) {
      return request('post', prev + '/workTicket/update', info)
    },
    delete(id) {
      return request('get', prev + '/workTicket/del', {id})
    },
    get(id) {
      return request('get', prev + '/workTicket/get', {id})
    },
    paged(query) {
      return request('post', prev + '/workTicket/paged', query)
    }
  }
}

