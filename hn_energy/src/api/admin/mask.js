import {request, system} from '../common'

const prev = system.prev
export default {
  maskcommon: {
    paged(query) {
      return request('post', prev + '/mask/getMaskHistoryDataPageList', query)
    },
    getAllMaskEquipmentInfo() {
      return request('get', prev + '/equipment/getAllMaskEquipmentInfo')
    },
  }
}