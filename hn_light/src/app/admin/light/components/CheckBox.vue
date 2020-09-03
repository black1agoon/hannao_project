<template>
  <div :class="['check-box', {active: value === 1, pointer: clickAble}]" @click="click">
    <span class="check fa fa-check"></span>
  </div>
</template>

<script>
  export default {
    name: 'check-box',
    props: {
      value: {
        type: Number,
        default: 0
      },
      clickAble: {
        type: Boolean,
        default: true
      }
    },
    computed: {},
    data() {
      return {
      }
    },
    methods: {
      click() {
        if (this.clickAble) {
          this.$emit('input', this.value ? 0 : 1)
          this.$emit('change', this.value ? 0 : 1)
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .check-box
    width: 20px
    height: 20px
    background: rgba(220, 223, 226, 1)
    text-align: center
    line-height: 20px
    transition: all .2s
    &.active
      background: rgba(45, 204, 112, 1)
    &.pointer
      cursor: pointer
    .check
      font-size: 14px
      color: #ffffff
</style>