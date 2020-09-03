import {request, userSYS} from '../common'
const prev = userSYS.jlw
export default {
  stationDetail: {
    dailyProductionQuantityTrendStatistics(params) {  // 每日
      return request('get', prev + '/stationRecordDay/dailyProductionQuantityTrendStatistics', params)
    },
    todayProductionQuantityTrendStatistics(orderId) { // 当日
      return request('get', prev + '/stationRecordToday/todayProductionQuantityTrendStatistics', {orderId})
    },
    getMonth(orderId) {
      return request('get', prev + '/spinnerReport/getMonthListByOrderId', {orderId})
    },
    pagedDailyProductionQuantityStatisticsOfArticleNumber(query) {  // 获取订单下的款号的日产量统计分页
      return request('post', prev + '/stationRecordDetailDay/pagedDailyProductionQuantityStatisticsOfArticleNumber', query)
    },
    pagedByOrderIdAndMonth(query) {  // 某月下的工位警告分页
      return request('post', prev + '/stationRecordError/pagedByOrderIdAndMonth', query)
    },
    pagedStationRepairByOrderIdAndMonth(query) {  // 某月下的工位报修分页
      return request('post', prev + '/stationRepair/pagedStationRepairByOrderIdAndMonth', query)
    },
    stationPaged(query) { // 获取机台数据统计分页
      return request('post', prev + '/stationOutputStatistics/page', query)
    },
    getSpinnerOutPut(params) {
      return request('get', prev + '/stationRecordHour/getSpinnerOutputHourByOrderIdAndStation', params)
    },
    getOrderStartToEndTime(orderId) {
      return request('get', prev + '/stationRecord/getOrderStartToEndTime', {orderId})
    }
  }
}

