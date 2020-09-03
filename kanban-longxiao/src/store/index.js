import Vue from 'vue'
import Vuex from 'vuex'
import buildingModule from './building.module'
import overviewModule from './overview.module'
import productionModule from './production.module'
import deviceModule from './device.module'
import systemModule from './system.module'
import jlwModule from './jlw.module'
import { start } from './update'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    startFetching ({ dispatch }) {
      start(dispatch)
    },
  },
  modules: {
    buildingModule,
    overviewModule,
    productionModule,
    deviceModule,
    systemModule,
    jlw: jlwModule
  },
})
