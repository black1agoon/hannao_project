import {request, system} from '../common'

const prev = system.prev
export default {
  floor: {
    add(info) {
      return request('post', prev + '/floor/add', info)
    },
    update(info) {
      return request('post', prev + '/floor/update', info)
    },
    delete(id) {
      return request('get', prev + '/floor/del', {id})
    },
    paged(query) {
      return request('post', prev + '/floor/paged', query)
    },
    uploadMap(file) {
      let data = new FormData()
      data.append('file', file)
      // let headers = {'Content-Type': 'multipart/form-data'}
      return request('post', prev + '/floor/uploadMap', data)
    },
    tablePaged(query) {
      return request('post', prev + '/table/paged', query)
    }
  },
  floorNumber: {
    choose(params) {
      return request('post', prev + '/floorNumber/choose', params)
    },
    cancel(params) {
      return request('post', prev + '/floorNumber/cancel', params)
    },
    setNumber(params) {
      return request('post', prev + '/floorNumber/setNumber', params)
    },
    setMain(params) {
      return request('post', prev + '/floorNumber/setMain', params)
    }
  }
}