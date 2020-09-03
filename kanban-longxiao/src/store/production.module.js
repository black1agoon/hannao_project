import api from '@/api'
import { getChartOptions } from '@/api/adapter'
import { fixLength } from '../utils/math'
import { mapOrders, mapOrderStatus } from '../api/production.adapters'

const productionModule = {
  namespaced: true,
  state: {
    orderStatus: {
      today: 0,
      month: 0,
      pending: 0,
      producing: 0,
      finished: 0,
      overdue: 0,
    },
    orderList: [],
    storeHouses: {},
    materialInventory: [],
    productInventory: {},
    productChartOptions: {},
  },
  mutations: {
    updateTradeSummary (state, summary) {
      state.orderStatus = summary
    },
    updateOrders (state, orders) {
      state.orderList = orders
    },
    updateStoreHouse (state, { id, name }) {
      state.storeHouses = { ...state.storeHouses, [name]: id }
    },
    updateMaterialInventory (state, materials) {
      state.materialInventory = materials
    },
    updateProductInventory (state, { name, data }) {
      state.productInventory = { ...state.productInventory, [name]: data }
    },
    updateProductChartOptions (state, options) {
      state.productChartOptions = options
    },
  },
  getters: {
    pendingOrders (state) {
      return state.orderList.filter(order => order.finished === 0).length
    }
  },
  actions: {
    fetchTradeSummary ({ commit }) {
      api.overview.getTradeSummary().then((data) => {
        commit('updateTradeSummary', mapOrderStatus(data))
      })
    },
    fetchOrders ({ commit }) {
      api.production.getOrders().then(data => {
        commit('updateOrders', mapOrders(data))
      })
    },
    findStoreHouseId ({ state, commit }, storeHouseName) {
      if (state.storeHouses[storeHouseName]) {
        return Promise.resolve(state.storeHouses[storeHouseName])
      } else {
        return api.production.getStoreHouse({ storeHouseName }).then(data => {
          if (data && data['id']) {
            commit('updateStoreHouse', {
              id: data['id'],
              name: storeHouseName,
            })
            return data['id']
          } else {
            return 'NOT FOUND: ' + storeHouseName
          }
        })
      }
    },
    fetchMaterialInventoryWeight ({ commit }) {
      return api.production.getInventoryWeight().then(data => {
        commit('updateMaterialInventory', data.map(m => {
          return {
            name: m.productTitle,
            weight: m.weight,
            ...fixLength(m.weight, 3, ['Kg', '吨']),
          }
        }))
      })
    },
    fetchProductInventoryHistory ({ commit, dispatch }, storeHouseNames) {
      Promise.all(storeHouseNames.map(storeHouseName => {
        return dispatch('findStoreHouseId', storeHouseName).then(storeHouseId => {
          return api.production.getInventoryHistory({ id: storeHouseId }).then(data => {
            commit('updateProductInventory', { name: storeHouseName, data })
            return { name: storeHouseName, data }
          })
        }).catch(() => {
          return { name: storeHouseName, data: [] }
        })
      })).then(cargoList => {
        const options = getChartOptions('productInventory')(cargoList)
        commit('updateProductChartOptions', options)
      })
    },
  },
}

export default productionModule
