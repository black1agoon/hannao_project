import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    stocklist: [],
    topic: null,
    showWaitTime: 0,
    checkWages: false,
    depId: null,
    workshopId: null,
    whId: null,
    stepId: null,
    flowCode: null
  },
  mutations: {
    SET_STOCKLIST(state, list) {
      state.stocklist = list
    },
    CLEAR_STOCKLIST(state) {
      state.stocklist = []
    },
    SET_TOPIC(state, topic) {
      state.topic = topic
    },
    SET_SHOWWAITTIME(state, showWaitTime) {
      state.showWaitTime = showWaitTime
    },
    SET_CHECKWAGES(state, checkWages) {
      state.checkWages = checkWages
    },
    SET_DEPID(state, depId) {
      state.depId = depId
    },
    SET_WORKSHOPID(state, workshopId) {
      state.workshopId = workshopId
    },
    SET_WHID(state, whId) {
      state.whId = whId
    },
    SET_STEPID(state, stepId) {
      state.stepId = stepId
    },
    SET_FLOWCODE(state, flowCode) {
      state.flowCode = flowCode
    }
  },
  actions: {
  },
  modules: {
  }
})
