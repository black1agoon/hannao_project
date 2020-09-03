import admin from './admin'
import company from './company'
import mobile from '../mobile/api/index'
export default {
  ...admin,
  ...company,
  ...mobile
}
