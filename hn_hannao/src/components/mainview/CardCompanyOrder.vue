<template>
  <ul class="ctt-box">
    <li class="row"
        :class="{ first: index === 0, second: index === 1, third: index ===2 }"
        v-for="(row, index) in list"
        :key="index">
      <div class="rank">NO.{{index + 1}}</div>
      <div class="bar-box">
        <div class="bar" :style="{ width: row.count / max * 100 + '%' }"></div>
      </div>
    </li>
    <ul class="box">
      <li class="dotted-line" v-for="(line, index) in 10" :key="index">
      </li>
    </ul>
  </ul>
</template>

<script>
  export default {
    name: 'card-company-order',
    props: {
      list: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      max() {
        let list = this.list.slice()
        list.sort((a, b) => b.count - a.count)
        return list.length > 0 ? list[0].count : 1
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .ctt-box
    position: relative
    width: 500px
    height: 260px
    display: flex
    flex-direction: column
    justify-content: space-between
    margin-top: 3px
    .row
      display: flex
      flex: 0 0 24px
      font-size: 14px
      line-height: 24px
      text-align: center
      color: #5FC1EE
      &.first
        color: #FFD500
        .rank, .bar
          background: #FFD500 !important
      &.second
        color: #E66A02
        .rank, .bar
          background: #E66A02 !important
      &.third
        color: #44C885
        .rank, .bar
          background: #44C885 !important
      &.first, &.second, &.third
        .rank
          color: #01092B
      .rank
        flex: 0 0 58px
        background: rgba(0, 150, 255, .3)
      .bar-box
        flex: 0 0 390px
        margin-left: 6px
        .bar
          height: 12px
          background: #0096FF
          margin-top: 6px
    .box
      position: absolute
      top: -15px
      left: 64px
      width: 440px
      height: 275px
      border-left: 1px solid rgba(255, 255, 255, .2)
      border-bottom: 1px solid rgba(255, 255, 255, .2)
      display: flex
      .dotted-line
        height: 100%
        margin-left: 38px
        border-right: 1px dotted rgba(255, 255, 255, .4)
</style>