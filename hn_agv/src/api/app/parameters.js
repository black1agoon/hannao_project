import {request, system} from '../common'

const prev = system.prev

export default {
  parameters: {
    add(info) {
      return request('post', prev + '/api/parameters/addParameterss', info)
    },
    update(info) {
      return request('post', prev + '/api/parameters/updateParameterss', info)
    },
    delete(ids) {
      return request('get', prev + '/api/parameters/delParameterssByIds', {
        ids: ids.join()
      })
    },
    paged(query) {
      return request('post', prev + '/api/parameters/getParameterssPaged', query)
    }
  }
}