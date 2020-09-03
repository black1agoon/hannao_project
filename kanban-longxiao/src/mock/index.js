import { getEnergy } from './building.data'
import { getMapData, getStaffs } from './overview.data'
import { getOrders, getInventoryHistory, getInventoryWeight } from './production.data'
import { getDeviceStatus, getDeviceOutput } from './device.data'
import { getSysStatus } from './system.data'

const mapping = {
  getEnergy,
  getMapData,
  getStaffs,
  getOrders,
  getInventoryWeight,
  getInventoryHistory,
  getDeviceStatus,
  getDeviceOutput,
  getSysStatus,
}

export const getMockData = function (key) {
  return Promise.resolve(mapping[key] ? mapping[key]() : {})
}
