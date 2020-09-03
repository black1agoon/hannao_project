<template>
  <div class="scroll-box" :style="{height: listHeight + 'px'}">
    <div class="scroll"
         :style="{
         marginTop: list.length > listLength ? -lineHeight + 'px' : 0,
         height: listHeight + 'px'
         }">
      <div class="order-list"
           @mouseenter="mouseenter"
           @mouseleave="mouseleave">
        <ul :class="['item', rowClasses, {deepcolor: !order._ids}]"
             v-for="(order, index) in viewList"
             :key="index"
             @animationend="onSlidingEnd">
          <li>{{order.index}}</li>
          <li>{{order.taskCode}}</li>
          <li class="no">{{order.styleCode}}</li>
          <li>{{order.colorMain}}</li>
          <li>{{order.size}}</li>
          <li>{{order.pDetailNum}}</li>
          <li>{{order.sumQcSamplingNun}}</li>
          <li class="progress">
            <div class="pg-box">
              <div class="pg" :style="{width: getProgressWidth(order.pDetailNum, order.sumQcSamplingNun) + '%'}"></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import mixin from './mixin'
  export default {
    name: 'order-scroll',
    mixins: [mixin],
    props: {
      listLength: {
        type: Number,
        default: 0
      },
      listHeight: {
        type: Number,
        default: 0
      },
      lineHeight: {
        type: Number,
        default: 59
      },
      delayTime: {
        type: Number,
        default: 2
      },
      overdueHour: {
        type: Number,
        default: 0
      }
    },
    methods: {
      getProgressWidth(sum, num) {
        return sum > 0 ? num > sum ? 100 : num / sum * 100 : 0
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../assets/stylus/scroll.styl'
  .scroll-box
    overflow: hidden
    .scroll
      .item
        display: flex
        justify-content: space-around
        height: 59px
        line-height: 59px
        font-size: 20px
        text-align: center
        &.deepcolor
          background: rgba(14, 95, 183, .3)
        li
          flex: 1
          font-size: 22px
          color: #ffffff
          text-align: center
          overflow: hidden
          white-space: nowrap
          text-overflow: ellipsis
          &.no
            flex: 1.5
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
          &.progress
            flex: none
            width: 270px
            .pg-box
              width: 243px
              height: 16px
              margin: 21px auto 0
              background: rgba(64, 84, 92, 1)
              border-radius: 8px
              .pg
                background: linear-gradient(270deg, rgba(223, 209, 99, 1) 0%, rgba(193, 98, 47, 1) 100%)
                width: 0
                height: 16px
                border-radius: 8px
</style>