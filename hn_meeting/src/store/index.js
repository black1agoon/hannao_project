import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    token: null,
    menus: [],
    systype: null,
    agencyId: null
  },
  mutations: {
    SET_USER (state, user) {
      state.user = user
    },
    SET_TOKEN (state, token) {
      state.token = token
    },
    SET_MENUS (state, menus) {
      state.menus = menus
    },
    SET_SYSTYPE(state, systype) {
      state.systype = systype
    },
    SET_AGENCYID(state, agencyId) {
      state.agencyId = agencyId
    }
  },
  actions: {
  }
})
