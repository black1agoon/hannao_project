import {request} from '../common'
import config from '@/config'

const prev = config.prev
export default {
  employee: {
    get(id) {
      return request('post', prev + '/manage/employee/get', {id})
    },
    update(info) {
      return request('post', prev + '/manage/employee/update', info)
    },
    paged(query) {
      return request('post', prev + '/manage/employee/paged', query)
    },
    getEnterprisesByEmployeeId(query) {
      return request('post', prev + '/manage/enterpriseEmployeeRecord/getEnterprisesByEmployeeId', query)
    },
    upload(file) {
      let data = new FormData()
      data.append('file', file)
      // let headers = {'Content-Type': 'multipart/form-data'}
      return request('post', prev + '/manage/upload/uploadEmployee', data)
    }
  }
}