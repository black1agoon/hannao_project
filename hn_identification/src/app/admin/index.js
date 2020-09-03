import system from './system'
import client from './client'
import enterprise from './enterprise'
import employee from './employee'
import activecode from './activecode'
export default {
  ...system,
  ...client,
  ...enterprise,
  ...employee,
  ...activecode
}
