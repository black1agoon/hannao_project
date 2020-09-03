import axios from 'axios'
import store from '../store'
import router from '../router'
import config from '../config'
import {Message} from 'element-ui'

axios.interceptors.request.use(config => {
  if (!config.headers.token && store.state.token) {
    config.headers.token = store.state.token
  }
  return config
}, error => {
  console.error(error)
})

export const request = (method, path, params, data = null, channel = 'pc') => {
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
  let url = config.serverURI + path

  return axios({method, url, params, data}).then((resp) => {
    if (resp.data && resp.data.code === '00') {
      return resp.data.data
      // return Promise.resolve(resp.data)
    } else {
      // TODO
      Message.error(resp.data.msg)
      if (resp.data.code === '100' || resp.data.code === '101') {
        router.push('/login')
      }
      return Promise.reject(resp.data)
    }
  }).catch(error => {
    // TODO
    return Promise.reject(error)
  })
}
export const download = (method, path, params, data = null, responseType) => {
  if (method === 'post' && !data && typeof params === 'object') {
    data = params
    params = null
  }
  let url = config.serverURI + path
  return axios({method, url, params, data, responseType}).then((resp) => {
    return resp
  }).catch(error => {
    return Promise.reject(error)
  })
}
export const serverURI = config.serverURI
export const userSYS = {
  base: '/base',
  ewb: '/ewb',
  pac: '/pac',
  mss: '/mss',
  jlw: '/jlw'
}


