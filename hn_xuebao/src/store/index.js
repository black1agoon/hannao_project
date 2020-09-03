import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    whframe: {},
    stockList: [],
    stoTypeName: null,
    errorList: [],
    windowMsg: {}
  },
  mutations: {
    SET_WHFRAME(state, whframe) {
      this.state.whframe = whframe
    },
    SET_STOCKLIST(state, stockList) {
      this.state.stockList = stockList
    },
    CLEAR_STOCKLIST() {
      this.state.stockList = []
    },
    SET_STOTYPENAME(state, name) {
      this.state.stoTypeName = name
    },
    SET_WINDOWMSG(state, info) {
      this.state.windowMsg = info
    }
  },
  actions: {
  },
  modules: {
  }
})
