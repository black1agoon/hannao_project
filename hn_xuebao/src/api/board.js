import { request } from './common'

export default {
  LMFrameHandheld: {
    GetLocalStockList() { // 获取本地龙门架和仓库列表信息
      return request('get', '/api/LMFrameHandheld/GetLocalStockList')
    },
    XBStoManageCenter(params) {
      return request('get', '/api/LMFrameHandheld/XBStoManageCenter', params)
    },
    AnomalyBarcodeInfoList(whFrameId) { // 电视机上所有异常条码信息
      return request('get', '/api/LMFrameHandheld/AnomalyBarcodeInfoList', {whFrameId})
    }
  }
}
