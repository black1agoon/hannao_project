import {request, system} from '../common'

const prev = system.prev

export default {
  goods: {
    add(info) {
      return request('post', prev + '/api/goods/addGoods', info)
    },
    update(info) {
      return request('post', prev + '/api/goods/updateGoods', info)
    },
    delete(ids) {
      return request('get', prev + '/api/goods/delGoodsByIds', {
        ids: ids.join()
      }, {})
    },
    paged(query) {
      return request('post', prev + '/api/goods/getGoodsPaged', query)
    }
  }
}