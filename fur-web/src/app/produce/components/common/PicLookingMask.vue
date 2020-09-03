<template>
  <transition name="show">
    <div class="pic-wrapper" v-show="showmask" >
      <div class="pic-mask" @click="hide"></div>
      <div class="pic-wrap">
        <img :src="src"/>
        <span class="el-icon-close hide" @click="hide"></span>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'pic-looking-mask',
    props: {
      //
    },
    data() {
      return {
        showmask: false,
        src: null
      }
    },
    methods: {
      show(src) {
        this.src = src
        this.showmask = true
      },
      hide() {
        this.showmask = false
      },
      getImgUrl() {
        //
      }
    }
  }
</script>

<style lang="sass" scoped>
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
      width: 450px
      height: 350px
      position: absolute
      /*border: 1px solid #7e8c8d*/
      top: 0
      bottom: 0
      left: 0
      right: 0
      margin: auto
      background: #ffffff
      border-radius: 5px
      &:hover
        .hide
          opacity: 0.8
      img
        width: 100%
        height: 100%
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
