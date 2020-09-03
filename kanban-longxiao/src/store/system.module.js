import api from '@/api'

const systemModule = {
  namespaced: true,
  state: {
    labs: [],
    warehouses: [],
    health: {
      tested: 0,
      irregular: 0,
    },
    disinfection: {
      start: '00:00',
      end: '00:00',
      count: 0,
    },
  },
  mutations: {
    updateLabs (state, labs) {
      state.labs = labs
    },
    updateWarehouses (state, warehouses) {
      state.warehouses = warehouses
    },
    updateHealth (state, healthData) {
      state.health = healthData
    },
    updateDisinfection (state, disinfectionData) {
      state.disinfection = disinfectionData
    },
  },
  actions: {
    fetchSysStatus ({ commit }) {
      api.sys.getSysStatus().then((data) => {
        commit('updateLabs', data.labs)
        commit('updateWarehouses', data.warehouses)
        commit('updateHealth', data.health)
        commit('updateDisinfection', data.disinfection)
      })
    },
  },
}

export default systemModule
