import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    systype: null
  },
  mutations: {
    SET_SYSTYPE(state, systype) {
      state.systype = systype
    }
  },
  actions: {
  }
})
