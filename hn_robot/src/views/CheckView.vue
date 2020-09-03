<template>
  <div class="check-wrapper">
    <div class="header">
      <div class="wrap" @click="backHome">
        <i class="arrow-right"></i>
        <span class="name">盘点</span>
      </div>
      <progress-tool class="progress" :value="progress">
      </progress-tool>
    </div>
    <div class="left-content">
      <div class="loading-box">
        <loading class="loading">
        </loading>
      </div>
      <div class="number-box">
        <number-scroll
            v-for="(num, index) in numberList"
            :key="index" :number="num">
        </number-scroll>
      </div>
    </div>
    <div class="right-content">
      <div class="cn-name">盘点进度</div>
      <div class="en-name">Inventory progress</div>
      <div class="progress">
        <div class="bar">
          <span class="val">{{progress}}</span>
          <span class="sup">%</span>
        </div>
      </div>
      <div class="cn-name">任务信息</div>
      <div class="en-name">Task information</div>
      <div class="block-box">
        <div class="block">
          <div class="label">当前站点</div>
          <div class="value">站点23</div>
        </div>
        <div class="block">
          <div class="label">开始时间</div>
          <div class="value">08/25 15:21</div>
        </div>
        <div class="block">
          <div class="label">已用时</div>
          <div class="value">47分</div>
        </div>
      </div>
    </div>
    <div class="btn stop" @click="stopCheck">暂停盘点</div>
    <offline-window ref="offline">
    </offline-window>
    <stop-window ref="stop">
    </stop-window>
    <div style="position: absolute;background: red;width: 100px;height: 100px;right: 0;top:0" @click="offlineShow"></div>
  </div>
</template>

<script>
  import ProgressTool from '../components/ProgressTool'
  import NumberScroll from '../components/NumberScroll'
  import OfflineWindow from './window/OfflineWindow'
  import StopWindow from './window/StopWindow'
  import Loading from '../components/Loading'
  export default {
    name: 'check-view',
    components: {
      ProgressTool,
      NumberScroll,
      OfflineWindow,
      StopWindow,
      Loading
    },
    computed: {
      numberList() {
        let list = [...(this.number + '')]
        return Array.from({length: 4 - list.length}, () => '').concat(list)
      }
    },
    data() {
      return {
        number: 710,
        progress: 67
      }
    },
    methods: {
      backHome() {
        this.$router.push('/')
      },
      stopCheck() {
        this.$refs.stop.open()
      },
      offlineShow() {
        this.$refs.offline.open()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.check-wrapper
  position: absolute
  width: 1280px
  height: 800px
  .header
    margin: 61px 0 0 70px
    .wrap
      display: inline-block
      .arrow-right
        display: inline-block
        width: 16px
        height: 30px
        background-image: url("../assets/img/arrow-right.png")
        background-size: 16px 30px
        background-repeat: no-repeat
        vertical-align: top
        margin-top: 10px
      .name
        display: inline-block
        font-size: 36px
        margin: 0 43px 0 24px
        color: #45316A
    .progress
      display: inline-block
  .left-content
    position: absolute
    top: 140px
    left: 70px
    width: 540px
    height: 620px
    background: rgba(255, 255, 255, .95)
    border-radius: 20px
    .loading-box
      margin-top: 20px
      width: 540px
      height: 396px
      background-image: url("../assets/img/loading.png")
      background-size: 540px 396px
      background-repeat: no-repeat

    .number-box
      display: flex
      justify-content: space-between
      padding: 35px 50px
  .right-content
    position: absolute
    top: 140px
    left: 637px
    width: 500px
    height: 500px
    background: rgba(255, 255, 255, .95)
    border-radius: 20px
    padding: 10px 34px
    box-sizing: border-box
    .cn-name
      font-size: 20px
      color: #30224A
      margin: 30px 0 4px 0
    .en-name
      font-size: 16px
      color: rgba(48, 34, 74, .65)
    .progress
      margin-top: 20px
      width: 420px
      height: 80px
      background: rgba(179, 237, 195, 1)
      border-radius: 16px
      overflow: hidden
      .bar
        width: 67%
        height: 80px
        background: rgba(63, 210, 104, 1)
        border-radius: 16px 0 0 16px
        color: #ffffff
        .val
          padding-left: 20px
          line-height: 80px
          font-size: 50px
          font-weight: bold
        .sup
          display: inline-block
          margin: 16px 0 0 5px
          font-size: 16px
          vertical-align: top
    .block-box
      display: flex
      flex-wrap: wrap
      .block
        position: relative
        width: 50%
        padding-left: 50px
        box-sizing: border-box
        margin-top: 25px
        &::before
          position: absolute
          width: 30px
          height: 60px
          background: #BBB9C5
          content: ''
          top: 3px
          left: 0
        .label
          margin: 0 0 7px
          font-size: 20px
          color: #938F9B
        .value
          font-size: 26px
          color: #000000
  .stop
    position: absolute
    top: 670px
    left: 637px
    width: 500px
    height: 90px
    line-height: 90px
    font-size: 26px
    border-radius: 45px
</style>