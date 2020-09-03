import axios from 'axios'
import config from '@/config'
export const request = (method, path, params, data = null) => {
  let url = config.serverURI + path
  if (method === 'post' && !data && typeof params === 'object') {
    data = params
    params = null
  }
  // console.log(method, url, params, data)
  return axios({method, url, params, data}).then(res => {
    if (res.status === 200) {
      return res.data
    } else {
      return Promise.reject(res.data)
    }
  }).catch(error => {
    // TODO
    return Promise.reject(error)
  })
}
export const request2 = (method, path, params, data = null) => {
  let url = config.serverURI2 + path
  if (method === 'post' && !data && typeof params === 'object') {
    data = params
    params = null
  }
  // console.log(method, url, params, data)
  return axios({method, url, params, data}).then(res => {
    if (res.status === 200) {
      if (res.data && res.data.code === '00') {
        return res.data.data
      }
    } else {
      return Promise.reject(res.data)
    }
  }).catch(error => {
    // TODO
    return Promise.reject(error)
  })
}