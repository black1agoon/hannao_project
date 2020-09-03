import {request, system} from '../common'

const prev = system.prev

export default {
  pointSite: {
    add(info) {
      return request('post', prev + '/api/pointSite/addPointSite', info)
    },
    update(info) {
      return request('post', prev + '/api/pointSite/updatePointSite', info)
    },
    delete(ids) {
      return request('get', prev + '/api/pointSite/delPointSiteByIds', {
        ids: ids.join()
      })
    },
    paged(query) {
      return request('post', prev + '/api/pointSite/getPointSitePaged', query)
    }
  }
}