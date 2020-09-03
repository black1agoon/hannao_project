<template>
  <transition name="move">
    <div class="error-wrapper" v-show="errorlist.length > 0">
      <div class="scroll" :style="scroll">
        <div class="error" v-for="(err, index) in errorlist" :key="index">
        <div class="reason">{{err.state}}</div>
        <div class="info-box">
          <div class="column1">
            <div class="value">{{err.barCode}}</div>
            <div class="label">条码号</div>
          </div>
          <div class="column2">
            <div class="value">{{err.createTime.substring(5, 20)}}</div>
            <div class="label">发生时间</div>
          </div>
          <div class="column3">
            <div class="value">{{err.createUser}}</div>
            <div class="label">操作员</div>
          </div>
          <div class="column1">
            <div class="value">{{err.styleName}}</div>
            <div class="label">款号</div>
          </div>
          <div class="column2">
            <div class="value">{{err.colorName}}</div>
            <div class="label">颜色</div>
          </div>
          <div class="column3">
            <div class="value">{{err.sizeName}}</div>
            <div class="label">尺码</div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import api from '@/api'
  import {mapState} from 'vuex'
  export default {
    name: 'error-box',
    computed: {
      ...mapState([
        'whframe'
      ]),
      scroll() {
        return this.errorlist.length > 3 ? {
          animationDuration: `${this.errorlist.length * 3}s`
        } : {}
      }
    },
    data() {
      return {
        timer: null,
        errorlist: []
      }
    },
    methods: {
      AnomalyBarcodeInfoList() {
        api.LMFrameHandheld.AnomalyBarcodeInfoList(this.whframe.id).then(data => {
          if (data && data.length > 3) {
            this.errorlist = data.concat(data)
          } else if (data && data.length <= 3) {
            this.errorlist = data
          } else {
            this.errorlist = []
          }
        })
      }
    },
    mounted() {
      this.AnomalyBarcodeInfoList()
      this.timer = setInterval(() => {
        this.AnomalyBarcodeInfoList()
      }, 30 * 1000)
    },
    destroyed() {
      clearInterval(this.timer)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../assets/stylus/scroll.styl'
  .error-wrapper
    background: linear-gradient(90deg, rgba(16,6,14,.8) 0%, rgba(16,6,14,.5) 80%, rgba(0,0,0,0) 100%)
    width: 824px
    height: 960px
    padding: 20px 0
    box-sizing: border-box
    transition: all .5s
    overflow: hidden
    &.move-enter, &.move-leave-to
      transform: translate(-100%, 0)
    &.move-enter-to, &.move-leave
      transform: translate(0, 0)
    &:hover
      .scroll
        animation-play-state: paused
    .scroll
      animation-name: columnScroll
      animation-iteration-count: infinite
      animation-timing-function: linear
      .error
        position: relative
        overflow: hidden
        width: 824px
        height: 245px
        background-image: url("../assets/img/errorbox.png")
        background-size: 833px 245px
        background-repeat: no-repeat
        padding-bottom: 60px
        color: #ffffff
        .reason
          font-size: 34px
          margin: 18px 0 0 36px
        .info-box
          position: absolute
          width: 750px
          height: 180px
          top: 65px
          left: 10px
          display: flex
          flex-wrap: wrap
          align-items: center
          .column1
            flex: 0 0 225px
          .column2
            flex: 0 0 350px
          .column3
            flex: 1
          .column1, .column2, .column3
            margin-left: 15px
            white-space: nowrap
            overflow: hidden
            text-overflow: ellipsis
            .value
              font-size: 26px
              height: 26px
            .label
              margin-top: 10px
              font-size: 20px
              color: #A27B82
</style>