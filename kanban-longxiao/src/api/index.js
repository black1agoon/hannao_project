import { makeRequest } from './base'
import { createApi } from './common'
import { serverList } from '@/config'
import { request } from '@/api/common'

export default {
  // Home
  building: {
    getEnergy () {
      return makeRequest('getEnergy')
    },
  },

  overview: {
    getMapData () {
      return makeRequest('getMapData', true)
    },
    getStaffs () {
      return makeRequest('getStaffs', true)
    },
    getTradeSummary () {
      return makeRequest('getTradeSummary')
    },
  },

  production: {
    getOrders () {
      return makeRequest('getOrders')
    },
    getStoreHouse (params) {
      return makeRequest('getStoreHouse', { params })
    },
    getInventoryWeight () {
      return makeRequest('getInventoryWeight')
    },
    getInventoryHistory (params) {
      return makeRequest('getInventoryHistory', { params })
    },
  },

  device: {
    getDeviceStatus () {
      return makeRequest('getDeviceStatus', true)
    },
    getDeviceOutput () {
      return makeRequest('getDeviceOutput', true)
    },
  },

  sys: {
    getSysStatus () {
      return makeRequest('getSysStatus', true)
    },
  },

  // StoreHouse
  storage: createApi(serverList.main + '/KanBan/Storage', [
    { name: 'GetStoreHouseInOutDetails', method: 'get', wrap: 'id' },  // 获取出入库记录
    { name: 'GetStoreHouseByName', method: 'get', wrap: 'storeHouseName' },  // 获取仓库信息
    { name: 'GetInventoryDetailPage' },  // 获取仓库库存明细
    { name: 'GetInventoryNow', method: 'get', wrap: 'id' },  // 获取实施库存
    { name: 'GetInventoryHistoryDay', method: 'get', wrap: 'id' },  // 获取仓15天出入库
  ], {
    getStoreHouseByName (storeHouseName) {
      return request('get', serverList.main + '/KanBan/Storage/GetStoreHouseByName', { storeHouseName })
    },
    getInventoryNow (id) {  // 获取仓库实时库存情况 查询仓库的总库存数、当日出库总数、当如入库总数
      return request('get', serverList.main + '/KanBan/Storage/GetInventoryNow', { id })
    },
    getInventoryDetailPage (query) {
      return request('post', serverList.main + '/KanBan/Storage/GetInventoryDetailPage', query)
    },
  }),
  applyKanBan: {
    getApplyListByStoreHouseId (id) {
      return request('get', serverList.main + '/KanBan/ApplyKanBan/GetApplyListByStoreHouseId', { id })
    },
  },
  jlwKanBan: {
    getDayProduction (id) {  // 今日产量
      return request('get', serverList.jlw + '/building/mask/getDayProduction', { id })
    },
    getTroubleFreeWorkHours (id) {  // 运行时长
      return request('get', serverList.jlw + '/building/mask/getTroubleFreeWorkHours', { id })
    },
    getTimeProduction (id) {
      return request('get', serverList.jlw + '/building/mask/getTimeProduction', { id })
    },
    getMaskInfo (id) { // 各电焊机运行数据
      return request('get', serverList.jlw + '/building/mask/getMaskInfo', { id })
    },
    getWarningInfo (id) { // 预警信息
      return request('get', serverList.jlw + '/building/mask/getWarningInfo', { id })
    },
    getAllMaskEquipmentInfo () {
      return request('get', serverList.jlw + '/building/equipment/getAllMaskEquipmentInfo')
    },
    getDailyDayFlow () {
      return request('get', serverList.jlw + '/building/dailyFlow/getDailyDayFlow')
    },
  },
}
