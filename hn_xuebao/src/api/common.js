import axios from 'axios'
import config from '@/config'
export const request = (method, _url, params, data = null) => {
  // get -> params  post -> data
  if (method === 'post' && !data && typeof params === 'object') {
    data = params
    params = null
  }
  let url = process.env.NODE_ENV === 'production' ? config.serverURI + _url : _url
  return axios({method, url, params, data}).then((res) => {
      return res.data.data
  }).catch(error => {
    // TODO
    return Promise.reject(error)
  })
}


