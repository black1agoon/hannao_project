<template>
  <div class="switch-box">
    <div :class="['item', {active: value === '1', pointer: clickAble}]" @click="click">开</div>
    <div :class="['item', {active: value === '0', pointer: clickAble}]" @click="click">关</div>
  </div>
</template>

<script>
  export default {
    name: 'switch-on-off',
    props: {
      value: {
        type: String,
        value: '0'
      },
      id: {
        type: String,
        default: ''
      },
      clickAble: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      click() {
        if (this.clickAble) {
          this.$emit('input', this.value === '0' ? '1' : '0')
          this.$emit('trigger', this.id)
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.switch-box
  width: 48px
  height: 20px
  display: flex
  justify-content: space-between
  .item
    width: 20px
    height: 20px
    text-align: center
    line-height: 20px
    background: rgba(220, 223, 226, 1)
    color: #ffffff
    font-size: 14px
    &.pointer
      cursor: pointer
    &.active
      background: #00a0e9
</style>