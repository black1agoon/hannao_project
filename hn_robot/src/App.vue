<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="router"/>
    </transition>
  </div>
</template>
<script>
  export default {
    name: 'App',
    data() {
      return {
        transitionName: 'slide-left'
      }
    },
    watch: {
      '$route'(to, from) {
        if (from.path === '/checkview') {
          this.transitionName = 'slide-right'
        } else {
          this.transitionName = 'slide-left'
        }
      }
    }
  }
</script>
<style lang="stylus">
@import "assets/stylus/base.styl"
#app
  position: absolute
  width: 1280px
  height: 800px
  overflow: hidden
  top: 0
  left: 0
  right: 0
  bottom: 0
  margin: auto
  background-image: url("./assets/img/bg.png")
  background-size: 1280px 800px
  background-repeat: no-repeat
  font-family: OPPOSans
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  user-select: none
  .router
    transition: all 0.5s ease
    overflow: hidden
    &.slide-left-enter, &.slide-right-leave-to
      transform: translate(100%, 0)
    &.slide-left-leave-to, &.slide-right-enter
      transform: translate(-100%, 0)
</style>
