import api from '@/api'
import { getChartOptions } from '@/api/adapter'

const deviceModule = {
  namespaced: true,
  state: {
    firstDay: new Date('2019-09-04T08:09:03.379Z'),
    quality: 0,
    deviceStatus: [],
    outputChartOptions: {},
  },
  mutations: {
    updateQuality (state, quality) {
      state.quality = quality
    },
    updateDeviceStatus (state, status) {
      state.deviceStatus = status
    },
    updateOutputChartOptions (state, options) {
      state.outputChartOptions = options
    },
  },
  actions: {
    fetchDeviceStatus ({ commit }) {
      api.device.getDeviceStatus().then(data => {
        const status = Array.isArray(data) ? (data.length > 1 ? data : [...data, {}, {}]) : [{}, {}]
        commit('updateDeviceStatus', status)
      })
    },
    fetchDeviceOutput ({ commit }) {
      api.device.getDeviceOutput().then(data => {
        data = Array.isArray(data) ? data : [data]
        const quality = data.reduce((r, m) => r + (+m.quality || 0), 0) / data.length
        commit('updateQuality', quality)
        commit('updateOutputChartOptions', getChartOptions('deviceOutput')(data))
      })
    },
  },
}

export default deviceModule
