<template>
  <div class="board-wrapper">
    <p class="big-title">后检车间数据展示</p>
    <selection class="selection"
               v-model="stepId"
               @change="stepIdChange"
               :options="stepsOptions">
    </selection>
    <div class="box-wrap">
      <div class="box statistics">
        <!--<div class="title">质检统计</div>-->
        <div class="content">
          <div class="item">
            <div class="item-box">
              <p class="text">今日完成量</p>
              <div class="bars">
                <div class="bar1"></div>
                <div class="bar2 today"></div>
              </div>
              <div class="val">{{boardData.today}}</div>
            </div>
            <div class="item-box">
              <p class="text">今日合格率</p>
              <charts-view class="pie" :options="pieOptions_today">
              </charts-view>
              <div class="val pct">{{boardData.todayPercentPass}}%</div>
            </div>
          </div>
          <div class="item">
            <div class="item-box">
              <p class="text">本周完成量</p>
              <div class="bars">
                <div class="bar1"></div>
                <div class="bar2 week"></div>
              </div>
              <div class="val">{{boardData.week}}</div>
            </div>
            <div class="item-box">
              <p class="text">本周合格率</p>
              <charts-view class="pie" :options="pieOptions_week">
              </charts-view>
              <div class="val pct">{{boardData.weekPercentPass}}%</div>
            </div>
          </div>
          <div class="item">
            <div class="item-box">
              <p class="text">本月完成量</p>
              <div class="bars">
                <div class="bar1"></div>
                <div class="bar2 month"></div>
              </div>
              <div class="val">{{boardData.month}}</div>
            </div>
            <div class="item-box">
              <p class="text">本月合格率</p>
              <charts-view class="pie" :options="pieOptions_month">
              </charts-view>
              <div class="val pct">{{boardData.monthPercentPass}}%</div>
            </div>
          </div>
        </div>
      </div>
      <div class="box quality-detail">
        <div class="title">订单生产信息</div>
        <div class="content">
          <ul class="table-title">
            <li>序号</li>
            <li>单号</li>
            <li class="no">款号</li>
            <li>主色</li>
            <li>尺码</li>
            <li>任务总量</li>
            <li>质检数</li>
            <li class="progress">进度</li>
          </ul>
          <order-scroll :list="orderList"
                        :list-length="6"
                        :list-height="354">
          </order-scroll>
        </div>
      </div>
      <div class="box pass-rate">
        <div class="title"></div>
        <span class="pj">{{boardData.preMonthPercentPass ? boardData.preMonthPercentPass : 0}}%</span>
        <charts-view :options="lineOptions">
        </charts-view>
      </div>
    </div>
    <div class="copyright">浙江汉脑数码科技有限公司版权所有</div>
  </div>
</template>

<script>
  import api from '@/api'
  import {BACKSHOP} from './board.config'
  import ChartsView from '@/components/common/ChartsView'
  import OrderScroll from './backshop/OrderScroll'
  import Selection from '../components/common/Selection'

  export default {
    name: 'pre-checkshop',
    components: {
      ChartsView,
      OrderScroll,
      Selection
    },
    computed: {},
    data() {
      return {
        stepId: this.$store.state.stepId,
        stepsOptions: [],
        timer: null,
        lineOptions: BACKSHOP.LINE_OPTIONS,
        boardData: {
          today: 0,
          week: 0,
          month: 0,
          preMonthPercentPass: 0
        },
        pieOptions_today: JSON.parse(JSON.stringify(BACKSHOP.PIE_OPTIONS)),
        pieOptions_week: JSON.parse(JSON.stringify(BACKSHOP.PIE_OPTIONS)),
        pieOptions_month: JSON.parse(JSON.stringify(BACKSHOP.PIE_OPTIONS)),
        orderList: []
      }
    },
    methods: {
      getSteps() {
        api.ErpData.getAllSteps().then(steps => {
          steps && steps.length > 0 ? this.stepsOptions = steps.map(step => ({
            label: step.stepName,
            value: step.id
          })) : this.stepsOptions = []
        })
      },
      getBarWidth(cur, sum) {
        return cur / sum > 1 ? '100%' : cur / sum * 100 + '%'
      },
      getApiData() {
        api.Spectaculars.getAfterCheckDataShow(this.stepId).then(data => {
          // console.log(data)
          this.boardData = {
            today: data.qcStatistical.todaySumSamplingNun,
            todayPercentPass: (data.qcStatistical.todayPercentPass * 100).toFixed(2),
            week: data.qcStatistical.weekSumSamplingNun,
            weekPercentPass: (data.qcStatistical.weekPercentPass * 100).toFixed(2),
            month: data.qcStatistical.monthSumSamplingNun,
            monthPercentPass: (data.qcStatistical.monthPercentPass * 100).toFixed(2),
            preMonthPercentPass: data.qcRateTrend.preMonthPercentPass
          }
          this.pieOptions_today.series[0].data[0].value = data.qcStatistical.todayPercentPass * 100
          this.pieOptions_today.series[0].data[1].value = (1 - data.qcStatistical.todayPercentPass) * 100
          this.pieOptions_week.series[0].data[0].value = data.qcStatistical.weekPercentPass * 100
          this.pieOptions_week.series[0].data[1].value = (1 - data.qcStatistical.weekPercentPass) * 100
          this.pieOptions_month.series[0].data[0].value = data.qcStatistical.monthPercentPass * 100
          this.pieOptions_month.series[0].data[1].value = (1 - data.qcStatistical.monthPercentPass) * 100

          let now = new Date()
          let d = new Date(now.getFullYear(), now.getMonth() + 1, 0)
          let days = d.getDate()
          this.lineOptions.xAxis[0].data = Array.from({length: days}, (v, i) => i + 1)
          this.lineOptions.series[0].data = data.qcRateTrend.qcRateTrendItemList.map(d => d.percentPass * 100)
          this.lineOptions.series[1].data = Array.from({length: days}, () => data.qcRateTrend.preMonthPercentPass * 100)

          this.orderList = data.qcDetailsStatisticalList
        })
      },
      getPieColorGradient() {
        this.pieOptions_today.series[0].data[0].itemStyle.color.colorStops.push({
          offset: 0,
          color: 'rgba(75, 250, 231, 1)'
        })
        this.pieOptions_week.series[0].data[0].itemStyle.color.colorStops.push({
          offset: 0,
          color: 'rgba(75, 183, 250, 1)'
        })
        this.pieOptions_month.series[0].data[0].itemStyle.color.colorStops.push({
          offset: 0,
          color: 'rgba(138, 139, 253, 1)'
        })
      },
      stepIdChange(val) {
        this.$store.commit('SET_STEPID', val)
        window.localStorage.setItem('stepId', val)   // 保存选择的仓库到本地
        this.getApiData()
      }
    },
    mounted() {
      this.getPieColorGradient()
      this.getSteps()
      this.getApiData()
      this.timer = setInterval(() => {
        this.getApiData()
        this.getSteps()
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
    position: absolute
    width: 1920px
    height: 1080px
    background-image: url("../assets/img/backshop/background.png")
    background-size: 1920px 1080px
    background-repeat: no-repeat
    overflow: hidden
    .selection
      position: absolute
      top: 10px
      left: 20px
    .big-title
      width: 638px
      margin: 0 auto
      color: #ffffff
      font-size: 38px
      text-align: center
      padding: 25px 0
      border-bottom: 3px solid #FDF476
    .copyright
      position: absolute
      bottom: 23px
      right: 69px
      font-family: 'HYWenHei'
      font-size: 20px
      color: #00DEFF
    .box-wrap
      .box
        position: absolute
        background-repeat: no-repeat
        .title
          font-size: 29px
          color: #94F0FD
          text-align: center
          line-height: 50px
        &.statistics
          top: 139px
          left: 37px
          width: 411px
          height: 884px
          background-image: url("../assets/img/backshop/box1.png")
          background-sizeL 411px 884px
          .content
            display: flex
            flex-direction: column
            margin-top: 26px
            height: 858px
            /*background: #333*/
            .item
              flex: 1
              display: flex
              .item-box
                flex: 1
                margin-top: 60px
                .text
                  text-align: center
                  color: #ffffff
                  font-size: 22px
                .bars
                  display: flex
                  width: 48px
                  margin: 30px auto 10px
                  justify-content: space-between
                  align-items: flex-end
                  .bar1
                    width: 20px
                    height: 100px
                    background: rgba(255, 255, 255, .2)
                    border-radius: 2px 2px 0 0
                  .bar2
                    width: 20px
                    height: 78px
                    border-radius: 2px 2px 0 0
                    &.today
                      background: #4BFAE7
                    &.week
                      background: #4BB7FA
                    &.month
                      background: #8A8BFD
                .val
                  text-align: center
                  font-size: 44px
                  color: #FADF4B
                  font-family: Teko-Regular
                  font-weight: 500
                  &.pct
                    color: #4BFAE7
                .pie
                  width: 100px
                  height: 100px
                  margin: 30px auto 10px
        &.quality-detail
          top: 139px
          left: 483px
          width: 1402px
          height: 464px
          background-image: url("../assets/img/checkbox3.png")
          background-size: 1402px 464px
          .content
            .table-title
              display: flex
              height: 59px
              line-height: 59px
              li
                flex: 1
                font-size: 22px
                color: #ffffff
                text-align: center
                &.no
                  flex: 1.5
                &.progress
                  flex: none
                  width: 270px
        &.pass-rate
          top: 650px
          left: 483px
          width: 1402px
          height: 373px
          background-image: url("../assets/img/backshop/box3.png")
          background-sizeL 1402px 373px
          .pj
            display: block
            position: absolute
            color: #ffffff
            font-size: 21px
            right: 41px
            top: 53px
</style>