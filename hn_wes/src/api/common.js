import axios from 'axios'
// import store from '../store'
// import router from '../router'
import config from '../config'

// axios.interceptors.request.use(config => {
//   config.headers.token = store.state.token
//   return config
// }, error => {
//   console.error(error)
// })

export const request = (method, path, params, data = null) => {
  // get -> params  post -> data
  if (method === 'post' && !data && typeof params === 'object') {
    data = params
    params = null
  }
  let url = config.serverURI + path
  return axios({method, url, params, data}).then((res) => {
    // console.log(res)
      return res.data.data
  }).catch(error => {
    // TODO
    return Promise.reject(error)
  })
}

export const request2 = (method, path, params, data = null) => {
  // get -> params  post -> data
  if (method === 'post' && !data && typeof params === 'object') {
    data = params
    params = null
  }
  let url = config.jlwURI + path
  return axios({method, url, params, data}).then((res) => {
    // console.log(res)
    return res.data.data
  }).catch(error => {
    // TODO
    return Promise.reject(error)
  })
}


