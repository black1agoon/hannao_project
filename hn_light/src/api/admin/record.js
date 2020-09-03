import {request, usersys} from '../common'
const prev = usersys.sl
export default {
  pileinfo: {
    paged(query) {
      return request('post', prev + '/admin/pileInfo/paged', query)
    }
  },
  chargeRecord: {
    paged(query) {
      return request('post', prev + '/admin/chargeRecord/paged', query)
    }
  },
  monitor: {
    paged(query) {
      return request('post', prev + '/admin/monitor/paged', query)
    }
  },
  equipment: {
    add(info) {
      return request('post', prev + '/admin/equipment/add', info)
    },
    update(info) {
      return request('post', prev + '/admin/equipment/update', info)
    },
    delete(id) {
      return request('get', prev + '/admin/equipment/del', {id})
    },
    get(id) {
      return request('get', prev + '/admin/equipment/get', {id})
    },
    paged(query) {
      return request('post', prev + '/admin/equipment/paged', query)
    }
  }
}