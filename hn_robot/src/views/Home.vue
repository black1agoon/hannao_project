<template>
  <div class="home-wrapper">
    <div class="machine">
      <i class="pan"></i>
      <span class="number">No.0001</span>
      <i class="triangle"></i>
    </div>
    <progress-tool class="progress" :value="progress">
    </progress-tool>
    <switch-buttons class="switch">
    </switch-buttons>
    <div class="btn off" @click="offMachine">
      <i class="off-icon"></i>关机
    </div>
    <div class="inventory-check" @click="inventoryCheck">
      <p class="name">盘点</p>
      <p class="en-name">INVENTORY CHECK</p>
      <img class="pandian" src="../assets/img/pandian.png"/>
    </div>

    <div class="find-goods">
      <p class="name">找货</p>
      <p class="en-name">FIND GOODS</p>
      <img class="zhaohuo" src="../assets/img/zhaohuo.png"/>
    </div>
    <div class="copy-right">浙江汉脑数码科技有限公司版权所有</div>
    <start-window ref="start">
    </start-window>
  </div>
</template>

<script>
  import ProgressTool from '../components/ProgressTool'
  import SwitchButtons from '../components/SwitchButtons'
  import StartWindow from './window/StartWindow'

  export default {
    name: 'home',
    components: {
      ProgressTool,
      SwitchButtons,
      StartWindow
    },
    data() {
      return {
        progress: 58
      }
    },
    methods: {
      inventoryCheck() {
        this.$refs.start.open()
      },
      offMachine() {
        this.$router.push('/checkview')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .home-wrapper
    position: absolute
    width: 1280px
    height: 800px

    .machine
      position: absolute
      top: 61px
      left: 70px

      .pan
        display: inline-block
        width: 50px
        height: 30px
        background-image: url("../assets/img/pan.png")
        background-size: 50px 30px
        background-repeat: no-repeat
        vertical-align: top

      .number
        display: inline-block
        font-family: Teko
        font-size: 40px
        height: 32px
        line-height: 35px
        color: #534768
        margin: 0 16px 0 10px
        vertical-align: top

      .triangle
        display: inline-block
        width: 18px
        height: 20px
        background-image: url("../assets/img/triangle.png")
        background-size: 18px 20px
        background-repeat: no-repeat
        margin-top: 5px

    .progress
      position: absolute
      top: 116px
      left: 70px

    .switch
      position: absolute
      top: 188px
      left: 70px

    .off
      position: absolute
      top: 50px
      left: 1120px
      width: 120px
      border-radius: 60px

      .off-icon
        width: 22px
        height: 24px
        display: inline-block
        background-image: url("../assets/img/officon.png")
        background-size: 22px 24px
        background-repeat: no-repeat
        margin-right: 8px
        vertical-align: top
        margin-top: 18px

    .copy-right
      position: absolute
      width: 100%
      height: 36px
      line-height: 36px
      text-align: right
      font-size: 16px
      color: #ffffff
      bottom: 0
      background: linear-gradient(to right, rgba(69, 49, 106, 0) 0, rgba(69, 49, 106, 0.79) 100%)
      padding-right: 40px
      box-sizing: border-box

    .inventory-check, .find-goods
      position: absolute
      width: 520px
      height: 400px
      top: 308px
      border-radius: 20px
      background: #FEFEFE
      transition: all .2s

      &:active
        background: #BFBFBF

      .name
        position: absolute
        top: 40px
        left: 70px
        font-size: 66px
        color: #45316A
        font-weight: bold
        letter-spacing: 10px

        &::before
          content: ''
          position: absolute
          width: 10px
          height: 60px
          background: #7B4BFF
          left: -28px
          top: 13px

      .en-name
        position: absolute
        left: 40px
        top: 131px
        font-size: 22px
        color: #2F214A

    .inventory-check
      left: 70px

      .pandian
        position: absolute
        top: 46px
        right: 25px
        width: 318px
        height: 343px

    .find-goods
      left: 640px

      .zhaohuo
        position: absolute
        top: 21px
        right: 13px
        width: 342px
        height: 360px
</style>