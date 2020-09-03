import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import ElementUI from 'element-ui';

import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import { i18n, translate } from '@/lang/i18n';

import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.css';
import './styles/theme.tweak.scss';

Vue.use(VueCompositionAPI)
Vue.use(ElementUI, { i18n: translate });

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#shell');
