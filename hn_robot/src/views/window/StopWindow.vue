<template>
  <transition name="fade">
    <div class="wrapper" v-show="show">
      <div class="window">
        <div class="content">
          <div class="status">暂停中...</div>
          <switch-buttons class="switch">
          </switch-buttons>
          <div class="block-box">
            <div class="block">
              <div class="label">已盘点数量</div>
              <div class="value">175</div>
            </div>
            <div class="block">
              <div class="label">已用时</div>
              <div class="value">47分</div>
            </div>
            <div class="block">
              <div class="label">盘点进度</div>
              <div class="value">82.3%</div>
            </div>
          </div>
          <div class="continue" @click="continueMission">继续盘点</div>
          <div class="btn stop" @click="stopMission">结束任务</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import SwitchButtons from '../../components/SwitchButtons'
  export default {
    name: 'stop-window',
    components: {
      SwitchButtons
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
      stopMission() {
        this.show = false
      },
      continueMission() {
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
      width: 930px
      height: 714px
      margin: 80px auto 0
      background-image: url("../../assets/img/windowbox2.png")
      background-size: 930px 714px
      background-repeat: no-repeat
      overflow: hidden
      .content
        position: relative
        width: 692px
        height: 430px
        margin: 125px 120px
        overflow: hidden
        .status
          font-size: 46px
          color: #000000
          font-weight: bold
          margin: 30px 0 0 50px
        .switch
          position: absolute
          top: 27px
          left: 360px
        .block-box
          display: flex
          margin-top: 48px
          .block
            flex: 1
            position: relative
            margin-left: 70px
            &::before
              position: absolute
              width: 30px
              height: 60px
              background: #BBB9C5
              content: ''
              top: 3px
              left: -50px
            .label
              margin: 0 0 7px
              font-size: 20px
              color: #938F9B
            .value
              font-size: 26px
              color: #000000
        .continue
          position: absolute
          width: 230px
          height: 140px
          line-height: 140px
          font-size: 26px
          left: 50px
          bottom: 33px
          border: 1px solid #A8A9A8
          border-radius: 10px
          text-align: center
          color: #534769
          background: #ffffff
          box-shadow: 0 0 5px #999
          &:active
            opacity: .8
            box-shadow: 0 0 5px #4F3C71
        .stop
          position: absolute
          right: 50px
          bottom: 33px
          width: 230px
          height: 140px
          line-height: 140px
          font-size: 26px
          border-radius: 10px
</style>