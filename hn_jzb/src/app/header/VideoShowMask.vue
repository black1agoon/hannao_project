<template>
  <transition name="show">
    <div class="pic-wrapper" v-show="showmask" >
      <div class="pic-mask" @click="hide"></div>
      <div class="pic-wrap">
        <video v-if="src" ref="video" class="video" :src="getVideoSrc" controls="controls">
          您的浏览器不支持播放。
        </video>
        <span class="el-icon-close hide" @click="hide"></span>
      </div>
    </div>
  </transition>
</template>

<script>
  import config from '@/config'
  export default {
    name: 'video-show-mask',
    props: {
      src: String
    },
    computed: {
      getVideoSrc() {
        return this.serverURI + this.src
      }
    },
    data() {
      return {
        serverURI: config.serverURI,
        showmask: false
      }
    },
    methods: {
      show() {
        this.showmask = true
        this.$refs.video.play()
      },
      hide() {
        this.showmask = false
        this.$refs.video.pause()
      }
    },
    mounted() {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .pic-wrapper
    position: fixed
    width: 100%
    height: 100%
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 5000
    transition: all 0.2s linear
    &.show-enter, &.show-leave-to
      opacity: 0
    .pic-mask
      width: 100%
      height: 100%
      background: rgba(0, 0, 0, 0.6)
    .pic-wrap
      width: 500px
      height: 350px
      position: absolute
      /*border: 1px solid #7e8c8d*/
      top: 0
      bottom: 0
      left: 0
      right: 0
      margin: auto
      &:hover
        .hide
          opacity: 0.8
      .video
        width: 100%
        /*height: 100%*/
      .hide
        position: absolute
        top: 0
        right: 0
        width: 30px
        height: 30px
        line-height: 30px
        display: block
        font-size: 20px
        color: #fff
        transition: all 0.5s
        cursor: pointer
        opacity: 0
        border-radius: 50%
        background: rgba(38, 38, 38, 0.5)
        text-align: center
        &:hover
          opacity: 1
</style>
