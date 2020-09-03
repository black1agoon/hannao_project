import system from './system'
import barcode from './barcode'
import model from './model'
import work from './work'
import station from './station'
import group from './group'
import workticket from './workticket'
import serialnumber from './serialnumber'
import datacenter from './datacenter'
export default {
  ...system,
  ...barcode,
  ...model,
  ...work,
  ...station,
  ...group,
  ...workticket,
  ...serialnumber,
  ...datacenter
}
