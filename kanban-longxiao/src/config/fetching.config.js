export const actionIntervals = {
  'buildingModule/fetchDailyData': 80,
  'overviewModule/fetchMapData': 20,
  'overviewModule/fetchStaffs': 60,
  'productionModule/fetchTradeSummary': 80,
  'productionModule/fetchOrders': 160,
  'productionModule/fetchProductInventoryHistory': { interval: 300, params: ['成品仓', '成品暂存仓'] },
  'productionModule/fetchMaterialInventoryWeight': 300,
  'deviceModule/fetchDeviceStatus': 120,
  'deviceModule/fetchDeviceOutput': 120,
  'systemModule/fetchSysStatus': 80,
}

