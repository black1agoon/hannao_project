import api from '@/api'

const overviewModule = {
  namespaced: true,
  state: {
    doors: [],
    persons: [],
    staffs: {
      online: 0,
      visitor: 0,
    },
  },
  mutations: {
    updateMap (state, mapData) {
      state.doors = mapData.doors
      state.persons = mapData.persons
    },
    updateStaffs (state, staffData) {
      state.staffs = staffData
    },
  },
  actions: {
    fetchMapData ({ commit }) {
      api.overview.getMapData().then((data) => {
        commit('updateMap', data)
      })
    },
    fetchStaffs ({ commit }) {
      api.overview.getStaffs().then((data) => {
        commit('updateStaffs', data)
      })
    },
  },
}

export default overviewModule
