import chargingpile from './chargingpile'
import transportlist from './transportlist'
import vehicleinfo from './vehicleinfo'
import agv from './agv'
import monitor from './monitor'
import storage from './storage'
import log from './log'
import parameters from './parameters'
import goods from './goods'
import pointsite from './pointsite'
import loading from './loading'
export default {
  ...chargingpile,
  ...transportlist,
  ...vehicleinfo,
  ...agv,
  ...monitor,
  ...storage,
  ...log,
  ...parameters,
  ...goods,
  ...pointsite,
  ...loading
}