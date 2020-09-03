import {request} from '../common'
import config from '@/config'

const prev = config.prev
export default {
  enterprise: {
    get(id) {
      return request('post', prev + '/manage/enterprise/get', {id})
    },
    update(info) {
      return request('post', prev + '/manage/enterprise/update', info)
    },
    delete(idList) {
      return request('get', prev + '/manage/enterprise/del', {idList: idList.toString()})
    },
    paged(query) {
      return request('post', prev + '/manage/enterprise/paged', query)
    },
    getEmployeesByEnterpriseId(query) {
      return request('post', prev + '/manage/enterpriseEmployeeRecord/getEmployeesByEnterpriseId', query)
    },
    upload(file) {
      let data = new FormData()
      data.append('file', file)
      // let headers = {'Content-Type': 'multipart/form-data'}
      return request('post', prev + '/manage/upload/uploadEnterprise', data)
    },
    getIndustry() {
      return request('get', prev + '/manage/enterpriseIndustry/all')
    }
  }
}