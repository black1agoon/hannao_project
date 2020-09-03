import {request, userSYS} from '../common'
const prev = userSYS.jlw
export default {
  barCode: {
    addBarCode(info) {
      return request('post', prev + '/barCode/add', info)
    },
    updateBarCode(info) {
      return request('post', prev + '/barCode/update', info)
    },
    deleteBarCode(id) {
      return request('get', prev + '/barCode/del', {id})
    },
    getBarCode(id) {
      return request('get', prev + '/barCode/get', {id})
    },
    getBarCodePaged(query) {
      return request('post', prev + '/barCode/paged', query)
    },
    getBarCodeTemplate() {
      return prev + '/barCode/importTemplate'
    },
    importBarCode(file) {
      let data = new FormData()
      data.append('file', file)
      // let headers = {'Content-Type': 'multipart/form-data'}
      return request('post', prev + '/barCode/import', data)
    },
    getBarCodeBatchPaged(query) {
      return request('post', prev + '/barCodeBatch/paged', query)
    }
  }
}

