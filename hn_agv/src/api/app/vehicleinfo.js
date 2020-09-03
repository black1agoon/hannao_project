import {request, system} from '../common'
const prev = system.prev

export default {
  vehicleinfo: {
    add(info) {
      return request('post', prev + '/api/vehicleInfo/addVehicleInfo', info)
    },
    update(info) {
      return request('post', prev + '/api/vehicleInfo/updateVehicleInfo', info)
    },
    delete(ids) {
      return request('get', prev + '/api/vehicleInfo/delVehicleInfoByIds', {
        ids: ids.join()
      })
    },
    paged(query) {
      return request('post', prev + '/api/vehicleInfo/getVehicleInfoPaged', query)
    }
  }
}