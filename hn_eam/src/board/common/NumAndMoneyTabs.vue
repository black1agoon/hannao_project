<template>
  <div class="tabs-box">
    <div class="font">{{getFont}}</div>
    <div class="tabs">
      <span @click="tabClick(0)" :class="['icon', {active: activeIndex === 0}]"></span>
      <span @click="tabClick(1)" :class="['icon', {active: activeIndex === 1}]"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'num-and-money-tab',
    props: {},
    computed: {
      getFont() {
        return this.activeIndex === 0 ? '数量分布' : '金额分布'
      }
    },
    data() {
      return {
        activeIndex: 0
      }
    },
    methods: {
      tabClick(index) {
        this.activeIndex = index
        this.$emit('changeTab', index)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.tabs-box
  width: 100%
  height: 100%
  .font
    width: 52px
    display: inline-block
    font-size: 13px
    color: rgba(0, 245, 255, 1)
  .tabs
    width: 36px
    display: inline-block
    .icon
      display: inline-block
      width: 7px
      height: 7px
      background: #009297
      border-radius: 50%
      margin-left: 5px
      cursor: pointer
      &.active
        background: rgba(0, 245, 255, 1)
</style>