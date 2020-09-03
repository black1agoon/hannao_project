<template>
  <div class="line-wrapper">
    <div class="name">
      {{name}}
    </div>
    <div class="value" :style="{ color }">
      {{value}}
    </div>
    <div class="line">
      <div class="bar" :style="{
        background: color,
        width: getWidth
      }"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'line-progress',
    props: {
      name: {
        type: String,
        default: ''
      },
      value: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 0
      },
      color: {
        type: String,
        default: 'red'
      }
    },
    computed: {
      getWidth() {
        return this.max ? this.value / this.max * 100 + '%' : 0
      }
    },
    methods: {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.line-wrapper
  position: relative
  .name
    font-size: 18px
    color: #ffffff
    margin-bottom: 15px
  .value
    position: absolute
    font-size: 38px
    font-weight: bold
    top: -25px
    right: 0
  .line
    width: 458px
    height: 4px
    background: #ffffff
    .bar
      height: 4px
</style>