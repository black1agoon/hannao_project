<template>
  <div class="board-wrapper">
    <div class="box-wrap">
      <div class="today-info box">
        <div class="title">今日生产信息</div>
        <ul class="info-box">
          <li>
            <label>今日已派工</label>
            <span class="val">{{boardData.todayDispatchQty}}</span>
          </li>
          <li>
            <label>今日已缝头</label>
            <span class="val">{{boardData.todayFenTouQty}}</span>
          </li>
          <li>
            <label>今日已质检</label>
            <span class="val">{{boardData.todayPreCheckQty}}</span>
          </li>
          <li>
            <label>不良品</label>
            <span class="val bad">{{boardData.todayUngradedQty}}</span>
          </li>
        </ul>
      </div>
      <div class="bad-reason box">
        <div class="title">不良原因</div>
        <div class="bgballs">
          <!--<span class="bz">编织</span>-->
          <!--<span class="ft">缝头</span>-->
          <span class="pos"
                :style="{top: POSITION[index].pos[0] + 'px',
                left: POSITION[index].pos[1] + 'px',
                fontSize: POSITION[index].size + 'px'}"
                v-for="(issue, index) in qcIssuesGpList"
                :key="index">
            {{issue.name.substring(0, 2)}}
          </span>
        </div>
      </div>
      <div class="rank-top5 box">
        <div class="title">缝头员不合格排名top5</div>
        <ul class="rank-wrap">
          <li v-for="(user, index) in fenTouUngradedList" :key="index">
            <span class="index">{{index + 1}}</span>
            <span class="name">{{user.operatorName}}</span>
            <span class="line"></span>
            <span class="num">{{user.ungradedQtySum}}</span>
          </li>
        </ul>
      </div>
      <div class="order-info box">
        <div class="title">订单生产信息</div>
        <div class="content">
          <ul class="table-title">
            <li>生产单号</li>
            <li class="no">款号</li>
            <li class="color">颜色</li>
            <li class="size">尺码</li>
            <li class="type1">缝头完成情况</li>
            <li class="type2">前检完成情况</li>
          </ul>
          <div class="scroll-box">
            <div class="scroll" :style="scroll">
              <ul class="item" v-for="(order, index) in pdetailsChartList" :key="index">
                <li>{{order.taskCode}}</li>
                <li class="no">{{order.factoryDesc}}</li>
                <li class="color">{{order.colorName}}</li>
                <li class="size">{{order.size}}</li>
                <li class="progress type1">
                  <span class="detail">
                    <span class="now">{{order.fenTouQty}}</span>
                    <span class="target">/{{order.totalQty}}</span>
                  </span>
                  <div class="pg-box">
                    <div class="pg" :style="{width: getBarWidth(order.fenTouQty, order.totalQty)}"></div>
                  </div>
                </li>
                <li class="progress type2">
                  <span class="detail">
                    <span class="now">{{order.prechckQty}}</span>
                    <span class="target">/{{order.totalQty}}</span>
                  </span>
                  <div class="pg-box">
                    <div class="pg" :style="{width: getBarWidth(order.prechckQty, order.totalQty)}"></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="copyright">浙江汉脑数码科技有限公司版权所有</div>
  </div>
</template>

<script>
  import api from '@/api'
  const POSITION = [
    {
      pos: [119, 138],
      size: 30
    }, {
      pos: [62, 308],
      size: 25
    }, {
      pos: [137, 412],
      size: 25
    }, {
      pos: [84, 35],
      size: 25
    }, {
      pos: [84, 507],
      size: 25
    }
  ]
  export default {
    name: 'pre-checkshop',
    computed: {
      scroll() {
        return this.pdetailsChartList.length > 5 ? {
          animationDuration: `${this.pdetailsChartList.length * 1.5}s`
        } : {}
      }
    },
    data() {
      return {
        timer: null,
        POSITION,
        query: {
          PrechckStep: null,
          FenTouStep: null
        },
        boardData: {},
        qcIssuesGpList: [],
        fenTouUngradedList: [],
        pdetailsChartList: []
      }
    },
    methods: {
      getBarWidth(cur, sum) {
        return cur / sum > 1 ? '100%' : cur / sum * 100 + '%'
      },
      getAllSteps() {
        return api.ErpData.getAllSteps().then(data => {
          this.query.PrechckStep = data.find(d => d.stepName === '前检').id
          this.query.FenTouStep = data.find(d => d.stepName === '缝头').id
        })
      },
      getApiData() {
        api.Spectaculars.getShowPreCheck(this.query).then(data => {
          this.boardData = data
          this.fenTouUngradedList = data.fenTouUngradedList
          this.qcIssuesGpList = data.qcIssuesGpList.slice(0, 5)
          if (data.pdetailsChartList && data.pdetailsChartList.length > 5) {
            this.pdetailsChartList = data.pdetailsChartList.concat(data.pdetailsChartList)
          } else if (data.pdetailsChartList.length <= 5) {
            this.pdetailsChartList = data.pdetailsChartList
          }
        })
      }
    },
    mounted() {
      this.getAllSteps().then(() => {
        this.getApiData()
      })
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
    position: absolute
    width: 1920px
    height: 1080px
    background-image: url("../assets/img/bg-checkshop.png")
    background-size: 1920px 1080px
    background-repeat: no-repeat
    overflow: hidden
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
        &.today-info
          .info-box
            display: flex
            margin: 30px auto 0
            width: 495px
            height: 315px
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
                &.bad
                  color: #DB3B1B
        &.rank-top5
          .rank-wrap
            margin: 10px auto 0
            height: 345px
            width: 450px
            color: #ffffff
            display: flex
            flex-direction: column
            justify-content: space-between
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
        &.today-info, &.rank-top5
          width: 550px
          height: 422px
          background-image: url("../assets/img/checkbox1.png")
          background-size: 550px 422px
        &.bad-reason
          width: 691px
          height: 422px
          background-image: url("../assets/img/checkbox2.png")
          background-size: 691px 422px
          .bgballs
            position: relative
            width: 614px
            height: 260px
            margin: 50px auto
            background-image: url("../assets/img/checkshopballs.png")
            background-size: 614px 260px
            background-repeat: no-repeat
            color: #ffffff
            .pos
              position: absolute
        &.order-info
          width: 1846px
          height: 420px
          background-image: url("../assets/img/checkbox3.png")
          background-size: 1846px 420px
          .content
            .table-title
              display: flex
              height: 59px
              line-height: 59px
              margin: 8px 0
              li
                flex: 1
                list-style: none
                font-size: 25px
                color: #94F0FD
                text-align: center
                &.no
                  flex: 1.5
                &.color, &.size
                  width: 200px
                &.type1
                  flex: 0 0 490px
                &.type2
                  flex: 0 0 350px
            .scroll-box
              height: 295px
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
                    &.no
                      flex: 1.5
                      overflow: hidden
                      text-overflow: ellipsis
                      white-space: nowrap
                    &.color, &.size
                      width: 200px
                    &.type1
                      flex: 0 0 490px
                      .pg
                        background: linear-gradient(90deg, rgba(207, 91, 27, 1), rgba(228, 220, 80, 1))
                    &.type2
                      flex: 0 0 350px
                      .pg
                        background: linear-gradient(90deg, rgba(35, 96, 235, 1), rgba(69, 242, 232, 1))
                    &.progress
                      .detail
                        width: 243px
                        margin: 7px auto
                        text-align: right
                        height: 20px
                        line-height: 20px
                        display: block
                        font-size: 18px
                        .now
                          color: #ffffff
                        .target
                          color: #BEBFC0
                      .pg-box
                        width: 243px
                        height: 16px
                        margin: 0 auto
                        background: rgba(103, 250, 250, 0.2)
                        border-radius: 8px
                        .pg
                          width: 0
                          height: 16px
                          border-radius: 8px
</style>