import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menu: null,
    username: null,
    showlogin: true
  },
  actions: {},
  mutations: {
    SET_MENU (state, menu) {
      state.menu = menu
    },
    SET_USERNAME (state, username) {
      state.username = username
    },
    REMOVE_USERNAME (state) {
      state.username = null
    },
    SHOW_LOGIN (state) {
      state.showlogin = true
    },
    HIDE_LOGIN (state) {
      state.showlogin = false
    }
  }
})
