<template>
  <div class="home-wrapper">
    <div class="video-wrap">
      <video class="video"
             type="video/mp4"
             autoplay
             muted
             loop
             src="http://media.jianzb.cn/sp/0821/qqfd.mp4">
      </video>
      <template v-for="(point, index) in points">
        <div class="point"
             :key="index"
             @mouseenter="mouseenter(index)"
             @mouseleave="mouseleave"
             :style="getPointStyle(point.pos)">
        </div>
        <transition name="fold" :key="'point' + index">
          <div v-show="showIndex === index"
               :class="['bubble',{left: point.bpos === 1, right: point.bpos === 0}]"
               :style="getBubbleStyle(point)">
            {{point.name}}
          </div>
        </transition>

      </template>

      <div class="static"
           v-for="(stat, index) in statics"
           :key="'id' + index"
           :style="getPointStyle(stat.pos)">
        {{stat.name}}
      </div>
    </div>
    <online-service>
    </online-service>
  </div>
</template>

<script>
  import {HOME} from './homepage.config'
  import OnlineService from './common/OnlineService'
  export default {
    name: 'home-page',
    components: {
      OnlineService
    },
    data() {
      return {
        points: HOME.POINT,
        statics: HOME.STATIC,
        showIndex: 0,
        timer: null
      }
    },
    methods: {
      getPointStyle(point) {
        return {
          top: point[0] / 802 * 100 + '%',
          left: point[1] / 1917 * 100 + '%',
          animationDelay: 5 * Math.random() + 's'
        }
      },
      getBubbleStyle(point) {
        return {
          top: (point.pos[0] - 25) / 802 * 100 + '%',
          left: point.bpos === 0 ? `${(point.pos[1] - 10) / 1917 * 100}%` : `${(point.pos[1] + 25) / 1917 * 100}%`,
          transform: point.bpos === 0 ? 'translate(-100%)' : ''
        }
      },
      mouseenter(index) {
        this.showIndex = index
        clearInterval(this.timer)
      },
      mouseleave() {
        this.timer = setInterval(() => {
          if (++this.showIndex === this.points.length) {
            this.showIndex = 0
          }
        }, 2000)
      }
    },
    mounted() {
      this.mouseleave()
    },
    beforeDestroy() {
      clearInterval(this.timer)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../assets/stylus/animation.styl"
  .home-wrapper
    width: 100%
    /*height: 100vh*/
    min-height: 534px
    background: linear-gradient(to bottom, #303065 0%, #353434 50%, #353434 100%)
    position: relative
    padding-top: 80px
    .video-wrap
      position: relative
      .video
        width: 100%
        object-fit: contain
      .point
        position: absolute
        width: 10px
        height: 10px
        background: #00FFFF
        border-radius: 50%
        cursor: pointer
        animation-duration: 2s
        animation-name: pointShadow
        animation-iteration-count: infinite
        animation-timing-function: linear
        &.point1
          top: 23.815%
          left: 13.876%
      .static
        position: absolute
        width: 58px
        height: 21px
        line-height: 21px
        color: #ffffff
        font-size: 12px
        text-align: center
        background: rgba(0, 255, 255, 0.6)
        border-radius: 5px
      .bubble
        position: absolute
        top: 0
        padding: 0 5px
        height: 25px
        line-height: 25px
        font-size: 14px
        color: #FFFFFF
        text-align: center
        background: rgba(0, 255, 255, 0.6)
        border-radius: 5px
        transition: all .5s
        opacity: 1
        &.fold-enter, &.fold-leave-to
          opacity: 0
        &.right:after
          content: ''
          position: absolute
          z-index: 1
          right: -10px
          bottom: -16px
          width: 10px
          height: 20px
          border-width: 0
          border-style: solid
          border-color: transparent
          border-top-width: 7px
          border-top-color: rgba(0, 255, 255, 0.6)
          border-radius: 0 10px 0 0
        &.left:before
          content: ''
          position: absolute
          z-index: 1
          left: -10px
          bottom: -16px
          width: 10px
          height: 20px
          border-width: 0
          border-style: solid
          border-color: transparent
          border-top-width: 7px
          border-top-color: rgba(0, 255, 255, 0.6)
          border-radius: 10px 0 0 0
</style>