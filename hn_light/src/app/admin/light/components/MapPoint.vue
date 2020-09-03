<template>
  <div :class="['point', getPointType]"></div>
</template>

<script>
  export default {
    name: 'map-point',
    props: {
      status: {
        type: Number,
        default: 4
      }
    },
    computed: {
      getPointType() {
        if (this.status === 0) {
          return 'type0'
        } else if (this.status === 1) {
          return 'type1'
        } else if (this.status === 2) {
          return 'type2'
        } else if (this.status === 3) {
          return 'type3'
        } else if (this.status === 4) {
          return 'type4'
        } else {
          return ''
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .point
    display: inline-block
    margin-right: 10px
    width: 10px
    height: 10px
    border-radius: 50%
    &.type2
      background: #354A5E
      box-shadow: 0 0 4px 3px #FFA61A
    &.type1
      background: #FFA61A
      box-shadow: 0 0 3px 4px #354A5E
    &.type3
      background: #FFA61A
      box-shadow: 0 0 4px 3px #FFA61A
    &.type0
      background: #354A5E
      box-shadow: 0 0 4px 3px #354A5E
    &.type4
      background: #F5222D
      box-shadow: 0 0 4px 3px #F5222D
</style>