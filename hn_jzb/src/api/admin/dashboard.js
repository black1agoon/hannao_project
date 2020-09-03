import {request, userSYS} from '../common'
const prev = userSYS.pac
export default {
  board0: {
    getdb1() {
      return request('get', prev + '/dashBoard0/db1')
    },
    getdb20(query) {
      return request('post', prev + '/dashBoard0/db20', query)
    },
    getdb21(query) {
      return request('post', prev + '/dashBoard0/db21', query)
    },
    getdb22(query) {
      return request('post', prev + '/dashBoard0/db22', query)
    },
    getdb31() {
      return request('get', prev + '/dashBoard0/db31')
    },
    getdb32() {
      return request('get', prev + '/dashBoard0/db32')
    }
  },
  board1: {
    getdb1() {
      return request('get', prev + '/dashBoard1/db1')
    },
    getdb21(query) {
      return request('post', prev + '/dashBoard1/db21', query)
    },
    getdb22(query) {
      return request('post', prev + '/dashBoard1/db22', query)
    },
    getdb23(query) {
      return request('post', prev + '/dashBoard1/db23', query)
    },
    getdb31() {
      return request('get', prev + '/dashBoard1/db31')
    },
    getdb32() {
      return request('get', prev + '/dashBoard1/db32')
    }
  }
}
