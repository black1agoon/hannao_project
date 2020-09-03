import system from './system'
import barcode from './barcode'
import model from './model'
import work from './work'
import station from './station'
import group from './group'
import equipment from './equipment'
import scheduling from './scheduling'
import spinner from './spinner'
import fettler from './fettler'
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
  ...equipment,
  ...scheduling,
  ...spinner,
  ...fettler,
  ...workticket,
  ...serialnumber,
  ...datacenter
}
