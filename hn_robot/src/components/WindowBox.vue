<template>
  <transition name="fade">
    <div class="wrapper" v-show="show">
      <div class="window">
        <div class="content">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'window-box',
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
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .wrapper
    position: absolute
    top: 0
    left: 0
    z-index: 10
    width: 1280px
    height: 800px
    background: rgba(0, 0, 0, .21)
    opacity: 1
    transition: all .3s
    &.fade-enter, &.fade-leave-to
      opacity: 0
    .window
      width: 860px
      height: 640px
      margin: 80px auto 0
      background-image: url("../assets/img/windowbox1.png")
      background-size: 860px 640px
      background-repeat: no-repeat
      overflow: hidden
      .content
        position: relative
        width: 620px
        height: 360px
        margin: 130px 120px
        overflow: hidden
</style>