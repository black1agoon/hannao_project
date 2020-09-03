import api from '../api'
import { getChartOptions } from '../api/adapter'

const buildingModule = {
  namespaced: true,
  state: {
    dailyWater: { usage: 0 },
    dailyPower: { usage: 0 },
    monthlyWater: { usage: 0, ratio: 0 },
    monthlyPower: { usage: 0, ratio: 0 },
    dayWaterChartOptions: {},
    dayPowerChartOptions: {},
    monthWaterChartOptions: {},
    monthPowerChartOptions: {},
  },
  mutations: {
    updateDailyWater (state, usage) {
      state.dailyWater = { usage }
    },
    updateDailyPower (state, usage) {
      state.dailyPower = { usage }
    },
    updateMonthlyWater (state, { usage, ratio }) {
      state.monthlyWater = { usage, ratio }
    },
    updateMonthlyPower (state, { usage, ratio }) {
      state.monthlyPower = { usage, ratio }
    },
    updateDayWaterChart (state, options) {
      state.dayWaterChartOptions = options
    },
    updateDayPowerChart (state, options) {
      state.dayPowerChartOptions = options
    },
    updateMonthWaterChart (state, options) {
      state.monthWaterChartOptions = options
    },
    updateMonthPowerChart (state, options) {
      state.monthPowerChartOptions = options
    },
  },
  actions: {
    fetchDailyData ({ commit }) {
      return api.jlwKanBan.getDailyDayFlow().then(data => {
        data = Array.isArray(data) ? data : [data]

        const waterData = data.find(x => x.water)?.water || {}
        commit('updateDailyWater', waterData.dailyFlow || 0)
        commit('updateMonthlyWater', {
          usage: waterData.thisMonthAllFlow || 0,
          ratio: waterData.compareLastMonth || 0,
        })
        commit('updateDayWaterChart', getChartOptions('dayWater')(waterData.hourNumberDetail ? waterData.hourNumberDetail : []))
        commit('updateMonthWaterChart', getChartOptions('monthWater')(waterData.thisMonthDailyFlow ? waterData.thisMonthDailyFlow : [], waterData.lastMonthDailyFlow ? waterData.lastMonthDailyFlow : []))

        const powerData = data.find(x => x.energy)?.energy?.data?.data || {}
        commit('updateDailyPower', powerData.dayNumber || 0)
        commit('updateMonthlyPower', {
          usage: powerData.monthNumber || 0,
          ratio: powerData.monthRatio || 0,
        })
        commit('updateDayPowerChart', getChartOptions('dayPower')(powerData.hourNumberDetail))
        commit('updateMonthPowerChart', getChartOptions('monthPower')(powerData.dayNumberDetail))
      })
      // return api.building.getEnergy().then(data => {
      //   console.log(commit, data, getChartOptions)
      //   data = Array.isArray(data) ? data : [data]
      //
      //   const waterData = data.find(x => x.water)?.water || {}
      //   commit('updateDailyWater', waterData.dailyFlow || 0)
      //   commit('updateMonthlyWater', {
      //     usage: waterData.thisMonthAllFlow || 0,
      //     ratio: waterData.compareLastMonth || 0,
      //   })
      //   commit('updateDayWaterChart', getChartOptions('dayWater')(waterData.hourNumberDetail))
      //   commit('updateMonthWaterChart', getChartOptions('monthWater')(waterData.thisMonthDailyFlow, waterData.lastMonthDailyFlow))
      //
      //   const powerData = data.find(x => x.energy)?.energy?.data?.data || {}
      //   commit('updateDailyPower', powerData.dayNumber || 0)
      //   commit('updateMonthlyPower', {
      //     usage: powerData.monthNumber || 0,
      //     ratio: powerData.monthRatio || 0,
      //   })
      //   commit('updateDayPowerChart', getChartOptions('dayPower')(powerData.hourNumberDetail))
      //   commit('updateMonthPowerChart', getChartOptions('monthPower')(powerData.dayNumberDetail))
      // })
    },
  },
}

export default buildingModule
