import {request, userSYS} from '../common'
const prev = userSYS.pac
export default {
  companyPublic: {
    login(user) {
      return request('post', prev + '/companyPublic/login', user)
    },
    logout() {
      return request('post', prev + '/companyPublic/logout')
    },
    uploadPic(file, compressed = false) {
      let data = new FormData()
      data.append('file', file)
      // let headers = {'Content-Type': 'multipart/form-data'}
      let reqUrl = prev + '/companyUpload/uploadPic'
      if (compressed) {
        reqUrl += '?m=c&w=180&h=180'
      }
      return request('post', reqUrl, data)
    },
    uploadVideo(file) {
      let data = new FormData()
      data.append('file', file)
      // let headers = {'Content-Type': 'multipart/form-data'}
      return request('post', prev + '/companyUpload/uploadVideo', data)
    },
    updateUserPwd(info) {
      return request('post', prev + '/companyPublic/updatePassword', info)
    }
  }
}
