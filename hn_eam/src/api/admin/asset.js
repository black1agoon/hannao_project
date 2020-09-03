import {download, request} from '../common'

export default {
  assetController: {
    add(info) {
      return request('post', '/agencyAsset/add', info)
    },
    update(info) {
      return request('post', '/agencyAsset/update', info)
    },
    delete(assetIds) {
      return request('get', '/agencyAsset/del', {assetIds: assetIds.toString()})
    },
    get(id) {
      return request('get', '/agencyAsset/getAgencyAssetById', {id})
    },
    paged(query) {
      return request('post', '/agencyAsset/paged', query)
    },
    getTemplate() {
      return '/agencyAsset/downloadAssetTemplate'
    },
    importTemplate(file) {
      let data = new FormData()
      data.append('file', file.file)
      return request('post', '/agencyAsset/importExcel', data)
    },
    uploadPic(file) {
      let data = new FormData()
      data.append('file', file)
      // let headers = {'Content-Type': 'multipart/form-data'}
      return request('post', '/agencyAsset/uploadAssetPicture', data)
    },
    getOrganizationTree() {
      return request('get', '/agencyAssetsReceive/getOrganizationTree')
    },
    pagedByType(query) {
      return request('post', '/agencyAsset/getAssetPageByType', query)
    },
    assetExport(params) {
      return download('get', '/agencyAsset/downAssetList', params, null, 'arraybuffer')
    }
  },
  positionSetting: {
    add(info) {
      return request('post', '/agencyAssetsPosition/add', info)
    },
    update(info) {
      return request('post', '/agencyAssetsPosition/update', info)
    },
    delete(assetIds) {
      return request('get', '/agencyAssetsPosition/del', {assetIds: assetIds.toString()})
    },
    get(id) {
      return request('get', '/agencyAssetsPosition/get', {id})
    },
    getAll() {
      return request('get', '/agencyAssetsPosition/getAll')
    },
    paged(query) {
      return request('post', '/agencyAssetsPosition/paged', query)
    },
    getTemplate() {
      return '/agencyAssetsPosition/downloadAssetTemplate'
    },
    importTemplate(file) {
      let data = new FormData()
      data.append('file', file.file)
      return request('post', '/agencyAssetsPosition/importExcel', data)
    }
  },
  typeSetting: {
    add(info) {
      return request('post', '/agencyAssetsType/add', info)
    },
    update(info) {
      return request('post', '/agencyAssetsType/update', info)
    },
    delete(id) {
      return request('get', '/agencyAssetsType/del', {id})
    },
    getTemplate() {
      return '/agencyAssetsType/downloadAssetTypeTemplate'
    },
    importTemplate(file) {
      let data = new FormData()
      data.append('file', file.file)
      return request('post', '/agencyAssetsType/importExcel', data)
    },
    getTypeTree() {
      return request('get', '/agencyAssetsType/getTypeTree')
    }
  },
  rateSetting: {
    getRate() {
      return request('post', '/agencyAsset/getDefaultRateOfDepreciation')
    },
    setRate(type) {
      return request('post', '/agencyAsset/setDefaultRateOfDepreciation', {type}, {})
    }
  },
  operationLog: {
    paged(query) {
      return request('post', '/agencyAssetsOperationLog/getAssetsOperationLogPage', query)
    }
  },
  assetReceive: {
    add(info) {
      return request('post', '/agencyAssetsReceive/addAssetsReceive', info)
    },
    update(info) {
      return request('post', '/agencyAssetsReceive/updateReceiveInfo', info)
    },
    delete(ids) {
      return request('get', '/agencyAssetsReceive/delReceivesByIds', {ids: ids.toString()})
    },
    get(id) {
      return request('get', '/agencyAssetsReceive/getReceiveInfoById', {id})
    },
    paged(query) {
      return request('post', '/agencyAssetsReceive/getAssetsReceivePagedList', query)
    },
    getOrganizationTree() {
      return request('get', '/agencyAssetsReceive/getOrganizationTree')
    },
    assetExport(params) {
      return download('get', '/agencyAssetsReceive/downAssetsReceiveList', params, null, 'arraybuffer')
    }
  },
  assetTranfer: {
    add(info) {
      return request('post', '/agencyAssetsTransfer/addAssetsTransfer', info)
    },
    update(info) {
      return request('post', '/agencyAssetsTransfer/updateTransferInfo', info)
    },
    delete(ids) {
      return request('get', '/agencyAssetsTransfer/delTransfersByIds', {ids: ids.toString()})
    },
    get(id) {
      return request('get', '/agencyAssetsTransfer/getTransferInfoById', {id})
    },
    paged(query) {
      return request('post', '/agencyAssetsTransfer/getAssetsTransferPagedList', query)
    },
    assetExport(params) {
      return download('get', '/agencyAssetsTransfer/downAssetsTransferList', params, null, 'arraybuffer')
    }
  },
  assetReturn: {
    add(info) {
      return request('post', '/agencyAssetsReturn/addAssetsReturn', info)
    },
    update(info) {
      return request('post', '/agencyAssetsReturn/updateReturnInfo', info)
    },
    delete(ids) {
      return request('get', '/agencyAssetsReturn/delReturnsByIds', {ids: ids.toString()})
    },
    get(id) {
      return request('get', '/agencyAssetsReturn/getReturnInfoById', {id})
    },
    paged(query) {
      return request('post', '/agencyAssetsReturn/getaddAssetsReturnPagedList', query)
    },
    assetExport(params) {
      return download('get', '/agencyAssetsReturn/downAssetsReturnList', params, null, 'arraybuffer')
    }
  },
  assetMaintain: {
    add(info) {
      return request('post', '/agencyAssetsMaintain/addAssetsMaintain', info)
    },
    update(info) {
      return request('post', '/agencyAssetsMaintain/updateMaintainInfo', info)
    },
    delete(ids) {
      return request('get', '/agencyAssetsMaintain/delMaintainsByIds', {ids: ids.toString()})
    },
    get(id) {
      return request('get', '/agencyAssetsMaintain/getMaintainInfoById', {id})
    },
    paged(query) {
      return request('post', '/agencyAssetsMaintain/getAssetsMaintainPagedList', query)
    },
    assetExport(params) {
      return download('get', '/agencyAssetsMaintain/downAssetsMaintainList', params, null, 'arraybuffer')
    }
  },
  assetClean: {
    add(info) {
      return request('post', '/agencyAssetsClean/addAssetsClean', info)
    },
    paged(query) {
      return request('post', '/agencyAssetsClean/getAssetsCleanPagedList', query)
    },
    assetExport(params) {
      return download('get', '/agencyAssetsClean/downAssetsCleanList', params, null, 'arraybuffer')
    }
  },
  assetCheck: {
    add(info) {
      return request('post', '/agencyAssetsCheckTask/addAssetsCheckTask', info)
    },
    update(info) {
      return request('post', '/agencyAssetsCheckTask/updateAssetsCheckTask', info)
    },
    get(id) {
      return request('get', '/agencyAssetsCheckTask/getAssetsCheckTaskById', {id})
    },
    paged(query) {
      return request('post', '/agencyAssetsCheckTask/getAssetsCheckTaskPagedList', query)
    },
    getUserList() {
      return request('get', '/agencyAssetsCheckTask/getCheckTaskUserList')
    },
    compare(ids) {  // 对比盘点信息
      return request('get', '/agencyAssetsCheckTask/getCheckTaskContrastResultList', {ids: ids.toString()})
    },
    getCheckTask(taskIdList) {
      return request('get', '/agencyAssetsCheckList/getAssetListByTaskIds', {taskIdList: taskIdList.toString()})
    },
    doCheck(info) {
      return request('post', '/agencyAssetsCheckList/updateAssetsCheckList', info)
    }
  }
}

