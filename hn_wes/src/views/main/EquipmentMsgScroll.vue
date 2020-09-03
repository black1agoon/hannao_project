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
        <div :class="['order', rowClasses, {yq: msg.status}]"
             v-for="(msg, index) in viewList"
             :key="index"
             @animationend="onSlidingEnd">
          <span class="detail">{{msg.message}}</span>
          <span class="ordertime">{{msg.time}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import mixin from './mixin'
  export default {
    name: 'equipment-msg-scroll',
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
        default: 24
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
    computed: {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../assets/stylus/scroll.styl'
  .scroll-box
    overflow: hidden
    .scroll
      .order-list
        .order
          position: relative
          width: 100%
          color: #81D5E5
          height: 24px
          line-height: 24px
          font-size: 12px
          display: flex
          &.yq
            color: #ffffff
            background: linear-gradient(90deg, rgba(255, 93, 117, .43) 0%, rgba(128, 47, 59, 0) 100%)
          .detail
            display: inline-block
            width: 350px
            padding-left: 14px
          .ordertime
            flex: 1
            padding-right: 24px
            text-align: right

</style>