<template>
    <div class="timeline">
      <div class="hour" v-for="(i, index) in 24" :key="index">
        <div class="minute" v-for="(i, index) in 5" :key="index"></div>
      </div>
      <div class="hour"></div>
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
    width: 100%
    height: 20px
    border-bottom: 1px solid #555
    .hour
      position: absolute
      border-left: 1px solid #555
      height: 20px
      width: 4.167%
      &:after
        position: absolute
        bottom: 20px
        left: -15px
        font: 11px/1 sans-serif
      for i in 1..25
        &:nth-of-type({i})
          left: (100 / 24 * (i - 1)) * 1%
          &:after
            if i > 9
              content: '' + (i - 1) + ':00'
            else
              content: '0' + (i - 1) + ':00'
    .minute
      position: absolute
      height: 8px
      top: 12px
      border-left: 1px solid #555
      for i in 1..5
        &:nth-of-type({i})
          left: (100 / 6 * i) * 1%
</style>
