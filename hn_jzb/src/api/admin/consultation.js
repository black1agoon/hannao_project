import {request, userSYS} from '../common'
const prev = userSYS.pac
export default {
  consultation: {
    add(info) {
      return request('post', prev + '/newsCategory/add', info)
    },
    update(info) {
      return request('post', prev + '/newsCategory/update', info)
    },
    delete(idList) {
      return request('post', prev + '/newsCategory/del', {idList})
    },
    get(id) {
      return request('get', prev + '/newsCategory/get', {id})
    },
    paged(query) {
      return request('post', prev + '/newsCategory/paged', query)
    }
  },
  consultationNews: {
    add(info) {
      return request('post', prev + '/news/add', info)
    },
    update(info) {
      return request('post', prev + '/news/update', info)
    },
    delete(idList) {
      return request('post', prev + '/news/del', {idList})
    },
    get(id) {
      return request('get', prev + '/news/get', {id})
    },
    paged(query) {
      return request('post', prev + '/news/paged', query)
    }
  }
}

