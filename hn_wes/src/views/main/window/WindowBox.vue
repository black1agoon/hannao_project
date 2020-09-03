<template>
  <transition name="fade">
    <div class="window-wrapper" v-show="show">
      <div class="window">
        <slot name="header">
        </slot>
        <div class="close" @click="close"></div>
        <div class="prev" @click="prev" v-if="swiper && currentPage > 1"></div>
        <div class="next" @click="next" v-if="swiper && pageNumber > currentPage"></div>
        <div class="content">
          <slot>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'window-box',
    props: {
      swiper: {
        type: Boolean,
        default: false
      },
      pageNumber: {
        type: Number,
        default: 1
      },
      currentPage: {
        type: Number,
        default: 1
      }
    },
    data() {
      return {
        show: false
      }
    },
    methods: {
      open() {
        this.show = true
      },
      close() {
        this.show = false
      },
      prev() {
        this.$emit('prev')
      },
      next() {
        this.$emit('next')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .window-wrapper
    position: relative
    width: 1920px
    height: 1080px
    background: rgba(0, 0, 0, .6)
    transition: all .3s
    z-index: 999
    &.fade-enter, &.fade-leave-to
      opacity: 0
    .window
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      margin: auto
      width: 1780px
      height: 866px
      background-image: url("../../../assets/img/main/windowbg.png")
      background-size: 1780px 866px
      background-repeat: no-repeat
      .close
        position: absolute
        right: 20px
        top: -38px
        width: 60px
        height: 60px
        background-image: url("../../../assets/img/main/close.png")
        background-size: 60px 60px
        background-repeat: no-repeat
        cursor: pointer
      .prev
        position: absolute
        left: 40px
        top: 377px
        width: 60px
        height: 116px
        background-image: url("../../../assets/img/main/prev.png")
        background-size: 60px 116px
        background-repeat: no-repeat
        cursor: pointer
      .next
        position: absolute
        right: 40px
        top: 377px
        width: 60px
        height: 116px
        background-image: url("../../../assets/img/main/next.png")
        background-size: 60px 116px
        background-repeat: no-repeat
        cursor: pointer
      .content
        height: 866px
        overflow: hidden
</style>