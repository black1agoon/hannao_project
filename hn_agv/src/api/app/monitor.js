import {request, system} from '../common'
const prev = system.prev

export default {
  monitorOnoff: {
    paged(query) {
      return request('post', prev + '/api/onlineMonitor/getOnlineMonitorPaged', query)
    }
  }
}