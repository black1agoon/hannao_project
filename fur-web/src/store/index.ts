import Vue from 'vue';
import Vuex from 'vuex';

import userModule from '@/store/user.module';
import menusModule from '@/store/menus.module';
import settingsModule from '@/store/settings.module';
import quickModule from '@/store/quick.module';
import routerModule from '@/store/router.module';
import appModules from '@/app/app.store.index';
import { messageModule } from './message.module';
import commonModule from '@/store/common.module';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    usage: {},
    search: {},
  },
  mutations: {},
  actions: {},
  modules: {
    user: userModule,
    menus: menusModule,
    settings: settingsModule,
    quick: quickModule,
    router: routerModule,
    message: messageModule,
    common: commonModule,
    ...appModules,
  },
});
