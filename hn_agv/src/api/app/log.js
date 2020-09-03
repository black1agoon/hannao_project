import {request, system} from '../common'
const prev = system.prev

export default {
  log: {
    exceptionPaged(query) {
      return request('post', prev + '/api/exceptionLog/getExceptionLogPaged', query)
    },
    connectPaged(query) {
      return request('post', prev + '/api/connectLog/getConnectLogPaged', query)
    },
    rechargingPaged(query) {
      return request('post', prev + '/api/rechargingLog/getRechargingLogPaged', query)
    }
  }
}