<template>
  <div id="app">
    <div class="banner">
      <div class="title">雪豹成衣出入库管理中心</div>
      <div class="name">{{whframe.warehouseName}}</div>
      <div class="copyright">浙江汉脑数码科技有限公司版权所有</div>
      <div class="setting" tabindex="2" @click="showMask"></div>
    </div>
    <transition name="slide-left">
      <router-view class="router">
      </router-view>
    </transition>
    <wh-frame class="mask" ref="whframe" @connect="connect">
    </wh-frame>
  </div>
</template>
<script>

  import {mapState} from 'vuex'
  import WhFrame from './components/WhFrame'
  import Connect from './views/Connect'

  export default {
    name: 'App',
    mixins: [Connect],
    computed: {
      ...mapState([
        'whframe'
      ]),
    },
    components: {
      WhFrame
    },
    methods: {
      showMask() {
        this.$refs.whframe.show()
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
    font-family: 'Alibaba PuHuiTi-R', Helvetica, Arial, sans-serif
    background: radial-gradient(circle, rgba(18, 45, 95, 1) 0%, rgba(9, 21, 43, 1) 100%)
    overflow: hidden

    .banner
      position: relative
      width: 100%
      height: 119px
      background-image: url("./assets/img/banner.png")
      background-repeat: no-repeat
      background-size: 100% 119px
      overflow: hidden

      .title
        position: absolute
        font-size: 50px
        color: #CCF2FF
        top: 32px
        left: 26px
        font-weight: bold

      .name
        position: absolute
        top: 20px
        left: 585px
        color: #CCF2FF
        font-size: 43px
        width: 177px
        height: 72px
        border: 2px solid rgba(51, 113, 194, 1)
        background: linear-gradient(135deg, rgba(6, 35, 92, 1) 0%, rgba(1, 27, 78, 1) 100%)
        text-align: center
        line-height: 72px

      .copyright
        position: absolute
        right: 79px
        top: 5px
        color: #3CE2FF
        font-size: 21px
      .setting
        position: absolute
        width: 33px
        height: 33px
        background-image: url("./assets/img/shezhi.png")
        background-size: 33px 33px
        background-repeat: no-repeat
        right: 14px
        top: 0
        z-index: 10
        cursor: pointer
  body
    padding: 0
    margin: 0
    .router
      transition: all 0.5s ease
      overflow: hidden
    .slide-left-enter, .slide-right-leave-to
      transform: translate(100%, 0)
    .slide-left-leave-to, .slide-right-enter
      transform: translate(-100%, 0)
</style>
