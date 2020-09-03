import {request} from '../common'

export default {
  public: {
    login(user) {
      return request('post', '/agency/agencyEmployee/login', user)
    },
    logout() {
      return request('get', '/agency/agencyEmployee/logout')
    },
    changePwd(info) {
      return request('post', '/agency/agencyEmployee/changePwd', info)
    }
  }
}
