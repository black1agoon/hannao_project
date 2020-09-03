import {request, userSYS} from '../common'
const prev = userSYS.pac
export default {
  companyCard: {
    getCard(id) {
      return request('get', prev + '/companyCard/get', {id})
    },
    getCardPaged(query) {
      return request('post', prev + '/companyCard/paged', query)
    },
    batchImport(params) {
      return request('post', prev + '/companyCard/batchImport', params)
    },
    getImportBatchPaged(query) {
      return request('post', prev + '/companyCardImportBatch/paged', query)
    },
    exportBatchDetails(id) {
      return prev + '/companyCardImportBatch/exportCardBatch' + '?id=' + id
    }
  }
}

