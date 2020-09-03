<template>
  <window-box ref="window">
    <div class="status">设备离线</div>
    <p class="message">错误代码: 33145</p>
    <p class="message">请检查网络连接情况。</p>
    <div class="btn sure" @click="close">知道了</div>
  </window-box>
</template>

<script>
  import WindowBox from '../../components/WindowBox'
  export default {
    name: 'offline-window',
    components: {
      WindowBox
    },
    methods: {
      open() {
        this.$refs.window.open()
      },
      close() {
        this.$refs.window.close()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.status
  font-size: 46px
  color: #F44343
  margin: 30px 0 0 50px
  font-weight: bold
.message
  font-size: 26px
  color: #534769
  margin: 20px 0 0 50px
.sure
  position: absolute
  width: 180px
  border-radius: 10px
  font-size: 26px
  right: 40px
  bottom: 38px
</style>