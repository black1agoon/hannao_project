import {request} from './common'
import config from '@/config'
const prev = config.prev
export default {
  home: {
    total() {
      return request('get', prev + '/manage/homePage/total')
    },
    employeeCount() {
      return request('get', prev + '/manage/homePage/employeeCount')
    },
    enterpriseDetail(query) {
      return request('post', prev + '/manage/homePage/enterpriseDetail', query)
    },
    enterpriseEmployeeMonth(type) {
      return request('post', prev + '/manage/homePage/enterpriseEmployeeMonth', {type})
    },
    activeCodeMonth(type) {
      return request('post', prev + '/manage/homePage/activeCodeMonth', {type})
    },
    activeCodeStartUpDayRate() {
      return request('get', prev + '/manage/homePage/activeCodeStartUpDayRate')
    }
  }
}