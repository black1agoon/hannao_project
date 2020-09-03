import {request, userSYS} from '../common'
const prev = userSYS.pac
export default {
  register: {
    register(info) {
      return request('post', prev + '/companyPublic/register', info)
    },
    sendRegisterEmail(email) {
      return request('post', prev + '/companyPublic/sendRegisterEmail?email=' + email)
    },
    cooApply(info) {
      return request('post', prev + '/companyPublic/cooApply', info)
    },
    upload(file) {
      let data = new FormData()
      data.append('file', file)
      // let headers = {'Content-Type': 'multipart/form-data'}
      return request('post', prev + '/public/upload', data)
    },
    validToken(token) {
      return request('post', prev + '/companyPublic/validToken?token=' + token, null, null, 'register')
    },
    getIndustryPaged(query) {
      return request('post', prev + '/companyPublic/paged', query)
    }
  }
}
