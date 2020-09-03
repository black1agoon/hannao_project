<template>
  <div class="mask" v-show="maskShow">
    <ul class="wh-list">
      <li v-for="(wh, index) in whFrameList"
          :tabIndex="index"
          :key="index"
          :class="{active: wh.code === topic}"
          @click="whFrameClick(wh)">
          <span class="circle">
            <i v-show="wh.code === topic"></i>
          </span>{{index + 1}} # {{wh.descript}}
      </li>
    </ul>
  </div>
</template>

<script>
  import api from '@/api'
  import {mapState} from 'vuex'
  export default {
    name: 'wh-frame',
    data() {
      return {
        whFrameList: [],
        maskShow: false,
        timer: null
      }
    },
    computed: {
      ...mapState([
        'topic'
      ])
    },
    methods: {
      getAllWhFrame() {
        api.Warehouse.getAllWhFrame().then(data => {
          this.whFrameList = data && data.length > 0 ? data : []
        })
      },
      show() {
        this.maskShow = true
      },
      hide() {
        this.maskShow = false
      },
      whFrameClick(wh) {
        this.$store.commit('SET_TOPIC', wh.code)
        this.$store.commit('SET_SHOWWAITTIME', wh.showWaitTime)
        this.$store.commit('SET_CHECKWAGES', wh.checkWages)
        window.localStorage.setItem('topic', wh.code)
        window.localStorage.setItem('showWaitTime', wh.showWaitTime)
        window.localStorage.setItem('checkWages', wh.checkWages)
        this.hide()
        this.$parent.$parent.connect()
      },
      initMask() {
        if (!this.topic) {
          this.show()
        } else {
          this.$parent.$parent.connect()
          this.hide()
        }
      }
    },
    mounted() {
      this.initMask()
      this.getAllWhFrame()
      this.timer = setInterval(() => {
        this.getAllWhFrame()
      }, 5 * 60 * 1000)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .mask
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: rgba(0, 0, 0, .8)
    z-index: 100
    .wh-list
      position: relative
      width: 300px
      top: 50%
      transform: translateY(-50%)
      margin: 0 auto
      color: #ffffff
      li
        cursor: pointer
        margin: 30px
        &.active
          color: #00FFFF
        .circle
          display: inline-block
          width: 16px
          height: 16px
          border: 1px solid #00FFFF
          border-radius: 50%
          vertical-align: bottom
          margin-right: 5px
          i
            display: inline-block
            width: 12px
            height: 12px
            margin: 2px
            background: #00FFFF
            border-radius: 50%
</style>