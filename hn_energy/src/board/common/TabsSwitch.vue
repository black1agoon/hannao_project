<template>
  <div class="tabs-wrapper">
    <div :class="['tab', {active: activeIndex === index}]"
         v-for="(tab, index) in TABS"
         :key="index" @click="setActive(index, tab.value)">
      {{tab.label}}
    </div>
  </div>
</template>

<script>
  const TABS = [
    {
      label: '周',
      value: 0
    }, {
      label: '月',
      value: 1
    }, {
      label: '年',
      value: 2
    }
  ]
  export default {
    name: 'tabs-switch',
    data() {
      return {
        TABS,
        activeIndex: 0
      }
    },
    methods: {
      setActive(index, value) {
        this.activeIndex = index
        this.$emit('getChartsData', value)
      },
      initTabs() {
        this.activeIndex = 0
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .tabs-wrapper
    display: flex
    .tab
      width: 36px
      height: 15px
      line-height: 15px
      background-image: url("../static/img/tabs1.png")
      background-size: 36px 15px
      background-repeat: no-repeat
      color: #ffffff
      font-size: 11px
      text-align: center
      cursor: pointer
      &.active
        color: #FFDE00
        background-image: url("../static/img/tabs2.png")
</style>