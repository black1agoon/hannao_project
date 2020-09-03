import {request, userSYS} from '../common'
const prev = userSYS.pac
export default {
  dashboardTemplate: {
    add(info) {
      return request('post', prev + '/dashboardTemplate/add', info)
    },
    update(info) {
      return request('post', prev + '/dashboardTemplate/update', info)
    },
    delete(query) {
      return request('post', prev + '/dashboardTemplate/del', query)
    },
    get(id) {
      return request('get', prev + '/dashboardTemplate/get', {id})
    },
    getPaged(query) {
      return request('post', prev + '/dashboardTemplate/paged', query)
    },
    statusSwitch(id) {
      return request('get', prev + '/dashboardTemplate/statusSwitch', {id})
    }
  },
  appVersion: {
    add(info) {
      return request('post', prev + '/appVersionControl/add', info)
    },
    update(info) {
      return request('post', prev + '/appVersionControl/update', info)
    },
    delete(id) {
      return request('get', prev + '/appVersionControl/del', {id})
    },
    get(id) {
      return request('get', prev + '/appVersionControl/get', {id})
    },
    getPaged(query) {
      return request('post', prev + '/appVersionControl/paged', query)
    },
    setLastest(id) {
      return request('get', prev + '/appVersionControl/setLastest', {id})
    }
  }
}

