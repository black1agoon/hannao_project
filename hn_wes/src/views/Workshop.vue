<template>
  <div class="board-wrapper">
    <div class="box-wrap">
      <div class="today-info box">
        <div class="title">今日生产信息</div>
        <ul class="info-box">
          <li>
            <label>今日已完成</label>
            <span class="val">{{Math.round(boardData.todayQty) || 0}}</span>
          </li>
          <li>
            <label>今日返工数</label>
            <span class="val">{{Math.round(boardData.todayUngradedQty) || 0}}</span>
          </li>
        </ul>
        <ul class="notice">
          <li v-for="(ungraded, index) in dayUngradedQtieList" :key="index">
            <i class="horn"></i>
            <span class="time">{{ungraded.createTime.substr(11, 5)}}</span>
            <span class="text">
              {{ungraded.depGTitle}} 款号 <span class="key">{{ungraded.productCode }}</span>返回<span class="key">{{Math.round(ungraded.ungradedQty)}}双</span>不良品
            </span>
          </li>
        </ul>
      </div>
      <div class="week-product box">
        <div class="title">小组本周产量</div>
        <div class="content">
          <charts-view :options="WORKSHOP" ref="chart">
          </charts-view>
        </div>
      </div>
      <div class="group-rank box">
        <div class="title">本周小组合格率排名</div>
        <ul class="rank-wrap">
          <li v-for="(group, index) in weekQcRateList" :key="index">
            <span class="index">{{index + 1}}</span>
            <span class="name">{{group.depGTitle}}</span>
            <span class="line"></span>
            <span class="num">{{getPercent(group.qtySum, group.qtySum - group.ungradedQtySum )}}</span>
          </li>
        </ul>
      </div>
      <div class="current-detail box">
        <div class="title">当前生产明细</div>
        <div class="content">
          <ul class="table-title">
            <li v-for="(group, index) in allDpgPdetailList" :key="index">
              <span class="name">{{group.depGTitle}}</span>
              <span class="sum">总数量:&nbsp;&nbsp;{{group.sum}}</span>
            </li>
          </ul>
          <div class="scroll-wrap">
            <single-scroll
                class="scroll-box"
                v-for="(group, index) in allDpgPdetailList" :key="index"
                :table-data="group.dpgPdetailList">
            </single-scroll>
            <!--<div class="scroll-box" v-for="(group, index) in allDpgPdetailList" :key="index">-->
              <!--<div class="scroll">-->
                <!--<ul class="item" v-for="(detail, i) in group.dpgPdetailList" :key="'detail' + i">-->
                  <!--<li class="name">{{detail.productCode}}</li>-->
                  <!--<li class="sum">{{detail.sumQty}}</li>-->
                <!--</ul>-->
              <!--</div>-->
            <!--</div>-->
          </div>
        </div>
      </div>
    </div>
    <div class="copyright">浙江汉脑数码科技有限公司版权所有</div>
  </div>
</template>

<script>
  import ChartsView from '../components/common/ChartsView'
  import SingleScroll from '../components/common/SingleScroll'
  import {WORKSHOP} from './board.config'
  // import {singleScroll} from '../assets/common/util'
  import api from '@/api'
  export default {
    name: 'workshop',
    components: {
      ChartsView,
      SingleScroll
    },
    computed: {
      scroll1() {
        return {
          animationDuration: '5s'
        }
        // return this.whFlowMasterShowList.length > 5 ? {
        //   animationDuration: `${this.whFlowMasterShowList.length * 1.5}s`
        // } : {}
      }
    },
    data() {
      return {
        timer: null,
        WORKSHOP,
        DingxingStep: null,
        boardData: {
          todayQty: 0,
          todayUngradedQty: 0
        },
        allDpgPdetailList: [], // 当前生产明细
        weekBookJobQtyList: [], // 小组本周产量
        weekQcRateList: [],  // 本周小组合格率排名
        dayUngradedQtieList: [] // 今天不良记录详细
      }
    },
    methods: {
      getApiData(DingxingStep) {
        api.Spectaculars.getDingxingShow(DingxingStep).then(data => {
          if (data) {
            this.boardData = data
            this.weekQcRateList = data.weekQcRateList.slice(0, 5)
            this.dayUngradedQtieList = data.dayUngradedQtieList.slice(0, 3)

            if (data.weekBookJobQtyList.length > 0) {
              for (let j = 0; j < data.weekBookJobQtyList[0].dayDpgQtyList.length; j++) {
                this.WORKSHOP.series[j].data = []
              }
            }
            for (let i = 0; i < data.weekBookJobQtyList.length; i++) {
              for (let j = 0; j < data.weekBookJobQtyList[i].dayDpgQtyList.length; j++) {
                this.WORKSHOP.series[j].name = data.weekBookJobQtyList[i].dayDpgQtyList[j].depGTitle
                this.WORKSHOP.series[j].data.push(data.weekBookJobQtyList[i].dayDpgQtyList[j].qty)
              }
            }
            this.WORKSHOP.series.slice(0, data.weekBookJobQtyList[0].dayDpgQtyList.length)
            this.$refs.chart.refresh()

            // 当前生产明细
            // this.allDpgPdetailList = [
            //   {
            //     depGTitle: 'A组',
            //     dpgPdetailList: [
            //       {
            //         productCode: 'A111',
            //         sumQty: 200
            //       }, {
            //         productCode: 'A222',
            //         sumQty: 300
            //       }, {
            //         productCode: 'A333',
            //         sumQty: 400
            //       }, {
            //         productCode: 'A444',
            //         sumQty: 400
            //       }, {
            //         productCode: 'A555',
            //         sumQty: 400
            //       }
            //     ],
            //     sum: 0
            //   }, {
            //     depGTitle: 'B组',
            //     dpgPdetailList: [
            //       {
            //         productCode: 'B111',
            //         sumQty: 200
            //       }, {
            //         productCode: 'B222',
            //         sumQty: 300
            //       }, {
            //         productCode: 'B333',
            //         sumQty: 400
            //       }, {
            //         productCode: 'B44444',
            //         sumQty: 400
            //       }, {
            //         productCode: 'B5555',
            //         sumQty: 400
            //       }, {
            //         productCode: 'B6666',
            //         sumQty: 400
            //       }
            //     ],
            //     sum: 0
            //   }, {
            //     depGTitle: 'C组',
            //     dpgPdetailList: [
            //       {
            //         productCode: 'C111',
            //         sumQty: 200
            //       }, {
            //         productCode: 'C222',
            //         sumQty: 300
            //       }, {
            //         productCode: 'C333',
            //         sumQty: 400
            //       }, {
            //         productCode: 'C444',
            //         sumQty: 300
            //       }, {
            //         productCode: 'C555',
            //         sumQty: 400
            //       }, {
            //         productCode: 'C666',
            //         sumQty: 300
            //       }, {
            //         productCode: 'C777',
            //         sumQty: 400
            //       }, {
            //         productCode: 'C888',
            //         sumQty: 400
            //       }
            //     ],
            //     sum: 0
            //   }
            // ]
            this.allDpgPdetailList = data.allDpgPdetailList.map(group => ({
              sum: group.dpgPdetailList.reduce((sum, current) => {
                return sum + current.sumQty
              }, 0),
              ...group
            }))
          }
        })
      },
      getPercent(sum, num) {
        return (num / sum * 100).toFixed(0) + '%'
      },
      getAllSteps() {
        return api.ErpData.getAllSteps().then(data => {
          this.DingxingStep = data.find(d => d.stepName === '定型').id
          this.getApiData(this.DingxingStep)
        })
      }
    },
    mounted() {
      this.getAllSteps()
      this.timer = setInterval(() => {
        this.getAllSteps()
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
    background-image: url("../assets/img/bg-workshop.png")
    background-size: 1920px 1080px
    background-repeat: no-repeat
    overflow: hidden
    .setting
      position: absolute
      width: 43px
      height: 43px
      background-image: url("../assets/img/shezhi.png")
      background-size: 43px 43px
      background-repeat: no-repeat
      right: 54px
      top: 12px
      cursor: pointer
    .copyright
      position: absolute
      bottom: 23px
      right: 69px
      font-family: 'HYWenHei'
      font-size: 20px
      color: #00DEFF
    .box-wrap
      margin: 143px 0 0 38px
      width: 1846px
      height: 869px
      display: flex
      flex-wrap: wrap
      justify-content: space-between
      align-content: space-between
      .box
        background-repeat: no-repeat
        .title
          font-size: 29px
          color: #94F0FD
          text-align: center
          line-height: 50px
        &.today-info, &.group-rank
          width: 550px
          height: 422px
          background-image: url("../assets/img/workshopbox1.png")
          background-size: 550px 422px
        &.week-product, &.current-detail
          width: 1267px
          height: 422px
          background-image: url("../assets/img/workshopbox2.png")
          background-size: 1267px 422px
        &.today-info
          .info-box
            display: flex
            margin: 30px auto 0
            width: 495px
            height: 147px
            flex-wrap: wrap
            justify-content: space-between
            align-content: space-between
            li
              width: 240px
              height: 147px
              background-image: url("../assets/img/checkdatabox.png")
              background-size: 240px 147px
              background-repeat: no-repeat
              label
                display: block
                font-size: 22px
                color: #ffffff
                margin: 24px 0 0 20px
              .val
                display: block
                text-align: center
                font-family: Teko-Regular
                font-size: 64px
                color: #FFDE00
                margin-top: 32px
                line-height: 42px
          .notice
            margin: 15px 30px
            li
              margin-bottom: 25px
              color: #ffffff
              display: flex
              border-bottom: 1px solid rgba(255, 255, 255, .3)
              font-size: 18px
              line-height: 40px
              &:last-child
                border: none
              .horn
                width: 28px
                height: 24px
                margin-top: 6px
                display: inline-block
                background-image: url("../assets/img/notice.png")
                background-size: 28px 24px
                background-repeat: no-repeat
              .time
                margin: 0 14px 0 8px
              .key
                color: #94F0FD
                margin: 0 5px
        &.week-product
          .content
            height: 370px
        &.group-rank
          .rank-wrap
            margin: 30px auto 0
            height: 345px
            width: 450px
            color: #ffffff
            li
              height: 65px
              line-height: 65px
              display: flex
              .index
                color: #FFDE00
                font-size: 36px
                vertical-align: bottom
              .name
                width: 111px
                margin-left: 20px
                font-size: 22px
                vertical-align: bottom
              .line
                width: 191px
                height: 1px
                margin-top: 32px
                border-top: 1px solid rgba(255, 255, 255, .3)
              .num
                margin-left: 30px
                font-size: 28px
                vertical-align: bottom
        &.current-detail
          .content
            .table-title
              display: flex
              justify-content: space-around
              height: 59px
              line-height: 59px
              margin: 8px 0
              li
                flex: 1
                list-style: none
                font-size: 25px
                color: #94F0FD
                text-align: center
                display: flex
                .name
                  flex: 2
                  white-space: nowrap
                .sum
                  flex: 1
                  white-space: nowrap
            .scroll-wrap
              display: flex
              width: 1267px
              .scroll-box
                flex: 1
</style>