import { serverList } from '@/config'

export const tenantId = 10

export const urlConfig = {
  getEnergy: serverList.energy + '/dailyFlow/getDailyDayFlow',
  getStoreHouse: serverList.main + '/KanBan/Storage/GetStoreHouseByName',
  getInventoryHistory: serverList.main + '/KanBan/Storage/GetInventoryHistoryDay',
  getTradeSummary: serverList.main + '/KanBan/Production/GetTradeSummary',
  getOrders: serverList.main + '/KanBan/Production/GetTradeProductionDetail',
  getInventoryWeight: serverList.main + '/KanBan/Production/GetStockSummaryInfo',
}
