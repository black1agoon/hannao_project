import {request, request2} from './common'

export default {
  Spectaculars: {
    getDeppartmentOperaterQtyRank(DepartmentGuid) {
      return request('get', '/api/Spectaculars/DeppartmentOperaterQtyRank', {DepartmentGuid})
    },
    getWhAllInfo(WhId) {
      return request('get', '/api/Spectaculars/WhAllInfo', {WhId})
    },
    getShowPreCheck(ids) { // 前检车间
      return request('get', '/api/Spectaculars/ShowPreCheck', ids)
    },
    getDingxingShow(DingxingStep) {  // 定型车间小组生产力
      return request('get', '/api/Spectaculars/DingxingShow', {DingxingStep})
    },
    getProtaskProgress() {
      return request('get', '/api/Spectaculars/ProtaskProgress')
    },
    getBianzhiFengtouDep() {
      return request('get', '/api/Spectaculars/GetBianzhiFengtouDep')
    },
    getBigDataCommandCenter() {
      return request('get', '/api/Spectaculars/BigDataCommandCenter')
    },
    getAfterCheckDataShow(AfterCheckStepId) {
      return request('get', '/api/Spectaculars/AfterCheckDataShow', {AfterCheckStepId})
    },
    getTodayWhFlowPic(query) {
      return request('get', '/api/Spectaculars/TodayWhFlowPic', query)
    },
    getWhdetails(query) {
      return request('get', '/api/Spectaculars/Whdetails', query)
    },
    getUnProducePTask() {
      return request('get', '/api/Spectaculars/UnProducePTask')
    },
    getPdetailInfos(params) {
      return request('get', '/api/Spectaculars/PdetailInfos', params)
    }
  },
  ErpData: {
    getAllDep() {
      return request('get', '/api/ErpData/GetAllDep')
    },
    getAllSteps() {  // 获取所有工序
      return request('get', '/api/ErpData/getAllSteps')
    }
  },
  Warehouse: {
    getAllWarehouse() {
      return request('get', '/api/Warehouse/GetAllWarehouse')
    },
    getAllWhFrame() {
      return request('get', '/api/Warehouse/GetAllWhFrame')
    }
  },
  jlw: {
    getWorkshopListDetail() {
      return request2('post', '/jlw/tv/workshop/workshopListDetail')
    },
    getWorkshopDeviceShow(workshopId) {
      return request2('post', '/jlw/tv/workshop/workshopDeviceShow', {workshopId})
    },
    getStationInfo(stationId) {
      return request2('get', '/jlw/tv/workshop/' + stationId)
    },
    getStationStatus() {
      return request2('get', '/jlw/tv/station/stationStatus')
    },
    getSpinnerCount(workshopId) {  // 车间员工统计
      return request2('post', '/jlw/tv/station/spinnerCount', {
        page: 1,
        pageSize: 999,
        workshopId
      })
    },
    getStationCount(workshopId) {  // 车间设备
      return request2('get', '/jlw/tv/station/stationCount/' + workshopId)
    },
    getStationDetail(query) {  // 车间设备状态
      return request2('post', '/jlw/tv/station/stationDetail', query)
    }
  }
}
