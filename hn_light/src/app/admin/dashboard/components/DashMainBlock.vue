<template>
  <div class="block-wrapper">
    <div class="top">
      <div class="title">{{title}}</div>
    </div>
    <slot></slot>
  </div>
</template>

<script>

  export default {
    name: 'dash-line-block',
    components: {
    },
    props: {
      title: String
    },
    data() {
      return {
      }
    },
    methods: {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .block-wrapper
    width: 100%
    height: 370px
    background: #ffffff
    position: relative
    .top
      width: 100%
      border-bottom: 1px solid #D8D8D8
      height: 40px
      line-height: 40px
      .title
        font-size: 14px
        color: #1890FF
        font-weight: 500
        padding: 0 25px
      .tabs
        position: absolute
        right: 20px
        top: 8px
        /*width: 180px*/
        height: 25px
        display: flex
</style>
