import {request, system} from '../common'
const prev = system.prev

export default {
  transport: {
    paged(query) {
      return request('post', prev + '/api/transportList/paged', query)
    },
    orderPaged(query) {
      return request('post', prev + '/api/transportOrder/paged', query)
    },
    logPaged(query) {
      return request('post', prev + '/api/transportOrderLog/paged', query)
    },
    driverOrderPaged(query) {
      return request('post', prev + '/api/driverOrder/paged', query)
    },
    routeSteprPaged(query) {
      return request('post', prev + '/api/driverOrderRouteStep/paged', query)
    }
  }
}