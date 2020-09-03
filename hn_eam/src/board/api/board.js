import { request } from '@/board/api/common'
export default {
  board: {
    getAssetStatisticsInfo() {  // 总的资产数据统计
      return request('get', '/reportForms/getAssetStatisticsInfo')
    },
    getAssetsProportionInfo() {  // 资产数量金额分布图
      return request('get', '/reportForms/getAssetsProportionInfo')
    },
    getAssetsSummaryInfo() {  // 本年度资产出入库金额（按月统计）
      return request('get', '/reportForms/getAssetsSummaryInfo')
    },
    getNewestCheckTaskInfo() {  // 最新一次盘点任务详情
      return request('get', '/reportForms/getNewestCheckTaskInfo')
    },
    getReportForms() {  // 查询看板信息
      return request('get', '/reportForms/getReportForms')
    },
    getThisMonthAssetsOperationLogList() {  // 本月资产变动
      return request('get', '/reportForms/getThisMonthAssetsOperationLogList')
    },
    getThisMonthConsumableUsedList() {  // 本月耗材领用信息
      return request('get', '/reportForms/getThisMonthConsumableUsedList')
    }
  }
}
