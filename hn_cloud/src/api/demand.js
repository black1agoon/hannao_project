import {request2} from './common'
const PREV = '/pac'
export default {
  demand: {
    paged(query) {
      return request2('post', PREV + '/companyDemandFront/demandPaged', query)
    },
    demandApply(info) {
      return request2('post', PREV + '/companyDemandApply/apply', info)
    }
  }
}