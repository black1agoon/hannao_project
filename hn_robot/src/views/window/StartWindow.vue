<template>
  <window-box ref="window">
    <div class="tips">
      第<span class="times">138</span>次盘点将在<span class="countdown">{{countdown}}</span>秒钟后自动开始。
    </div>
    <div class="time-box">
      <div class="time">
        <div class="label">开始时间</div>
        <div class="value">08/25 15:21</div>
      </div>
      <div class="time">
        <div class="label">预计结束时间</div>
        <div class="value">16:17</div>
      </div>
    </div>
    <div class="btn cancel" @click="close">取消</div>
  </window-box>
</template>

<script>
  import WindowBox from '../../components/WindowBox'
  export default {
    name: 'start-window',
    components: {
      WindowBox
    },
    data() {
      return {
        countdown: 3,
        timer: null
      }
    },
    methods: {
      open() {
        this.$refs.window.open()
        this.countdown = 3
        this.timer = setInterval(() => {
          if (this.countdown > 0) {
            this.countdown--
          } else {
            this.close()
          }
        }, 1000)
      },
      close() {
        this.$refs.window.close()
        clearInterval(this.timer)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .tips
      color: #000000
      font-size: 26px
      margin: 20px 0
      text-align: center
      .times
        font-size: 46px
        font-weight: bold
        margin: 0 20px
      .countdown
        display: inline-block
        width: 30px
        text-align: center
    .time-box
      display: flex
      .time
        position: relative
        margin-left: 100px
        min-width: 150px
        &::before
          position: absolute
          width: 30px
          height: 60px
          background: #BBB9C5
          content: ''
          top: 23px
          left: -50px
        .label
          margin: 20px 0 7px
          font-size: 20px
          color: #938F9B
        .value
          font-size: 26px
          color: #000000
    .cancel
      margin: 80px 0 0 400px
      width: 180px
      border-radius: 10px
</style>