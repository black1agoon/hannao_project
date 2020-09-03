import {request, system} from '../common'
const prev = system.prev

export default {
  agvOnoff: {
    paged(query) {
      return request('post', prev + '/api/agvOnoffDetect/getAgvOnoffDetectPaged', query)
    }
  }
}