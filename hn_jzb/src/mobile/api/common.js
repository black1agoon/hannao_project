import axios from 'axios'
import config from '@/config'

axios.interceptors.request.use(config => {
  if (!config.headers.token && window.localStorage.getItem('token')) {
    config.headers.token = window.localStorage.getItem('token')
  }
  return config
}, error => {
  console.error(error)
})

export const request = (method, path, params, data = null) => {
  if (!method) {
    console.error('API function call requires `method` argument')
    return
  }

  if (!path) {
    console.error('API function call requires `path` argument')
    return
  }
  // get -> params  post -> data
  if (method === 'post' && !data && typeof params === 'object') {
    data = params
    params = null
  }
  let url = config.mobileServerURI + path

  return axios({method, url, params, data}).then((resp) => {
    if (resp.data && resp.data.code === '00') {
      return resp.data.data
      // return Promise.resolve(resp.data)
    } else {
      alert(resp.data.msg)
      return Promise.reject(resp.data)
    }
  }).catch(error => {
    // TODO
    return Promise.reject(error)
  })
}
export const userSYS = {
  base: '/base',
  ewb: '/ewb',
  pac: '/pac',
  mss: '/mss'
}


