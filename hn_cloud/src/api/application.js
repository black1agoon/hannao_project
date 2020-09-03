import {request2} from './common'
const PREV = '/pac'
export default {
  application: {
    paged(query) {
      return request2('post', PREV + '/companyApplicationFront/pcApplicationPaged', query)
    },
    categoryPaged(query) {
      return request2('post', PREV + '/applicatioinCategoryFront/parentPaged', query)
    },
    getDetail(id) {
      return request2('get', PREV + '/companyApplicationFront/getDetail', {id})
    }
  }
}