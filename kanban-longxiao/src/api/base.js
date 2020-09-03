import axios from 'axios'
import { urlConfig, tenantId } from './url.config'
import { getMockData } from '@/mock'

axios.interceptors.response.use((response) => {
  if (response.data && (response.data.success || response.data.status === '00' || response.data.code === '00')) {
    return response.data.data
  } else {
    return response.data
  }
}, (error) => {
  return Promise.reject(error)
})

const makeRequest = function (key, config, useMock) {
  if (typeof config === 'boolean') {
    useMock = config
    config = undefined
  }
  if (useMock) {
    return getMockData(key)
  } else {
    const url = urlConfig[key] || key
    const headers = { TenantId: tenantId, ...(config?.headers || {}) }
    return axios(url, { ...config, headers }).catch(err => {
      if (useMock === undefined) {
        return getMockData(key)
      } else {
        throw err
      }
    })
  }
}

export {
  makeRequest,
}
