import Vue from 'vue'

import ServicePage from '@/components/mobile/ServicePage'

import 'purecss'
import '@/assets/fonts/style.css'

/* eslint-disable no-new */
new Vue({
  el: '#mobile_app',
  template: '<ServicePage/>',
  components: { ServicePage }
})
