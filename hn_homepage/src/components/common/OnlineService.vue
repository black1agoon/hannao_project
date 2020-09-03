<template>
  <div>
    <a class="online-wrapper" @click="show">
      <img src="../../assets/img/resolution/earphone.png" class="earphone">在线咨询
    </a>
    <div v-show="iframeShow" class="online-window">
      <i class="close" @click="hide"></i>
      <iframe width="100%" height="100%" src="https://p.qiao.baidu.com/cps/chat?siteId=13823685&userId=28740257"></iframe>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'online-service',
    data() {
      return {
        iframeShow: false
      }
    },
    methods: {
      show() {
        this.iframeShow = true
      },
      hide() {
        this.iframeShow = false
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .online-wrapper
    position: fixed
    right: 0
    top: 70%
    width: 191px
    height: 82px
    line-height: 82px
    background: linear-gradient(120deg, rgba(57, 148, 255, 1) 0%, rgba(28, 127, 255, 1) 100%)
    box-shadow: 0 8px 8px rgba(9, 71, 146, 0.26)
    border-radius: 41px 0 0 41px
    color: #ffffff
    font-size: 20px
    /*font-weight: bold*/
    cursor: pointer
    .earphone
      display: inline-block
      width: 61px
      height: 62px
      margin: 0 16px
      vertical-align: middle
  .online-window
    position: fixed
    z-index: 999
    right: 0
    top: 0
    bottom: 0
    left: 0
    margin: auto
    width: 750px
    height: 600px
    border: 1px solid #02abf0
    .close
      cursor: pointer
      position: absolute
      width: 20px
      height: 20px
      background-image: url("../../assets/img/guanbi.png")
      background-size: 15px 15px
      background-position: 2px 2px
      background-repeat: no-repeat
      top: -1px
      right: -1px
      &:hover
        background-color: #ff5439
</style>