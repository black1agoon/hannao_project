import {request, userSYS} from './common'
const prev = userSYS.mss
export default {
  mobileProduct: {
    getProductDetail(params) {
      return request('post', prev + '/public/productWebRequest', params)
    },
    sendMobileCertificationVCode(mobile) {
      return request('get', prev + '/userCertification/sendMobileCertificationVCode', {mobile})
    },
    checkMobileCertificationVCode(info) {
      return request('post', prev + '/userCertification/checkMobileCertificationVCode', info)
    }
  }
}
