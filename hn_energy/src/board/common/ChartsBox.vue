<template>
  <div class="box-wrapper">
    <div class="title">{{title}}</div>
    <div class="charts-box">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'charts-box',
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .box-wrapper
    width: 576px
    height: 215px
    background-image: url("../static/img/chartsbox.png")
    background-size: 576px 215px
    background-repeat: no-repeat
    .title
      position: relative
      width: 150px
      margin: 0 auto
      text-align: center
      line-height: 50px
      height: 50px
      color: #00FFFF
      font-size: 24px
      &:before
        position: absolute
        top: 24px
        left: -147px
        margin-right: 20px
        display: inline-block
        content: ''
        width: 127px
        height: 2px
        background: linear-gradient(90deg, rgba(13, 27, 82, 1) 0%, rgba(0, 132, 255, 1) 100%)
      &:after
        position: absolute
        top: 24px
        margin-left: 20px
        display: inline-block
        content: ''
        width: 127px
        height: 2px
        background: linear-gradient(90deg, rgba(0, 132, 255, 1) 0%, rgba(13, 27, 82, 1) 100%)
    .charts-box
      width: 100%
      height: 165px
</style>