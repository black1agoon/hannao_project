<template>
  <transition name="show">
    <div class="pic-wrapper" v-show="showmask" >
      <div class="pic-mask" @click="hide"></div>
      <div class="pic-wrap">
        <canvas ref="qrcode"></canvas>
        <span class="el-icon-close hide" @click="hide"></span>
      </div>
    </div>
  </transition>
</template>

<script>
  import QRCode from 'qrcode'
  export default {
    name: 'qr-code-show-mask',
    props: {
      src: {
        type: String,
        default: 'http://www.baidu.com'
      }
    },
    data() {
      return {
        showmask: false
      }
    },
    methods: {
      show() {
        this.showmask = true
        this.createQRcode()
      },
      hide() {
        this.showmask = false
      },
      createQRcode() {
        let canvas = this.$refs.qrcode
        this.$nextTick(() => {
          console.log(this.src)
          QRCode.toCanvas(canvas, this.src, error => {
            if (error) console.error(error)
            console.log('success!')
          })
        })
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
      width: 270px
      height: 270px
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
      canvas
        width: 100% !important
        height: 100% !important
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
