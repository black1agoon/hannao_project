import {request, system} from '../common'
const prev = system.prev

export default {
  storageOnoff: {
    paged(query) {
      return request('post', prev + '/api/storageOnoffDetect/getStorageOnoffDetectPaged', query)
    }
  }
}