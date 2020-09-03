<template>
  <div class="table-wrapper">
    <div :class="['title', {type0: type === 0, type1: type === 1}]">{{getTitle}}</div>
    <div class="data">
      <div class="introduce">{{introduce}}已使用:</div>
      <div class="numbs">
        <div class="num" v-show="waterUsed > -1">水<span class="val">{{waterUsed}}</span></div>
        <div class="num" v-show="electricUsed > -1">电<span class="val">{{electricUsed}}</span>kwh</div>
      </div>
    </div>
    <div class="tabs-wrap">
      <tabs-switch ref="tabs" @getChartsData="getChartsData">
      </tabs-switch>
    </div>
    <div class="charts-wrap">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import TabsSwitch from './TabsSwitch'
  export default {
    name: 'table-box',
    components: {
      TabsSwitch
    },
    props: {
      type: {
        type: Number,
        default: 0
      },
      number: {
        type: Number,
        default: 0
      },
      waterUsed: {
        type: Number,
        default: -1
      },
      electricUsed: {
        type: Number,
        default: -1
      }
    },
    computed: {
      introduce() {
        return ['一周', '一月', '本年'][this.state]
      },
      getTitle() {
        return `#${this.number}${this.type === 0 ? '电' : '水'}表`
      }
    },
    data() {
      return {
        state: 0
      }
    },
    methods: {
      getChartsData(state) {
        this.state = state
        this.$emit('getChartsData', {
          state: state,
          number: this.number,
          type: this.type
        })
      },
      initTabs() {
        this.$refs.tabs.initTabs()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .table-wrapper
    width: 293px
    height: 226px
    position: relative
    .title
      position: absolute
      width: 95px
      height: 80px
      padding: 14px 0 0 26px
      box-sizing: border-box
      font-size: 18px
      &.type0
        color: #FFAD00
      &.type1
        color: #00FFFF
    .data
      position: absolute
      top: 30px
      right: 20px
      color: #00FFFF
      font-size: 13px
      line-height: 20px
      white-space: nowrap
      .introduce
        display: inline-block
        vertical-align: top
        margin-right: 8px
      .numbs
        display: inline-block
        .val
          display: inline-block
          min-width: 50px
          text-align: center
          color: #ffffff
          font-size: 20px
          vertical-align: bottom
    .tabs-wrap
      position: absolute
      top: 69px
      left: 138px
    .charts-wrap
      position: absolute
      width: 100%
      height: 135px
      bottom: 0
</style>