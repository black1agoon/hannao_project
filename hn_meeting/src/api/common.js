import axios from 'axios'
import store from '../store'
import router from '../router'
import config from '../config'
import { Message } from 'element-ui'

axios.interceptors.request.use(config => {
  config.headers.token = store.state.token
  return config
}, error => {
  console.error(error)
})

export const request = (method, path, params, data = null, channel = 'pc') => {
  // get -> params  post -> data
  if (method === 'post' && !data && typeof params === 'object') {
    data = params
    params = null
  }
  // let url = config.serverURI + path
  let url = ''
  if (path === '/agency/agencyEmployee/login' || path === '/agency/agencyEmployee/logout' || path === '/agency/agencyEmployee/changePwd') {
    url = config.loginURI + path
  } else {
    url = config.serverURI + path
  }
  return axios({method, url, params, data}).then((res) => {
    if (res.status === 200) {
      if (res.data && res.data.code === '00') {
        return res.data.data
      } else {
        if (channel === 'pc') {
          Message.error(res.data.msg)
          if (res.data.code === '100' || res.data.code === '101') {
            router.push('/login')
          }
          return Promise.reject(res.data)
        }
      }
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


