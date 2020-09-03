<template>
  <div class="scroll-box" :style="{height: listHeight + 'px'}">
    <div class="scroll"
         :style="{
         marginTop: list.length > listLength ? -lineHeight + 'px' : 0,
         height: listHeight + 'px'
         }">
      <div class="order-list">
        <div :class="['order', rowClasses, {error: order.status}]"
             v-for="(order, index) in viewList"
             :key="index"
             @mouseenter="mouseenter"
             @mouseleave="mouseleave"
             @animationend="onSlidingEnd">
          <div class="detail">
            <p class="number" @click="openOrderDetail(order.pDetailId)">{{order.ordCode}}</p>
            <p class="text">
              <label>客户</label><span class="val">{{order.buyer}}</span>
            </p>
            <p class="text">
              <label>款式</label><span class="val">{{order.productCode}}</span>
            </p>
            <p class="text">
              <label>计划数</label><span class="val">{{order.amount | setNumByThree}}</span>
            </p>
            <p class="text">
              <label>交期</label><span class="val">{{order.factoryHod ? order.factoryHod.substr(0, 10) : ''}}</span>
            </p>
          </div>
          <order-progress-bar class="progress" :plan-number="order.amount" :bar-data="order.bookJobs">
          </order-progress-bar>
          <div class="data">
            <label>已完成数</label>
            <p class="val">{{getLastStep(order).bookJobQtySum | setNumByThree}}</p>
            <label>完成率</label>
            <p class="val pct">{{getLastStep(order).pct_finish}}%</p>
            <label>不合格数</label>
            <p class="val error">{{getLastStep(order).ungradedQtySum | setNumByThree}}</p>
            <label>合格率</label>
            <p class="val pct">{{getLastStep(order).pct_graded}}%</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import mixin from './mixin'
  import OrderProgressBar from './OrderProgressBar'
  export default {
    name: 'order-scroll',
    mixins: [mixin],
    components: {
      OrderProgressBar
    },
    props: {
      listLength: {
        type: Number,
        default: 4
      },
      listHeight: {
        type: Number,
        default: 742
      },
      lineHeight: {
        type: Number,
        default: 193
      },
      delayTime: {
        type: Number,
        default: 5
      }
    },
    computed: {
    },
    data() {
      return {}
    },
    methods: {
      getLastStep(order) {
        let lastStep = order.bookJobs ? order.bookJobs.find(job => job.lastStep) : undefined
        if (lastStep) {
          return {
            bookJobQtySum: lastStep.bookJobQtySum,
            pct_finish: lastStep.bookJobQtySum / order.amount % 1 !== 0 ? ((lastStep.bookJobQtySum / order.amount) * 100).toFixed(2) : (lastStep.bookJobQtySum / order.amount) * 100,
            ungradedQtySum: lastStep.ungradedQtySum,
            pct_graded: (lastStep.bookJobQtySum - lastStep.ungradedQtySum) / lastStep.bookJobQtySum % 1 !== 0 ? (((lastStep.bookJobQtySum - lastStep.ungradedQtySum) / lastStep.bookJobQtySum) * 100).toFixed(2) : (lastStep.bookJobQtySum - lastStep.ungradedQtySum) / lastStep.bookJobQtySum * 100
          }
        } else {
          return {
            bookJobQtySum: 0, // 已完成数
            pct_finish: 0,  // 完成率
            ungradedQtySum: 0, // 不合格数
            pct_graded: 0   // 合格率
          }
        }
      },
      openOrderDetail(id) {
        this.$emit('openOrderDetail', id)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../assets/stylus/scroll.styl'
  .scroll-box
    overflow: hidden
    .scroll
      .order-list
        width: 100%
        .order
          width: 832px
          height: 169px
          background-image: url("../../assets/img/main/orderbg_normal.png")
          background-size: 832px 169px
          background-repeat: no-repeat
          margin-bottom: 23px
          display: flex
          &.error
            background-image: url("../../assets/img/main/orderbg_error.png")
          .detail
            width: 175px
            overflow: hidden
            .number
              width: 126px
              height: 34px
              line-height: 34px
              text-align: center
              margin: 8px 0 0 37px
              overflow: hidden
              white-space: normal
              text-overflow: ellipsis
              font-size: 18px
              color: #8AEDFF
              font-weight: bold
              cursor: pointer
            .text
              font-size: 12px
              margin: 15px 0 0 18px
              label
                display: inline-block
                width: 50px
                color: #81D5E5
                vertical-align: top
              .val
                width: 100px
                vertical-align: top
                display: inline-block
                overflow: hidden
                text-overflow: ellipsis
                white-space: nowrap
                font-weight: bold
                color: #8AEDFF
          .progress
            margin-top: 7px
            width: 556px
            height: 150px
          .data
            flex: 1
            margin-left: 15px
            label
              display: block
              margin-top: 8px
              color: #81D5E5
              font-size: 10px
            .val
              margin-top: 4px
              color: #8AEDFF
              font-weight: bold
              &.error
                color: #FF5D75
              &.pct
                color: #02A9FA


</style>