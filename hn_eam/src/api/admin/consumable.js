import {request, download} from '../common'

export default {
  consumableType: {
    add(info) {
      return request('post', '/agencyConsumableType/add', info)
    },
    update(info) {
      return request('post', '/agencyConsumableType/update', info)
    },
    delete(id) {
      return request('get', '/agencyConsumableType/delete', {id})
    },
    getTemplate() {
      return '/agencyConsumableType/downloadConsumableTypeTemplate'
    },
    importTemplate(file) {
      let data = new FormData()
      data.append('file', file.file)
      return request('post', '/agencyConsumableType/importConsumableType', data)
    },
    getTypeTree() {
      return request('get', '/agencyConsumableType/getTypeTree')
    }
  },
  consumable: {
    add(info) {
      return request('post', '/agencyConsumable/add', info)
    },
    update(info) {
      return request('post', '/agencyConsumable/update', info)
    },
    delete(ids) {
      return request('get', '/agencyConsumable/deleteBatch', {ids: ids.toString()})
    },
    paged(query) {
      return request('post', '/agencyConsumable/paged', query)
    },
    getTemplate() {
      return '/agencyConsumable/downloadConsumableTemplate'
    },
    importTemplate(file) {
      let data = new FormData()
      data.append('file', file.file)
      return request('post', '/agencyConsumable/importConsumable', data)
    },
    uploadPic(file) {
      let data = new FormData()
      data.append('file', file)
      // let headers = {'Content-Type': 'multipart/form-data'}
      return request('post', '/agencyConsumable/uploadCarMileage', data)
    },
    exportAll() {
      // return '/agencyConsumable/exportAllConsumable'
      return download('get', '/agencyConsumable/exportAllConsumable', null, null, 'arraybuffer')
    },
    getList(query) {
      return request('post', '/agencyConsumable/getConsumbaleList', query)
    }
  },
  consumableWarehouse: {
    add(info) {
      return request('post', '/agencyWarehouse/add', info)
    },
    update(info) {
      return request('post', '/agencyWarehouse/update', info)
    },
    delete(ids) {
      return request('get', '/agencyWarehouse/deleteBatch', {ids: ids.toString()})
    },
    paged(query) {
      return request('post', '/agencyWarehouse/paged', query)
    },
    getTemplate() {
      return '/agencyWarehouse/downloadWarehouseTemplate'
    },
    importTemplate(file) {
      let data = new FormData()
      data.append('file', file.file)
      return request('post', '/agencyWarehouse/importWarehouse', data)
    },
    exportAll() {
      // return '/agencyConsumable/exportAllConsumable'
      return download('get', '/agencyWarehouse/exportAllWarehouse', null, null, 'arraybuffer')
    },
    getStockoutList() {
      return request('get', '/agencyWarehouse/getStockoutWarehouseIdList')
    }
  },
  consumableStockin: {
    add(info) {  // 确认入库
      return request('post', '/agencyConsumableStockin/confirm', info)
    },
    zancun(info) {  // 确认入库
      return request('post', '/agencyConsumableStockin/temporary', info)
    },
    updateAdd(info) {
      return request('post', '/agencyConsumableStockin/updateAndConfirmStockin', info)
    },
    updateZancun(info) {
      return request('post', '/agencyConsumableStockin/updateAndTemporaryStockin', info)
    },
    delete(ids) {
      return request('get', '/agencyConsumableStockin/deleteBatch', {ids: ids.toString()})
    },
    get(stockinCode) {
      return request('get', '/agencyConsumableStockin/getDetail', {stockinCode})
    },
    paged(query) {
      return request('post', '/agencyConsumableStockin/paged ', query)
    },
    cancelBatch(ids) {
      return request('get', '/agencyConsumableStockin/cancelBatch', {ids: ids.toString()})
    },
    getTemplate() {
      // return '/agencyConsumableStockin/downloadConsumableStockinTemplate'
      return download('get', '/agencyConsumableStockin/downloadConsumableStockinTemplate', null, null, 'arraybuffer')
    },
    importTemplate(file) {
      let data = new FormData()
      data.append('file', file.file)
      return request('post', '/agencyConsumableStockin/importStockinConsumable', data)
    },
    exportAll() {
      // return '/agencyConsumable/exportAllConsumable'
      return download('get', '/agencyConsumableStockin/exportAllStockin', null, null, 'arraybuffer')
    }
  },
  consumableStockout: {
    add(info) {  // 确认入库
      return request('post', '/agencyConsumableStockout/confirm', info)
    },
    zancun(info) {  // 确认入库
      return request('post', '/agencyConsumableStockout/temporary', info)
    },
    updateAdd(info) {
      return request('post', '/agencyConsumableStockout/updateAndConfirmStockout', info)
    },
    updateZancun(info) {
      return request('post', '/agencyConsumableStockout/updateAndTemporaryStockout', info)
    },
    delete(ids) {
      return request('get', '/agencyConsumableStockout/deleteBatch', {ids: ids.toString()})
    },
    get(stockoutCode) {
      return request('get', '/agencyConsumableStockout/getDetail', {stockoutCode})
    },
    paged(query) {
      return request('post', '/agencyConsumableStockout/paged ', query)
    },
    cancelBatch(ids) {
      return request('get', '/agencyConsumableStockout/cancelBatch', {ids: ids.toString()})
    },
    getTemplate(warehouseId) {
      // return '/agencyConsumableStockin/downloadConsumableStockinTemplate'
      return download('get', '/agencyConsumableStockout/downloadConsumableStockoutTemplate', {warehouseId}, null, 'arraybuffer')
    },
    importTemplate(file) {
      let data = new FormData()
      data.append('file', file.file)
      return request('post', '/agencyConsumableStockout/importStockoutConsumable', data)
    },
    exportAll() {
      // return '/agencyConsumable/exportAllConsumable'
      return download('get', '/agencyConsumableStockout/exportAllStockout', null, null, 'arraybuffer')
    }
  },
  consumableInventory: {
    paged(query) {
      return request('post', '/agencyConsumableInventory/paged', query)
    },
    exportWh(warehouseId) {
      // return '/agencyConsumable/exportAllConsumable'
      return download('get', '/agencyConsumableInventory/exportConsumableInventory', {warehouseId}, null, 'arraybuffer')
    }
  },
  consumableUsed: {
    paged(query) {
      return request('post', '/agencyConsumableUsed/paged', query)
    },
    exportByQuery(query) {
      // return '/agencyConsumable/exportAllConsumable'
      return download('get', '/agencyConsumableUsed/exportAllConsumableUsed', query, null, 'arraybuffer')
    }
  }
}

