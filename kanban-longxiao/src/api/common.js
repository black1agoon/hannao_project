import axios from 'axios'
import { tenantId } from './url.config'
// import fileDownload from 'js-file-download'



export const request = (method, path, params, data = null, headers = null) => {
  if (!method) {
    console.error('API function call requires `method` argument')
    return
  }

  if (!path) {
    console.error('API function call requires `path` argument')
    return
  }

  if (method === 'post' && !data && typeof params === 'object') {
    data = params
    params = null
  }

  headers = {
    tenantId
  }

  let url =  path
  return axios({ method, url, params, data, headers })
    .then((resp) => {
      return resp
    })
    .catch(error => {
      if (error && error.msg) {
        console.log(error.msg)
      }
      return Promise.reject(error)
    })
}

/**
 * Create api from `actions`
 * @param basePath: base module name
 * @param extraActions: custom actions overwrite/append to defaults
 * @param extendActions: function actions
 * @returns {any & (*|{})}
 */
export const createApi = (basePath, extraActions, extendActions) => {
  // About action
  //   - name: method name, required
  //   - method: request method, default: 'post'
  //   - end: api end, default: same as name
  //   - path: path parameter
  //   - wrap: wrap data in object, example: wrap is 'id' -> `{ id: <data> }`
  let actions = []
  // Add custom actions
  if (extraActions && extraActions.length) {
    actions = actions.concat(extraActions)
  }
  // Wrap data
  let wrapper = (wrap, data) => wrap ? { [wrap]: data } : data
  // Parse url, params & payload
  let parseData = (action, data, headers) => {
    let _data = data
    let url = (basePath.startsWith('http') ? basePath : ('/api/' + basePath)) + '/' + (action.end || action.name)
    let params = null
    let payload = null
    if (action.path && data[0] && (typeof data[0] === 'string' || typeof data[0] === 'number')) {
      url += '/' + data[0]
      _data = data.slice(1)
    }
    if (_data.length > 1) {
      params = _data[0]
      payload = wrapper(action.wrap, _data[1])
      return [url, params, payload, headers]
    } else {
      payload = wrapper(action.wrap, _data[0])
      return [url, payload, null, headers]
    }
  }
  // Create an object of methods, and merge extendActions
  // example: `{ get: functionA, add: functionB }`
  return Object.assign(
    ...actions.map(action => (
      {
        [action.name]: (() => {
          return (...data) => {
            return request(
              action.method || 'post',
              ...parseData(action, data),
            )
          }
        })(),
      }
    )),
    extendActions || {},
  )
}


export default {
  request,
  createApi,
  // download,
}
