import {request, userSYS} from '../common'
const prev = userSYS.jlw
export default {
  modelName: {
    add(info) {
      return request('post', prev + '/modelName/add', info)
    },
    update(info) {
      return request('post', prev + '/modelName/update', info)
    },
    delete(id) {
      return request('get', prev + '/modelName/del', {id})
    },
    get(id) {
      return request('get', prev + '/modelName/get', {id})
    },
    paged(query) {
      return request('post', prev + '/modelName/paged', query)
    },
    getDefault() {
      return request('get', prev + '/modelName/getDefault')
    },
    setDefault(id) {
      return request('get', prev + '/modelName/setDefault', {id})
    }
  },
  modelData: {
    add(info) {
      return request('post', prev + '/modelData/add', info)
    },
    update(info) {
      return request('post', prev + '/modelData/update', info)
    },
    delete(id) {
      return request('get', prev + '/modelData/del', {id})
    },
    get(id) {
      return request('get', prev + '/modelData/get', {id})
    },
    paged(query) {
      return request('post', prev + '/modelData/paged', query)
    }
  },
  modelDetail: {
    add(info) {
      return request('post', prev + '/modelDetail/add', info)
    },
    update(info) {
      return request('post', prev + '/modelDetail/update', info)
    },
    delete(id) {
      return request('get', prev + '/modelDetail/del', {id})
    },
    get(id) {
      return request('get', prev + '/modelDetail/get', {id})
    },
    paged(query) {
      return request('post', prev + '/modelDetail/paged', query)
    }
  }
}

