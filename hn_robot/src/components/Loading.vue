<template>
  <div class="loading-wrapper">
    <div class="wrap">
      <img class="box" :class="{rotate: loading}" src="../assets/img/loadingbox.png">
      <div class="circle" :class="{scale: loading}"></div>
      <div class="circle delay" :class="{scale: loading}"></div>
      <div class="circle delay2" :class="{scale: loading}"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'loading',
    data() {
      return {
        loading: true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../assets/stylus/animation.styl"
.loading-wrapper
  color: #fff
  overflow: hidden
  .wrap
    position: relative
    margin: 60px 0 0 145px
    /*background: #333*/
    width: 250px
    height: 250px
    .box
      width: 250px
      height: 250px
      &.rotate
        animation-name: loading-rotate
        animation-iteration-count: infinite
        animation-timing-function: linear
        animation-duration: 1s
        animation-direction: alternate
    .circle
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      margin: auto
      background: #534769
      width: 0
      height: 0
      border-radius: 100%
      &.delay
        animation-delay: .33s
      &.delay2
        animation-delay: .66s
      &.scale
        animation-name: loading-scale
        animation-iteration-count: infinite
        animation-timing-function: linear
        animation-duration: 1s
        animation-direction: alternate
</style>