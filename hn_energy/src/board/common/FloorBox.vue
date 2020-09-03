<template>
  <div class="floor-wrapper">
    <div class="title" @click="titleClick">{{title}}</div>
    <div class="data">
      <div class="introduce">{{introduce}}已使用:</div>
      <div class="numbs">
        <div class="num" v-show="waterUsed > -1 && waterUsed !== null">水<span class="val" v-html="formatFontDotted(waterUsed)"></span>t</div>
        <div class="num" v-show="electricUsed > -1 && electricUsed !== null">电<span class="val" v-html="formatFontDotted(electricUsed)"></span>kwh</div>
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
    name: 'floor-box',
    components: {
      TabsSwitch
    },
    props: {
      title: {
        type: String,
        default: ''
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
      }
    },
    data() {
      return {
        state: 0
      }
    },
    methods: {
      getChartsData(val) {
        this.state = val
        this.$emit('getChartsData', val)
      },
      titleClick() {
        this.$emit('openFloorWindow')
      },
      formatFontDotted(str) {
        if (str) {
          let numbs = str.toString().split('.')
          if (numbs.length > 1) {
            return numbs.join('<span class="dotted-in-font">.</span>')
          } else {
            return numbs.toString()
          }
        } else {
          return str
        }
      },
      initTabs() {
        this.$refs.tabs.initTabs()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.floor-wrapper
  width: 279px
  height: 210px
  background-image: url("../static/img/floorbox.png")
  background-size: 279px 210px
  background-repeat: no-repeat
  position: relative
  .title
    position: absolute
    width: 90px
    height: 80px
    cursor: pointer
    padding: 14px 0 0 26px
    box-sizing: border-box
    /*top: 14px*/
    /*left: 26px*/
    color: #FFDE00
    font-size: 20px
  .data
    position: absolute
    top: 14px
    left: 90px
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
      width: 95px
      .val
        display: inline-block
        width: 60px
        text-align: center
        color: #ffffff
        font-family: 'digital-dismay'
        font-size: 22px
        vertical-align: bottom
        /deep/ .dotted-in-font
          font-family 'PingFang', Helvetica, Arial, sans-serif
          vertical-align: bottom
  .tabs-wrap
    position: absolute
    top: 69px
    left: 138px
  .charts-wrap
    position: absolute
    width: 100%
    height: 120px
    bottom: 0
</style>