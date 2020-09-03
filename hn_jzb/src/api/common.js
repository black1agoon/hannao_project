import axios from 'axios'
import store from '../store'
import router from '../router'
import config from '../config'
import { Message } from 'element-ui'

axios.interceptors.request.use(config => {
  // if (window.sessionStorage.getItem('systype') === 'pac') {  // 不同后台使用不同的token
  //   if (window.sessionStorage.getItem('token')) {
  //     config.headers.token = window.sessionStorage.getItem('token')
  //   }
  // } else {
  //   if (window.sessionStorage.getItem('token')) {
  //     config.headers.token = window.sessionStorage.getItem('token')
  //   }
  // }
  config.headers.token = store.state.token
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
  let url = ''
  if (channel === 'pc' || channel === 'register') {
    url = config.serverURI + path
  } else {
    url = config.mobileServerURI + path
  }
  return axios({method, url, params, data}).then((resp) => {
    if (resp.data && resp.data.code === '00') {
      return resp.data.data
      // return Promise.resolve(resp.data)
    } else if (resp.data.code === '350' || resp.data.code === '351' || resp.data.code === '352') {
      resp.data.code === '350' && Message.error(resp.data.msg)
      if (resp.data.code === '352') {
        store.commit('SET_RGMSG', resp.data.msg)
        window.localStorage.setItem('rgmsg', resp.data.msg)
        if (resp.data.data.companyCooApply) {
          store.commit('SET_RGFORM', resp.data.data.companyCooApply)
          window.localStorage.setItem('rgformdata', JSON.stringify(resp.data.data.companyCooApply))
        }
      }
      store.commit('SET_CODE', resp.data.code)
      store.commit('SET_RGUSER', resp.data.data.userName)
      store.commit('SET_TOKEN', resp.data.data.token)
      store.commit('SET_SYSTYPE', 'company') // 为了登出的时候，退出到/company/login页 设置的标识
      window.localStorage.setItem('token', resp.data.data.token)
      window.localStorage.setItem('systype', 'company')
      router.push('/company/register')
    } else {
      // TODO
      if (channel === 'pc') {
        Message.error(resp.data.msg)
        if (resp.data.code === '100' || resp.data.code === '101') {
          let system = JSON.parse(window.localStorage.getItem('system') || '{}')
          let systype = window.sessionStorage.getItem('systype') || null
          let systemLength = Object.keys(system).length
          if (systemLength > 0 && !systype) {
            systype = Object.keys(system)[systemLength - 1]
          }
          if (systype === 'company') {
            router.push('/company/login')
          } else {
            router.push('/login')
          }
        }
        return Promise.reject(resp.data)
      } else if (channel === 'mobile') {
        alert(resp.data.msg)
        return Promise.reject(resp.data)
      } else if (channel === 'register') {
        window.localStorage.removeItem('token')
      }
    }
  }).catch(error => {
    // TODO
    return Promise.reject(error)
  })
}

export const serverURI = config.serverURI
export const userSYS = {
  base: '/base',
  ewb: '/ewb',
  pac: '/pac',
  mss: '/mss'
}


