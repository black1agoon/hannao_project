import {request, userSYS} from '../common'
const prev = userSYS.pac
export default {
  companyBoard: {
    getdb1() {
      return request('get', prev + '/companyDashBoard0/db1')
    },
    getdb20(query) {
      return request('post', prev + '/companyDashBoard0/db20', query)
    },
    getdb21(query) {
      return request('post', prev + '/companyDashBoard0/db21', query)
    }
  }
}
