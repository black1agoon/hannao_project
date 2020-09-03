import {request, system} from '../common'
const prev = system.prev

export default {
  pile: {
    add(info) {
      return request('post', prev + '/api/chargingPile/add', info)
    },
    update(info) {
      return request('post', prev + '/api/chargingPile/update', info)
    },
    delete(idList) {
      return request('post', prev + '/api/chargingPile/del', {idList})
    },
    paged(query) {
      return request('post', prev + '/api/chargingPile/paged', query)
    }
  },
  pileOnoff: {
    paged(query) {
      return request('post', prev + '/api/chargingPileOnoffDetect/getChargingPileOnoffDetectPaged', query)
    }
  }
}