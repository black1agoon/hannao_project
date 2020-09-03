<template>
  <div class="board-wrapper">

    <progress-ball class="ball-wrap" :data="truedata" :wishdata="wishdata">
    </progress-ball>
    <div class="ball">
      <p class="percent">
        <span class="pct">{{(boardData.todayProgress * 100).toFixed(0)}}</span>
        <span class="unit">%</span>
      </p>
      <p class="text">今日完成率</p>
    </div>
    <div class="data-wrap">
      <div class="today">
        <label>今日产量</label>
        <div class="value">{{boardData.todayBookCount}}</div>
      </div>
      <div class="month">
        <label>本月产量</label>
        <div class="value">{{boardData.monthBookCount}}</div>
      </div>
      <div class="inprogress">
        <label>进行中订单</label>
        <div class="value">{{boardData.unProduceTasksCount}}</div>
      </div>
    </div>
    <div class="order-progress">
      <div class="title">订单生产进度</div>
      <div class="content">
        <ul class="table-title">
          <li>序号</li>
          <li>订单号</li>
          <li>生产数</li>
          <li>交货日期</li>
          <li class="jd">进度</li>
        </ul>
        <div class="scroll-box">
          <div class="scroll">
            <ul class="item" v-for="(task, index) in unProduceTaskList" :style="scroll" :key="index">
              <li>{{index + 1}}</li>
              <li>{{task.pCode}}</li>
              <li>{{task.hasFinish}}</li>
              <li>{{task.hodLast.substr(0, 10)}}</li>
              <li class="progress">
                <div class="pg-box">
                  <div class="pg" :style="{width: task.progress * 100 + '%'}"></div>
                </div>
                <span class="percent">{{(task.progress * 100).toFixed(0)}}%</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ProgressBall from '../components/ProgressBall'
  import api from '@/api'
  export default {
    name: 'production-progress',
    components: {
      ProgressBall
    },
    computed: {
      scroll() {
        return this.unProduceTaskList.length > 13 ? {
          animationDuration: `${this.unProduceTaskList.length * 1.5}s`
        } : {}
      }
    },
    data() {
      return {
        timer: null,
        boardData: {},
        unProduceTaskList: [],
        truedata: [],
        wishdata: []
      }
    },
    methods: {
      getApiData() {
        api.Spectaculars.getProtaskProgress().then(data => {
          this.boardData = data
          if (data.unProduceTaskList && data.unProduceTaskList.length > 13) {
            this.unProduceTaskList = data.unProduceTaskList.concat(data.unProduceTaskList)
          } else {
            this.unProduceTaskList = data.unProduceTaskList
          }
          if (data.dayFinishList && data.dayFinishList.length > 0) {
            this.truedata = data.dayFinishList.map(d => d.sumQty)
            this.wishdata = Array.from({length: data.dayFinishList.length}, () => data.dayAverage)
          } else {
            this.truedata = []
            this.wishdata = []
          }
        })
      }
    },
    mounted() {
      this.getApiData()
      this.timer = setInterval(() => {
        this.getApiData()
      }, 5 * 60 * 1000)
    },
    destroyed() {
      clearInterval(this.timer)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../assets/stylus/scroll.styl'
  .board-wrapper
    position: relative
    width: 1920px
    height: 1080px
    background-image: url("../assets/img/bg-progress.png")
    background-size: 1920px 1080px
    background-repeat: no-repeat
    .ball-wrap
      margin: 100px 0 0 50px
    .ball
      position: absolute
      top: 347px
      left: 296px
      width: 304px
      height: 304px
      background-image: url("../assets/img/progressball.png")
      background-size: 304px 304px
      background-repeat: no-repeat
      text-align: center
      .percent
        margin-top: 80px
        color: #67FAFA
        .pct
          font-weight: bold
          font-size: 98px
        .unit
          font-weight: bold
          font-size: 60px
      .text
        font-size: 23px
        line-height: 25px
        text-shadow: 0 1px 0 rgba(21, 82, 155, 0.9)
        color: #67FAFA
    .data-wrap
      position: absolute
      height: 150px
      bottom: 0
      .today
        position: absolute
        z-index: 5
        width: 334px
        height: 150px
        background-image: url("../assets/img/progressbox1.png")
        background-size: 334px 150px
        background-repeat: no-repeat
        label
          position: absolute
          top: 23px
          left: 57px
          font-size: 20px
          color: #ffffff
        .value
          position: absolute
          left: 0
          bottom: 30px
          width: 285px
          line-height: 52px
          text-align: center
          font-family: 'Teko-Regular'
          font-size: 82px
          color: #67FAFA
      .month
        position: absolute
        z-index: 3
        bottom: 0
        left: 0
        width: 552px
        height: 111px
        background-image: url("../assets/img/progressbox2.png")
        background-size: 552px 111px
        background-repeat: no-repeat
      .inprogress
        position: absolute
        z-index: 1
        bottom: 0
        left: 197px
        width: 561px
        height: 111px
        background-image: url("../assets/img/progressbox3.png")
        background-size: 561px 111px
        background-repeat: no-repeat
      .month, .inprogress
        label
          position: absolute
          right: 139px
          top: 15px
          font-size: 18px
          color: #ffffff
        .value
          font-family: 'Teko-Regular'
          font-size: 64px
          color: #67FAFA
          position: absolute
          right: 42px
          bottom: 20px
          width: 206px
          line-height: 40px
          text-align: center
    .order-progress
      position: absolute
      top: 108px
      right: 35px
      width: 988px
      height: 900px
      background-image: url("../assets/img/progressbox.png")
      background-size: 988px 900px
      background-repeat: no-repeat
      .title
        text-align: center
        line-height: 50px
        font-size: 24px
        color: #94F0FD
      .content
        .table-title
          display: flex
          height: 59px
          line-height: 59px
          margin: 11px 0
          li
            flex: 1
            list-style: none
            font-size: 25px
            color: #94F0FD
            text-align: center
            &.jd
              flex: 1.5
        .scroll-box
          height: 767px
          overflow: hidden
          &:hover
            .scroll
              animation-play-state: paused
          .scroll
            animation-name: columnScroll
            animation-iteration-count: infinite
            animation-timing-function: linear
            .item
              display: flex
              height: 59px
              line-height: 59px
              font-size: 20px
              text-align: center
              &:nth-of-type(2n + 1)
                background: rgba(14, 95, 183, .3)
              li
                flex: 1
                font-size: 22px
                color: #ffffff
                white-space: nowrap
                overflow: hidden
                text-overflow: ellipsis
                &.progress
                  flex: 1.5
                  .pg-box
                    display: inline-block
                    margin-top: 21px
                    width: 183px
                    height: 16px
                    background: rgba(103, 250, 250, 0.2)
                    border-radius: 8px
                    .pg
                      width: 0
                      height: 16px
                      background: #67FAFA
                      border-radius: 8px
                  .percent
                    color: #67FAFA
                    margin-left: 10px
</style>