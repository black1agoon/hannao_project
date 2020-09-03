import axios from 'axios'
export const request = (method, url, params, data = null) => {
  // get -> params  post -> data
  if (method === 'post' && !data && typeof params === 'object') {
    data = params
    params = null
  }
  return axios({method, url, params, data}).then((res) => {
    // console.log(res)
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




