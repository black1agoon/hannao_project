import {request, userSYS} from '../common'
const prev = userSYS.jlw
export default {
  workshop: {
    add(info) {
      return request('post', prev + '/workshop/add', info)
    },
    update(info) {
      return request('post', prev + '/workshop/update', info)
    },
    delete(id) {
      return request('get', prev + '/workshop/del', {id})
    },
    get(id) {
      return request('get', prev + '/workshop/get', {id})
    },
    paged(query) {
      return request('post', prev + '/workshop/paged', query)
    }
  },
  workshopOrder: {
    add(info) {
      return request('post', prev + '/workshopOrder/add', info)
    },
    update(info) {
      return request('post', prev + '/workshopOrder/update', info)
    },
    delete(id) {
      return request('get', prev + '/workshopOrder/del', {id})
    },
    get(id) {
      return request('get', prev + '/workshopOrder/get', {id})
    },
    paged(query) {
      return request('post', prev + '/workshopOrder/paged', query)
    },
    getTemplate() {
      return prev + '/workshopOrder/importTemplate'
    },
    importTemplate(data) {
      return request('post', prev + '/workshopOrder/importXls', data)
    },
    upload(file) {
      let data = new FormData()
      data.append('file', file)
      // let headers = {'Content-Type': 'multipart/form-data'}
      return request('post', prev + '/workshopOrderImage/upload', data)
    },
    getQuery(id) {
      return request('get', prev + '/workshopOrder/query', {id})
    },
    production(id) {
      return request('get', prev + '/workshopOrder/production', {id})
    },
    cancel(id) {
      return request('get', prev + '/workshopOrder/cancel', {id})
    },
    getExcel(orderId) {
      return request('get', prev + '/workshopOrder/getExcel', {orderId})
    }
  },
  workshopOrderDetail: {
    add(info) {
      return request('post', prev + '/workshopOrderDetail/add', info)
    },
    update(info) {
      return request('post', prev + '/workshopOrderDetail/update', info)
    },
    delete(id) {
      return request('get', prev + '/workshopOrderDetail/del', {id})
    },
    paged(query) {
      return request('post', prev + '/workshopOrderDetail/paged', query)
    }
  },
  workshopOrderMaterial: {
    add(info) {
      return request('post', prev + '/workshopOrderMaterial/add', info)
    },
    update(info) {
      return request('post', prev + '/workshopOrderMaterial/update', info)
    },
    delete(id) {
      return request('get', prev + '/workshopOrderMaterial/del', {id})
    }
  },
  workshopOrderImage: {
    add(info) {
      return request('post', prev + '/workshopOrderImage/add', info)
    },
    update(info) {
      return request('post', prev + '/workshopOrderImage/update', info)
    },
    delete(id) {
      return request('get', prev + '/workshopOrderImage/del', {id})
    }
  },
  workshopOrderEndProduct: {
    update(info) {
      return request('post', prev + '/workshopOrderEndProduct/updateByNameSize', info)
    },
    addName(info) {
      return request('post', prev + '/workshopOrderEndProductName/add', info)
    },
    updateName(info) {
      return request('post', prev + '/workshopOrderEndProductName/update', info)
    },
    deleteName(info) {
      return request('get', prev + '/workshopOrderEndProductName/del', info)
    },
    addSize(info) {
      return request('post', prev + '/workshopOrderEndProductSize/add', info)
    },
    updateSize(info) {
      return request('post', prev + '/workshopOrderEndProductSize/update', info)
    },
    deleteSize(info) {
      return request('get', prev + '/workshopOrderEndProductSize/del', info)
    }
  },
  workshopOrderDeplane: {
    update(info) {
      return request('post', prev + '/workshopOrderDeplane/updateByNameSize', info)
    },
    addName(info) {
      return request('post', prev + '/workshopOrderDeplaneName/add', info)
    },
    updateName(info) {
      return request('post', prev + '/workshopOrderDeplaneName/update', info)
    },
    deleteName(info) {
      return request('get', prev + '/workshopOrderDeplaneName/del', info)
    },
    addSize(info) {
      return request('post', prev + '/workshopOrderDeplaneSize/add', info)
    },
    updateSize(info) {
      return request('post', prev + '/workshopOrderDeplaneSize/update', info)
    },
    deleteSize(info) {
      return request('get', prev + '/workshopOrderDeplaneSize/del', info)
    }
  }
}

