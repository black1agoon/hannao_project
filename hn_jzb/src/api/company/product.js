import {request, userSYS} from '../common'
const prev = userSYS.pac
export default {
  companyProduct: {
    addProduct(info) {
      return request('post', prev + '/companyProduct/add', info)
    },
    updateProduct(info) {
      return request('post', prev + '/companyProduct/update', info)
    },
    deleteProduct(id) {
      return request('get', prev + '/companyProduct/del', {id})
    },
    getProduct(id) {
      return request('get', prev + '/companyProduct/get', {id})
    },
    getProductPaged(query) {
      return request('post', prev + '/companyProduct/paged', query)
    },
    OnShelve(query) {
      return request('post', prev + '/companyProduct/onshelve', query)
    },
    UnShelve(query) {
      return request('post', prev + '/companyProduct/unshelve', query)
    },
    getProductTemplate() {
      return prev + '/companyProduct/importProductTemplate'
    },
    productImport(data) {
      return request('post', prev + '/companyProduct/batchImportProduct', data)
    }
  },
  companyProductBrand: {
    addBrand(info) {
      return request('post', prev + '/companyProductBrand/add', info)
    },
    updateBrand(info) {
      return request('post', prev + '/companyProductBrand/update', info)
    },
    deleteBrand(id) {
      return request('get', prev + '/companyProductBrand/del', {id})
    },
    getBrand(id) {
      return request('get', prev + '/companyProductBrand/get', {id})
    },
    getBrandPaged(query) {
      return request('post', prev + '/companyProductBrand/paged', query)
    },
    getBrandShowPaged(query) {
      return request('post', prev + '/companyProductBrand/showPaged', query)
    }
  },
  companyProductCategory: {
    addCategory(info) {
      return request('post', prev + '/companyProductCategory/add', info)
    },
    updateCategory(info) {
      return request('post', prev + '/companyProductCategory/update', info)
    },
    deleteCategory(id) {
      return request('get', prev + '/companyProductCategory/del', {id})
    },
    getCategory(id) {
      return request('get', prev + '/companyProductCategory/get', {id})
    },
    getCategoryPaged(query) {
      return request('post', prev + '/companyProductCategory/paged', query)
    },
    getCategoryShowPaged(query) {
      return request('post', prev + '/companyProductCategory/showPaged', query)
    },
    getProductTemplate(query) {
      return request('post', prev + '/companyProductTemplate/paged', query)
    }
  },
  companyProductCategoryAttr: {
    addAttr(info) {
      return request('post', prev + '/companyProductCategoryAttr/add', info)
    },
    updateAttr(info) {
      return request('post', prev + '/companyProductCategoryAttr/update', info)
    },
    deleteAttr(id) {
      return request('get', prev + '/companyProductCategoryAttr/del', {id})
    },
    getAttr(id) {
      return request('get', prev + '/companyProductCategoryAttr/get', {id})
    },
    getAttrPaged(query) {
      return request('post', prev + '/companyProductCategoryAttr/paged', query)
    }
  }
}

