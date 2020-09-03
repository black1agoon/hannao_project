<template>
  <window-box ref="window" :swiper="true"
              :current-page="index + 1"
              :page-number="allOrder.length"
              @prev="prev"
              @next="next">
    <div class="header" slot="header">
      订单明细
    </div>
    <div class="container" :class="rowClasses" @animationend="slidingEnd">
      <div class="orderinfo">
        <div class="no">{{orderdetail.taskCode}}</div>
        <div class="data">
          <div class="item">
            <div class="label">合格率</div>
            <div class="val">{{orderdetail.percentPass}}%</div>
          </div>
          <div class="item">
            <div class="label">不合格数</div>
            <div class="val error">{{orderdetail.ungradedQtySum | setNumByThree}}</div>
          </div>
        </div>
        <div class="detailbox">
          <div class="item">
            <span class="label">客户</span>
            <span class="value">{{orderdetail.cusName}}</span>
          </div>
          <div class="item">
            <span class="label">款式号</span>
            <span class="value">{{orderdetail.taskCode}}</span>
          </div>
          <div class="item">
            <span class="label">尺码</span>
            <span class="value">{{orderdetail.size}}</span>
          </div>
          <div class="item">
            <span class="label">主色</span>
            <span class="value">{{orderdetail.colorMain}}</span>
          </div>
        </div>
        <div class="detailbox">
          <div class="item">
            <span class="label"><span class="triangle"></span>计划数</span>
            <span class="value">{{orderdetail.totalQty | setNumByThree}}</span>
          </div>
          <div class="item">
            <div class="bar-wrap">
              <div class="bar" :style="{width: getBarWidth(orderdetail.totalQty, orderdetail.finishQty)}"></div>
            </div>
          </div>
          <div class="item">
            <span class="label"><span class="triangle"></span>已完成数</span>
            <span class="value">{{orderdetail.finishQty | setNumByThree}}</span>
          </div>
          <div class="item">
            <span class="label"><span class="triangle"></span>交期</span>
            <span class="value">{{orderdetail.factoryHod ? orderdetail.factoryHod.substr(0, 11) : null}}</span>
          </div>
        </div>
      </div>
      <div class="steps-wrapper">
        <div class="steps">
          <div class="step" v-for="(step, index) in stepsList" :key="index">
            <div class="point" :class="{error: step.percentPass === minPercent}"></div>
            <div class="left-wrap">
              <div class="name">{{step.stepName}}</div>
              <div class="data">
                <div class="item">
                  <span class="label">合格率</span>
                  <span class="val" :class="{error: step.percentPass === minPercent}">{{getPercent(step.percentPass)}}</span>
                </div>
                <div class="item">
                  <span class="label">完成数</span>
                  <span class="val">{{step.sumQty - step.sumUngradedQty | setNumByThree}}</span>
                </div>
              </div>
            </div>
            <div class="right-wrap">
              <div class="starttime">开始时间 {{step.startTime}}</div>
              <div class="user-wrap">
                <div class="user" v-for="(user, idx) in step.itemBookjobs" :key="idx">
                  <span class="name">{{user.operatorName}}</span>
                  <span class="output">产量:{{user.bookJobQty}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </window-box>
</template>

<script>
  import WindowBox from './WindowBox'
  import {setNumberByThree} from '../../../assets/js/utils'
  import api from '@/api'
  export default {
    name: 'order-detail-window',
    components: {
      WindowBox
    },
    filters: {
      setNumByThree(num) {
        return setNumberByThree(num)
      }
    },
    computed: {
      minPercent() {
        let min = 1
        this.stepsList.forEach(step => {
          min = step.percentPass <= min ? step.percentPass : min
        })
        return min
      },
      rowClasses() {
        return {
          'window-slide-left': this.isSlidingLeft,
          'window-slide-right': this.isSlidingRight,
        }
      }
    },
    data() {
      return {
        params: {},
        index: 0,
        allOrder: [],
        orderdetail: {},
        stepsList: [],
        isSlidingLeft: false,
        isSlidingRight: false
      }
    },
    methods: {
      open(params) {
        this.params = params
        this.index = 0
        this.getPdetailInfos()
        this.$refs.window.open()
      },
      close() {
        this.$refs.window.close()
      },
      prev() {
        this.index--
        this.isSlidingRight = true
        this.orderdetail = this.allOrder[this.index]
        this.stepsList = this.allOrder[this.index].pdetailInfoDetailOutputList
      },
      next() {
        this.index++
        this.isSlidingLeft = true
        this.orderdetail = this.allOrder[this.index]
        this.stepsList = this.allOrder[this.index].pdetailInfoDetailOutputList
      },
      getPdetailInfos() {
        api.Spectaculars.getPdetailInfos(this.params).then(data => {
          if (data && data.length > 0) {
            this.allOrder = data
            this.orderdetail = data[0]
            this.stepsList = data[0].pdetailInfoDetailOutputList
          } else {
            this.allOrder = []
            this.orderdetail = {}
            this.stepsList = []
          }
        })
      },
      getBarWidth(sum, num) {
        return sum > 0 ? num / sum === 1 ? 100 + '%' : (num / sum * 100).toFixed(2) + '%' : 0 + '%'
      },
      getPercent(pct) {
        if (pct) {
          return (pct !== 1 ? (pct * 100).toFixed(1) : pct * 100) + '%'
        } else {
          return '0%'
        }
      },
      slidingEnd() {
        this.isSlidingLeft = false
        this.isSlidingRight = false
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../../assets/stylus/scroll.styl'
  .header
    position: absolute
    left: 26px
    top: -57px
    width: 246px
    height: 81px
    background-image: url("../../../assets/img/main/headerbox.png")
    background-size: 246px 81px
    background-repeat: no-repeat
    color: #81D5E5
    font-size: 26px
    text-align: center
    line-height: 85px

  .container
    height: 866px
    display: flex
    flex-wrap: wrap
    padding: 30px 80px 40px
    box-sizing: border-box
    overflow: hidden
    .orderinfo
      width: 324px
      margin: 52px 0 0 50px
      .no
        color: #8AEDFF
        font-size: 36px
        font-weight: bold
        border-bottom: 2px solid #14CAEB
        padding-bottom: 20px
      .data
        display: flex
        margin-top: 30px
        .item
          flex: 1
          .label
            color: #81D5E5
            font-size: 16px
          .val
            margin-top: 20px
            color: #81D5E5
            font-size: 40px
            font-weight: bold
            &.error
              color: #FF5D75
      .detailbox
        margin-top: 40px
        width: 324px
        height: 226px
        background-image: url("../../../assets/img/main/detailbox.png")
        background-size: 324px 226px
        background-repeat: no-repeat
        overflow: hidden
        .item
          display: flex
          font-size: 20px
          padding: 0 38px
          margin-top: 29px
          .label
            flex: 0 0 110px
            color: #ffffff
            .triangle
              display: inline-block
              border-left: 5px solid transparent
              border-right: 5px solid transparent
              border-bottom: 11px solid #fff
              width: 0
              height: 0
              transform: rotate(90deg)
              margin-right: 10px
          .value
            color: #8AEDFF
            flex: 1
            text-align: right
          .bar-wrap
            width: 264px
            height: 14px
            border-radius: 8px
            background: rgba(1, 29, 57, 1)
            .bar
              height: 14px
              background: linear-gradient(90deg, rgba(157, 245, 255, 1) 0%, rgba(2, 169, 250, 1) 100%)
              border-radius: 8px
    .steps-wrapper
      flex: 1
      margin-left: 45px
      overflow-y: scroll
      height: 100%
      &::-webkit-scrollbar
        display: none
      .steps
        position: relative
        padding-left: 60px
        &:before
          position: absolute
          left: 20px
          top: 14px
          content: ''
          background: #02A9FA
          width: 2px
          height: calc(100% - 28px)
        .step
          position: relative
          margin-bottom: 20px
          .point
            position: absolute
            left: -58px
            top: 0
            width: 39px
            height: 39px
            background-size: 39px 39px
            background-repeat: no-repeat
            background-image: url("../../../assets/img/main/normalpoint.png")
            &.error
              background-image: url("../../../assets/img/main/errorpoint.png")
          .left-wrap
            display: inline-block
            width: 140px
            .name
              color: #8AEDFF
              font-size: 28px
            .data
              .item
                margin: 10px 0
                .label
                  color: #81D5E5
                  font-size: 16px
                  margin-right: 10px
                .val
                  color: #02A9FA
                  font-weight: bold
                  &.error
                    color: #FF5D75
          .right-wrap
            display: inline-block
            vertical-align: top
            .starttime
              color: #8AEDFF
              font-size: 20px
              line-height: 28px
              margin-bottom: 10px
            .user-wrap
              width: 960px
              display: flex
              flex-wrap: wrap
              .user
                display: flex
                margin-right: 10px
                width: 180px
                height: 46px
                border: 2px solid #81D5E5
                align-items: center
                margin-bottom: 20px
                &:nth-of-type(5n)
                  margin-right: 0
                .name, .output
                  color: #8AEDFF
                  font-size: 20px
                  text-align: center
                .name
                  width: 70px
                .output
                  flex: 1
</style>