import axios from 'axios'
import store from '@/store'
import config from '@/config'

axios.interceptors.request.use(config => {
  config.headers.token = store.state.token
  return config
}, error => {
  console.error(error)
})

export const request = (method, path, params, data = null) => {
  // get -> params  post -> data
  if (method === 'post' && !data && typeof params === 'object') {
    data = params
    params = null
  }
  // let url = config.serverURI + path
  let url = config.serverURI + path
  return axios({method, url, params, data}).then((res) => {
    if (res.status === 200) {
      if (res.data && res.data.code === '00') {
        return res.data.data
      } else {
        return Promise.reject(res.data)
      }
    }
  }).catch(error => {
    // TODO
    return Promise.reject(error)
  })
}

export const system = {
  board: '/building'
}

