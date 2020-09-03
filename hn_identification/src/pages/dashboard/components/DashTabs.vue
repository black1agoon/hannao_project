<template>
  <div class="tabs-wrapper">
    <span v-for="(tab, index) in tabList"
          :class="['tab', {active: active === index}]"
          :key="index"
          @click="setActive(index)">{{tab}}</span>
  </div>
</template>

<script>
  export default {
    name: 'dash-tabs',
    props: {
      tabList: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        active: 0
      }
    },
    methods: {
      setActive(index) {
        this.active = index
        this.$emit('activeIndex', this.active)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.tabs-wrapper
  width: 100%
  display: flex
  line-height: 25px
  font-size: 14px
  /*border: 1px solid #d8d8d8*/
  .tab
    display: inline-block
    /*flex: 1*/
    padding: 0 30px
    text-align: center
    vertical-align: middle
    color: #4A4A4A
    border: 1px solid #d8d8d8
    border-right: none
    &:last-child
      border-right: 1px solid #d8d8d8
    &:first-child.active
      color: #1888F9
      background: #e5f0fb
      border: 1px solid #a3d0fd
      border-radius: 3px 0 0 3px
    &:last-child.active
      color: #1888F9
      background: #e5f0fb
      border: 1px solid #a3d0fd
      border-radius: 0 3px 3px 0
    &.active
      color: #1888F9
      background: #e5f0fb
      border: 1px solid #a3d0fd
    &.active + .tab
      border-left: none
</style>
