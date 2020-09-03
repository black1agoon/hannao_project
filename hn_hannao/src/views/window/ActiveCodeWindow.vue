<template>
  <transition name="fade">
    <div class="window-wrapper" v-show="show">
      <div class="window-mask" @click="close"></div>
      <div class="container">
        <div class="block block1">
          <div class="big-title">主动码数据实时监控</div>
          <div class="date">{{date}}</div>
          <div class="sum-box">
            <div class="label">主动码总数</div>
            <number-box :number="getCodeSum">
            </number-box>
          </div>
          <div class="data-box">
            <div class="data data1">
              <div class="name">边缘设备</div>
              <div class="val">{{kanbanData.edgeDevice || 0}}</div>
            </div>
            <div class="data data2">
              <div class="name">过程计算</div>
              <div class="val">{{kanbanData.processCalculation || 0}}</div>
            </div>
            <div class="data data3">
              <div class="name">设备数量</div>
              <div class="val">{{kanbanData.device || 0}}</div>
            </div>
          </div>
        </div>
        <div class="block block2">
          <div class="title">边缘设备</div>
          <div class="content">
            <dash-progress class="dash-progress" text="当前开机率" :percent="used">
            </dash-progress>
            <dash-progress class="dash-progress" text="当前已注册" :percent="register">
            </dash-progress>
          </div>
        </div>
        <div class="block block3">
          <div class="title">主动码开机率(近30天)</div>
          <div class="content">
            <charts-view :options="OPEN_RATE" ref="chart1">
            </charts-view>
          </div>
        </div>
        <div class="block block4">
          <div class="title">主动码日增长(近30天)</div>
          <div class="content">
            <charts-view :options="CODE_ADD" ref="chart2">
            </charts-view>
          </div>
        </div>
        <div class="block block5">
          <div class="title">主动码排名</div>
          <div class="content">
            <ul class="table-title">
              <li class="rank">排名</li>
              <li class="num">设备数</li>
              <li class="regnum">注册数</li>
              <li class="open">当前开机</li>
              <li class="usernum">人员数</li>
            </ul>
            <ul class="ctt-box">
              <li class="row"
                  :class="{ first: index === 0, second: index === 1, third: index ===2 }"
                  v-for="(row, index) in ranklist"
                  :key="index">
                <div class="rank">NO.{{index + 1}}</div>
                <div class="num">{{row.equipment}}</div>
                <div class="regnum">{{row.register}}</div>
                <div class="open">{{row.using}}</div>
                <div class="usernum">{{row.worker}}</div>
              </li>
            </ul>
          </div>
        </div>
        <div class="block block6">
          <div class="title">主动码解析日志</div>
          <div class="content">
            <div class="scroll" :style="scroll">
              <div class="message" v-for="(log, index) in logListView" :key="index">
                <div class="time">{{log.createTime}}</div>
                <div class="name">{{log.activeCodeName}}</div>
                <div class="msg">{{log.actionName}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { formatDate } from '../../assets/common/util'
  import { CODE_ADD, OPEN_RATE } from '../board.config'
  import ChartsView from '../../components/common/ChartsView'
  import DashProgress from '../../components/mainview/DashProgress'
  import NumberBox from '../../components/mainview/NumberBox'
  import api from '@/api'
  export default {
    name: 'active-code-window',
    components: {
      ChartsView,
      DashProgress,
      NumberBox
    },
    props: {
      kanbanData: {
        type: Object,
        default: () => ({})
      },
      logList: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      getCodeSum() {
        return this.kanbanData.edgeDevice + this.kanbanData.processCalculation + this.kanbanData.device
      },
      logListView() {
        if (this.logList.length > 7) {
          return this.logList.concat(this.logList)
        } else {
          return this.logList
        }
      },
      scroll() {
        return this.logList.length > 7 ? {
          animationDuration: `${this.logList.length * 1.5}s`
        } : {}
      }
    },
    data() {
      return {
        show: false,
        date: formatDate(new Date(), 'yyyy年MM月dd日'),
        OPEN_RATE: OPEN_RATE,
        CODE_ADD: CODE_ADD,
        ranklist: [],
        register: 0, // 已注册%
        used: 0, // 开机率%
      }
    },
    methods: {
      open() {
        this.show = true
        this.$nextTick(() => {
          this.$refs.chart1.refresh()
          this.$refs.chart2.refresh()
        })
      },
      close() {
        this.show = false
      },
      getApiData() {
        api.mainview.enterpriseDetailMX().then(data => {
          if (data && data.length) {
            this.ranklist = data
          } else {
            this.ranklist = []
          }
        })
        api.mainview.registerAndUse().then(data => {
          this.register = data.register || 0
          this.used = data.used || 0
        })
      }
    },
    mounted() {
      this.getApiData()
      this.timer = setInterval(() => {
        this.getApiData()
      }, 5 * 60 * 1000)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../assets/stylus/animation.styl'
  .window-wrapper
    position: absolute
    z-index: 100
    width: 1920px
    height: 1080px
    top: 0
    left: 0
    transition: all .2s
    backdrop-filter: blur(10px)
    &.fade-enter, &.fade-leave-to
      opacity: 0
    .window-mask
      background: rgba(0, 0, 0, .65)
      width: 100%
      height: 100%
    .container
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      margin: auto
      width: 1680px
      height: 840px
      border-radius: 8px
      background: rgba(0, 0, 0, .65)
      box-shadow:0 2px 10px rgba(81, 255, 255, 0.2)
      .block
        position: absolute
        .title
          width: 280px
          height: 38px
          color: #CBF6FF
          font-size: 20px
          line-height: 38px
          border-left: 3px solid #3D9DC5
          background: linear-gradient(90deg, rgba(15, 88, 132, 1) 0%, rgba(8, 44, 66, .5) 60%, rgba(8, 44, 66, 0) 100%)
          overflow: hidden
          padding-left: 20px
        &.block1
          top: 50px
          left: 50px
          .big-title
            font-size: 38px
            color: #ffffff
          .date
            font-size: 20px
            color: rgba(255, 255, 255, .75)
            margin-top: 20px
          .sum-box
            margin-top: 26px
            display: flex
            .label
              width: 197px
              height: 70px
              background: rgba(216, 216, 216, .1)
              color: #FFD500
              font-size: 36px
              line-height: 70px
              text-align: center
              border-radius: 4px
              margin-right: 7px
            .num-box
              display: flex
              font-family: 'digital-dismay'
              .num
                width: 46px
                height: 70px
                padding-left: 4px
                box-sizing: border-box
                border-radius: 4px
                text-align: center
                line-height: 74px
                font-size: 80px
                color: #FFD500
                background: rgba(216, 216, 216, .1)
                margin: 0 1px
          .data-box
            display: flex
            margin-top: 39px
            width: 490px
            justify-content: space-between
            .data
              width: 150px
              height: 130px
              background: rgba(216, 216, 216, .1)
              .name
                font-size: 24px
                text-align: center
                margin-top: 16px
              .val
                font-size: 40px
                font-weight: bold
                text-align: center
                margin-top: 25px
              &.data1
                color: #51FFFF
                border-bottom: 2px solid #51FFFF
              &.data2
                color: #44C885
                border-bottom: 2px solid #44C885
              &.data3
                color: #E66A02
                border-bottom: 2px solid #E66A02
        &.block2
          left: 50px
          top: 450px
          .content
            display: flex
            width: 510px
            justify-content: space-between
            .dash-progress
              margin-top: 38px
        &.block3
          top: 50px
          left: 590px
          .content
            width: 520px
            height: 310px
        &.block4
          top: 450px
          left: 590px
          .content
            width: 520px
            height: 310px
        &.block5
          top: 50px
          left: 1130px
          .content
            .table-title
              display: flex
              margin-top: 20px
              width: 500px
              height: 32px
              background: rgba(216, 216, 216, .2)
              color: #ffffff
              font-size: 14px
              text-align: center
              line-height: 32px
            .ctt-box
              width: 500px
              height: 260px
              display: flex
              flex-direction: column
              justify-content: space-between
              margin-top: 3px
              .row
                display: flex
                flex: 0 0 24px
                font-size: 14px
                line-height: 24px
                text-align: center
                background: rgba(0, 150, 255, .2)
                color: #5FC1EE
                &.first
                  background: rgba(255, 213, 0, .3)
                  color: #FFD500
                  .rank
                    background: #FFD500
                &.second
                  background: rgba(230, 106, 2, .3)
                  color: #E66A02
                  .rank
                    background: #E66A02
                &.third
                  background: rgba(68, 200, 133, .3)
                  color: #44C885
                  .rank
                    background: #44C885
                &.first, &.second, &.third
                  .rank
                    color: #01092B
            .rank
                  background: rgba(0, 150, 255, .3)
            .rank
              flex: 0 0 58px
            .num
              flex: 0 0 105px
            .regnum
              flex: 0 0 100px
            .open
              flex: 0 0 100px
            .usernum
              flex: 1
        &.block6
          top: 450px
          left: 1130px
          .content
            margin-top: 20px
            width: 500px
            height: 300px
            overflow: hidden
            &:hover
              .scroll
                animation-play-state: paused
            .scroll
              animation-name: columnScroll
              animation-iteration-count: infinite
              animation-timing-function: linear
              .message
                height: 42px
                display: flex
                justify-content: space-between
                align-items: center
                font-size: 14px
                color: rgba(216, 216, 216, 1)
                font-weight: 400
                text-align: center
                .time
                  flex: 3
                .name
                  flex: 2
                .msg
                  flex: 3
                  overflow: hidden
                  text-overflow: ellipsis
                  white-space: nowrap
</style>
