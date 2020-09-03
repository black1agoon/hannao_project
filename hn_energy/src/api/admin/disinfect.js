import {request, system} from '../common'

const prev = system.prev
export default {
  disinfect: {
    add(info) {
      return request('post', prev + '/disinfectTask/addDisinfectTask', info)
    },
    update(info) {
      return request('post', prev + '/disinfectTask/updateDisinfectTask', info)
    },
    delete(ids) {
      return request('get', prev + '/disinfectTask/deleteDisinfectTask',  {ids})
    },
    paged(query) {
      return request('post', prev + '/disinfectTask/getDisinfectTaskPagedList', query)
    }
  },
  tasklist: {
    paged(query) {
      return request('post', prev + '/DisinfectTaskList/getDisinfectTaskListPagedList', query)
    },
    stop(id) {
      return request('get', prev + '/DisinfectTaskList/stopDisinfectTaskList', {id})
    }
  },
  equipment: {
    add(info) {
      return request('post', prev + '/equipment/addEquipment', info)
    },
    update(info) {
      return request('post', prev + '/equipment/updateEquipment', info)
    },
    delete(ids) {
      return request('get', prev + '/equipment/deleteEquipment',  {ids})
    },
    paged(query) {
      return request('post', prev + '/equipment/getEquipmentPagedList', query)
    }
  }
}