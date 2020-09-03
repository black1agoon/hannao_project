<template>
  <div class="wrap">
    <div :class="['item',{active: currentIndex === index}]"
         v-for="(item, index) in options"
         :key="index"
         @click="setCurrent(index, item.value)">
      {{item.label}}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'month-tabs',
    props: {
      options: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      setCurrent(index, val) {
        this.currentIndex = index
        this.$emit('monthChange', val)
      },
      init() {
        this.currentIndex = 0
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .wrap
    display: flex
    height: 34px
    line-height: 34px
    .item
      /*flex: 0 0 90px*/
      width: 90px
      text-align: center
      border: 1px solid #DCDFE6
      margin-left: -1px
      position: relative
      font-size: 14px
      &:first-child
        border-top-left-radius: 4px
        border-bottom-left-radius: 4px
      &:last-child
        border-top-right-radius: 4px
        border-bottom-right-radius: 4px
      &.active
        z-index: 10
        border: 1px solid #A3D0FD
        color: #1989FA
        background: #E6F1FC
</style>
