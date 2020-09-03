import Vue from 'vue'
import Stomp from 'stompjs'
import {MQTT_SERVICE, MQTT_USERNAME, MQTT_PASSWORD} from '../assets/js/sysconstant'
import {mapState} from 'vuex'

export default Vue.extend({
  name: 'Connect',
  computed: {
    ...mapState([
      'stockList'
    ]),
  },
  data() {
    return {
      client: null,
      flowCode: null
    }
  },
  methods: {
    onConnected(frame) {
      //订阅频道
      this.client.subscribe(this.whframe.code + 'TV', this.responseCallback, this.onFailed)
      this.client.subscribe(this.whframe.code + 'TVResult', this.responseCallback2, this.onFailed2)
    },
    onFailed(frame) {
      // console.log('MQ Failed' + frame)
    },
    responseCallback(frame) {
      let jsondata = JSON.parse(frame.body)
      this.flowCode = jsondata.FlowCode
      if (this.stockList.length > 0 && this.stockList[0].FlowCode !== jsondata.FlowCode) {
        // 传入的2次flowCode不一样
        this.$store.commit('CLEAR_STOCKLIST')
        this.$store.commit('SET_STOCKLIST', [jsondata])
      } else { // stockList长度为0或者2次的flowCode一致
        this.$store.commit('SET_STOCKLIST', this.stockList.concat(jsondata))
      }
      if (this.$route.fullPath === '/outinstore') {
        this.$router.push('/outindetail')
      }
    },
    connect() {
      //初始化mqtt客户端，并连接mqtt服务
      const headers = {
        login: MQTT_USERNAME,
        passcode: MQTT_PASSWORD
      }
      this.client = Stomp.client(MQTT_SERVICE)
      this.client.connect(headers, this.onConnected, this.onFailed)
    },
    responseCallback2(frame) {
      let jsondata = JSON.parse(frame.body)
      this.$store.commit('SET_WINDOWMSG', jsondata)
    },
    onFailed2(frame) {
      // console.log('MQ Failed' + frame)
    }
  }
})
