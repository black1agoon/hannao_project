<template>
  <div id="app">
    <!--<transition name="transitionName" enter-active-class="animated slideInRight" leave-active-class="animated slideOutLeft">-->
    <transition name="slide-left">
      <router-view class="router">
      </router-view>
    </transition>
  </div>
</template>
<script>
  import Stomp from 'stompjs'
  import {MQTT_SERVICE, MQTT_USERNAME, MQTT_PASSWORD} from '@/assets/js/sysconstant.js'
  import {mapState} from 'vuex'

  export default {
    name: 'App',
    computed: {
      ...mapState([
        'stocklist',
        'topic'
      ]),
    },
    data() {
      return {
        transitionName: 'slide-right',
        client: null,
        timer: null,
        stocklistLength: 0,
        flowCode: null,
        oldFlowCode: null,
        flowCodeInterval: null
      }
    },
    methods: {
      onConnected(frame) {
        //订阅频道
        this.client.subscribe(this.$store.state.topic + 'TV', this.responseCallback, this.onFailed)
      },
      onFailed(frame) {
        // console.log('MQ Failed' + frame)
      },
      responseCallback(frame) {
        // console.log('MQ msg========================', frame.body)
        let jsondata = JSON.parse(frame.body)
        // let jsondata = eval('(' + frame.body + ')')
        // 接收消息处理
        if (this.stocklist.length > 0 && this.stocklist[0].FlowCode !== jsondata.FlowCode) {
          this.oldFlowCode = this.stocklist[0].FlowCode
          this.$store.commit('CLEAR_STOCKLIST')
          window.localStorage.removeItem('stocklist')
          this.$store.commit('SET_STOCKLIST', this.stocklist.concat(jsondata))
          window.localStorage.setItem('stocklist', JSON.stringify(this.stocklist))
        } else {
          this.$store.commit('SET_STOCKLIST', this.stocklist.concat(jsondata))
          window.localStorage.setItem('stocklist', JSON.stringify(this.stocklist))
        }
        this.flowCode = jsondata.FlowCode

        if ((this.oldFlowCode !== this.flowCode || this.stocklist.length !== this.stocklistLength) && this.$route.fullPath === '/storageconsole') { // 如果在仓库页，并且传进来数据, (长度不同,或者flowcode不一样)立马跳转
          this.$store.commit('SET_FLOWCODE', jsondata.FlowCode)
          window.localStorage.setItem('flowCode', jsondata.FlowCode)
          this.stocklistLength = this.stocklist.length
          this.$router.push('/stockincart')
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
      // redirect() {
      //   this.timer = setInterval(() => {
      //     this.flowCodeInterval = this.oldFlowCode
      //     // 如果在入库页，并且 数据长度没变, 并且flowCode没变
      //     // console.log('Code=====================', this.flowCode, this.flowCodeInterval)
      //     // console.log(new Date().getSeconds())
      //     if (this.$route.fullPath === '/stockincart' && this.flowCode === this.flowCodeInterval && this.stocklist.length === this.stocklistLength) { // && this.flowCode === this.flowCodeInterval
      //       this.$router.push('/storageconsole')
      //     }
      //     if (this.flowCodeInterval !== this.flowCode) {
      //       this.oldFlowCode = this.flowCode
      //     }
      //   }, 0.5 * 60 * 1000)
      // },
    },
    mounted() {
      this.stocklistLength = this.stocklist.length
      if (this.stocklist.length > 0) {
        this.flowCode = this.stocklist[0].FlowCode
        // console.log('this.flowCode', this.flowCode)
      }
    },
    destroyed() {
      window.clearInterval(this.timer)
    },
    watch: {
      '$route'(to, from) {
        let isBack = this.$router.isBack  // 监听路由变化时的状态为前进还是后退
        if (isBack) {
          this.transitionName = 'slide-right'
        } else {
          this.transitionName = 'slide-left'
        }
        this.$router.isBack = false
      }
    }
  }
</script>
<style lang="stylus">
  @import './assets/fonts/fonts.css'
  #app
    position: relative
    width: 1920px
    height: 1080px
    font-family 'Avenir', Helvetica, Arial, sans-serif
    /*overflow: hidden*/
  // transform: scale(.75)
  body
    padding: 0
    margin: 0
    /*position: absolute*/
    /*width: 100%*/
    /*height: 100%*/
    .router
      transition: all 0.5s ease
      overflow: hidden
    .slide-left-enter, .slide-right-leave-to
      transform: translate(100%, 0)
    .slide-left-leave-to, .slide-right-enter
      transform: translate(-100%, 0)
</style>
