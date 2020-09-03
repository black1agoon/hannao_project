// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zh_CN',
  fallbackLocale: 'zh_CN',
  silentTranslationWarn: true,
  messages: {
    zh_CN: {
      jzb: '鉴真宝'
    },
    zh_TW: {
      jzb: '鑑真寶'
    },
    en_US: {
      jzb: 'Anti-fake Expert'
    }
  }
})

/* eslint-disable no-new */
new Vue({
  i18n,
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
