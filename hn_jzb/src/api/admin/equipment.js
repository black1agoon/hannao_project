import {request, userSYS} from '../common'
const prev = userSYS.pac
export default {
  equipment: {
    addEquipment(info) {
      return request('post', prev + '/equipment/add', info)
    },
    updateEquipment(info) {
      return request('post', prev + '/equipment/update', info)
    },
    deleteEquipment(id) {
      return request('get', prev + '/equipment/del', {id})
    },
    get(id) {
      return request('get', prev + '/equipment/get', {id})
    },
    getEquipmentPaged(query) {
      return request('post', prev + '/equipment/paged', query)
    },
    setAttrValue(info) {
      return request('post', prev + '/equipmentCategoryAttrValue/update', info)
    }
  },
  equipmentCategory: {
    add(info) {
      return request('post', prev + '/equipmentCategory/add', info)
    },
    update(info) {
      return request('post', prev + '/equipmentCategory/update', info)
    },
    delete(id) {
      return request('get', prev + '/equipmentCategory/del', {id})
    },
    get(id) {
      return request('get', prev + '/equipmentCategory/get', {id})
    },
    paged(query) {
      return request('post', prev + '/equipmentCategory/paged', query)
    },
    showPaged(query) {
      return request('post', prev + '/equipmentCategory/showPaged', query)
    }
  },
  equipmentAttr: {
    add(info) {
      return request('post', prev + '/equipmentCategoryAttr/add', info)
    },
    update(info) {
      return request('post', prev + '/equipmentCategoryAttr/update', info)
    },
    delete(id) {
      return request('get', prev + '/equipmentCategoryAttr/del', {id})
    },
    get(id) {
      return request('get', prev + '/equipmentCategoryAttr/get', {id})
    },
    paged(query) {
      return request('post', prev + '/equipmentCategoryAttr/paged', query)
    }
  }
}

