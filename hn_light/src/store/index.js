import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    token: null,
    tabs: [],
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
    ADD_TAB (state, tab) {
      if (tab.fullPath === '/') {
        state.tabs.unshift(tab)
      } else {
        state.tabs.push(tab)
      }
    },
    ADD_TAB_IN (state, tabObj) {
      state.tabs.splice(tabObj.index, 0, tabObj.tab)
    },
    REMOVE_TAB (state, tabName) {
      let idx = state.tabs.findIndex(tab => tab.name === tabName)
      state.tabs.splice(idx, 1)
    },
    CLEAR_TAB (state) {
      state.tabs = []
    },
    TOGGLE_TAB_KEEP (state, obj) {
      state.tabs[obj.index].keep = obj.boolean
    },
    UPDATE_TAB(state, obj) {
      let idx = state.tabs.findIndex(tab => tab.name === obj.name)
      Object.assign(state.tabs[idx], obj)
    },
    UPDATE_TAB_TITLE (state, obj) {
      state.tabs[obj.index].title = obj.title
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
