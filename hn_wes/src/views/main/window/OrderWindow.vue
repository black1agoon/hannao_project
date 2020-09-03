<template>
  <window-box ref="window">
    <div class="header" slot="header">
      生产中订单
    </div>
    <div class="container">
      <div class="order"
           @click="openOrderDetail(order.ptaskId)"
           :class="{error: order.isRed}"
           v-for="(order, index) in orderList" :key="index">
        <div class="no">{{order.ptaskCode}}</div>
        <div class="delivertime">
          <span class="label">交期</span>
          <span class="val">{{order.factoryHod ? order.factoryHod.substr(0, 11) : null}}</span>
        </div>
        <div class="customer">
          <span class="label">客户</span>
          <span class="val">{{order.cusName}}</span>
        </div>
        <div class="style">
          <span class="label">款式号</span>
          <ul class="val">
            <li v-for="(style,idx) in order.styleCode" :key="idx">{{style}}</li>
          </ul>
        </div>
        <div class="numbers">
          <span class="label"><span class="triangle"></span>计划数/已完成数</span>
          <span class="val">{{order.planQty}}/{{order.hasFinished}}</span>
        </div>
        <div class="bar-wrap">
          <div class="bar" :style="{width: getBarWidth(order.planQty, order.hasFinished)}"></div>
        </div>
      </div>

    </div>
  </window-box>
</template>

<script>
  import WindowBox from './WindowBox'
  import api from '@/api'
  export default {
    name: 'order-window',
    components: {
      WindowBox
    },
    data() {
      return {
        orderList: []
      }
    },
    methods: {
      getBarWidth(sum, num) {
        return (num / sum * 100).toFixed(2) + '%'
      },
      open() {
        this.getUnProducePTask()
        this.$refs.window.open()
      },
      close() {
        this.$refs.window.close()
      },
      getUnProducePTask() {
        api.Spectaculars.getUnProducePTask().then(data => {
          this.orderList = data
        })
      },
      openOrderDetail(id) {
        this.close()
        this.$emit('openOrderDetail', id)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
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
    overflow-y: auto
    display: flex
    flex-wrap: wrap
    justify-content: space-between
    padding: 20px 80px 50px
    box-sizing: border-box
    &::-webkit-scrollbar
      display: none
    .order
      position: relative
      width: 778px
      height: 161px
      background-size: 778px 161px
      background-repeat: no-repeat
      background-image: url("../../../assets/img/main/normalbox.png")
      margin-top: 30px
      color: #81D5E5
      cursor: pointer
      &.error
        color: #FF5D75
        background-image: url("../../../assets/img/main/errorbox.png")
        .bar
          background: linear-gradient(90deg, rgba(255, 170, 157, 1) 0%, rgba(255, 0, 38, 1) 100%) !important
      .no
        padding-left: 35px
        line-height: 65px
        font-size: 32px
        font-weight: bold
      .label
        font-size: 18px
        color: #ffffff
        display: inline-block
        vertical-align: bottom
        height: 20px
      .val
        font-size: 20px
        display: inline-block
        vertical-align: bottom
        height: 20px
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis
      .delivertime
        position: absolute
        top: 23px
        right: 33px
        .label
          width: 55px
      .customer
        position: absolute
        top: 80px
        left: 35px
        .label
          width: 70px
        .val
          width: 285px
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
      .style
        position: absolute
        top: 115px
        left: 35px
        white-space: nowrap
        .label
          width: 70px
        .val
          width: 285px
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
          li
            display: inline-block
            margin-right: 5px
      .numbers
        position: absolute
        top: 80px
        left: 406px
        .label
          width: 170px
          .triangle
            display: inline-block
            border-left: 5px solid transparent
            border-right: 5px solid transparent
            border-bottom: 11px solid #fff
            width: 0
            height: 0
            transform: rotate(90deg)
            margin-right: 10px
        .val
          width: 160px
          text-align: right
      .size
        position: absolute
        top: 115px
        left: 35px
        .label
          width: 55px
        .val
          width: 120px
      .bar-wrap
        position: absolute
        width: 334px
        height: 14px
        background: rgba(50, 43, 68, 1)
        border-radius: 8px
        top: 120px
        left: 406px
        .bar
          background: linear-gradient(90deg, rgba(157, 245, 255, 1) 0%, rgba(2, 169, 250, 1) 100%)
          border-radius: 8px
          height: 14px
</style>