import {request, userSYS} from '../common'
const prev = userSYS.pac
export default {
  cardType: {
    addCardType(info) {
      return request('post', prev + '/cardType/add', info)
    },
    updateCardType(info) {
      return request('post', prev + '/cardType/update', info)
    },
    deleteCardType(id) {
      return request('get', prev + '/cardType/del', {id})
    },
    getCardType(id) {
      return request('get', prev + '/cardType/get', {id})
    },
    getCardTypePaged(query) {
      return request('post', prev + '/cardType/paged', query)
    }
  },
  card: {
    updateCard(info) {
      return request('post', prev + '/card/update', info)
    },
    deleteCard(id) {
      return request('get', prev + '/card/del', {id})
    },
    getCard(id) {
      return request('get', prev + '/card/get', {id})
    },
    getCardPaged(query) {
      return request('post', prev + '/card/paged', query)
    },
    getCardIcTemplate() {
      // return request('get', prev + '/card/icTemplate')
      return prev + '/card/icTemplate'
    },
    batchImportBarCode(params) {
      return request('post', prev + '/card/batchImportBarCode', params)
    },
    batchImporticChip(data) {
      return request('post', prev + '/card/batchImporticChip', data)
    },
    getImportBatchPaged(query) {
      return request('post', prev + '/cardImportBatch/paged', query)
    },
    exportBatchDetails(id) {
      return prev + '/cardImportBatch/exportCardBatch' + '?id=' + id
    }
  }
}

