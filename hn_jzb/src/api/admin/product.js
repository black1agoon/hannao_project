import {request, userSYS} from '../common'
const prev = userSYS.pac
export default {
  productBrand: {
    addBrand(info) {
      return request('post', prev + '/productBrand4Base/add', info)
    },
    updateBrand(info) {
      return request('post', prev + '/productBrand4Base/update', info)
    },
    deleteBrand(id) {
      return request('get', prev + '/productBrand4Base/del', {id})
    },
    getBrand(id) {
      return request('get', prev + '/productBrand4Base/get', {id})
    },
    getBrandPaged(query) {
      return request('post', prev + '/productBrand4Base/paged', query)
    },
    getBrandShowPaged(query) {
      return request('post', prev + '/productBrand4Base/showPaged', query)
    }
  },
  productCategory: {
    addCategory(info) {
      return request('post', prev + '/productCategory4Base/add', info)
    },
    updateCategory(info) {
      return request('post', prev + '/productCategory4Base/update', info)
    },
    deleteCategory(id) {
      return request('get', prev + '/productCategory4Base/del', {id})
    },
    getCategory(id) {
      return request('get', prev + '/productCategory4Base/get', {id})
    },
    getCategoryPaged(query) {
      return request('post', prev + '/productCategory4Base/paged', query)
    },
    getCategoryShowPaged(query) {
      return request('post', prev + '/productCategory4Base/showPaged', query)
    },
    categoryAudit(query) {
      return request('post', prev + '/productCategory4Base/audit', query)
    }
  },
  productCategoryAttr: {
    addAttr(info) {
      return request('post', prev + '/productCategoryAttr4Base/add', info)
    },
    updateAttr(info) {
      return request('post', prev + '/productCategoryAttr4Base/update', info)
    },
    deleteAttr(id) {
      return request('get', prev + '/productCategoryAttr4Base/del', {id})
    },
    getAttr(id) {
      return request('get', prev + '/productCategoryAttr4Base/get', {id})
    },
    getAttrPaged(query) {
      return request('post', prev + '/productCategoryAttr4Base/paged', query)
    }
  },
  productType: {
    addType(info) {
      return request('post', prev + '/productType4Base/add', info)
    },
    updateType(info) {
      return request('post', prev + '/productType4Base/update', info)
    },
    deleteType(id) {
      return request('get', prev + '/productType4Base/del', {id})
    },
    getType(id) {
      return request('get', prev + '/productType4Base/get', {id})
    },
    getTypesubPaged(query) {
      return request('post', prev + '/productType4Base/subPaged', query)
    },
    getTypeTree() {
      return request('get', prev + '/productType4Base/tree')
    }
  },
  product: {
    addProduct(info) {
      return request('post', prev + '/product4Base/add', info)
    },
    updateProduct(info) {
      return request('post', prev + '/product4Base/update', info)
    },
    deleteProduct(id) {
      return request('get', prev + '/product4Base/del', {id})
    },
    getProduct(id) {
      return request('get', prev + '/product4Base/get', {id})
    },
    getProductPaged(query) {
      return request('post', prev + '/product4Base/paged', query)
    },
    OnShelve(query) {
      return request('post', prev + '/product4Base/onshelve', query)
    },
    UnShelve(query) {
      return request('post', prev + '/product4Base/unshelve', query)
    },
    getProductMsg(query) {
      return request('post', '/mss/public/productWebRequest', query)
    },
    getProductTemplate() {
      return prev + '/product4Base/importProductTemplate'
    },
    productImport(data) {
      return request('post', prev + '/product4Base/batchImportProduct', data)
    }
  },
  productUnshelveReason: {
    addReason(info) {
      return request('post', prev + '/productUnshelveReason4Base/add', info)
    },
    updateReason(info) {
      return request('post', prev + '/productUnshelveReason4Base/update', info)
    },
    deleteReason(id) {
      return request('get', prev + '/productUnshelveReason4Base/del', {id})
    },
    getReason(id) {
      return request('get', prev + '/productUnshelveReason4Base/get', {id})
    },
    getReasonPaged(query) {
      return request('post', prev + '/productUnshelveReason4Base/paged', query)
    }
  },
  productTemplate: {
    add(info) {
      return request('post', prev + '/productTemplate4Base/add', info)
    },
    update(info) {
      return request('post', prev + '/productTemplate4Base/update', info)
    },
    delete(id) {
      return request('get', prev + '/productTemplate4Base/del', {id})
    },
    get(id) {
      return request('get', prev + '/productTemplate4Base/get', {id})
    },
    getPaged(query) {
      return request('post', prev + '/productTemplate4Base/paged', query)
    }
  }
}

