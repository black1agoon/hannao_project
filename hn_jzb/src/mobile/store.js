import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isNew: false
  },
  mutations: {
    SET_NEW(state, isNew) {
      state.isNew = isNew
    }
  },
  actions: {

  }
})
