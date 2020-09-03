<template>
    <div class="timeline">
      <div class="hour" v-for="(i, index) in 24" :key="index">
        <div class="minute" v-for="(i, index) in 5" :key="index"></div>
      </div>
      <!--<div class="hour"></div>-->
    </div>
</template>

<script>
    export default {
        name: 'time-line'
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .timeline
    position: relative
    font-family: 'pingfang'
    width: 100%
    height: 10px
    border-bottom: 1px solid #555
    .hour
      position: absolute
      border-left: 1px solid #555
      height: 10px
      width: 4.167%
      &:before
        position: absolute
        bottom: 10px
        left: -15px
        font: 11px/1 sans-serif
      for i in 1..25
        &:nth-of-type({i})
          left: (100 / 24 * (i - 1)) * 1%
          &:before
            if i > 9
              content: '' + (i - 1) + ':00'
            else
              content: '0' + (i - 1) + ':00'
        &:last-child
          border-right: 1px solid #555
          &:after
            position: absolute
            bottom: 10px
            right: -15px
            font: 11px/1 sans-serif
            content: '24:00'
</style>
