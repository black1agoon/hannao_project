import {request, system} from '../common'

const prev = system.prev

export default {
  loading: {
    add(info) {
      return request('post', prev + '/api/loading/addLoading', info)
    },
    update(info) {
      return request('post', prev + '/api/loading/updateLoading', info)
    },
    delete(ids) {
      return request('get', prev + '/api/loading/delLoadingByIds', {
        ids: ids.join()
      })
    },
    paged(query) {
      return request('post', prev + '/api/loading/getLoadingPaged', query)
    }
  },
  unloading: {
    add(info) {
      return request('post', prev + '/api/unloading/addUnloading', info)
    },
    update(info) {
      return request('post', prev + '/api/unloading/updateUnloading', info)
    },
    delete(ids) {
      return request('get', prev + '/api/unloading/delUnloadingByIds', {
        ids: ids.join()
      })
    },
    paged(query) {
      return request('post', prev + '/api/unloading/getUnloadingPaged', query)
    }
  }
}